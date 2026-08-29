import { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

export function generateMetadata({
  title,
  description,
  path = "",
  image,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const ogImage = image || SITE_CONFIG.ogImage;

  return {
    title: title || SITE_CONFIG.name,
    description: description || SITE_CONFIG.description,
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url,
      title: title || SITE_CONFIG.name,
      description: description || SITE_CONFIG.description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || SITE_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title || SITE_CONFIG.name,
      description: description || SITE_CONFIG.description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}
