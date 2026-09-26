import { APP_DESCRIPTION, APP_NAME, APP_SHORT_NAME, BACKGROUND_COLOR, THEME_COLOR } from "@/lib/appInfo";

// PWA manifest, served at /manifest.webmanifest and linked automatically by Next.js.
// This is what makes "Add to Home Screen" open the app like a real app.
export default function manifest() {
  return {
    name: APP_NAME,
    short_name: APP_SHORT_NAME,
    description: APP_DESCRIPTION,
    start_url: "/groceries", // redirects to /login when logged out
    scope: "/",
    display: "standalone", // no browser address bar
    orientation: "portrait",
    background_color: BACKGROUND_COLOR,
    theme_color: THEME_COLOR,
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      // Same file: the glyph sits in the centre, so Android can crop it to a circle safely.
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
