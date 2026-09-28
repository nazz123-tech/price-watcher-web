// The settings page is a client component, which can't export metadata,
// so its title and description live in this small layout instead.
export const metadata = {
  title: "Settings",
  description: "Turn Price Watcher's morning price alerts on or off and manage your account.",
  // Needs a login, so there's nothing for search engines here.
  robots: { index: false, follow: false },
};

export default function SettingsLayout({ children }) {
  return children;
}
