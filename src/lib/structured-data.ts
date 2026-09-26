import { PLANS } from "@/config/pricing";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { WHATSAPP_PHONE_E164 } from "@/lib/site-links";

export const CONTACT_EMAIL = "taviorders@gmail.com";

export const SOCIAL_PROFILES = [
  "https://www.instagram.com/taviorders",
  "https://www.facebook.com/profile.php?id=61592854388655",
  "https://www.tiktok.com/@taviorders",
];

const ORG_ID = `${SITE_URL}/#organization`;

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  alternateName: ["Tavi Orders", "TAVI"],
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/tavi-logo.png`,
  email: CONTACT_EMAIL,
  sameAs: SOCIAL_PROFILES,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cúcuta",
    addressRegion: "Norte de Santander",
    addressCountry: "CO",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: `+${WHATSAPP_PHONE_E164}`,
    email: CONTACT_EMAIL,
    areaServed: "CO",
    availableLanguage: ["es"],
  },
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: "es-CO",
  publisher: { "@id": ORG_ID },
};

/** Una oferta por plan (precio mensual, IVA incluido), tomada de la config real de precios. */
export const softwareApplicationLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "TAVI Orders — Software para restaurantes",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Sistema POS para restaurantes",
  operatingSystem: "Web, Android, iOS, Windows, macOS",
  url: `${SITE_URL}/`,
  inLanguage: "es-CO",
  publisher: { "@id": ORG_ID },
  description:
    "Software para restaurantes en Colombia: sistema POS, menú digital con pedidos por QR, pantallas de cocina (KDS), inventario y recetas, tarjetas de fidelización y facturación electrónica DIAN.",
  offers: PLANS.map((plan) => ({
    "@type": "Offer",
    name: `Plan ${plan.name}`,
    price: String(plan.monthly),
    priceCurrency: "COP",
    url: `${SITE_URL}/precios`,
    availability: "https://schema.org/InStock",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: String(plan.monthly),
      priceCurrency: "COP",
      unitCode: "MON",
      valueAddedTaxIncluded: true,
    },
  })),
};

export function faqPageLd(faqs: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}
