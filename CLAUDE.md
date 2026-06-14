# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

Monorepo with independent `package.json` and `node_modules` per package:

- `nextapp/` — Next.js 16 portfolio site (App Router, React 19, TypeScript, Tailwind, shadcn/ui)
- `cdk/` — AWS CDK app that deploys the **statically-exported** site to S3 + CloudFront (domain `thangtrandev.net`)
- `gcp/` — Terraform + Firebase config that deploys the **same static export** to Firebase Hosting (domain `tobytran.dev`), plus a Cloud Function for the contact form
- `contact-function/` — cloud-agnostic serverless contact-form backend (Resend email). Currently deployed to GCP Cloud Functions; structured so an AWS Lambda adapter can be added later

The same `nextapp/out/` build feeds **both** clouds. `nextapp`, `cdk` require Node ≥ 24 (`.nvmrc` = 24).

## Common commands

Run everything from inside the matching subdirectory.

### `nextapp/`
```bash
npm install
npm run dev      # local dev server at http://localhost:3000
npm run build    # produces static export in nextapp/out/ (because next.config.mjs sets output: "export")
npm run lint
```

### `cdk/`
```bash
npm install
npx cdk synth                       # render CloudFormation
npx cdk deploy next-portfolio       # deploy the stack
npx cdk destroy next-portfolio
```

Deploy locally requires AWS creds for account **654654352356** / region **us-west-2**, and the `nextapp/out/` directory must already be built (the stack uploads it via `s3deploy.BucketDeployment`).

## Deployment architecture

**Important:** `cdk/README.md` is out of date — it describes a Lambda / `cdk-nextjs-standalone` setup. The current code in `cdk/src/app-router-stack.ts` is a **static-export → S3 → CloudFront** deployment. Don't follow the README's Lambda instructions; read the stack source.

Flow:
1. `nextapp` builds with `output: "export"` → produces `nextapp/out/`
2. CDK `AppRouterStack` uploads `nextapp/out/` to a private S3 bucket
3. CloudFront serves it via an Origin Access Identity (bucket is BLOCK_ALL public access)
4. ACM cert is provisioned in `us-east-1` via `DnsValidatedCertificate` (CloudFront requires us-east-1 certs even though the stack itself is in us-west-2)
5. Route 53 A + AAAA alias records for `thangtrandev.net` point at the distribution
6. 403/404 from S3 are rewritten to `/index.html` with status 200 (SPA-style fallback for client-side routing)

`DOMAIN_NAME` and the AWS account/region are hardcoded in `cdk/src/app-router-stack.ts` and `cdk/src/app.ts`.

### GCP (`gcp/`) — Firebase Hosting + Cloud Function

Parallel deployment of the **same** static export to Google Cloud for `tobytran.dev`. Read `gcp/README.md` for the full bootstrap → deploy → DNS runbook. Key points:

- **Hosting:** Firebase Hosting (`firebase.json` at the **repo root** serves `nextapp/out`, SPA rewrite → `/index.html`, auto Google-managed SSL). It must be at the root — Firebase requires the public dir to be inside the config's directory. **No load balancer.** Deployed via the Firebase CLI.
- **Contact form:** client-side `fetch` (no server action) to a **Cloud Functions 2nd gen** HTTP endpoint (`contact-function/`, `min-instances=0` → scales to zero), which sends mail via **Resend**. The function URL is injected into the build via `NEXT_PUBLIC_CONTACT_API_URL` (a deterministic `https://<region>-<project>.cloudfunctions.net/contact`); when unset, the contact page degrades to "email me directly".
- **IaC:** Terraform in `gcp/terraform/` provisions the Firebase project/site/custom-domain, the function (zips `contact-function/`), Secret Manager (`RESEND_API_KEY`), and IAM. The Firebase Hosting *content* deploy is the Firebase CLI, not Terraform.
- **Commands:** `cd gcp/terraform && terraform init && terraform apply` (needs `TF_VAR_project_id`, `TF_VAR_region`, `TF_VAR_resend_api_key`), then `cd gcp && firebase deploy --only hosting`.
- Project bootstrap (create the `Portfolio` project, billing, CI service-account key, GitHub secrets/variables, Resend account) is **manual** — documented in `gcp/README.md` Phase 0.

## CI

Two workflows run on push to `main`, in parallel and independently:

- `.github/workflows/deploy.yml` (**AWS**): builds the static export, then `cdk deploy --require-approval never` using `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` secrets.
- `.github/workflows/deploy-gcp.yml` (**GCP**): builds the static export, then `terraform apply` (function + Firebase infra) and `firebase deploy --only hosting`, authenticating via the `GCP_SA_KEY` secret. Uses repo variables `GCP_PROJECT_ID`, `GCP_REGION`, `NEXT_PUBLIC_CONTACT_API_URL` and the `RESEND_API_KEY` secret.

Both build steps set `NEXT_PUBLIC_CONTACT_API_URL` so the contact form works regardless of which cloud serves the page (the function's CORS allowlist includes both domains).

## Frontend notes

- App Router under `nextapp/app/` (`/`, `/portfolio`, `/contact`). All pages must be compatible with `output: "export"` — no server actions, no dynamic API routes, no runtime `headers()`/`cookies()`.
- Theming via `next-themes` with a custom set of themes wired in `app/layout.tsx`: `dark`, `light`, `orange`, `blue`, `green`, `yellow`, `violet`. Each theme is defined in `app/globals.css` and Tailwind reads them via CSS variables.
- shadcn/ui components live under `components/ui/` (configured in `components.json`, base color `slate`, alias `@/components`, `@/lib/utils`).
- Static assets in `public/` — referenced as `/...` paths. Because the site is served from CloudFront over S3, all asset paths must work without a server (no `next/image` optimization — `images.unoptimized: true` is set).
- `tsconfig.json` has `strict: false` and `allowJs: true` — don't assume strict-mode invariants when editing.
