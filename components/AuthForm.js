"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useSession } from "@/lib/useSession";

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
    <main>
      <h1>Price Watcher</h1>
      <p>{isSignup ? "Create an account to start watching prices." : "Log in to see your groceries."}</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          <span>Password</span>
          <input
            type="password"
            required
            minLength={6}
            autoComplete={isSignup ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isSignup && <span>At least 6 characters.</span>}
        </label>

        {error && <p role="alert">{error}</p>}
        {message && <p role="status">{message}</p>}

        <button type="submit" disabled={busy}>
          {busy ? "Please wait…" : isSignup ? "Sign up" : "Log in"}
        </button>
      </form>

      <p>
        {isSignup ? "Already have an account? " : "New here? "}
        <Link href={isSignup ? "/login" : "/signup"}>{isSignup ? "Log in" : "Create an account"}</Link>
      </p>
    </main>
  );
}
