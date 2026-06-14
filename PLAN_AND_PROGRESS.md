# Portfolio → Google Cloud Migration — Plan & Progress

> Living tracker for adding a **Google Cloud** deployment path (`tobytran.dev`)
> alongside the existing, untouched **AWS** deployment (`thangtrandev.net`).
> Last updated: **2026-06-14**.

---

## 1. Context & goal

The portfolio is a **static-export Next.js 16 app** (`nextapp/`, `output: "export"` → `nextapp/out/`),
deployed to AWS (S3 + CloudFront + Route53 + ACM) via `cdk/`. The goal is to **add** a parallel
Google Cloud deployment for the new domain **`tobytran.dev`**, in a new GCP project named **Portfolio**,
**without changing or removing the AWS path**. The same `nextapp/out/` build feeds both clouds.

## 2. Locked decisions

| Topic | Decision |
|-------|----------|
| Site build | Stays **static export** (`output: "export"`) — identical for AWS & GCP, no SSR, no Docker |
| GCP static hosting | **Firebase Hosting** — free tier, global CDN, auto SSL, SPA rewrites, **no load balancer** |
| Contact form | Client-side `fetch` (no server action) → **Cloud Functions 2nd gen**, `min-instances=0` (cold start accepted) |
| Email provider | **Resend** (key in Secret Manager) |
| Function location | `contact-function/` at **repo root** — cloud-agnostic, ready for a future AWS Lambda adapter |
| IaC | **Terraform** (`gcp/terraform/`) |
| Hosting deploy | **Firebase CLI** (`firebase deploy`) — content deploy is not Terraform-managed |
| CI | **Parallel** workflow `deploy-gcp.yml` (AWS `deploy.yml` kept) |
| DNS | Records added at the **current registrar** for `tobytran.dev` (no Cloud DNS delegation) |

## 3. Architecture

```
                                  ┌──────────── AWS (unchanged) ────────────┐
nextapp/ ──build──▶ nextapp/out/ ─┤ cdk/ → S3 + CloudFront → thangtrandev.net │
  (output: export)                └───────────────────────────────────────────┘
                                  ┌──────────── GCP (new) ──────────────────┐
                  nextapp/out/ ───┤ Firebase Hosting (CDN + SSL) → tobytran.dev│
contact form ──fetch (client)────▶│ Cloud Function (2nd gen) ──Resend──▶ email │
                                  │   RESEND_API_KEY in Secret Manager         │
                                  └───────────────────────────────────────────┘
```

---

## 4. Progress legend

- ✅ Done & verified
- 🟡 In progress / partially done
- ⬜ Not started (mostly **manual** steps you must do in GCP console / registrar)

---

## 5. Phase tracker

### Phase 0 — One-time GCP bootstrap (manual) 🟡
Documented in `gcp/README.md`. Repo: **github.com/thangtran3112/personal-portfolio**.

- [x] Create GCP project **Portfolio** — exists as **`tobytran-portfolio`**
- [ ] Link **billing** + upgrade to **Blaze** plan (required for Functions + Hosting custom domain) — **verify this is done**
- [x] Enable `iam` + `cloudresourcemanager` APIs
- [x] Create CI service account `ci-deployer` + bind `roles/owner` + create key → **`~/ci-deployer-key.json`**
- [ ] Create **Resend** account, add `tobytran.dev` as sending domain, get API key
- [ ] Add GitHub **secrets** (web UI — no `gh` CLI): `GCP_SA_KEY` (contents of `~/ci-deployer-key.json`), `RESEND_API_KEY`
- [ ] Add GitHub **variables**: `GCP_PROJECT_ID`=`tobytran-portfolio`, `GCP_REGION`=`us-west1`, `NEXT_PUBLIC_CONTACT_API_URL`=`https://us-west1-tobytran-portfolio.cloudfunctions.net/contact`
- [x] Project id == default → `gcp/.firebaserc` needs no change
- [ ] After storing the key in the GitHub secret, `rm ~/ci-deployer-key.json`

### Phase 1 — Terraform IaC ✅ (code complete; not yet applied)
- [x] `providers.tf` — google + google-beta + archive; optional GCS backend (commented)
- [x] `variables.tf` — project_id, region, domain, notification_email, from_email, resend_api_key (sensitive), etc.
- [x] `apis.tf` — enable all required APIs (incl. compute for the build SA)
- [x] `firebase.tf` — Firebase project + hosting site + custom domain (beta)
- [x] `secrets.tf` — Secret Manager secret/version + accessor IAM for the fn SA
- [x] `function.tf` — runtime SA, build-SA IAM, source zip→bucket, `cloudfunctions2_function`, public invoker
- [x] `outputs.tf` — function URL (stable) + custom-domain DNS records
- [x] `terraform.tfvars.example`
- [x] `terraform fmt` clean + `terraform validate` **Success** (real provider schemas)
- [x] Cross-platform provider lock (`.terraform.lock.hcl`: linux_amd64 + darwin) for CI
- [ ] **`terraform apply`** against the real project _(blocked on Phase 0)_

