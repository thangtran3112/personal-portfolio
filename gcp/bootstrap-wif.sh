#!/usr/bin/env bash
# Operator-only bootstrap, deliberately outside the site's Terraform root.
# Additive: keep the existing identity, other bindings, and Owner until cutover.
set -Eeuo pipefail

if [[ $# -ne 1 || "${1:-}" != --apply ]]; then
  echo 'Usage: bash gcp/bootstrap-wif.sh --apply' >&2
  echo 'Creates portfolio GitHub OIDC trust and adds predefined deploy roles.' >&2
  echo 'Does not create keys, remove Owner, or change other projects.' >&2
  exit 2
fi

project=tobytran-portfolio
account="ci-deployer@$project.iam.gserviceaccount.com"
pool=portfolio-deploy
repository=thangtran3112/personal-portfolio
# Immutable public GitHub IDs prevent a renamed/recreated repository taking over.
repository_id=841812292
owner_id=37521149
g() { gcloud --configuration=personal --project="$project" --quiet "$@"; }

g iam service-accounts describe "$account" --format=none
number="$(g projects describe "$project" --format='value(projectNumber)')"
[[ "$number" =~ ^[0-9]+$ ]] || { echo 'Invalid project number; stopped.' >&2; exit 1; }

g services enable iam.googleapis.com iamcredentials.googleapis.com \
  sts.googleapis.com cloudresourcemanager.googleapis.com --format=none

if ! g iam workload-identity-pools describe "$pool" --location=global >/dev/null 2>&1; then
  g iam workload-identity-pools create "$pool" --location=global \
    --display-name='Portfolio deploy' --format=none
fi

mode=create-oidc
if g iam workload-identity-pools providers describe github --location=global \
  --workload-identity-pool="$pool" >/dev/null 2>&1; then
  mode=update-oidc
fi
condition="assertion.repository_owner_id=='$owner_id' && assertion.repository_id=='$repository_id' && assertion.repository=='$repository' && assertion.ref=='refs/heads/main' && assertion.workflow_ref=='$repository/.github/workflows/deploy-gcp.yml@refs/heads/main'"
g iam workload-identity-pools providers "$mode" github --location=global \
  --workload-identity-pool="$pool" \
  --issuer-uri=https://token.actions.githubusercontent.com \
  --attribute-mapping='google.subject=assertion.sub,attribute.repository_id=assertion.repository_id' \
  --attribute-condition="$condition" --format=none

g iam service-accounts add-iam-policy-binding "$account" \
  --role=roles/iam.workloadIdentityUser --condition=None \
  --member="principalSet://iam.googleapis.com/projects/$number/locations/global/workloadIdentityPools/$pool/attribute.repository_id/$repository_id" \
  --format=none

# Broad managed service roles, intentionally not granular per-resource grants.
# No Owner/Editor, Project IAM Admin, or Workload Identity Pool Admin grant.
for role in \
  roles/serviceusage.serviceUsageAdmin roles/firebase.admin \
  roles/cloudfunctions.admin roles/run.admin roles/cloudbuild.builds.editor \
  roles/artifactregistry.admin roles/secretmanager.admin roles/storage.admin \
  roles/iam.serviceAccountAdmin roles/iam.serviceAccountUser; do
  g projects add-iam-policy-binding "$project" \
    --member="serviceAccount:$account" --role="$role" --condition=None --format=none
done

# Existing build permission stays live when site Terraform relinquishes it.
g projects add-iam-policy-binding "$project" \
  --member="serviceAccount:$number-compute@developer.gserviceaccount.com" \
  --role=roles/cloudbuild.builds.builder --condition=None --format=none

echo 'Bootstrap complete. Configure the two GitHub variables as documented.'
echo 'Keep Owner until a keyless deploy succeeds; remove it separately afterward.'
