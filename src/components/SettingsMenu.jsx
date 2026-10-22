import React, { useEffect, useRef, useState } from 'react';
import { SlidersHorizontal, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { usePrefs, THEMES } from '../context/Prefs';

const Toggle = ({ on, onChange, label, Icon }) => (
  <button
    type="button"
    role="switch"
    aria-checked={on}
    onClick={() => onChange(!on)}
    className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
  >
    <span className="inline-flex items-center gap-2">
      <Icon size={16} aria-hidden /> {label}
    </span>
    <span className={`relative h-5 w-9 rounded-full transition-colors ${on ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${on ? 'left-[18px]' : 'left-0.5'}`} />
    </span>
  </button>
);

/** Popover for theme palette, visual effects and sound. */
const SettingsMenu = () => {
  const { theme, setTheme, fx, setFx, sound, setSound } = usePrefs();
  const [open, setOpen] = useState(false);
  const root = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => !root.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Appearance settings"
        aria-expanded={open}
        aria-haspopup="true"
        className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
      >
        <SlidersHorizontal size={19} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900">
          <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Theme</p>
          <div className="grid grid-cols-2 gap-2 pb-2">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                aria-pressed={theme === t.id}
                className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-sm font-medium transition ${
                  theme === t.id
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200'
                    : 'border-slate-200 text-slate-700 hover:border-indigo-300 dark:border-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="flex -space-x-1" aria-hidden>
                  {t.swatch.map((c) => (
                    <span key={c} className="h-3.5 w-3.5 rounded-full border border-white dark:border-slate-900" style={{ background: c }} />
                  ))}
                </span>
                {t.label}
              </button>
            ))}
          </div>
          <div className="border-t border-slate-200 pt-2 dark:border-slate-700">
            <Toggle on={fx} onChange={setFx} label="Visual effects" Icon={Sparkles} />
            <Toggle on={sound} onChange={setSound} label="UI sounds" Icon={sound ? Volume2 : VolumeX} />
          </div>
          <p className="px-2 pt-2 text-[11px] leading-snug text-slate-400">
            Turn effects off for a calmer, faster page. Sounds are off by default.
          </p>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;
