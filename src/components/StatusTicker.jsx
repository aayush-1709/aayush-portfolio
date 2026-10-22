import React, { useEffect, useState } from 'react';
import { SITE } from '../data/site';

const clockFmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

const useClock = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return clockFmt.format(now);
};

const Item = ({ k, v, hot }) => (
  <span className="inline-flex items-center gap-2 whitespace-nowrap px-6">
    <span className="text-indigo-500 dark:text-indigo-400">{k}</span>
    <span className={hot ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-300'}>{v}</span>
    <span className="text-slate-300 dark:text-slate-700" aria-hidden>
      ◆
    </span>
  </span>
);

/** Monospace HUD marquee: live New Delhi clock plus a few real status facts. */
const StatusTicker = () => {
  const time = useClock();
  const items = (
    <>
      <Item k="SYS" v="ONLINE" hot />
      <Item k="LOC" v={`${SITE.location.toUpperCase()} · ${time} IST`} />
      <Item k="STATUS" v="OPEN TO AI/ML ROLES · 2026 GRAD" hot />
      <Item k="BUILDING" v="CLOUDMENTOR AI" />
      <Item k="STACK" v="PYTHON · PYTORCH · LANGCHAIN · REACT · AWS" />
      <Item k="FOCUS" v="RAG · GENAI · COMPUTER VISION" />
    </>
  );
  return (
    <div
      role="region"
      aria-label="System status"
      className="group relative overflow-hidden border-y border-slate-200 bg-white/60 py-2.5 font-mono text-xs backdrop-blur dark:border-slate-800 dark:bg-slate-950/60"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <div className="flex">{items}</div>
        <div className="flex" aria-hidden>
          {items}
        </div>
      </div>
    </div>
  );
};

export default StatusTicker;
