// Tiny WebAudio synth for UI sounds. Silent unless enabled, and the AudioContext is
// only created after the first call (which always follows a user gesture when enabled).
let enabled = false;
let ctx = null;

export const setSoundEnabled = (on) => {
  enabled = on;
};

const getCtx = () => {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
};

const tone = ({ freq, to = freq, dur = 0.08, type = 'sine', vol = 0.04, at = 0 }) => {
  if (!enabled) return;
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime + at;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  osc.frequency.exponentialRampToValueAtTime(Math.max(to, 1), t0 + dur);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
};

export const sfx = {
  hover: () => tone({ freq: 1200, to: 1500, dur: 0.035, vol: 0.012 }),
  click: () => tone({ freq: 600, to: 340, dur: 0.09, type: 'triangle', vol: 0.04 }),
  key: () => tone({ freq: 900 + Math.random() * 200, dur: 0.025, type: 'square', vol: 0.008 }),
  open: () => {
    tone({ freq: 400, to: 800, dur: 0.12, type: 'sine', vol: 0.04 });
    tone({ freq: 800, to: 1200, dur: 0.12, type: 'sine', vol: 0.03, at: 0.08 });
  },
  boot: () => [0, 1, 2].forEach((i) => tone({ freq: 330 * 2 ** (i / 3), to: 330 * 2 ** ((i + 1) / 3), dur: 0.14, type: 'sawtooth', vol: 0.018, at: i * 0.12 })),
};
