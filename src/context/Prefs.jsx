/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export const THEMES = [
  { id: 'aurora', label: 'Aurora', swatch: ['#6366f1', '#8b5cf6', '#d946ef'] },
  { id: 'cyber', label: 'Cyber', swatch: ['#06b6d4', '#a855f7', '#ec4899'] },
  { id: 'matrix', label: 'Matrix', swatch: ['#22c55e', '#10b981', '#84cc16'] },
  { id: 'mono', label: 'Mono', swatch: ['#64748b', '#71717a', '#737373'] },
];

const Ctx = createContext(null);

const read = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : JSON.parse(v);
  } catch {
    return fallback;
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
};

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

/** Visual theme, effects on/off and sound on/off. Effects default to off for reduced-motion users; sound is always opt-in. */
export function PrefsProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const t = read('pf-theme', 'aurora');
    return THEMES.some((x) => x.id === t) ? t : 'aurora';
  });
  const [fx, setFx] = useState(() => read('pf-fx', !prefersReducedMotion()));
  const [sound, setSound] = useState(() => read('pf-sound', false));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    write('pf-theme', theme);
  }, [theme]);
  useEffect(() => {
    document.documentElement.dataset.fx = fx ? 'on' : 'off';
    write('pf-fx', fx);
  }, [fx]);
  useEffect(() => write('pf-sound', sound), [sound]);

  const setTheme = useCallback((id) => THEMES.some((t) => t.id === id) && setThemeState(id), []);

  const value = useMemo(() => ({ theme, setTheme, fx, setFx, sound, setSound }), [theme, setTheme, fx, sound]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const usePrefs = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('usePrefs must be used inside <PrefsProvider>');
  return v;
};
