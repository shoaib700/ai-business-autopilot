// lib/gtag.js

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

// Standard GA4 pageview event
export const pageview = (url) => {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};
