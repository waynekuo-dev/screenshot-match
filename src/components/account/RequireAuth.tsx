import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";
import { requireAccount } from "@/lib/accountAccess";

type AuthState = { status: "checking" } | { status: "allowed"; user: User } | { status: "denied" };

/**
 * Client-side gate for the private workspace. Browser-owned sessions can't be
 * checked during a static render, so we verify with Supabase on mount and then
 * either render the protected routes or redirect to sign-in.
 */
export function RequireAuth() {
  const [state, setState] = useState<AuthState>({ status: "checking" });

  useEffect(() => {
    let active = true;
    void supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;
      const decision = requireAccount(data.user, Boolean(error));
      setState(
        "user" in decision ? { status: "allowed", user: decision.user } : { status: "denied" },
      );
    });
    return () => {
      active = false;
    };
  }, []);

  if (state.status === "checking") return null;
  if (state.status === "denied") return <Navigate to="/auth" replace />;
  return <Outlet context={{ user: state.user }} />;
}
