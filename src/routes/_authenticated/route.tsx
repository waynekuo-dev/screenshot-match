import { createFileRoute, Outlet } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { requireAccount } from "@/lib/accountAccess";
export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    return requireAccount(data.user, Boolean(error));
  },
  component: Outlet,
});
