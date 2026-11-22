"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, AudioLines, Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export function AuthForm({ signup = false }: { signup?: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const result = signup
        ? await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: window.location.origin },
          })
        : await supabase.auth.signInWithPassword({ email, password });
      if (result.error) {
        setError(result.error.message);
        return;
      }
      if (!result.data.session) {
        setConfirmed(true);
        return;
      }
      router.push("/app");
      router.refresh();
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <SiteHeader />
      <main className="auth-main">
        <div className="auth-panel fade-in">
          <span className="brand-mark">
            <AudioLines size={22} />
          </span>
          <h1>{signup ? "Create your account" : "Welcome back."}</h1>
          <p className="text-sm text-muted-foreground">
            {signup
              ? "A little less busywork. A lot more creating."
              : "Sign in to Video Speed Reader."}
          </p>
          {confirmed ? (
            <div role="status" className="mt-8 text-sm text-success">
              Check your email to confirm your account, then sign in.
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="field">
                <label htmlFor="email">Email address</label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="password">Password</label>
                <div className="relative">
                  <Input
                    id="password"
                    type={visible ? "text" : "password"}
                    autoComplete={signup ? "new-password" : "current-password"}
                    required
                    minLength={signup ? 6 : 1}
                    placeholder={signup ? "At least 6 characters" : "Enter your password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1"
                    aria-label={visible ? "Hide password" : "Show password"}
                    title={visible ? "Hide password" : "Show password"}
                    onClick={() => setVisible(!visible)}
                  >
                    {visible ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </div>
              {error && (
                <p role="alert" className="mt-4 text-sm text-destructive">
                  {error}
                </p>
              )}
              <Button className="submit" type="submit" disabled={busy}>
                {busy ? <Loader2 className="animate-spin" /> : null}
                {busy ? "Please wait…" : signup ? "Create account / 註冊" : "Sign in / 登入"}
                {!busy && <ArrowRight />}
              </Button>
            </form>
          )}
          <p className="mt-7 text-center text-sm text-muted-foreground">
            {signup ? "Already have an account?" : "New to Video Speed Reader?"}{" "}
            <Link className="text-primary hover:underline" href={signup ? "/auth" : "/sign-up"}>
              {signup ? "Sign in" : "Create an account"}
            </Link>
          </p>
          <p className="mt-10 text-center text-xs text-muted-foreground">
            <Link href="/">← Back to home</Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
