import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set (see .env.local.example)"
  );
}

// Browser Supabase client, used only for sign up, log in and log out.
// It uses the public anon key; our data is read through the backend.
// The session is kept in localStorage and refreshed automatically.
export const supabase = createClient(url, anonKey);
