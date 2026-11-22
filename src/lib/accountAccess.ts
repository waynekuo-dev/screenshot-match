import type { User } from "@supabase/supabase-js";
import { redirect } from "@tanstack/react-router";

export function requireAccount(user: User | null, failed: boolean) {
  if (failed || !user) throw redirect({ to: "/auth" });
  return { user };
}
