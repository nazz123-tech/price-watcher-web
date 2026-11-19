import { SITE_URL } from "@/lib/appInfo";

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
