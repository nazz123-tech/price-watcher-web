// App name, texts and colours, shared by the metadata, the PWA manifest and the layout.
// Keep the colours in sync with --background in app/globals.css.
export const APP_NAME = "Price Watcher";
export const APP_SHORT_NAME = "Prices"; // shown under the home screen icon (keep it short)
export const APP_DESCRIPTION = "Get an email when your groceries are on sale.";
export const APP_LONG_DESCRIPTION =
  "Price Watcher checks Norwegian grocery prices every morning and emails you when milk, coffee or anything else on your list hits the price you want to pay.";
export const APP_TAGLINE = "Norwegian prices, calmer shopping";

export const THEME_COLOR = "#f4f3ee"; // browser bar / status bar
export const BACKGROUND_COLOR = "#f4f3ee"; // splash screen while the app opens

// The public address of the site, used for absolute links in metadata
// (share previews, sitemap). On Vercel it's filled in automatically;
// set NEXT_PUBLIC_SITE_URL to override (e.g. for a custom domain).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
