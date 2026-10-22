import React, { useEffect, useState } from 'react';
import { usePrefs } from '../context/Prefs';
import { PROJECTS } from '../data/projects';
import { sfx } from '../lib/sound';

const LINES = [
  '> initializing aayush.os  v2026.10',
  '> loading modules: rag · genai · ml · cloud ........ ok',
  `> mounting projects (${PROJECTS.length}) ........ ok`,
  '> establishing neural link ........ ok',
  '> status: ONLINE — welcome',
];
const STEP = 380;
const KEY = 'pf-booted';

const seen = () => {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
};

/** One-time-per-session boot sequence. Any key or click skips it; skipped entirely when effects are off. */
const BootScreen = () => {
  const { fx } = usePrefs();
  const [active, setActive] = useState(() => fx && !seen());
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!active) return undefined;
    sfx.boot();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timers = LINES.map((_, i) => setTimeout(() => setShown(i + 1), STEP * (i + 1)));
    const end = setTimeout(() => setLeaving(true), STEP * (LINES.length + 1));
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(end);
      document.body.style.overflow = prev;
    };
  }, [active]);

  useEffect(() => {
    if (!leaving) return undefined;
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* storage unavailable */
    }
    const done = setTimeout(() => setActive(false), 500);
    return () => clearTimeout(done);
  }, [leaving]);

  useEffect(() => {
    if (!active) return undefined;
    const skip = () => setLeaving(true);
    window.addEventListener('keydown', skip);
    return () => window.removeEventListener('keydown', skip);
  }, [active]);

  if (!active) return null;
  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      onClick={() => setLeaving(true)}
      className={`fixed inset-0 z-[200] flex cursor-pointer items-center justify-center bg-slate-950 px-6 font-mono text-sm text-indigo-300 transition-opacity duration-500 sm:text-base ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-xl">
        {LINES.slice(0, shown).map((l, i) => (
          <p key={l} className={i === LINES.length - 1 ? 'mt-2 font-bold text-fuchsia-300' : ''}>
            {l}
          </p>
        ))}
        <span className="inline-block h-4 w-2 animate-blink bg-indigo-300 align-middle" aria-hidden />
        <p className="mt-10 text-xs text-slate-500">press any key to skip</p>
      </div>
    </div>
  );
};

export default BootScreen;
