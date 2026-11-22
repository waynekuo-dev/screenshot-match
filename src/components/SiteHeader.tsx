"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { AudioLines, ArrowUpRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount } from "@/components/account/SessionContext";
import { supabase } from "@/lib/supabase/client";
import { useState } from "react";

export function Brand() {
  return (
    <Link href="/" className="brand">
      <span className="brand-mark">
        <AudioLines size={21} />
      </span>
      <span>Video Speed Reader</span>
    </Link>
  );
}

export function SiteHeader({ account = false }: { account?: boolean }) {
  const user = useAccount();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function signOut() {
    setBusy(true);
    await queryClient.cancelQueries();
    queryClient.clear();
    const result = await supabase.auth.signOut();
    setBusy(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    router.replace("/auth");
    router.refresh();
  }
  return (
    <header className="site-header">
      <div className="container-wide flex h-full items-center justify-between gap-3">
        <Brand />
        <div className="flex items-center gap-3">
          {error && (
            <span role="alert" className="text-xs text-destructive">
              {error}
            </span>
          )}
          {user && account ? (
            <Button variant="outline" onClick={signOut} disabled={busy}>
              <LogOut />
              {busy ? "Signing out…" : "Sign Out"}
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link href={user ? "/app" : "/auth"}>
                {user ? "Open dashboard" : "Sign in / 登入"}
                <ArrowUpRight />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-wide flex items-center justify-between">
        <span>© 2026 Video Speed Reader</span>
        <span className="footer-right">Less time transcribing. More time creating.</span>
      </div>
    </footer>
  );
}
