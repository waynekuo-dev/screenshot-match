import type { User } from "@supabase/supabase-js";

export type AccountDecision = { user: User } | { redirect: "/auth" };

/**
 * Decide whether a visitor may enter the private workspace. Framework-agnostic:
 * callers turn a `redirect` decision into navigation (React Router <Navigate />).
 */
export function requireAccount(user: User | null, failed: boolean): AccountDecision {
  if (failed || !user) return { redirect: "/auth" };
  return { user };
}
