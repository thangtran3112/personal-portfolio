// GCP Cloud Functions (2nd gen) HTTP adapter. All reusable logic lives in
// core.mjs so the same package can later add an AWS Lambda adapter.
import functions from "@google-cloud/functions-framework";
import { corsHeaders, processContact } from "./core.mjs";

functions.http("contact", async (req, res) => {
  for (const [key, value] of Object.entries(corsHeaders(req.headers.origin))) {
    res.set(key, value);
  }

  // CORS preflight
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const { statusCode, body } = await processContact(req.body);
  res.status(statusCode).json(body);
});
