import { NextResponse } from "next/server";
import { requireCapability, CAPABILITIES } from "@/lib/admin-auth";
import { withErrorHandling, badRequest } from "@/lib/core/errors";
import { parseJsonBody, clip } from "@/lib/core/validate";
import { runAgentPrompt } from "@/lib/core/provider";
import { rateLimit } from "@/lib/core/ratelimit";
import { isProviderConfigured } from "@/lib/core/config";

export const dynamic = "force-dynamic";

/**
 * Optional AI lead analysis for the admin modal.
 * Uses the hardened core provider (allowlist, timeout, circuit, sanitization).
 * Never makes a paid call when ANTHROPIC_API_KEY is unset.
 * Maps lead-intelligence output onto the legacy modal shape
 * { score, temperature, summary, reply, actions }.
 */
export const POST = withErrorHandling(async (req) => {
  await requireCapability(req, CAPABILITIES.MANAGE_LEADS);
  rateLimit(`analyze:${req.headers.get("x-forwarded-for") || "local"}`, {
    max: 10,
    windowMs: 60_000,
  });

  if (!isProviderConfigured("anthropic")) {
    return NextResponse.json(
      {
        error:
          "AI analysis is not available: ANTHROPIC_API_KEY is not configured on this deployment.",
        code: "ANTHROPIC_NOT_CONFIGURED",
      },
      { status: 503 }
    );
  }

  const lead = await parseJsonBody(req, 8_192);
  if (!lead || typeof lead !== "object") {
    throw badRequest("Lead payload is required.");
  }

  const result = await runAgentPrompt({
    slug: "lead-intelligence",
    input: {
      name: clip(lead.name, 200),
      company: clip(lead.company, 200),
      email: clip(lead.email, 254),
      industry: clip(lead.industry, 40),
      message: clip(lead.need || lead.message, 4000),
    },
  });

  const output = result.output || {};
  return NextResponse.json({
    score: output.score,
    temperature: output.temperature,
    summary: output.summary,
    reply: output.draft_reply || output.reply || "",
    actions: output.next_actions || output.actions || [],
  });
});
