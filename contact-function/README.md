# contact-function

Serverless backend for the portfolio contact form. Lives at the repo root
(not under `gcp/`) because it's **cloud-agnostic** — currently deployed to GCP,
and structured so an AWS Lambda target can be added later.

## Structure

- `core.mjs` — transport-agnostic logic: zod schema, CORS header builder, and
  `processContact(body)` (validate + send via Resend). Returns `{ statusCode, body }`.
- `index.mjs` — **GCP Cloud Functions (2nd gen)** HTTP adapter (functions-framework).
- _(future)_ `lambda.mjs` — an AWS Lambda / API Gateway adapter would import the
  same `core.mjs` and map `processContact`'s result to a Lambda response.

The client (`nextapp/app/contact/page.tsx`) `fetch`es this endpoint; the URL is
injected at build time via `NEXT_PUBLIC_CONTACT_API_URL`.

## Environment variables

| Var | Purpose |
|-----|---------|
| `RESEND_API_KEY` | Resend API key (from Secret Manager in GCP) |
| `NOTIFICATION_EMAIL` | where submissions are emailed |
| `FROM_EMAIL` | verified Resend sender (default `Portfolio Contact <contact@tobytran.dev>`) |
| `ALLOWED_ORIGINS` | comma-separated CORS allowlist |

## Deploy

- **GCP:** via Terraform in [`../gcp/terraform`](../gcp/terraform) (zips this folder,
  uploads it, deploys the `contact` Cloud Function). See [`../gcp/README.md`](../gcp/README.md).

## Local test

```bash
npm install
RESEND_API_KEY=re_xxx NOTIFICATION_EMAIL=you@example.com npm run dev
curl -X POST localhost:8080 -H 'Content-Type: application/json' \
  -d '{"name":"Me","email":"me@example.com","subject":"Hi","message":"Test"}'
```
