import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ExternalLink, Github, CheckCircle, X, ArrowUpRight } from 'lucide-react';
import { getProjectMedia } from '../utils/projectAssets';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import GithubActivity from '../components/GithubActivity';
import ProjectFinder from '../components/ProjectFinder';
import { track } from '../lib/analytics';
import { SITE } from '../data/site';
import { FILTERS, PROJECTS } from '../data/projects';

const ProjectLinks = ({ live, repo, large = false }) => {
  const stop = (e) => e.stopPropagation();
  const base = large ? 'btn-secondary !py-2.5' : 'inline-flex items-center gap-1.5 text-sm font-medium transition-colors';
  return (
    <div className="flex flex-wrap items-center gap-3">
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stop}
          className={`${base} ${large ? '' : 'text-indigo-600 hover:text-indigo-500 dark:text-indigo-400'}`}
        >
          <ExternalLink size={16} /> Live demo
        </a>
      )}
      {repo && (
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stop}
          className={`${base} ${large ? '' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
        >
          <Github size={16} /> Code
        </a>
      )}
    </div>
  );
};

const Cover = ({ project, className = '' }) => {
  const { logoUrl, gallery } = getProjectMedia(project.folder);
  const shot = gallery[0]?.url;
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${project.gradient} ${className}`}>
      {shot ? (
        <img
          src={shot}
          alt={`${project.title} screenshot`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
        />
      ) : (
        logoUrl && (
          <img
            src={logoUrl}
            alt={`${project.title} logo`}
            loading="lazy"
            className="mx-auto h-full max-h-32 w-auto object-contain p-6"
          />
        )
      )}
      {shot && logoUrl && (
        <img
          src={logoUrl}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute bottom-3 left-3 h-10 w-10 rounded-lg bg-white/90 object-contain p-1 shadow-md"
        />
      )}
    </div>
  );
};

const CaseStudyModal = ({ project, onClose }) => {
  const { gallery } = getProjectMedia(project.folder);

  const dialogRef = useRef(null);

  // Lock scroll, close on Escape, trap Tab inside the dialog, and restore focus on close.
  useEffect(() => {
    const opener = document.activeElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusables = () =>
      dialogRef.current?.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [];
    focusables()[0]?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') return onClose();
      if (e.key !== 'Tab') return undefined;
      const items = focusables();
      if (!items.length) return undefined;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
      return undefined;
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      opener?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-title"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">
              Case study · {project.status}
            </p>
            <h3 id="case-title" className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        <div className="space-y-7 p-6">
          <div>
            <h4 className="mb-2 font-semibold text-slate-900 dark:text-white">Overview</h4>
            <p className="text-slate-600 dark:text-slate-400">{project.overview}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.metrics.map((m) => (
              <span
                key={m}
                className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
              >
                {m}
              </span>
            ))}
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">What I built</h4>
            <ul className="space-y-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start text-slate-600 dark:text-slate-400">
                  <CheckCircle className="mr-2.5 mt-1 shrink-0 text-indigo-500" size={16} />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">Tech stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {gallery.length > 0 && (
            <div>
              <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">Screenshots</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                {gallery.map(({ file, url }) => (
                  <img
                    key={file}
                    src={url}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 object-contain dark:border-slate-700 dark:bg-slate-800"
                  />
                ))}
              </div>
            </div>
          )}

          <ProjectLinks live={project.live} repo={project.repo} large />
        </div>
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [openId, setOpenId] = useState(null);

  const visible = useMemo(() => PROJECTS.filter((p) => filter === 'All' || p.categories.includes(filter)), [filter]);
  const openProject = PROJECTS.find((p) => p.id === openId);
  const openCase = (id) => {
    setOpenId(id);
    track('project_open', { project: id });
  };
  const closeModal = useCallback(() => setOpenId(null), []);

  // Lets the terminal, palette and voice control open a case study directly.
  useEffect(() => {
    const onOpen = (e) => {
      if (!PROJECTS.some((p) => p.id === e.detail)) return;
      setFilter('All');
      setOpenId(e.detail);
      track('project_open', { project: e.detail, source: 'command' });
    };
    window.addEventListener('open-project', onOpen);
    return () => window.removeEventListener('open-project', onOpen);
  }, []);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've built"
      subtitle="AI/ML builds and GenAI systems. Open a card for the full case study."
      alt
    >
      <ProjectFinder />

      <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              filter === f
                ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            {f}
          </button>
        ))}
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((project, i) => (
          <Reveal key={project.id} delay={i * 80}>
            <article
              role="button"
              data-tilt
              tabIndex={0}
              onClick={() => openCase(project.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openCase(project.id);
                }
              }}
              aria-label={`Open ${project.title} case study`}
              className="card card-hover group flex h-full cursor-pointer flex-col overflow-hidden"
            >
              <Cover project={project} className="h-44" />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                    <p className="text-xs text-slate-500">{project.status}</p>
                  </div>
                  <ArrowUpRight
                    className="shrink-0 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-500"
                    size={20}
                  />
                </div>
                <p className="mt-3 text-slate-600 dark:text-slate-400">{project.tagline}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.metrics.map((m) => (
                    <span
                      key={m}
                      className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 5).map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 5 && <span className="tag">+{project.tech.length - 5}</span>}
                </div>

                <div className="mt-auto pt-5">
                  <ProjectLinks live={project.live} repo={project.repo} />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-10 text-center">
        <a
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          <Github size={18} /> Browse all repositories on GitHub
        </a>
      </p>

      <GithubActivity />

      {openProject && <CaseStudyModal project={openProject} onClose={closeModal} />}
    </Section>
  );
}
