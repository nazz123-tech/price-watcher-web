"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleHelp, LogOut, Settings } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV = [
  { href: "/groceries", label: "My list" },
  { href: "/settings", label: "Settings" },
];

// "road2thedream1@gmail.com" -> "RO"
function initials(email = "") {
  return email.slice(0, 2).toUpperCase();
}

// onShowGuide: opens the onboarding guide on this page; without it,
// "How it works" goes to the groceries page and opens the guide there.
export default function AppHeader({ email, onShowGuide }) {
  const pathname = usePathname();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/groceries" aria-label="Price Watcher home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "border-b-2 pb-1 text-[0.95rem] font-semibold transition-colors",
                pathname === item.href
                  ? "border-olive text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none">
            <Avatar className="size-10 ring-2 ring-card">
              <AvatarFallback className="bg-[#cfe0a8] text-sm font-bold text-ink">
                {initials(email)}
              </AvatarFallback>
            </Avatar>
            <span className="sr-only">Account menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-56">
            <DropdownMenuLabel className="truncate font-normal text-muted-foreground">
              {email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="py-2">
              <Link href="/settings">
                <Settings /> Settings
              </Link>
            </DropdownMenuItem>
            {onShowGuide ? (
              <DropdownMenuItem className="py-2" onSelect={onShowGuide}>
                <CircleHelp /> How it works
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem asChild className="py-2">
                <Link href="/groceries#guide">
                  <CircleHelp /> How it works
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="py-2" onSelect={() => supabase.auth.signOut()}>
              <LogOut /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
