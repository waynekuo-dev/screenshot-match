import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Workspace } from "@/components/Workspace";

// Private workspace. Verified server-side from the cookie session (the
// middleware keeps it fresh); signed-out visitors are redirected to /auth —
// same behavior as the old client-side RequireAuth guard.
export default async function AppPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  return <Workspace email={user.email ?? ""} />;
}
