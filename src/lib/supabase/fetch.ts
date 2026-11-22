// Supabase's modern publishable keys (sb_publishable_*) are opaque strings, not
// JWTs. supabase-js would otherwise send them as `Authorization: Bearer <key>`,
// which GoTrue tries to parse as a JWT. Make the key travel as the `apikey`
// header and drop that self-referential Bearer so anon requests authenticate.
// Shared by the browser client, the server client, and the middleware.
export function isOpaqueApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

export function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );
    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }
    if (isOpaqueApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) {
      headers.delete("Authorization");
    }
    headers.set("apikey", supabaseKey);
    return fetch(input, { ...init, headers });
  };
}
