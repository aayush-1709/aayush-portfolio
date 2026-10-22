import React from 'react';
import Reveal from './Reveal';
import { JOURNEY } from '../data/journey';

/** Milestone rail: a connected grid of dated cards (single column on phones). */
const JourneyTimeline = () => (
  <div className="mt-20">
    <Reveal className="mb-10 text-center">
      <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">The road so far</h3>
      <p className="mt-2 text-slate-600 dark:text-slate-400">Key moments, in order.</p>
    </Reveal>
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {JOURNEY.map((m, i) => (
        <Reveal as="li" key={m.date} delay={(i % 3) * 90}>
          <div className="card card-hover relative h-full p-5">
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-500">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-[11px] font-bold text-white" aria-hidden>
                {i + 1}
              </span>
              {m.date}
            </span>
            <h4 className="font-display text-lg font-semibold text-slate-900 dark:text-white">{m.title}</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{m.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  </div>
);

export default JourneyTimeline;
