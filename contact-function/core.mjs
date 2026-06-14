// Transport-agnostic contact logic, shared across cloud providers.
// GCP Cloud Functions uses this via index.mjs; a future AWS Lambda adapter
// (lambda.mjs) can reuse the same core without changes.
import { Resend } from "resend";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  subject: z.string().min(1).max(150),
  message: z.string().min(1).max(5000),
});

function allowedOrigins() {
  return (
    process.env.ALLOWED_ORIGINS ??
    "https://tobytran.dev,https://thangtrandev.net,http://localhost:3000"
  )
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
}

// CORS headers as a plain object, usable by any HTTP transport. Only echoes the
// Origin back when it's on the allowlist.
export function corsHeaders(origin) {
  const headers = {
    Vary: "Origin",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "3600",
  };
  if (origin && allowedOrigins().includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

// Validate the payload and send the email. Returns { statusCode, body } so any
// adapter (GCP functions-framework, AWS Lambda, etc.) can map it to a response.
export async function processContact(rawBody) {
  const parsed = contactSchema.safeParse(rawBody);
  if (!parsed.success) {
    return {
      statusCode: 400,
      body: { ok: false, error: "Invalid input", issues: parsed.error.flatten() },
    };
  }

  const { name, email, subject, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL;
  const from =
    process.env.FROM_EMAIL ?? "Portfolio Contact <contact@tobytran.dev>";

  if (!apiKey || !to) {
    console.error("Missing RESEND_API_KEY or NOTIFICATION_EMAIL env var");
    return { statusCode: 500, body: { ok: false, error: "Server not configured" } };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return { statusCode: 502, body: { ok: false, error: "Failed to send email" } };
    }

    return { statusCode: 200, body: { ok: true } };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { statusCode: 500, body: { ok: false, error: "Internal error" } };
  }
}
