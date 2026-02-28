import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://my-web-six-umber.vercel.app";
  const now = new Date();

  const routes = [
    "",
    "/sign-in",
    "/register",
    "/promotion",
    "/deposit",
    "/activities",
    "/compliance",
    "/compliance/privacy",
    "/compliance/terms",
    "/compliance/age-policy",
    "/compliance/responsible-gaming",
    "/compliance/aml-kyc",
    "/compliance/company-license",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
