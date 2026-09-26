"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/useSession";
import { FullPageLoading } from "@/components/PageStates";

// The start page just sends you to the right place.
export default function Home() {
  const router = useRouter();
  const { session, loading } = useSession();

  useEffect(() => {
    if (!loading) router.replace(session ? "/groceries" : "/login");
  }, [loading, session, router]);

  return <FullPageLoading />;
}
