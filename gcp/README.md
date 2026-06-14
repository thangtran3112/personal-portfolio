# GCP deployment (`tobytran.dev`)

This folder deploys the **statically-exported** Next.js site (`nextapp/out/`) to
**Google Cloud**, in parallel with the existing AWS deployment under `cdk/`
(which is unchanged and still serves `thangtrandev.net`). The same
`nextapp/out/` build feeds both clouds.

> This is a **static-export → Firebase Hosting** deployment, plus a small
> **Cloud Functions (2nd gen)** HTTP endpoint for the contact form. There is **no
> load balancer** and **no SSR/containers**. (Don't follow the `cdk/README.md`
> Lambda story — that's stale for AWS too.)

## Architecture

```
nextapp/ --build--> out/ --firebase deploy--> Firebase Hosting (CDN + auto SSL) --> tobytran.dev
contact form --fetch (client-side)--> Cloud Function (2nd gen, HTTP) --Resend--> email
                                       secret: RESEND_API_KEY in Secret Manager
```

- **Hosting:** Firebase Hosting (free tier, global CDN, Google-managed SSL, SPA rewrites).
- **Contact API:** Cloud Functions 2nd gen, `min-instances=0` (scales to zero, cold start accepted).
- **Email:** Resend.
- **IaC:** Terraform (`terraform/`). **Hosting deploy:** Firebase CLI.
- **CI:** `.github/workflows/deploy-gcp.yml` (runs alongside the AWS workflow).
- **DNS:** records added at the domain registrar (no Cloud DNS delegation).

## Layout

```
gcp/
  firebase.json            # hosting: public ../nextapp/out, SPA rewrites
  .firebaserc              # default project id (update if you used a different id)
  terraform/               # function + secret + Firebase project/site/custom-domain

../contact-function/       # cloud-agnostic function source (repo root, see its README)
                           # Terraform zips & deploys it as the GCP `contact` function
```

---

## Phase 0 — One-time bootstrap (manual)

Terraform can't bootstrap itself (it needs a project + credentials first).

### 1. Create the project & billing

- In the GCP console, create a project named **Portfolio**. Project IDs are
  globally unique — this guide assumes **`tobytran-portfolio`** (use your own and
  update `.firebaserc` + the `GCP_PROJECT_ID` CI variable accordingly).
- Link a **billing account** and use the **Blaze** (pay-as-you-go) plan —
  required for Cloud Functions and Firebase Hosting custom domains. Idle cost ≈ $0.

### 2. CI service account + key

```bash
PROJECT_ID=tobytran-portfolio
gcloud config set project "$PROJECT_ID"

# Fresh projects: enable the APIs needed to create the SA + set IAM FIRST,
# otherwise the create below fails silently and the IAM binding then errors
# with INVALID_ARGUMENT on the member.
gcloud services enable iam.googleapis.com cloudresourcemanager.googleapis.com

gcloud iam service-accounts create ci-deployer \
  --display-name="CI deployer (Terraform + Firebase)"

# Confirm it exists before binding — IAM is eventually consistent.
gcloud iam service-accounts list

# Simplest for a personal project. Tighter set: Firebase Admin, Cloud Functions
# Admin, Run Admin, Service Account User, Secret Manager Admin, Storage Admin,
# Service Usage Admin, Artifact Registry Admin, Cloud Build Editor.
sleep 20  # let the new SA propagate so the binding doesn't 400
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:ci-deployer@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/owner"

gcloud iam service-accounts keys create key.json \
  --iam-account="ci-deployer@${PROJECT_ID}.iam.gserviceaccount.com"
```

`key.json` is gitignored — don't commit it.

> **If the binding still errors with `INVALID_ARGUMENT` on the member:** the SA
> isn't visible yet. Run `gcloud iam service-accounts list` to confirm it exists,
> then re-run the `add-iam-policy-binding` command (propagation can take up to a
> minute).

### 3. Resend

- Create a Resend account, add **`tobytran.dev`** as a sending domain, and copy
  the API key. (Its SPF/DKIM/verification DNS records are added in Phase 3.)

### 4. GitHub repo secrets & variables

`Settings → Secrets and variables → Actions`:

| Kind     | Name                          | Value                                                        |
|----------|-------------------------------|--------------------------------------------------------------|
| Secret   | `GCP_SA_KEY`                  | contents of `key.json`                                        |
| Secret   | `RESEND_API_KEY`              | the Resend API key                                           |
| Variable | `GCP_PROJECT_ID`              | `tobytran-portfolio`                                          |
| Variable | `GCP_REGION`                  | `us-west1`                                                    |
| Variable | `NEXT_PUBLIC_CONTACT_API_URL` | `https://us-west1-tobytran-portfolio.cloudfunctions.net/contact` |

The function URL is deterministic, so you can set it before the first deploy.
Add the same `NEXT_PUBLIC_CONTACT_API_URL` variable so the AWS workflow's build
picks it up too (the function's CORS allowlist already includes both domains).

> **Hardening (optional):** replace the `GCP_SA_KEY` static key with
> **Workload Identity Federation** (keyless OIDC from GitHub Actions) — the
> recommended enterprise pattern. Not wired up here to keep the first deploy simple.

---

## Phase 1 — First deploy

### Option A — let CI do it (recommended)

Push to `main`. The `Deploy to GCP` workflow builds the site, runs
`terraform apply`, and `firebase deploy`. Both the AWS and GCP workflows run.

### Option B — local

```bash
# 1. Build the static site
cd ../nextapp
NEXT_PUBLIC_CONTACT_API_URL="https://us-west1-tobytran-portfolio.cloudfunctions.net/contact" npm run build

# 2. Auth (uses your gcloud login or the CI key)
gcloud auth application-default login   # or: export GOOGLE_APPLICATION_CREDENTIALS=.../key.json

# 3. Infra
cd ../gcp/terraform
export TF_VAR_project_id=tobytran-portfolio
export TF_VAR_region=us-west1
export TF_VAR_resend_api_key="re_xxx"
terraform init
terraform apply

# 4. Hosting
cd ..
firebase deploy --only hosting --project tobytran-portfolio
```

---

## Phase 2 — Verify

After deploy the site is live at the Firebase default URL
(`https://tobytran-portfolio.web.app`) before DNS is set.

```bash
# Test the contact function locally (it lives at the repo root)
cd ../contact-function && npm install
RESEND_API_KEY=re_xxx NOTIFICATION_EMAIL=you@example.com npm run dev
curl -X POST localhost:8080 -H 'Content-Type: application/json' \
  -d '{"name":"Me","email":"me@example.com","subject":"Hi","message":"Test"}'
```

---

## Phase 3 — DNS at the registrar (`tobytran.dev`)

Add these records where `tobytran.dev` is registered:

1. **Firebase Hosting** — the A record(s) + TXT verification value from:
   ```bash
   cd terraform && terraform output custom_domain_dns_records
   ```
   (or the Firebase console → Hosting → custom domain). Firebase auto-provisions
   the managed SSL cert once the records resolve. `.dev` is HSTS-preloaded, so
   HTTPS is mandatory and handled automatically.
2. **Resend** — the SPF/DKIM/verification (TXT/MX) records from the Resend
   dashboard, to verify the `tobytran.dev` sending domain.

The Cloud Function needs **no** DNS — the client calls its `cloudfunctions.net`
URL directly.

---

## Notes & troubleshooting

- **Firebase default site already exists:** if `terraform apply` errors that the
  hosting site `tobytran-portfolio` already exists, import it once:
  `terraform import google_firebase_hosting_site.portfolio tobytran-portfolio`.
- **First-build IAM error** (Cloud Build can't access the source/registry): the
  default compute service account needs `roles/cloudbuild.builds.builder` — this
  is granted in `function.tf`; re-run apply if propagation lagged.
- **State holds the Resend secret:** keep `terraform.tfstate` private. Prefer the
  GCS remote backend (commented in `providers.tf`).
- **Runtime:** the function is pinned to `nodejs22`; bump to `nodejs24` if/when
  available in your region.
- **Tear down:** `cd terraform && terraform destroy` removes the GCP resources.
  This does **not** touch AWS / `thangtrandev.net`.
