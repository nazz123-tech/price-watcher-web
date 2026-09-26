import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { APP_DESCRIPTION, APP_NAME, APP_SHORT_NAME, THEME_COLOR } from "@/lib/appInfo";

// Design fonts: Space Grotesk for headings and numbers, DM Sans for everything else.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
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
