const contexts = new WeakMap();

const soundProfiles = {
  tap: { frequency: 560, endFrequency: 720, duration: 0.045, volume: 0.025, type: "sine" },
  confirm: { frequency: 430, endFrequency: 680, duration: 0.075, volume: 0.03, type: "sine" },
  success: { frequency: 520, endFrequency: 820, duration: 0.11, volume: 0.035, type: "sine" },
  error: { frequency: 220, endFrequency: 170, duration: 0.09, volume: 0.022, type: "triangle" }
};

function getAudioContext() {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!contexts.has(window)) contexts.set(window, new AudioContextClass());
  return contexts.get(window);
}

function playTone(context, profile, delay = 0) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const start = context.currentTime + delay;
  const finish = start + profile.duration;

  oscillator.type = profile.type;
  oscillator.frequency.setValueAtTime(profile.frequency, start);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, profile.endFrequency), finish);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(profile.volume, start + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, finish);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(finish + 0.012);
}

export function playMicroSound(kind = "tap") {
  if (typeof window === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const context = getAudioContext();
  if (!context) return;
  const profile = soundProfiles[kind] || soundProfiles.tap;
  const resume = context.state === "suspended" ? context.resume() : Promise.resolve();

  resume.then(() => {
    playTone(context, profile);
    if (kind === "success") playTone(context, { ...profile, frequency: 760, endFrequency: 1040, duration: 0.08, volume: 0.022 }, 0.065);
  }).catch(() => {});
}
