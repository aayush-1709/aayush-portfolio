import React, { useEffect, useState } from 'react';
import { Download, Menu, Moon, Search, SquareTerminal, Sun, X } from 'lucide-react';
import SettingsMenu from './SettingsMenu';
import VoiceButton from './VoiceButton';
import { NAV_ITEMS, SITE } from '../data/site';
import { track } from '../lib/analytics';

const NavBar = ({ activeSection, onNavigate, dark, onToggleTheme, onOpenPalette, onOpenTerminal, onVoiceIntent }) => {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (id) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors ${
        scrolled
          ? 'border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-950/80'
          : 'border-transparent bg-white/50 dark:bg-slate-950/50'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6" aria-label="Main">
        <button
          type="button"
          onClick={() => go('home')}
          className="font-display text-xl font-bold text-slate-900 transition-colors hover:text-indigo-500 dark:text-white"
        >
          {SITE.name}
          <span className="gradient-text">.</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => go(id)}
              aria-current={activeSection === id ? 'page' : undefined}
              className={`group relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                activeSection === id
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {label}
              <span
                className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-transform duration-300 ${
                  activeSection === id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={SITE.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('resume_download', { source: 'navbar' })}
            className="hidden items-center gap-1.5 rounded-lg border border-indigo-300 px-3 py-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-50 dark:border-indigo-500/40 dark:text-indigo-300 dark:hover:bg-indigo-500/10 sm:inline-flex"
          >
            <Download size={15} /> Resume
          </a>
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette (Ctrl or Cmd + K)"
            className="inline-flex items-center gap-2 rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Search size={19} />
            <kbd className="hidden rounded border border-slate-300 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:border-slate-600 lg:inline">⌘K</kbd>
          </button>
          <button
            type="button"
            onClick={onOpenTerminal}
            aria-label="Open terminal (press the backtick key)"
            className="hidden rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white sm:inline-flex"
          >
            <SquareTerminal size={19} />
          </button>
          <VoiceButton onIntent={onVoiceIntent} />
          <SettingsMenu />
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-slate-200 bg-white/95 transition-[max-height] duration-300 dark:border-slate-800 dark:bg-slate-950/95 md:hidden ${
          open ? 'max-h-96' : 'max-h-0 border-t-0'
        }`}
      >
        <div className="flex flex-col px-4 py-2">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              tabIndex={open ? 0 : -1}
              onClick={() => go(id)}
              className={`rounded-lg px-3 py-3 text-left text-base font-medium ${
                activeSection === id
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"
        style={{ width: `${progress}%` }}
        aria-hidden
      />
    </header>
  );
};

export default NavBar;
