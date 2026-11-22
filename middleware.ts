import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseFetch } from "@/lib/supabase/fetch";

// Keeps the Supabase auth cookie fresh on every request so Server Components and
// route handlers can read the user session. (Next.js 16 still accepts the name
// "middleware.ts"; it migrates to "proxy.ts" in a later milestone.)
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    global: { fetch: createSupabaseFetch(key) },
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  await supabase.auth.getUser();
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
