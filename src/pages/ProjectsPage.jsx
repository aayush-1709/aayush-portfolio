import React, { useState, useEffect, useCallback } from 'react';
import { ExternalLink, Github, CheckCircle, X, Images } from 'lucide-react';
import { getProjectMedia } from '../utils/projectAssets';

const GITHUB_PROFILE = 'https://github.com/aayush-1709';

const LINKS = {
  cloudmentor: {
    live: 'http://ec2-13-232-55-143.ap-south-1.compute.amazonaws.com/',
    repo: 'https://github.com/aayush-1709/cloud-mentor',
  },
  cropdoctor: {
    live: 'https://ai-crop-doctor-app.onrender.com/',
    repo: 'https://github.com/aayush-1709/ai-crop-disease-detection-agent',
  },
  langchain: {
    repo: 'https://github.com/aayush-1709/langchain-bot',
  },
  drivedetect: {
    live: 'https://drive-detect.onrender.com',
    repo: 'https://github.com/aayush-1709/Drive-Detect',
  },
};

/** @type {const} — `folder` must match directory name under src/assets/ */
const PROJECT_CONFIG = [
  {
    id: 'cloudmentor',
    folder: 'cloudmentor',
    cardClass: 'bg-gradient-to-br from-sky-50 to-indigo-50 border-sky-100',
    logoWrapClass: 'bg-white/80',
    accent: 'indigo',
    title: 'CloudMentor AI',
    subtitle: 'AI-Powered AWS Skill Mastery Platform',
    date: 'Feb 2026',
    tech: 'React.js · Next.js · FastAPI · PostgreSQL · AWS (S3, EC2, VPC) · Amazon Bedrock',
    bullets: [
      'Currently building an AI-driven cloud learning platform simulating real-world AWS environments with intelligent mentorship and adaptive learning paths.',
      'Designed AI-powered modules including real-time AWS console supervision, certification readiness prediction, security misconfiguration analysis, and scenario-based evaluation for personalized learning.',
      'Developed end-to-end architecture using AWS services, enabling scalable deployment, seamless API integration, and interactive dashboards for progress tracking and skill analytics.',
    ],
    links: LINKS.cloudmentor,
  },
  {
    id: 'cropdoctor',
    folder: 'cropdoctor',
    cardClass: 'bg-gradient-to-br from-yellow-50 to-orange-50 border-amber-100',
    logoWrapClass: 'bg-white/80',
    accent: 'orange',
    title: 'AI Crop Doctor',
    subtitle: 'June 2025 · repo: ai-crop-disease-detection-agent',
    date: null,
    tech: 'TensorFlow · Keras · PyTorch · CNN · Python · HTML · JS · Firebase · Gemini',
    bullets: [
      'Full-stack GenAI + vision system for plant disease detection (38 classes) on 70k+ images with 96%+ accuracy.',
      'Implemented an LLM-grounded reasoning layer for action-oriented recommendations, context-aware disease explanations, and a custom contextual chatbot to support farmers in field testing.',
    ],
    links: LINKS.cropdoctor,
  },
  {
    id: 'langchain',
    folder: 'langchain',
    cardClass: 'bg-gradient-to-br from-violet-50 to-purple-50 border-violet-100',
    logoWrapClass: 'bg-white/80',
    accent: 'violet',
    title: 'Langchain Assistant',
    subtitle: 'Jan 2026 · repo: langchain-bot',
    date: null,
    tech: 'RAG · LangChain · Bot · Data Indexing · ChromaDB',
    bullets: [
      'Built a RAG-based knowledge assistant using LangChain, with PDF, CSV, and TXT ingestion and chunking for accurate, context-aware natural language querying.',
      'Implemented ChromaDB with 10k+ embeddings and optimized similarity search, plus CLI and Streamlit interfaces for ingestion and querying, achieving sub-second responses and faster retrieval.',
    ],
    links: LINKS.langchain,
  },
  {
    id: 'drivedetect',
    folder: 'drivedetect',
    cardClass: 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100',
    logoWrapClass: 'bg-white/80',
    accent: 'emerald',
    title: 'Drive-Detect',
    subtitle: 'Pinned on GitHub — CNN-based traffic sign recognition for intelligent driving (40k+ images, high accuracy).',
    date: null,
    tech: null,
    bullets: null,
    bodyText:
      'TypeScript stack with a trained model on large traffic-sign datasets for robust recognition—suitable for ADAS and autonomous driving research. Live app on Render; open source on GitHub.',
    links: LINKS.drivedetect,
  },
];

const accentCheck = {
  indigo: 'text-indigo-500',
  orange: 'text-orange-500',
  violet: 'text-violet-500',
  emerald: 'text-emerald-500',
};

function ProjectLinks({ live, repo }) {
  const stop = (e) => e.stopPropagation();
  return (
    <div className="flex items-center gap-3 shrink-0" role="group" aria-label="Project links">
      {live ? (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stop}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          aria-label="Open live demo in new tab"
        >
          <ExternalLink size={18} className="opacity-80" />
          Live
        </a>
      ) : null}
      <a
        href={repo}
        target="_blank"
        rel="noopener noreferrer"
        onClick={stop}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="View source on GitHub"
      >
        <Github size={18} />
        Code
      </a>
    </div>
  );
}

