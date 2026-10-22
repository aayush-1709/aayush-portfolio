import React, { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import Section from '../components/Section';
import Reveal from '../components/Reveal';

const EXPERIENCE = [
  {
    role: 'AI Associate',
    company: 'Vezras',
    initials: 'VZ',
    tone: 'from-emerald-500 to-teal-500',
    period: 'June 2026 – Present',
    current: true,
    tags: ['AI'],
    bullets: [],
  },
  {
    role: 'AI Intern',
    company: 'Infinity Assurance Solutions Pvt Ltd',
    initials: 'IA',
    tone: 'from-indigo-500 to-violet-500',
    period: 'March 2026 – April 2026',
    tags: ['AI Pipelines', 'Production Integration'],
    bullets: [
      'Designed and deployed end-to-end AI pipelines, integrating intelligent components into production applications to automate workflows and enhance product capabilities.',
      'Researched and implemented AI-driven solutions, owning the full lifecycle from prototyping to application integration.',
    ],
  },
  {
    role: 'AI Intern',
    company: 'Prodigal AI',
    initials: 'PA',
    tone: 'from-fuchsia-500 to-pink-500',
    period: 'June 2025 – August 2025',
    tags: ['LLMs', 'Semantic Search', 'Vector Embeddings'],
    bullets: [
      'Built a GenAI knowledge-retrieval system using LLM, semantic search, and vector embeddings, reducing query resolution time by 50%.',
      'Designed scalable backend modules to serve document-grounded, verifiable AI responses with full traceability.',
      'Integrated AI models into existing application workflows, enabling seamless handoff between intelligent components and end-user interfaces.',
    ],
  },
  {
    role: 'Frontend Engineering Intern',
    company: 'IBM',
    initials: 'IBM',
    tone: 'from-sky-500 to-blue-600',
    period: 'June 2024 – August 2024',
    tags: ['Frontend', 'AI-powered Web App'],
    bullets: [
      'Collaborated with a team of 4 engineers on an AI-powered web application, resolving 15+ UI bugs weekly while integrating intelligent frontend components that enhanced user experience and product capability.',
    ],
  },
  {
    role: 'Diploma Engineer, Quality Department',
    company: 'Caparo Engineering India Ltd',
    initials: 'CE',
    tone: 'from-amber-500 to-orange-500',
    period: 'May 2022 – November 2022',
    tags: ['Quality', 'Manufacturing'],
    bullets: ['First job after the Diploma in Mechanical Engineering, in the Quality department of a vendor to Maruti Suzuki India Limited.'],
  },
];

/** Drives a --p (0..1) CSS var on the list and marks each role `data-lit` once the scroll line passes it. */
const useTimelineProgress = (ref) => {
  useEffect(() => {
    const list = ref.current;
    if (!list) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const box = list.getBoundingClientRect();
      const mark = window.innerHeight * 0.55; // the "reading line"
      const p = Math.min(1, Math.max(0, (mark - box.top) / box.height));
      list.style.setProperty('--p', p.toFixed(4));
      list.querySelectorAll(':scope > li').forEach((li) => {
        li.dataset.lit = li.getBoundingClientRect().top < mark ? 'true' : 'false';
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);
};

const ExperiencePage = () => {
  const listRef = useRef(null);
  useTimelineProgress(listRef);
  return (
  <Section
    id="experience"
    eyebrow="Experience"
    title="Where I've built things"
    subtitle="Building intelligent systems and production-ready applications."
  >
    <ol ref={listRef} className="relative mx-auto max-w-4xl space-y-10 border-l-2 border-slate-200 pl-8 dark:border-slate-800 sm:pl-12">
      <span
        aria-hidden
        className="timeline-line absolute -left-[2px] top-0 w-0.5 bg-gradient-to-b from-indigo-500 via-violet-500 to-fuchsia-500"
        style={{ height: 'calc(var(--p, 0) * 100%)' }}
      />
      {EXPERIENCE.map((job, i) => (
        <Reveal as="li" key={`${job.company}-${job.period}`} delay={i * 80} className="relative">
          <span
            className={`tl-node absolute -left-[58px] top-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-xs font-bold text-white shadow-lg sm:-left-[74px] sm:h-12 sm:w-12 ${job.tone}`}
            aria-hidden
          >
            {job.initials}
          </span>
          <div className="card card-hover p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">{job.role}</h3>
                <p className="font-medium text-indigo-600 dark:text-indigo-400">{job.company}</p>
                <p className="text-sm text-slate-500">{job.period}</p>
              </div>
              {job.current && (
                <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  Current
                </span>
              )}
            </div>
            {job.bullets.length > 0 && (
            <ul className="space-y-3">
              {job.bullets.map((text) => (
                <li key={text} className="flex items-start text-slate-600 dark:text-slate-400">
                  <CheckCircle className="mr-2.5 mt-1 shrink-0 text-emerald-500" size={16} />
                  {text}
                </li>
              ))}
            </ul>
            )}
            <div className={`flex flex-wrap gap-2 ${job.bullets.length > 0 ? 'mt-5' : ''}`}>
              {job.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  </Section>
  );
};

export default ExperiencePage;
