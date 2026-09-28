import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import {
  APP_DESCRIPTION,
  APP_LONG_DESCRIPTION,
  APP_NAME,
  APP_SHORT_NAME,
  SITE_URL,
  THEME_COLOR,
} from "@/lib/appInfo";

// Design fonts: Space Grotesk for headings and numbers, DM Sans for everything else.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

// Default metadata for every page. Pages add their own title and description
// (see the metadata in each page.js or layout.js); the rest is inherited.
export const metadata = {
  // Makes relative URLs (share image, canonical links) absolute.
  metadataBase: new URL(SITE_URL),
  // A page's title "My list" becomes "My list · Price Watcher".
  title: {
    default: `${APP_NAME}: ${APP_DESCRIPTION.replace(/\.$/, "")}`,
    template: `%s · ${APP_NAME}`,
  },
  description: APP_LONG_DESCRIPTION,
  applicationName: APP_NAME,
  keywords: [
    "grocery prices",
    "Norway",
    "price alert",
    "dagligvarer",
    "matpriser",
    "REMA 1000",
    "KIWI",
    "Coop",
  ],
  category: "shopping",
  // Link previews in Messenger, Slack, iMessage, etc. The picture comes from
  // app/opengraph-image.js. Pages don't set their own openGraph: Next.js would
  // then drop this shared picture from their preview.
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: "/",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },
  // Stop iPhones from turning prices like "22,90" into phone number links.
  formatDetection: { telephone: false, email: false, address: false },
  // iPhone: open full screen from the home screen, with this name under the icon.
  // (Icons: app/apple-icon.png for iPhone, app/icon.png for the browser tab.)
  appleWebApp: {
    capable: true,
    title: APP_SHORT_NAME,
    statusBarStyle: "default",
  },
};

// Makes the page fit phone screens and colours the browser bar.
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: THEME_COLOR,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="min-h-dvh">
        {children}
        <Toaster theme="light" position="top-center" />
      </body>
    </html>
  );
}
