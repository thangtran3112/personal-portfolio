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

## 🚀 LIVE STATUS (2026-06-14)

**The GCP deployment is LIVE and the CI pipeline is GREEN.** Site serves at
**https://tobytran-portfolio.web.app** (200 on `/`, `/portfolio`, `/contact`).
Only `tobytran.dev` **DNS** (Phase 6) remains.

Pipeline history: run #1 failed (repo *Variables* were set as Secrets) → fixed; run #2 failed
(Firebase `public` dir was outside `gcp/`) → moved config to repo root; run #3 failed (CI lost
Terraform state between runs → 409s) → added **GCS remote backend** + imported the 8 existing
resources; **run #4 = success**.

## 5. Phase tracker

### Phase 0 — One-time GCP bootstrap ✅
- [x] GCP project **`tobytran-portfolio`** + **Blaze billing** (confirmed `billingEnabled=True`)
- [x] CI service account `ci-deployer` + `roles/owner` + key (`~/ci-deployer-key.json`)
- [x] Resend account + `RESEND_API_KEY` (proven — Terraform stored it & the function deployed)
- [x] GitHub **secrets**: `GCP_SA_KEY`, `RESEND_API_KEY`
- [x] GitHub **variables**: `GCP_PROJECT_ID`, `GCP_REGION`, `NEXT_PUBLIC_CONTACT_API_URL` (set via `gh`)
- [ ] Optional cleanup: `rm ~/ci-deployer-key.json` (still present — used for the local state import); delete the redundant *Secrets* copies of the three Variables

### Phase 1 — Terraform IaC ✅ APPLIED
- [x] All `.tf` written, `fmt` clean, `validate` Success, cross-platform lock
- [x] **GCS remote backend** (`gs://tobytran-portfolio-tfstate`, prefix `portfolio/gcp`) — state now persists across CI runs
- [x] Seeded state by importing the 8 pre-existing resources (firebase project/site/custom-domain, SA, bucket, secret+version, function)
- [x] **`terraform apply` succeeded in CI** (run #4)

### Phase 2 — Firebase Hosting ✅ DEPLOYED
- [x] `firebase.json` + `.firebaserc` at the **repo root** (`public: nextapp/out`) — moved out of `gcp/` because Firebase requires the public dir inside the config's directory
- [x] `firebase deploy --only hosting` succeeded → site live on `*.web.app`

### Phase 3 — Contact Cloud Function ✅ DEPLOYED
- [x] `contact-function/` at repo root, `core.mjs` + GCP adapter; deployed as `contact` (2nd gen, scale-to-zero), public preflight returns 204
- [ ] Verify a real email send end-to-end (needs an allowed origin — see note below)

### Phase 4 — Client-side contact form ✅
- [x] `nextapp/app/contact/page.tsx` client form → `fetch` `NEXT_PUBLIC_CONTACT_API_URL`, graceful fallback

### Phase 5 — CI ✅ GREEN
- [x] `deploy-gcp.yml` green (build → auth → terraform apply → firebase deploy, ~2m41s)
- [x] `deploy.yml` (AWS) gets `NEXT_PUBLIC_CONTACT_API_URL` too — **AWS to be removed later** (along with `thangtrandev.net`)

### Phase 6 — DNS at registrar for `tobytran.dev` ⬜ (your only remaining step)
Add at your registrar (from `terraform output custom_domain_dns_records`):

| Type | Host/Name | Value |
|------|-----------|-------|
| **A** | `@` (apex) | `199.36.158.100` |
| **TXT** | `@` | `hosting-site=tobytran-portfolio` |
| **TXT** | `@` | `google-site-verification=GGhPKlPTpPGa2CLsKMLXSxN-XvSyZqyXABIlW3K18aY` _(already detected — may exist)_ |

- [ ] Add the A + `hosting-site` TXT (verification TXT already discovered). Firebase auto-provisions SSL once they resolve (`.dev` → HTTPS mandatory).
- [ ] **Resend**: add the SPF/DKIM records from the Resend dashboard to verify `tobytran.dev` as a sender.
- [ ] Confirm `https://tobytran.dev` loads and the contact form sends mail.

> **CORS note:** the function allowlist is `tobytran.dev` / `thangtrandev.net` / `localhost` — NOT the `*.web.app` staging URL. To test the contact form before DNS, add `https://tobytran-portfolio.web.app` to `allowed_origins` (function.tf default / `ALLOWED_ORIGINS`) and redeploy.

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
