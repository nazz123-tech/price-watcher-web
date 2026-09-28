import Link from "next/link";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Page not found",
};

// Shown for any address that doesn't exist.
export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-12 text-center">
      <Logo showTagline={false} className="mb-10" />
      <p className="eyebrow text-olive">404</p>
      <h1 className="mt-3 font-heading text-5xl leading-[0.95] font-bold tracking-[-0.04em]">
        Nothing on
        <br />
        <span className="text-olive">this shelf.</span>
      </h1>
      <p className="mt-4 max-w-sm text-lg text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Button asChild variant="glow" size="lg" className="mt-8 h-12 px-6 text-base font-semibold">
        <Link href="/groceries">Back to my list</Link>
      </Button>
    </main>
  );
}
