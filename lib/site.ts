/**
 * Central site configuration used across metadata, sitemap, robots, manifest
 * and structured data. Keep the canonical base URL in sync with the production
 * domain once it is finalised.
 */
export const siteConfig = {
  name: "SODGEM",
  organizationName: "Spring of Divine Grace Evangelical Mission",
  /** Canonical base URL — update to the production domain when confirmed. */
  url: "https://www.springsofdivinegrace.com",
  email: "info@springsofdivinegrace.com",
  phone: "+2348033794824",
  postalCode: "+234",
  description:
    "Experience a community where grace isn't a theory, but a Person who restores hearts, empowers minds, and awakens destiny.",
  address: {
    street: "No. 33B Simolade Street, Off Oba-Erinwole Expressway, GRA",
    city: "Sagamu",
    region: "Ogun State",
    country: "Nigeria",
    countryCode: "NG",
  },
  socials: {
    facebook: "https://www.facebook.com/sodgem",
    instagram: "https://www.instagram.com/springofdivinegrace",
    youtube: "https://www.youtube.com/@sodgem",
  },
} as const;