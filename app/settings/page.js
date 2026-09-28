"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CircleHelp, LogOut, Mail } from "lucide-react";
import { toast } from "sonner";
import { api, getErrorMessage } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import { useRequireSession } from "@/lib/useSession";
import { useApiGet } from "@/lib/useApiGet";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { FullPageLoading, InlineLoading, LoadError } from "@/components/PageStates";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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

  async function toggleAlerts(emailAlerts) {
    setSaving(true);
    try {
      const { data } = await api.patch("/settings", { email_alerts: emailAlerts });
      setSettings(data);
      toast.success(emailAlerts ? "Email alerts turned on" : "Email alerts turned off");
    } catch (err) {
      // The switch follows settings.email_alerts, so it jumps back by itself.
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  if (sessionLoading || !session) {
    return <FullPageLoading />;
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader email={session.user.email} />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/groceries"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to my list
        </Link>
        <h1 className="mt-4 font-heading text-5xl font-bold tracking-[-0.04em]">Settings</h1>

        <div className="mt-8 flex flex-col gap-4">
          <Card className="rounded-2xl ring-border [--card-spacing:--spacing(6)]">
            <CardHeader>
              <CardTitle className="font-heading text-xl font-bold">Email alerts</CardTitle>
              <CardDescription>One email each morning when something hits your target price.</CardDescription>
            </CardHeader>
            <CardContent>
              {loadError ? (
                <LoadError message={loadError} onRetry={retry} />
              ) : settings === null ? (
                <InlineLoading slow={slow} />
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-4 rounded-xl bg-band p-4">
                    <Label htmlFor="email-alerts" className="text-base leading-snug font-semibold">
                      Email me about deals
                    </Label>
                    <Switch
                      id="email-alerts"
                      checked={settings.email_alerts}
                      disabled={saving}
                      onCheckedChange={toggleAlerts}
                      className="scale-125 data-checked:bg-deal"
                    />
                  </div>
                  <p className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Mail className="mt-0.5 size-4 shrink-0" />
                    {settings.email_alerts ? (
                      <span>
                        Alerts go to <strong className="text-foreground">{settings.email}</strong>.
                      </span>
                    ) : (
                      <span>Alerts are off. You won&apos;t get any emails.</span>
                    )}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-2xl ring-border [--card-spacing:--spacing(6)]">
            <CardHeader>
              <CardTitle className="font-heading text-xl font-bold">Account</CardTitle>
              <CardDescription>
                Logged in as <span className="text-foreground">{session.user.email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                size="lg"
                className="h-11 gap-2 bg-card px-5 text-base"
                onClick={() => supabase.auth.signOut()}
              >
                <LogOut className="size-4" /> Log out
              </Button>
              <Button variant="ghost" size="lg" className="ml-2 h-11 gap-2 px-4 text-base" asChild>
                <Link href="/groceries#guide">
                  <CircleHelp className="size-4" /> How it works
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
