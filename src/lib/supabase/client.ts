import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/integrations/supabase/types";
import { createSupabaseFetch } from "./fetch";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. " +
      "Set them in .env for local dev and in your hosting provider's environment settings.",
  );
}

// Browser Supabase client. @supabase/ssr stores the session in cookies (not
// localStorage) so Server Components, route handlers, and middleware can read
// it. Sign up / sign in / sign out all go through this client, unchanged.
export const supabase = createBrowserClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  global: { fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY) },
});
