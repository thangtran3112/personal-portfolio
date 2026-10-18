"""Exercise the operator script without contacting Google Cloud."""

import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest


SCRIPT = Path(__file__).with_name("bootstrap-wif.sh")
FAKE_GCLOUD = """#!/usr/bin/env python3
import json, os, sys
args = sys.argv[1:]
with open(os.environ['CALLS'], 'a') as log:
    log.write(json.dumps(args) + '\\n')
if os.environ.get('FAIL_ON') in args:
    sys.exit(5)
if '--format=value(projectNumber)' in args:
    print('123456789012')
elif 'workload-identity-pools' in args and 'describe' in args:
    sys.exit(0 if os.environ.get('EXISTING') == '1' else 1)
"""


class BootstrapTests(unittest.TestCase):
    def run_script(self, *args, existing=False, fail_on=""):
        with tempfile.TemporaryDirectory() as scratch:
            root = Path(scratch)
            fake = root / "gcloud"
            fake.write_text(FAKE_GCLOUD)
            fake.chmod(0o700)
            calls = root / "calls.jsonl"
            result = subprocess.run(
                ["bash", str(SCRIPT), *args],
                env={**os.environ, "PATH": f"{root}:{os.environ['PATH']}",
                     "CALLS": str(calls), "EXISTING": str(int(existing)),
                     "FAIL_ON": fail_on},
                capture_output=True, text=True,
            )
            recorded = [json.loads(line) for line in calls.read_text().splitlines()] if calls.exists() else []
            return result, recorded

    def test_requires_explicit_apply_before_any_cloud_call(self):
        result, calls = self.run_script()
        self.assertEqual(result.returncode, 2, result.stderr)
        self.assertEqual(calls, [])

    def test_bootstrap_preserves_identity_and_limits_keyless_trust(self):
        for existing in (False, True):
            with self.subTest(existing=existing):
                result, calls = self.run_script("--apply", existing=existing)
                self.assertEqual(result.returncode, 0, result.stderr)
                self.assertTrue(all("--configuration=personal" in call and
                                    "--project=tobytran-portfolio" in call for call in calls))
                provider_calls = [call for call in calls if "create-oidc" in call or "update-oidc" in call]
                self.assertEqual(len(provider_calls), 1)
                provider = provider_calls[0]
                self.assertIn("update-oidc" if existing else "create-oidc", provider)
                condition = next(arg.split("=", 1)[1] for arg in provider if arg.startswith("--attribute-condition="))
                for constraint in (
                    "assertion.repository_id=='841812292'",
                    "assertion.repository_owner_id=='37521149'",
                    "assertion.repository=='thangtran3112/personal-portfolio'",
                    "assertion.ref=='refs/heads/main'",
                    "assertion.workflow_ref=='thangtran3112/personal-portfolio/.github/workflows/deploy-gcp.yml@refs/heads/main'",
                ):
                    self.assertIn(constraint, condition)
                self.assertNotIn("||", condition)
                self.assertNotIn("*", condition)
                bindings = [call for call in calls if "add-iam-policy-binding" in call]
                roles = {arg for call in bindings for arg in call if arg.startswith("--role=")}
                self.assertEqual(roles, {"--role=" + role for role in (
                    "roles/serviceusage.serviceUsageAdmin", "roles/firebase.admin",
                    "roles/cloudfunctions.admin", "roles/run.admin",
                    "roles/cloudbuild.builds.editor", "roles/artifactregistry.admin",
                    "roles/secretmanager.admin", "roles/storage.admin",
                    "roles/iam.serviceAccountAdmin", "roles/iam.serviceAccountUser",
                    "roles/iam.workloadIdentityUser", "roles/cloudbuild.builds.builder",
                )})
                impersonation = next(call for call in bindings if "--role=roles/iam.workloadIdentityUser" in call)
                self.assertIn("ci-deployer@tobytran-portfolio.iam.gserviceaccount.com", impersonation)
                self.assertIn("--member=principalSet://iam.googleapis.com/projects/123456789012/locations/global/workloadIdentityPools/portfolio-deploy/attribute.repository_id/841812292", impersonation)
                for call in calls:
                    self.assertFalse(set(call) & {"keys", "delete", "remove-iam-policy-binding", "set-iam-policy"})
                self.assertFalse(any("service-accounts" in call and "create" in call for call in calls))

    def test_failed_grant_stops_without_removing_owner_or_claiming_success(self):
        result, calls = self.run_script("--apply", fail_on="--role=roles/run.admin")
        self.assertEqual(result.returncode, 5, result.stderr)
        self.assertIn("--role=roles/run.admin", calls[-1])
        self.assertNotIn("Bootstrap complete", result.stdout)


if __name__ == "__main__":
    unittest.main()
