import { describe, expect, it } from "vitest";
import type { User } from "@supabase/supabase-js";
import { requireAccount } from "@/lib/accountAccess";

const user: User = {
  id: "test-user",
  email: "user@example.com",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: "2026-11-22T00:00:00Z",
};
describe("Private workspace access", () => {
  it("redirects signed-out visitors to sign-in", () => {
    expect(requireAccount(null, false)).toEqual({ redirect: "/auth" });
  });
  it("rejects a failed account verification even with a cached user", () => {
    expect(requireAccount(user, true)).toEqual({ redirect: "/auth" });
  });
  it("returns the verified user for the dashboard greeting", () => {
    const decision = requireAccount(user, false);
    expect("user" in decision && decision.user.email).toBe("user@example.com");
  });
});
