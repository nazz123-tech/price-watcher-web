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

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
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
  formatDetection: { telephone: false, email: false, address: false },
  appleWebApp: {
    capable: true,
    title: APP_SHORT_NAME,
    statusBarStyle: "default",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: THEME_COLOR,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      {/* Extensions like Grammarly add attributes to <body> before React loads. */}
      <body className="min-h-dvh" suppressHydrationWarning>
        {children}
        <Toaster theme="light" position="top-center" />
      </body>
    </html>
  );
}
