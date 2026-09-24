"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useSession } from "@/lib/useSession";

// Shared form for the login and signup pages.
// mode is "login" or "signup".
export default function AuthForm({ mode }) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const { session } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  // Already logged in? Go straight to the list.
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
      setError(error.message);
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
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-4 py-12">
      <h1 className="text-3xl font-bold">Price Watcher</h1>
      <p className="mt-1 text-gray-600">
        {isSignup ? "Create an account to start watching prices." : "Log in to see your groceries."}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-base focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Password</span>
          <input
            type="password"
            required
            minLength={6}
            autoComplete={isSignup ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-base focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
          />
          {isSignup && <span className="text-xs text-gray-500">At least 6 characters.</span>}
        </label>

        {error && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        {message && (
          <p role="status" className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-2 rounded-xl bg-emerald-600 px-4 py-3 text-base font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {busy ? "Please wait…" : isSignup ? "Sign up" : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        {isSignup ? "Already have an account? " : "New here? "}
        <Link href={isSignup ? "/login" : "/signup"} className="font-semibold text-emerald-700 underline">
          {isSignup ? "Log in" : "Create an account"}
        </Link>
      </p>
    </main>
  );
}
