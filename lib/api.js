// Single source of truth for the API origin. NEXT_PUBLIC_* values are inlined
// at build time, so the same value is used by the uploader, the docs page and
// the legacy file rewrite.
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://kabox-api.akaa.dev"
).replace(/\/$/, "");
