// Single source of truth for the API origin. NEXT_PUBLIC_* values are inlined
// at build time, so the same value is used by the uploader, the docs page and
// the legacy file rewrite.
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://kabox-api.akaa.dev"
).replace(/\/$/, "");

// Origin yang dipakai browser untuk memanggil API. Default-nya origin kosong
// (same-origin) karena next.config.js me-rewrite /api dan /files ke backend.
// Keuntungannya: satu hostname saja, tanpa preflight CORS, dan tetap jalan di
// jaringan yang memblokir host API terpisah. Set
// NEXT_PUBLIC_SAME_ORIGIN_API=false untuk memanggil host API langsung.
export const API_REQUEST_BASE =
  process.env.NEXT_PUBLIC_SAME_ORIGIN_API === "false" ? API_BASE_URL : "";

const CANONICAL_WEB_ORIGIN = (
  process.env.NEXT_PUBLIC_WEB_ORIGIN || "https://kabox.akaa.dev"
).replace(/\/$/, "");

// URL media dari backend memakai host API. Kalau halaman dibuka di domain web
// kanonis, tampilkan lewat domain itu supaya tautan yang dibagikan tetap bisa
// dibuka di jaringan yang tidak bisa menjangkau host API.
export function resolveDisplayUrl(url) {
  if (!url) return url;
  if (typeof window !== "undefined" && window.location.origin === CANONICAL_WEB_ORIGIN && url.startsWith(API_BASE_URL)) {
    return `${CANONICAL_WEB_ORIGIN}${url.slice(API_BASE_URL.length)}`;
  }
  return url;
}
