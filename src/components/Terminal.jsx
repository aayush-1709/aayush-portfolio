import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { usePrefs, THEMES } from '../context/Prefs';
import { NAV_ITEMS, SITE } from '../data/site';
import { PROJECTS } from '../data/projects';
import { answer, getFact } from '../data/knowledge';
import { sfx } from '../lib/sound';
import { track } from '../lib/analytics';
import Linkified from './Linkified';
import { getProfile, getRecentCommits, getRepos } from '../lib/github';

const SECTION_IDS = NAV_ITEMS.map((n) => n.id);
const PROJECT_IDS = PROJECTS.map((p) => p.id);
const CAT_TARGETS = ['about', 'experience', 'skills', 'education', 'awards', 'contact', ...PROJECT_IDS];
const CAT_FACT = { about: 'intro', experience: 'experience', skills: 'skills', education: 'education', awards: 'awards', contact: 'contact' };
const THEME_IDS = THEMES.map((t) => t.id);
const ONOFF = ['on', 'off'];

const COMMANDS = ['help', 'whoami', 'ls', 'cat', 'open', 'theme', 'mode', 'fx', 'sound', 'ask', 'neofetch', 'stats', 'git', 'history', 'date', 'echo', 'clear', 'exit'];

const OFFLINE = 'GitHub API unavailable right now (offline or rate-limited). Try again in a bit.';

const HELP = `Commands
  help                 show this list
  whoami               who is Aayush
  ls [projects]        list sections or projects
  cat <name>           read about | experience | skills | education | awards | contact | <project>
  open <target>        go to a section or project, or: resume | github | linkedin | email
  ask <question>       ask the portfolio assistant
  theme <name|list>    ${THEME_IDS.join(' | ')}
  mode <dark|light>    colour mode
  fx <on|off>          visual effects
  sound <on|off>       UI sounds
  neofetch             system info
  stats                live GitHub numbers
  git log              latest commits across recent repos
  history | date | echo | clear | exit

Tip: Tab completes, ↑/↓ browse history.`;

const BANNER = `   ___                      __
  / _ | ___ ___ ___ __ __  / /
 / __ |/ _ \`/ // (_-</ // / / _ \\
/_/ |_|\\_,_/\\_, /___/\\_,_/_//_/
           /___/   portfolio shell v2026`;

const pad = (s, n) => s.padEnd(n, ' ');

