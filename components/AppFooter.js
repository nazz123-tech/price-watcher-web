import { APP_NAME } from "@/lib/appInfo";

// Page footer with the credit to Kassalapp, whose free API gives us the prices.
export default function AppFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          Prices from{" "}
          <a
            href="https://kassal.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground underline decoration-olive/50 underline-offset-4 hover:decoration-olive"
          >
            Kassalapp
          </a>
          , checked every morning.
        </p>
        <p>{APP_NAME} · Prices can differ in your local store.</p>
      </div>
    </footer>
  );
}
