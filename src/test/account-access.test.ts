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
    try {
      requireAccount(null, false);
      expect.fail("Must reject signed-out users");
    } catch (error) {
      expect(error).toMatchObject({ options: { to: "/auth" } });
    }
  });
  it("rejects a failed account verification even with a cached user", () => {
    expect(() => requireAccount(user, true)).toThrow();
  });
  it("returns the verified user email for the dashboard greeting", () => {
    expect(requireAccount(user, false).user.email).toBe("user@example.com");
  });
});
