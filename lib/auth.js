import { getSupabase } from "./supabase";

// Reads the Supabase access token from the request cookie and resolves the
// authenticated user. Returns null when there is no valid session, or when
// Supabase is not configured — both are treated as "not authenticated"
// rather than crashing the request.
export async function getSessionUser(req) {
  const token = req.cookies.get("sb-access-token")?.value;
  if (!token) return null;
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser(token);
  if (error) return null;
  return data.user;
}