function GalleryModal({ folder, title, onClose }) {
  const { gallery } = getProjectMedia(folder);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-gray-100 bg-white/95 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-2 min-w-0">
            <Images className="text-gray-500 shrink-0" size={22} aria-hidden />
            <h2 id="gallery-modal-title" className="text-lg font-semibold text-gray-900 truncate">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            aria-label="Close gallery"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-4 md:p-6">
          {gallery.length === 0 ? (
            <p className="text-sm text-gray-600 leading-relaxed">
              No gallery images yet. Add image files (PNG, JPG, WebP, etc.) to{' '}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">
                src/assets/{folder}/
              </code>{' '}
              besides <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">logo.png</code>. New files are picked up automatically when you save and the app reloads.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {gallery.map(({ file, url }) => (
                <figure key={file} className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                  <img src={url} alt={`${title} — ${file}`} className="w-full h-auto max-h-[min(70vh,520px)] object-contain object-center" loading="lazy" />
                  <figcaption className="px-2 py-1.5 text-xs text-gray-500 truncate">{file}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [openFolder, setOpenFolder] = useState(null);

  const openConfig = openFolder ? PROJECT_CONFIG.find((p) => p.folder === openFolder) : null;

  const closeModal = useCallback(() => setOpenFolder(null), []);

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects & Skills</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AI/ML builds and GenAI systems — repos and demos from{' '}
            <a
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium underline underline-offset-2"
            >
              github.com/aayush-1709
            </a>
          </p>
          <p className="mt-3 text-sm text-gray-500">Click a project card to open its image gallery.</p>
        </div>

        <div className="space-y-8 mb-12">
          {PROJECT_CONFIG.map((project) => {
            const { logoUrl, gallery } = getProjectMedia(project.folder);
            const hasGalleryHint = gallery.length > 0;
            const checkClass = accentCheck[project.accent] || 'text-gray-500';

            return (
              <article
                key={project.id}
                role="button"
                tabIndex={0}
                onClick={() => setOpenFolder(project.folder)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setOpenFolder(project.folder);
                  }
                }}
                className={`rounded-xl overflow-hidden shadow-lg border text-left cursor-pointer transition-shadow hover:shadow-xl hover:ring-2 hover:ring-blue-200/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${project.cardClass}`}
              >
                <div className={`flex flex-col sm:flex-row sm:items-stretch border-b border-black/5 ${project.logoWrapClass}`}>
                  <div className="flex items-center justify-center p-6 sm:w-44 md:w-52 shrink-0 border-b sm:border-b-0 sm:border-r border-black/5">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={`${project.title} logo`}
                        className="max-h-24 sm:max-h-28 w-full max-w-[180px] object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-24 w-full max-w-[160px] items-center justify-center rounded-lg bg-gray-200/80 text-3xl text-gray-500" aria-hidden>
                        ◆
                      </div>
                    )}
                  </div>
                  <div className="flex-1 px-4 py-3 sm:py-4 flex items-center justify-between gap-3 min-w-0">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                      {project.date ? <p className="text-sm text-gray-500 mt-0.5">{project.date}</p> : null}
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.subtitle}</p>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-1 shrink-0 text-xs text-gray-500">
                      <span className="inline-flex items-center gap-1">
                        <Images size={14} />
                        {hasGalleryHint ? `${gallery.length} in gallery` : 'Gallery'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <ProjectLinks live={project.links.live} repo={project.links.repo} />
                  </div>
                  {project.tech ? (
                    <p
                      className={`text-xs font-medium mb-4 ${
                        project.accent === 'indigo'
                          ? 'text-indigo-700'
                          : project.accent === 'orange'
                            ? 'text-amber-800'
                            : 'text-violet-800'
                      }`}
                    >
                      {project.tech}
                    </p>
                  ) : null}
                  {project.bullets ? (
                    <ul className="space-y-3 text-gray-700 text-sm">
                      {project.bullets.map((text, i) => (
                        <li key={`${project.id}-b-${i}`} className="flex items-start">
                          <CheckCircle className={`mr-2 mt-0.5 flex-shrink-0 ${checkClass}`} size={16} />
                          {text}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700 text-sm">{project.bodyText}</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-6 md:p-8 shadow-inner border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Technical Skills</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Programming</h4>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Java'].map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Machine Learning &amp; GenAI</h4>
              <div className="flex flex-wrap gap-2">
                {['Neural Networks', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'RAG', 'LangChain', 'LLMs'].map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Web &amp; APIs</h4>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Next.js', 'HTML', 'CSS', 'JavaScript', 'FastAPI', 'REST APIs'].map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-yellow-100 text-yellow-900 text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Database, cloud &amp; tools</h4>
              <div className="flex flex-wrap gap-2">
                {['MySQL', 'PostgreSQL', 'AWS', 'GitHub', 'JIRA', 'Postman', 'Vercel', 'Render'].map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-red-100 text-red-900 text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-gray-600">
            <a
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800"
            >
              <Github size={18} />
              Browse all repositories on GitHub
            </a>
          </p>
        </div>
      </div>

      {openFolder && openConfig ? (
        <GalleryModal folder={openFolder} title={openConfig.title} onClose={closeModal} />
      ) : null}
    </div>
  );
}
