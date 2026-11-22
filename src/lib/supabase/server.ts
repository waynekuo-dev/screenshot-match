import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/integrations/supabase/types";
import { createSupabaseFetch } from "./fetch";

// Server-side Supabase client bound to the request cookies. `cookies()` is async
// in Next.js 15+, so this helper must be awaited at every call site.
export async function createClient() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

  return createServerClient<Database>(url, key, {
    global: { fetch: createSupabaseFetch(key) },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component where cookies are read-only — the
          // middleware refreshes the session instead, so this is safe to ignore.
        }
      },
    },
  });
}
