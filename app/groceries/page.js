"use client";

import { supabase } from "@/lib/supabase";
import { useRequireSession } from "@/lib/useSession";

// Placeholder for step 5: proves login works. The real list comes in step 6.
export default function GroceriesPage() {
  const { session, loading } = useRequireSession();

  if (loading || !session) {
    return <p className="p-6 text-center text-gray-500">Loading…</p>;
  }

  return (
    <main className="mx-auto w-full max-w-md flex-1 px-4 py-8">
      <h1 className="text-2xl font-bold">My groceries</h1>
      <p className="mt-2 text-gray-600">Logged in as {session.user.email}</p>
      <p className="mt-6 rounded-xl bg-gray-100 p-4 text-gray-700">Your list will appear here in step 6.</p>
      <button
        onClick={() => supabase.auth.signOut()}
        className="mt-6 w-full rounded-xl border border-gray-300 px-4 py-3 font-semibold hover:bg-gray-100"
      >
        Log out
      </button>
    </main>
  );
}
