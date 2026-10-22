import React from 'react';
import Reveal from './Reveal';
import ScrambleText from './ScrambleText';

const Section = ({ id, eyebrow, title, subtitle, alt = false, children }) => (
  <section
    id={id}
    className={`scroll-mt-[72px] px-6 py-20 sm:py-28 ${
      alt ? 'bg-slate-50 dark:bg-slate-900/40' : 'bg-white dark:bg-slate-950'
    }`}
  >
    <div className="mx-auto max-w-6xl">
      <Reveal className="mb-14 text-center">
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-500">{eyebrow}</p>
        )}
        <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          {typeof title === 'string' ? <ScrambleText text={title} /> : title}
        </h2>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">{subtitle}</p>}
      </Reveal>
      {children}
    </div>
  </section>
);

export default Section;
