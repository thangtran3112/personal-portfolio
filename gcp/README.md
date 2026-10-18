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
<repo root>/
  firebase.json            # hosting: public nextapp/out, SPA rewrites (MUST be at root —
  .firebaserc              #   Firebase requires the public dir inside the config's directory)
  contact-function/        # cloud-agnostic function source (see its README)
gcp/
  README.md
  terraform/               # function + secret + Firebase project/site/custom-domain
                           #   (Terraform zips & deploys ../contact-function as `contact`)
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

### 2. Keyless CI identity (operator-only bootstrap)

The deploy identity remains `ci-deployer`, so existing references need not be
renamed. Its legacy key was revoked on 2026-10-18. Do not create a replacement
key or grant Owner to get deployment working again.

After explicit approval for the production IAM changes, run from the repo root:

```bash
PROJECT_ID=tobytran-portfolio
export CLOUDSDK_ACTIVE_CONFIG_NAME=personal
bash gcp/bootstrap-wif.sh --apply
```

The script is additive and targets only `tobytran-portfolio`. It creates or
updates the `portfolio-deploy` pool and `github` provider, and grants
`roles/iam.workloadIdentityUser` on the existing account. Trust requires the
immutable GitHub owner/repository IDs, repository name, `refs/heads/main`, and
the exact `.github/workflows/deploy-gcp.yml` workflow. Forks, other workflows,
and other repositories are not trusted. Other consumers need their own reviewed
keyless trust; never broaden this provider to every personal repository.

Deployment uses these broad predefined Google roles, rather than custom or
per-resource grants:

```
roles/serviceusage.serviceUsageAdmin  roles/firebase.admin
roles/cloudfunctions.admin           roles/run.admin
roles/cloudbuild.builds.editor        roles/artifactregistry.admin
roles/secretmanager.admin            roles/storage.admin
roles/iam.serviceAccountAdmin        roles/iam.serviceAccountUser
```

These are powerful roles, including secret and service-account administration;
this is keyless deployment, not strict least-privilege isolation. The script does
not grant Owner, Editor, Project IAM Admin, or Workload Identity Pool Admin. It
does not revoke existing roles, delete an identity, or touch another project.

The script also preserves the default compute account's existing
`roles/cloudbuild.builds.builder` grant. Site Terraform uses a `removed` block
with `destroy = false` to relinquish that state entry **without revoking the
grant**. This requires Terraform 1.7+; CI is pinned to tested version 1.14.5.
Bootstrap is deliberately outside `gcp/terraform`, so the site workflow never
runs it. Rerunning it repairs additive grants; it does not perform final cleanup.

### 3. Resend

- Create a Resend account, add **`tobytran.dev`** as a sending domain, and copy
  the API key. (Its SPF/DKIM/verification DNS records are added in Phase 3.)

### 4. GitHub repo secrets & variables

`Settings → Secrets and variables → Actions`:

| Kind     | Name                          | Value                                                        |
|----------|-------------------------------|--------------------------------------------------------------|
| Secret   | `RESEND_API_KEY`              | the Resend API key                                           |
| Variable | `GCP_PROJECT_ID`              | `tobytran-portfolio`                                          |
| Variable | `GCP_REGION`                  | `us-west1`                                                    |
| Variable | `GCP_WIF_PROVIDER`            | full resource name of the bootstrapped `github` provider       |
| Variable | `GCP_DEPLOY_SERVICE_ACCOUNT`  | the existing `ci-deployer` account identity                    |
| Variable | `NEXT_PUBLIC_CONTACT_API_URL` | `https://us-west1-tobytran-portfolio.cloudfunctions.net/contact` |

