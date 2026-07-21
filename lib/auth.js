import { supabase } from "./supabase";

// Reads the Supabase access token from the request cookie and resolves the
// authenticated user. Returns null when there is no valid session.
export async function getSessionUser(req) {
  const token = req.cookies.get("sb-access-token")?.value;
  if (!token) return null;
  const { data, error } = await supabase.auth.getUser(token);
  if (error) return null;
  return data.user;
}
