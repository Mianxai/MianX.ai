// AI provider adapter.
//
// The only network side effect in the runtime. It is called *only* when a
// provider is configured; the caller (runtime.js) checks isProviderConfigured
// first and returns a controlled 503 otherwise, so a missing key never crashes
// a build or a request. Prompts and keys stay server-side; nothing here is
// exposed to the browser.

import { isProviderConfigured } from "./config";
import { ERROR_CODES, notConfigured, ApiError } from "./errors";

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const MAX_TOKENS = 1024;

// Per-agent system prompts. Each instructs the model to return ONLY JSON in the
// shape declared by the agent's outputSchema.
const SYSTEM_PROMPTS = {
  "lead-intelligence":
    'You are the Lead Intelligence Agent for Mianx.ai. Evaluate the lead and ' +
    'respond with ONLY valid JSON: {"score": <0-100>, "temperature": ' +
    '"hot"|"warm"|"cold", "summary": "<2-3 sentences>", "next_actions": ' +
    '["<action>", ...]}. Do not send email or take any action.',
  research:
    'You are the Research Agent for Mianx.ai. Answer the bounded research ' +
    'question using only reasoning (no live browsing). Respond with ONLY valid ' +
    'JSON: {"summary": "<short summary>", "findings": ["<finding>", ...], ' +
    '"open_questions": ["<question>", ...]}.',
  "qa-review":
    'You are the QA Review Agent for Mianx.ai. Review the supplied result ' +
    'against the acceptance criteria. Respond with ONLY valid JSON: ' +
    '{"verdict": "pass"|"fail", "issues": ["<issue>", ...], ' +
    '"recommendations": ["<recommendation>", ...]}. You may never approve a ' +
    'production action.',
};

function buildUserMessage(slug, input) {
  const safe = input && typeof input === "object" ? input : {};
  switch (slug) {
    case "lead-intelligence":
      return [
        `Name: ${safe.name || "N/A"}`,
        `Company: ${safe.company || "N/A"}`,
        `Email: ${safe.email || "N/A"}`,
        `Industry: ${safe.industry || "N/A"}`,
        `Message: ${safe.message || ""}`,
      ].join("\n");
    case "research":
      return [
        `Question: ${safe.question || ""}`,
        safe.context ? `Context: ${safe.context}` : "",
      ]
        .filter(Boolean)
        .join("\n");
    case "qa-review":
      return [
        `Acceptance criteria: ${safe.acceptance_criteria || ""}`,
        `Result to review: ${safe.result || ""}`,
      ].join("\n");
    default:
      return JSON.stringify(safe);
  }
}

// Extracts and parses the JSON object from an Anthropic response body. Throws a
// standardized PROVIDER_ERROR (502) if the model returned non-JSON.
export function parseProviderJson(data) {
  const text = (data?.content || []).map((b) => b?.text || "").join("\n");
  const clean = text.replace(/```json|```/g, "").trim();
  try {
    const parsed = JSON.parse(clean);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("not an object");
    }
    return parsed;
  } catch {
    throw new ApiError(
      502,
      ERROR_CODES.PROVIDER_ERROR,
      "The AI provider returned a response that could not be parsed as JSON."
    );
  }
}

// Runs one agent prompt. Returns { output, provider, model }. Throws:
//  * 503 NOT_CONFIGURED  — provider not configured (caller should pre-check)
//  * 502 PROVIDER_ERROR  — HTTP failure or unparseable output
//
// `fetchImpl` is injectable purely for testing; production uses global fetch.
export async function runAgentPrompt(
  { slug, model, input },
  { fetchImpl = fetch } = {}
) {
  if (!isProviderConfigured("anthropic")) {
    throw notConfigured(
      "AI analysis is not available: ANTHROPIC_API_KEY is not configured on this deployment.",
      "ANTHROPIC_NOT_CONFIGURED"
    );
  }

  const system = SYSTEM_PROMPTS[slug] || "Respond with ONLY valid JSON.";
  const userMsg = buildUserMessage(slug, input);
  const usedModel = model || "claude-sonnet-4-6";

  let res;
  try {
    res = await fetchImpl(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: usedModel,
        max_tokens: MAX_TOKENS,
        system,
        messages: [{ role: "user", content: userMsg }],
      }),
    });
  } catch (err) {
    throw new ApiError(
      502,
      ERROR_CODES.PROVIDER_ERROR,
      "Could not reach the AI provider."
    );
  }

  if (!res.ok) {
    throw new ApiError(
      502,
      ERROR_CODES.PROVIDER_ERROR,
      `The AI provider returned an error (HTTP ${res.status}).`
    );
  }

  const data = await res.json();
  const output = parseProviderJson(data);
  return { output, provider: "anthropic", model: usedModel };
}
