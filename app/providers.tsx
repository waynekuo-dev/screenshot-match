"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";

import { SessionContext } from "@/components/account/SessionContext";
import { supabase } from "@/lib/supabase/client";

const queryClient = new QueryClient();

// One root account listener so header actions reflect sign-in/out consistently,
// plus the React Query provider. Ported from the old src/App.tsx.
export function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let active = true;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (active) setUser(session?.user ?? null);
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      if (event === "SIGNED_OUT") queryClient.clear();
      else void queryClient.invalidateQueries();
    });
    void supabase.auth.getUser().then(({ data }) => {
      if (active) setUser(data.user);
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SessionContext.Provider value={user}>{children}</SessionContext.Provider>
    </QueryClientProvider>
  );
}
