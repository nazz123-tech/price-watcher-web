// The groceries page is a client component, which can't export metadata,
// so its title and description live in this small layout instead.
export const metadata = {
  title: "My list",
  description: "Your watched groceries, today's best prices and what's at your target.",
  // Needs a login, so there's nothing for search engines here.
  robots: { index: false, follow: false },
};

export default function GroceriesLayout({ children }) {
  return children;
}
