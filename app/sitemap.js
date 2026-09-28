import { SITE_URL } from "@/lib/appInfo";

// Served at /sitemap.xml: the public pages.
export default function sitemap() {
  return [
    { url: `${SITE_URL}/login`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/signup`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
