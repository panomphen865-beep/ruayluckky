import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://my-web-six-umber.vercel.app";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin-login", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
