import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, CornerDownLeft, Github, Linkedin, Mail, FileText, Moon, Sun, Folder, Hash, SquareTerminal } from 'lucide-react';
import { NAV_ITEMS, SITE } from '../data/site';
import { PROJECTS } from '../data/projects';
import { track } from '../lib/analytics';

const CommandPalette = ({ open, onClose, onNavigate, onOpenProject, onOpenTerminal, dark, onToggleTheme }) => {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const commands = useMemo(() => {
    const ext = (url) => () => window.open(url, '_blank', 'noopener,noreferrer');
    return [
      ...NAV_ITEMS.map((n) => ({ id: `go-${n.id}`, group: 'Go to', label: n.label, Icon: Hash, run: () => onNavigate(n.id) })),
      ...PROJECTS.map((p) => ({ id: `p-${p.id}`, group: 'Projects', label: p.title, hint: p.tagline, Icon: Folder, run: () => onOpenProject(p.id) })),
      { id: 'terminal', group: 'Tools', label: 'Open terminal', hint: 'press `', Icon: SquareTerminal, run: onOpenTerminal },
      { id: 'resume', group: 'Links', label: 'Download resume (PDF)', Icon: FileText, run: () => { track('resume_download', { source: 'palette' }); ext(SITE.resumePdf)(); } },
      { id: 'github', group: 'Links', label: 'GitHub', Icon: Github, run: ext(SITE.github) },
      { id: 'linkedin', group: 'Links', label: 'LinkedIn', Icon: Linkedin, run: ext(SITE.linkedin) },
      { id: 'email', group: 'Links', label: 'Send an email', hint: SITE.email, Icon: Mail, run: () => { window.location.href = `mailto:${SITE.email}`; } },
      { id: 'theme', group: 'Preferences', label: dark ? 'Switch to light mode' : 'Switch to dark mode', Icon: dark ? Sun : Moon, run: onToggleTheme },
    ];
  }, [onNavigate, onOpenProject, onOpenTerminal, dark, onToggleTheme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => `${c.label} ${c.hint || ''} ${c.group}`.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  useEffect(() => {
    if (!open) return undefined;
    setQuery('');
    setCursor(0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  if (!open) return null;

  const run = (cmd) => {
    if (!cmd) return;
    onClose();
    setTimeout(cmd.run, 0);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(results[cursor]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-start justify-center bg-slate-950/60 px-4 pt-[15vh] backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-700">
          <Search size={18} className="text-slate-400" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a section, project or link…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            className="w-full bg-transparent py-4 text-slate-900 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-400 dark:text-white"
          />
          <kbd className="rounded border border-slate-300 px-1.5 py-0.5 text-[10px] text-slate-500 dark:border-slate-600">esc</kbd>
        </div>
        <ul id="palette-list" ref={listRef} role="listbox" className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-slate-500">No matches</li>}
          {results.map((c, i) => (
            <li key={c.id} role="option" aria-selected={i === cursor}>
              {(i === 0 || results[i - 1].group !== c.group) && (
                <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{c.group}</p>
              )}
              <button
                type="button"
                tabIndex={-1}
                onMouseMove={() => setCursor(i)}
                onClick={() => run(c)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm ${
                  i === cursor ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <c.Icon size={16} className="shrink-0" aria-hidden />
                <span className="flex-1 truncate">
                  {c.label}
                  {c.hint && <span className="ml-2 text-xs text-slate-400">{c.hint}</span>}
                </span>
                {i === cursor && <CornerDownLeft size={14} aria-hidden />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommandPalette;