### Phase 2 — Firebase Hosting config ✅
- [x] `gcp/firebase.json` — `public: ../nextapp/out`, `cleanUrls`, SPA rewrite → `/index.html`
- [x] `gcp/.firebaserc` — default project id
- [ ] **First `firebase deploy --only hosting`** _(blocked on Phase 0)_

### Phase 3 — Contact Cloud Function ✅ (code complete & locally tested)
- [x] `contact-function/` moved to **repo root** (cloud-agnostic)
- [x] `core.mjs` — transport-agnostic: zod schema, `corsHeaders()`, `processContact()`
- [x] `index.mjs` — thin GCP functions-framework adapter
- [x] `package.json` (ESM, functions-framework + resend + zod), `.gcloudignore`, `.gitignore`, `README.md`
- [x] Local smoke test: preflight 204+CORS, invalid 400, no-key 500, GET 405, bad-origin no-ACAO
- [ ] Verify live email send with a real `RESEND_API_KEY` _(blocked on Phase 0)_

### Phase 4 — Client-side contact form ✅
- [x] `nextapp/app/contact/page.tsx` → client component (`react-hook-form` + `zod`)
- [x] `fetch` POST to `NEXT_PUBLIC_CONTACT_API_URL`; submitting/success/error states
- [x] Graceful fallback to "email me directly" when the API URL is unset
- [x] Static export build verified (`out/contact.html`, URL inlined) — AWS path unaffected

### Phase 5 — CI ✅
- [x] `.github/workflows/deploy-gcp.yml` — build → auth → terraform apply → firebase deploy
- [x] `.github/workflows/deploy.yml` — added `NEXT_PUBLIC_CONTACT_API_URL` to the AWS build env
- [ ] **First green run on push to `main`** _(blocked on Phase 0)_

### Phase 6 — DNS at registrar (manual) ⬜
- [ ] **Firebase Hosting**: add A + TXT records from `terraform output custom_domain_dns_records` (or Firebase console); SSL auto-provisions
- [ ] **Resend**: add SPF/DKIM/verification (TXT/MX) records to verify `tobytran.dev`
- [ ] Confirm `https://tobytran.dev` serves the site and the contact form sends mail

### Docs ✅
- [x] `gcp/README.md` — full bootstrap → deploy → DNS runbook
- [x] `CLAUDE.md` — repo layout, GCP section, CI section updated
- [x] This `PLAN_AND_PROGRESS.md`

---

## 6. File inventory

**Created**
```
contact-function/              # moved to repo root (cloud-agnostic)
  core.mjs  index.mjs  package.json  README.md  .gcloudignore  .gitignore
gcp/
  README.md  .gitignore  .firebaserc  firebase.json
  terraform/ providers.tf variables.tf apis.tf firebase.tf secrets.tf
             function.tf outputs.tf terraform.tfvars.example .terraform.lock.hcl
.github/workflows/deploy-gcp.yml
PLAN_AND_PROGRESS.md
```

**Modified**
```
nextapp/app/contact/page.tsx        # client form + fetch
.github/workflows/deploy.yml        # + NEXT_PUBLIC_CONTACT_API_URL build env
CLAUDE.md                           # layout + GCP + CI sections
```

**Untouched (intentionally)**
```
cdk/**                              # AWS deployment kept as-is
nextapp/next.config.mjs             # output: "export" stays
→ thangtrandev.net keeps working
```

---

## 7. Verification log

| Check | Result |
|-------|--------|
| `nextapp` static export builds with new client form | ✅ `out/contact.html` generated, API URL inlined |
| Contact function — CORS preflight | ✅ `204` + `Access-Control-Allow-Origin` |
| Contact function — invalid body | ✅ `400` with zod field errors |
| Contact function — valid body, no key | ✅ `500 Server not configured` (validation passed) |
| Contact function — `GET` | ✅ `405` |
| Contact function — disallowed origin | ✅ no ACAO header |
| Function behavior after core/adapter split | ✅ identical |
| `terraform fmt` | ✅ clean |
| `terraform validate` (real schemas) | ✅ Success |
| Provider lock cross-platform | ✅ linux + darwin |
| AWS path untouched | ✅ `output: export`, `cdk/` intact, AWS deploy step unchanged |

---

## 8. Your next actions (unblock the live deploy)

1. Do **Phase 0** (create project, billing, SA key, Resend, GitHub secrets/vars).
2. Trigger deploy — push to `main` (CI) **or** run locally (`terraform apply` then `firebase deploy`).
3. Do **Phase 6** (add Firebase + Resend DNS records at the registrar), wait for SSL.
4. Verify `https://tobytran.dev` + send a test message through the contact form.

## 9. Future / out of scope (not built)

- **AWS Lambda adapter** for `contact-function` (the `core.mjs` split is ready for it).
- **Workload Identity Federation** instead of the `GCP_SA_KEY` static key (enterprise hardening).
- Optional `api.tobytran.dev` custom domain for the function.
- GCS remote Terraform backend (commented in `providers.tf`) to keep state + Resend secret off laptops.
