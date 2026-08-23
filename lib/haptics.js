const lastTrigger = { at: 0 };

const patterns = {
  tap: 8,
  confirm: [10, 18, 12],
  success: [8, 16, 8],
  error: [14, 22, 14]
};

export function triggerHaptic(kind = "tap") {
  if (typeof navigator === "undefined" || typeof window === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  if (typeof navigator.vibrate !== "function") return;

  const now = Date.now();
  if (now - lastTrigger.at < 70) return;
  lastTrigger.at = now;

  try {
    navigator.vibrate(patterns[kind] || patterns.tap);
  } catch {
    lastTrigger.at = 0;
  }
}
