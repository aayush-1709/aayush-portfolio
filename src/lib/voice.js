// Voice navigation via the browser Web Speech API (Chrome/Edge/Safari). Hidden where unsupported.
const SR = typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null;

export const voiceSupported = Boolean(SR);

const SECTIONS = {
  home: ['home', 'top', 'start'],
  about: ['about', 'who are you', 'background', 'education'],
  experience: ['experience', 'work history', 'internship', 'internships', 'career'],
  projects: ['project', 'projects', 'portfolio', 'work', 'built'],
  skills: ['skill', 'skills', 'tech stack', 'technologies', 'toolbox'],
  contact: ['contact', 'hire', 'email', 'reach'],
};
const THEME_WORDS = ['aurora', 'cyber', 'matrix', 'mono'];

/** Maps a transcript to { action, arg } or null. */
export function parseIntent(raw) {
  const t = raw.toLowerCase().trim();
  if (!t) return null;
  if (/\b(terminal|console|command line)\b/.test(t)) return { action: 'terminal' };
  if (/\b(palette|search|command menu)\b/.test(t)) return { action: 'palette' };
  if (/\b(resume|cv)\b/.test(t)) return { action: 'resume' };
  if (/\bdark\b/.test(t)) return { action: 'mode', arg: 'dark' };
  if (/\blight\b/.test(t)) return { action: 'mode', arg: 'light' };
  const theme = THEME_WORDS.find((w) => t.includes(w));
  if (theme) return { action: 'theme', arg: theme };
  if (/\b(effects?|animations?)\b/.test(t)) return { action: 'fx', arg: /\b(off|disable|stop|reduce)\b/.test(t) ? 'off' : 'on' };
  if (/\bsound\b/.test(t)) return { action: 'sound', arg: /\b(off|disable|mute)\b/.test(t) ? 'off' : 'on' };
  for (const [id, words] of Object.entries(SECTIONS)) {
    if (words.some((w) => new RegExp(`\\b${w}\\b`).test(t))) return { action: 'go', arg: id };
  }
  return null;
}

/** Starts one recognition session. Returns a stop function. */
export function listen({ onResult, onEnd, onError }) {
  const rec = new SR();
  rec.lang = 'en-US';
  rec.interimResults = false;
  rec.maxAlternatives = 3;
  rec.onresult = (e) => onResult(Array.from(e.results[0]).map((a) => a.transcript));
  rec.onerror = (e) => onError?.(e.error);
  rec.onend = () => onEnd?.();
  rec.start();
  return () => rec.stop();
}