The function URL is deterministic, so you can set it before the first deploy.
Add the same `NEXT_PUBLIC_CONTACT_API_URL` variable so the AWS workflow's build
picks it up too (the function's CORS allowlist already includes both domains).

After separately approving each GitHub write, set the two new variables without
creating a credential file:

```bash
WIF_PROVIDER="$(gcloud --configuration=personal --project="$PROJECT_ID" \
  iam workload-identity-pools providers describe github --location=global \
  --workload-identity-pool=portfolio-deploy --format='value(name)')"
gh variable set GCP_WIF_PROVIDER --body "$WIF_PROVIDER" \
  --repo thangtran3112/personal-portfolio
gh variable set GCP_DEPLOY_SERVICE_ACCOUNT \
  --body "ci-deployer@${PROJECT_ID}.iam.gserviceaccount.com" \
  --repo thangtran3112/personal-portfolio
```

Manually remove stale repository secret `GCP_SA_KEY` in GitHub Settings. The
workflow no longer reads it. `RESEND_API_KEY` and all AWS secrets stay unchanged.
`google-github-actions/auth` creates short-lived ADC configuration for both
Terraform and the Firebase Hosting CLI; never replace it with a new JSON key.

### 5. Verify cutover, then remove Owner

Before authorizing a push/merge to `main`, explicitly approve and run the
read-only operator preflight below against the exact proposed source. Review
that plan first: the old build-role binding must be forgotten, not destroyed,
and there must be no unexpected resource deletion. Repeat preflight if deployment
source, inputs, or cloud state change before deployment approval.

Push/merge to `main` is a real deployment and requires separate approval. CI
plans and immediately applies that saved plan; it does **not** pause for plan
review. Its plan output is not a substitute for the pre-push approval check.
Never upload a plan/state as an artifact; both can contain secrets.

After a real keyless Terraform + Firebase deploy succeeds, separately approve
the following IAM reduction:

```bash
gcloud --configuration=personal --project="$PROJECT_ID" projects remove-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:ci-deployer@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role=roles/owner --condition=None
```

Keep the account and other bindings. Verify its user-managed key list is empty,
Owner is absent from its project roles, and the next deployment succeeds with
the managed service roles. A successful run while Owner remains does **not**
prove the reduced role set is sufficient. Fix any specific missing service role
instead of restoring Owner or issuing a key.

---

## Phase 1 — First deploy

### Deploy through CI

After the approved preflight and separate deployment approval, push/merge to
`main`. The `Deploy to GCP` workflow builds the site, runs
`terraform plan`, applies that saved plan, and runs `firebase deploy`. Both the
AWS and GCP workflows run; changing GCP authentication does not change AWS IAM.

### Read-only operator preflight (not a local deployment alternative)

Run from the repo root only after approving the read-only production-state and
existing application-secret reads. This explicitly supplies personal-account
credentials to **both** backend initialization and the provider. The existing
Resend value stays in the subprocess environment; do not enable shell tracing,
echo values, or save them to a file. No shared ADC or Firebase login is changed.

```bash
(
  set +x
  set -euo pipefail
  export CLOUDSDK_ACTIVE_CONFIG_NAME=personal
  export GOOGLE_OAUTH_ACCESS_TOKEN="$(gcloud --configuration=personal auth print-access-token)"
  export TF_VAR_project_id=tobytran-portfolio
  export TF_VAR_region=us-west1
  # Personal user tokens need an explicit quota project for the Firebase API.
  export USER_PROJECT_OVERRIDE=true
  export GOOGLE_BILLING_PROJECT=tobytran-portfolio
  export TF_VAR_resend_api_key="$(gcloud --configuration=personal --project=tobytran-portfolio \
    secrets versions access latest --secret=resend-api-key)"
  test -n "$GOOGLE_OAUTH_ACCESS_TOKEN" && test -n "$TF_VAR_resend_api_key"
  terraform -chdir=gcp/terraform init -input=false -lockfile=readonly
  terraform -chdir=gcp/terraform plan -input=false
)
```

This never applies infrastructure or deploys Hosting. Live Firebase/ADC
compatibility is verified by the separately approved keyless CI deployment,
not by relying on a potentially unrelated local Firebase login.

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
  is granted by the operator-only `bootstrap-wif.sh`, not site Terraform.
- **State holds the Resend secret:** keep `terraform.tfstate` private. Prefer the
  configured GCS remote backend; never print state, tokens, or credential files.
- **Runtime:** the function is pinned to `nodejs22`; bump to `nodejs24` if/when
  available in your region.
- **Tear down:** `cd terraform && terraform destroy` removes the GCP resources.
  This does **not** touch AWS / `thangtrandev.net`.

## Local verification (no cloud mutation)

```bash
python3 -m unittest discover -s gcp -p 'test_*.py'
bash -n gcp/bootstrap-wif.sh
terraform -chdir=gcp/terraform init -backend=false -lockfile=readonly
terraform -chdir=gcp/terraform fmt -check
terraform -chdir=gcp/terraform validate
```

The script tests stub the cloud CLI, exercise new/existing trust and failed
grants, and verify no account/key deletion or role removal is attempted. These
checks are not evidence of a successful live Workload Identity deployment.
