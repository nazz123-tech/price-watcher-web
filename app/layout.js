import "./globals.css";

export const metadata = {
  title: "Price Watcher",
  description: "Get an email when your groceries are on sale.",
};

// Makes the page fit phone screens.
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
