import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";
import { SessionContext } from "@/components/account/SessionContext";
import { RequireAuth } from "@/components/account/RequireAuth";
import { AppErrorBoundary } from "@/components/AppErrorBoundary";
import Landing from "@/pages/Landing";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Workspace from "@/pages/Workspace";
import NotFound from "@/pages/NotFound";

// Single client for the SPA session. (SSR's per-request client is gone, so a
// module-level client no longer risks leaking cached data between requests.)
const queryClient = new QueryClient();

export function App() {
  const [user, setUser] = useState<User | null>(null);

  // One root account listener so header actions reflect sign-in/out consistently.
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
      <SessionContext.Provider value={user}>
        <AppErrorBoundary>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            {/* Private workspace — verified client-side, then rendered. */}
            <Route element={<RequireAuth />}>
              <Route path="/app" element={<Workspace />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppErrorBoundary>
      </SessionContext.Provider>
    </QueryClientProvider>
  );
}
