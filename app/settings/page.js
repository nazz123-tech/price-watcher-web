"use client";

import { useState } from "react";
import Link from "next/link";
import { api, getErrorMessage } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import { useRequireSession } from "@/lib/useSession";
import { useApiGet } from "@/lib/useApiGet";

export default function SettingsPage() {
  const { session, loading: sessionLoading } = useRequireSession();

  // { email, email_alerts }, loaded from our backend.
  const {
    data: settings,
    setData: setSettings,
    error: loadError,
    slow,
    retry,
  } = useApiGet("/settings", Boolean(session));
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  async function toggleAlerts(event) {
    const emailAlerts = event.target.checked;
    setSaveError("");
    setSaving(true);
    try {
      const { data } = await api.patch("/settings", { email_alerts: emailAlerts });
      setSettings(data);
    } catch (err) {
      // The checkbox follows settings.email_alerts, so it jumps back by itself.
      setSaveError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  if (sessionLoading || !session) {
    return <p>Loading…</p>;
  }

  return (
    <main>
      <header>
        <Link href="/groceries">Back to my groceries</Link>
        <h1>Settings</h1>
      </header>

      <section>
        <h2>Email alerts</h2>
        {loadError ? (
          <div>
            <p role="alert">{loadError}</p>
            <button onClick={retry}>Try again</button>
          </div>
        ) : settings === null ? (
          <p>{slow ? "Waking up the server… this can take up to a minute the first time." : "Loading…"}</p>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                checked={settings.email_alerts}
                disabled={saving}
                onChange={toggleAlerts}
              />
              <span>Email me when a grocery is at or below my target price</span>
            </label>
            <p>
              {settings.email_alerts
                ? `Alerts go to ${settings.email} every morning when you have deals.`
                : "Alerts are off. You won't get any emails."}
            </p>
            {saving && <p role="status">Saving…</p>}
            {saveError && <p role="alert">{saveError}</p>}
          </>
        )}
      </section>

      <section>
        <h2>Account</h2>
        <p>Logged in as {session.user.email}</p>
        <button onClick={() => supabase.auth.signOut()}>Log out</button>
      </section>
    </main>
  );
}
