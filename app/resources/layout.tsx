import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Resources — Books, Journals & Hymnals",
  description:
    "SODGEM digital resources — edifying books, monthly journals, and hymnals. Proceeds support our community outreach.",
  alternates: { canonical: "/resources" },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "SODGEM Digital Resources",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Book",
        name: "Walking in Faith",
        author: { "@type": "Person", name: "Pastor John Doe" },
        description:
          "A comprehensive guide to strengthening your daily walk with God.",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Book",
        name: "Sodgem Monthly Journal - Jan",
        author: { "@type": "Organization", name: "SODGEM Editorial Team" },
        description:
          "Reflections, prayer points, and community updates for January.",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "MusicComposition",
        name: "Songs of Deliverance",
        composer: { "@type": "Organization", name: "SODGEM Choir" },
        description: "Digital lyrics and sheet music for 50 beloved hymns.",
      },
    },
  ],
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {children}
    </>
  );
}