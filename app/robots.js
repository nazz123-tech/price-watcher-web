import { SITE_URL } from "@/lib/appInfo";

// Served at /robots.txt. Only the public pages are worth indexing;
// everything else needs a login.
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/login", "/signup"],
      disallow: ["/groceries", "/settings"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