const Terminal = ({ open, onClose, actions, dark }) => {
  const { theme, setTheme, fx, setFx, sound, setSound } = usePrefs();
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const history = useRef([]);
  const cursor = useRef(-1);
  const inputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    setLines((l) => (l.length ? l : [{ kind: 'banner', text: BANNER }, { kind: 'out', text: "Welcome. Type 'help' to see what I can do." }]));
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [lines, open]);

  if (!open) return null;

  const leave = (delay = 350) => setTimeout(onClose, delay);

  const exec = (raw) => {
    const [cmd = '', ...args] = raw.trim().split(/\s+/);
    const arg = args[0]?.toLowerCase();
    const out = (text, kind = 'out') => [{ kind, text }];

    switch (cmd.toLowerCase()) {
      case '':
        return [];
      case 'help':
        return out(HELP);
      case 'whoami':
        return out(getFact('intro'));
      case 'ls':
        if (arg === 'projects') return out(PROJECTS.map((p) => `${pad(p.id, 14)} ${p.tagline}`).join('\n'));
        return out(`${SECTION_IDS.map((s) => `${s}/`).join('  ')}  resume.pdf\n\ntry: ls projects`);
      case 'cat': {
        if (!arg) return out('usage: cat <name>   (try: cat about)', 'err');
        if (CAT_FACT[arg]) return out(getFact(CAT_FACT[arg]));
        if (PROJECT_IDS.includes(arg)) return out(getFact(`project-${arg}`));
        return out(`cat: ${arg}: No such file`, 'err');
      }
      case 'open': {
        if (!arg) return out('usage: open <section|project|resume|github|linkedin|email>', 'err');
        if (SECTION_IDS.includes(arg)) {
          actions.go(arg);
          leave();
          return out(`navigating → ${arg}`);
        }
        if (PROJECT_IDS.includes(arg)) {
          actions.openProject(arg);
          leave();
          return out(`opening case study → ${arg}`);
        }
        if (arg === 'resume') {
          actions.resume();
          return out('opening resume…');
        }
        if (arg === 'github' || arg === 'linkedin') {
          window.open(SITE[arg], '_blank', 'noopener,noreferrer');
          return out(`opening ${arg}…`);
        }
        if (arg === 'email') {
          window.location.href = `mailto:${SITE.email}`;
          return out(`composing mail to ${SITE.email}…`);
        }
        return out(`open: ${arg}: not found`, 'err');
      }
      case 'theme':
        if (!arg || arg === 'list') return out(`current: ${theme}\navailable: ${THEME_IDS.join(', ')}\nusage: theme <name>`);
        if (!THEME_IDS.includes(arg)) return out(`theme: unknown theme '${arg}'`, 'err');
        setTheme(arg);
        return out(`theme set → ${arg}`);
      case 'mode':
        if (arg !== 'dark' && arg !== 'light') return out(`current: ${dark ? 'dark' : 'light'}\nusage: mode <dark|light>`);
        actions.setDark(arg === 'dark');
        return out(`mode set → ${arg}`);
      case 'fx':
        if (!ONOFF.includes(arg)) return out(`effects are ${fx ? 'on' : 'off'}\nusage: fx <on|off>`);
        setFx(arg === 'on');
        return out(`effects → ${arg}`);
      case 'sound':
        if (!ONOFF.includes(arg)) return out(`sound is ${sound ? 'on' : 'off'}\nusage: sound <on|off>`);
        setSound(arg === 'on');
        return out(`sound → ${arg}`);
      case 'ask':
        return args.length ? out(answer(args.join(' ')).text) : out('usage: ask <question>', 'err');
      case 'neofetch':
        return out(
          [
            'aayush@portfolio',
            '----------------',
            `${pad('OS', 10)} AayushOS 2026`,
            `${pad('Role', 10)} AI/ML & GenAI Engineer`,
            `${pad('Edu', 10)} B.Tech AI & ML, GGSIPU (2026)`,
            `${pad('Shell', 10)} portfolio-sh`,
            `${pad('Projects', 10)} ${PROJECTS.length}`,
            `${pad('Stack', 10)} Python, PyTorch, LangChain, React, AWS`,
            `${pad('Theme', 10)} ${theme} (${dark ? 'dark' : 'light'}) · fx ${fx ? 'on' : 'off'}`,
            `${pad('Location', 10)} ${SITE.location}`,
          ].join('\n'),
        );
      case 'stats':
        return Promise.all([getProfile(), getRepos()]).then(([profile, repos]) => {
          if (!profile || !repos) return out(OFFLINE, 'err');
          const langs = {};
          repos.forEach((r) => r.language && (langs[r.language] = (langs[r.language] || 0) + 1));
          const top = Object.entries(langs).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([l, n]) => `${l} (${n})`).join(', ');
          const stars = repos.reduce((n, r) => n + r.stargazers_count, 0);
          return out(
            [
              `${pad('Repos', 12)} ${profile.public_repos} public`,
              `${pad('Followers', 12)} ${profile.followers}`,
              `${pad('Stars', 12)} ${stars} across recent repos`,
              `${pad('Top langs', 12)} ${top || 'n/a'}`,
              `${pad('On GitHub', 12)} since ${new Date(profile.created_at).getFullYear()}`,
            ].join('\n'),
          );
        });
      case 'git':
        if (arg !== 'log') return out("usage: git log   (the only git command this shell knows)", 'err');
        return getRecentCommits(8).then((commits) =>
          commits ? out(commits.map((c) => `${c.sha}  ${new Date(c.date).toISOString().slice(0, 10)}  ${pad(c.repo, 18)} ${c.message}`).join('\n')) : out(OFFLINE, 'err'),
        );
      case 'history':
        return out(history.current.length ? history.current.map((h, i) => `${String(i + 1).padStart(3)}  ${h}`).join('\n') : 'no history yet');
      case 'date':
        return out(new Date().toString());
      case 'echo':
        return out(args.join(' '));
      case 'clear':
        return 'CLEAR';
      case 'exit':
      case 'quit':
        leave(120);
        return out('bye 👋');
      case 'sudo':
        if (args.join(' ').toLowerCase() === 'hire aayush') {
          actions.go('contact');
          leave(900);
          return out('[sudo] permission granted. excellent decision.\nrouting you to the contact form…');
        }
        return out('user is not in the sudoers file. This incident will be reported.', 'err');
      case 'rm':
        return out("nice try. this portfolio is read-only.", 'err');
      default:
        return out(`${cmd}: command not found. Type 'help'.`, 'err');
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const raw = input;
    setInput('');
    cursor.current = -1;
    if (raw.trim()) {
      history.current.push(raw.trim());
      track('terminal_command', { cmd: raw.trim().split(/\s+/)[0].toLowerCase().slice(0, 20) });
    }
    const result = exec(raw);
    if (result === 'CLEAR') setLines([]);
    else if (result instanceof Promise) {
      // Async commands (GitHub lookups) show a placeholder that is swapped for the real output.
      const pendingId = `p${Date.now()}`;
      setLines((l) => [...l, { kind: 'in', text: raw }, { kind: 'out', text: 'fetching from GitHub…', id: pendingId }]);
      result.then((out) => setLines((l) => l.flatMap((line) => (line.id === pendingId ? out : [line]))));
    } else setLines((l) => [...l, { kind: 'in', text: raw }, ...result]);
  };

  const complete = () => {
    const parts = input.split(/\s+/);
    const last = parts[parts.length - 1].toLowerCase();
    let pool = COMMANDS;
    if (parts.length > 1) {
      const c = parts[0].toLowerCase();
      pool = { git: ['log'], cat: CAT_TARGETS, open: [...SECTION_IDS, ...PROJECT_IDS, 'resume', 'github', 'linkedin', 'email'], theme: THEME_IDS, mode: ['dark', 'light'], fx: ONOFF, sound: ONOFF, ls: ['projects'] }[c] || [];
    }
    const hits = pool.filter((p) => p.startsWith(last));
    if (hits.length === 1) setInput([...parts.slice(0, -1), hits[0]].join(' ') + ' ');
    else if (hits.length > 1) setLines((l) => [...l, { kind: 'in', text: input }, { kind: 'out', text: hits.join('  ') }]);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'Tab') {
      e.preventDefault();
      complete();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.current.length) return;
      cursor.current = cursor.current < 0 ? history.current.length - 1 : Math.max(0, cursor.current - 1);
      setInput(history.current[cursor.current]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cursor.current < 0) return;
      cursor.current += 1;
      if (cursor.current >= history.current.length) {
        cursor.current = -1;
        setInput('');
      } else setInput(history.current[cursor.current]);
    } else if (e.key.length === 1) sfx.key();
  };

  return (
    <div
      className="fixed inset-0 z-[115] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Terminal"
      onClick={onClose}
    >
      <div
        className="flex h-[70vh] max-h-[640px] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-indigo-500/40 bg-slate-950/95 font-mono text-[13px] text-slate-200 shadow-2xl shadow-indigo-500/20 sm:text-sm"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
        }}
      >
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2">
          <div className="flex items-center gap-2" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs text-slate-400">aayush@portfolio: ~</span>
          <button type="button" onClick={onClose} aria-label="Close terminal" className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white">
            <X size={16} />
          </button>
        </div>

        <div className="term-scroll flex-1 overflow-y-auto px-4 py-3" aria-live="polite">
          {lines.map((l, i) => (
            <pre
              key={i}
              className={`whitespace-pre-wrap break-words font-mono leading-relaxed ${
                l.kind === 'in' ? 'text-indigo-300' : l.kind === 'err' ? 'text-red-400' : l.kind === 'banner' ? 'text-fuchsia-300' : 'text-slate-300'
              }`}
            >
              {l.kind === 'in' ? <span className="text-emerald-400">$ </span> : null}
              {l.kind === 'out' ? <Linkified text={l.text} /> : l.text}
            </pre>
          ))}
          <div ref={endRef} />
        </div>

        <form onSubmit={submit} className="flex items-center gap-2 border-t border-slate-800 px-4 py-3">
          <span className="text-emerald-400" aria-hidden>
            $
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Terminal input"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-slate-100 caret-indigo-400 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="type a command…"
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
