import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin, getAdminAccessModelStatus } from "@/lib/admin-auth";
import { runtimeConfigStatus } from "@/lib/core/config";
import { isSupabaseConfigured } from "@/lib/supabase";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

function safeHostname() {
  const configured = Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim());
  try {
    const url = getSiteUrl();
    return { configured, hostname: new URL(url).hostname };
  } catch {
    return { configured, hostname: null };
  }
}

export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);

  const runtime = runtimeConfigStatus();
  const site = safeHostname();
  const access = await getAdminAccessModelStatus();
  const analyticsConfigured = Boolean(
    process.env.NEXT_PUBLIC_VERCEL_ANALYTICS ||
      process.env.VERCEL === "1"
  );

  const founderActions = [];

  if (!runtime.supabase) {
    founderActions.push({
      label: "Configure Supabase",
      description:
        "Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY in the deployment environment.",
    });
  }
  if (!runtime.providers.anthropic) {
    founderActions.push({
      label: "Configure Anthropic (optional)",
      description:
        "Set ANTHROPIC_API_KEY to enable agent execution. Without it, runs return a controlled 503 and task state is preserved.",
    });
  }
  if (access.membershipTable === false) {
    founderActions.push({
      label: "Apply admin_memberships migration",
      description:
        "Apply supabase/migrations/20260725120000_admin_memberships.sql, then insert an active owner membership for the Founder auth user.",
    });
  } else if (access.activeMemberships === 0) {
    founderActions.push({
      label: "Bootstrap Founder admin membership",
      description:
        "Insert one active row into admin_memberships for the Founder user_id/email. Until then, any authenticated session user remains authorized (compatibility mode).",
    });
  }
  if (!site.configured) {
    founderActions.push({
      label: "Set public site URL",
      description: "Set NEXT_PUBLIC_SITE_URL for canonical links and SEO metadata.",
    });
  }

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    config: {
      supabase: runtime.supabase,
      anthropic: runtime.providers.anthropic,
      providers: runtime.providers,
      siteUrl: site.configured,
      siteHostname: site.hostname,
      adminAuth: access.enforcement === "active_membership_required",
      adminAccessModel: access.model,
      membershipTable: access.membershipTable,
      compatibilityMode: access.compatibilityMode,
      leads: isSupabaseConfigured(),
      rateLimitBackend: "in-memory",
      analyticsIntegration: analyticsConfigured,
      runtimeVersion: process.env.npm_package_version || "0.1.0",
    },
    access,
    founderActions,
  });
});
