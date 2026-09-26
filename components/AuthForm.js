"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useSession } from "@/lib/useSession";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Turns Supabase's technical error codes into messages people understand.
const FRIENDLY_ERRORS = {
  invalid_credentials: "Wrong email or password.",
  email_not_confirmed: "Please confirm your email first. Check your inbox for the link.",
  user_already_exists: "There is already an account with this email. Try logging in instead.",
  weak_password: "That password is too weak. Use at least 6 characters.",
  email_address_invalid: "That email address doesn't look right.",
  over_email_send_rate_limit: "Too many signups right now. Please try again in an hour.",
  over_request_rate_limit: "Too many attempts. Please wait a minute and try again.",
};

function friendlyError(error) {
  // No network, or Supabase can't be reached.
  if (error.name === "AuthRetryableFetchError") {
    return "Can't reach the login service. Check your internet connection and try again.";
  }
  return FRIENDLY_ERRORS[error.code] || error.message || "Something went wrong. Please try again.";
}

export default function AuthForm({ mode }) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const { session } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (session) router.replace("/groceries");
  }, [session, router]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setBusy(true);

    const credentials = { email: email.trim(), password };
    const { data, error } = isSignup
      ? await supabase.auth.signUp(credentials)
      : await supabase.auth.signInWithPassword(credentials);

    setBusy(false);

    if (error) {
      setError(friendlyError(error));
      return;
    }
    if (isSignup && !data.session) {
      // Supabase has "Confirm email" turned on: no session until they click the link.
      setMessage("Almost done! Check your email and click the link to confirm your account.");
      return;
    }
    router.replace("/groceries");
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <Logo className="mb-10" />
        <p className="eyebrow flex items-center gap-2 text-olive">
          <span className="size-1.5 rounded-full bg-olive" aria-hidden />
          {isSignup ? "Create account" : "Welcome back"}
        </p>
        <h1 className="mt-3 font-heading text-5xl leading-[0.95] font-bold tracking-[-0.04em]">
          {isSignup ? (
            <>
              Start watching
              <br />
              <span className="text-olive">prices.</span>
            </>
          ) : (
            <>
              Good to see
              <br />
              <span className="text-olive">you again.</span>
            </>
          )}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {isSignup
            ? "Add your groceries and we'll email you when they're cheap."
            : "Log in to see your groceries."}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 text-base"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              autoComplete={isSignup ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 text-base"
              aria-describedby={isSignup ? "password-help" : undefined}
            />
            {isSignup && (
              <p id="password-help" className="text-sm text-muted-foreground">
                At least 6 characters.
              </p>
            )}
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          )}
          {message && (
            <p role="status" className="rounded-lg bg-[#eef4e0] px-4 py-3 text-sm text-deal">
              {message}
            </p>
          )}

          <Button type="submit" variant="glow" size="lg" disabled={busy} className="mt-1 h-12 text-base font-semibold">
            {busy ? "Please wait…" : isSignup ? "Sign up" : "Log in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-muted-foreground">
          {isSignup ? "Already have an account? " : "New here? "}
          <Link
            href={isSignup ? "/login" : "/signup"}
            className="font-semibold text-foreground underline underline-offset-4"
          >
            {isSignup ? "Log in" : "Create an account"}
          </Link>
        </p>
      </div>
    </main>
  );
}
