import { getSupabase } from "./supabase";

// Reads the Supabase access token from the request cookie and resolves the
// authenticated user. Returns null when there is no valid session. The Supabase
// client is created here (not at module load) so it only runs at request time.
export async function getSessionUser(req) {
  const token = req.cookies.get("sb-access-token")?.value;
  if (!token) return null;
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.getUser(token);
  if (error) return null;
  return data.user;
}
