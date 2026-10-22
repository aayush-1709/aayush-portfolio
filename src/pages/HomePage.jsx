import React from 'react';
import { Mail, Linkedin, Github, Download, Rocket, Code, Hammer, MapPin } from 'lucide-react';
import TypedText from '../components/TypedText';
import CountUp from '../components/CountUp';
import NeuralCanvas from '../components/NeuralCanvas';
import StatusTicker from '../components/StatusTicker';
import { track } from '../lib/analytics';
import { SITE } from '../data/site';

const ROLES = ['Generative AI Engineer', 'RAG Systems Builder', 'Machine Learning Engineer', 'Hackathon Winner'];

const STATS = [
  { value: '3', label: 'AI & engineering internships' },
  { value: '4', label: 'Hackathon recognitions' },
  { value: '96%+', label: 'Disease-detection accuracy' },
  { value: '50%', label: 'Faster query resolution' },
];

const SOCIALS = [
  { href: `mailto:${SITE.email}`, label: 'Email', Icon: Mail },
  { href: SITE.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: SITE.github, label: 'GitHub', Icon: Github },
  { href: SITE.leetcode, label: 'LeetCode', Icon: Code },
];

const HomePage = ({ onViewWork, onContact }) => (
  <section id="home" className="relative scroll-mt-[72px] overflow-hidden bg-white dark:bg-slate-950">
    <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
    <NeuralCanvas />
    <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 animate-float rounded-full bg-indigo-500/25 blur-3xl" aria-hidden />
    <div className="pointer-events-none absolute -right-20 top-1/3 h-80 w-80 animate-float-slow rounded-full bg-fuchsia-500/20 blur-3xl" aria-hidden />

    <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.3fr_1fr]">
      <div className="animate-fade-up text-center lg:text-left">
        <div className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 lg:justify-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to AI/ML roles · 2026 graduate
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
            <Hammer size={12} /> Currently building CloudMentor AI
          </span>
        </div>

        <h1 className="font-display text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
          Hi, I'm <span className="gradient-text">Aayush Sinha</span>
        </h1>
        <p className="mt-4 h-9 font-display text-xl font-medium text-slate-700 dark:text-slate-200 sm:text-2xl">
          <TypedText words={ROLES} />
        </p>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 lg:mx-0">
          I build retrieval systems, GenAI products and ML models that ship in the real world, turning raw data into
          decisions that matter.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
          <button type="button" onClick={onViewWork} className="btn-primary">
            <Rocket size={18} /> View My Work
          </button>
          <a
            href={SITE.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('resume_download', { source: 'hero' })}
            className="btn-secondary"
          >
            <Download size={18} /> Download Resume
          </a>
          <button
            type="button"
            onClick={onContact}
            className="text-sm font-semibold text-slate-600 underline-offset-4 hover:text-indigo-500 hover:underline dark:text-slate-300"
          >
            Let's talk →
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-xl border border-slate-200 bg-white/70 p-2.5 text-slate-500 backdrop-blur transition hover:-translate-y-0.5 hover:border-indigo-400 hover:text-indigo-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-400"
            >
              <Icon size={20} />
            </a>
          ))}
          <span className="ml-2 hidden items-center gap-1 text-sm text-slate-500 dark:text-slate-400 sm:inline-flex">
            <MapPin size={14} /> {SITE.location}
          </span>
        </div>
      </div>

      <div className="animate-fade-up justify-self-center" style={{ animationDelay: '150ms' }}>
        <div className="relative">
          <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-indigo-500 via-violet-500 to-fuchsia-500 opacity-70 blur-xl" aria-hidden />
          <div className="relative h-64 w-64 overflow-hidden rounded-full bg-gradient-to-tr from-indigo-500 via-violet-500 to-fuchsia-500 p-1 sm:h-80 sm:w-80">
            <picture>
              <source srcSet="/aayush.webp" type="image/webp" />
              <img
                src="/aayush.jpg"
                alt="Portrait of Aayush Sinha"
                className="h-full w-full rounded-full border-4 border-white object-cover dark:border-slate-950"
                width="320"
                height="320"
                fetchPriority="high"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>

    <div className="relative mx-auto -mt-4 max-w-6xl px-6 pb-16">
      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map(({ value, label }) => (
          <div key={label} className="card p-5 text-center backdrop-blur">
            <dt className="sr-only">{label}</dt>
            <dd>
              <span className="gradient-text font-display text-3xl font-bold sm:text-4xl">
                <CountUp value={value} />
              </span>
              <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400 sm:text-sm" aria-hidden>
                {label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
    <StatusTicker />
  </section>
);

export default HomePage;
