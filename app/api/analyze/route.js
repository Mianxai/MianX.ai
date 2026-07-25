import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

// The AI lead-analysis feature is optional. When ANTHROPIC_API_KEY is not
// configured, this route returns a controlled "not available" response
// instead of calling out to Anthropic with an empty key — the rest of the
// product (lead capture, admin auth, lead list/status) keeps working.
export async function POST(req) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      {
        error:
          "AI analysis is not available: ANTHROPIC_API_KEY is not configured on this deployment.",
        code: "ANTHROPIC_NOT_CONFIGURED",
      },
      { status: 503 }
    );
  }

  let lead;
  try {
    lead = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const system = `You are an inbound intelligence agent for Mianx.ai, an AI-native Business Operating System, AI Workforce platform, and Autonomous Product Factory. Respond with ONLY valid JSON:
{"score": <0-100>, "temperature": "hot"|"warm"|"cold", "summary": "<2-3 sentences>", "reply": "<4-6 sentence draft email, signed 'The Mianx.ai Team'>", "actions": ["...", "...", "..."]}`;

  const userMsg = `Name: ${lead.name}\nCompany: ${lead.company || "N/A"}\nEmail: ${lead.email}\nPhone: ${lead.phone || "N/A"}\nIndustry: ${lead.industry || "N/A"}\nMessage: ${lead.need || lead.message || ""}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system,
      messages: [{ role: "user", content: userMsg }],
    }),
  });
  const data = await res.json();
  const text = (data.content || []).map((b) => b.text || "").join("\n");
  const clean = text.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(clean);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: "Agent returned invalid JSON" }, { status: 502 });
  }
}
