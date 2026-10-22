import React, { useMemo, useState } from 'react';
import { Search, ChevronDown, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { buildIndex, search } from '../lib/tfidf';
import { track } from '../lib/analytics';
import Reveal from './Reveal';

const EXAMPLES = ['computer vision for farming', 'chatbot over my documents', 'something on AWS cloud', 'traffic signs and autonomous driving'];

const docs = PROJECTS.map((p) => ({
  id: p.id,
  text: [p.title, p.tagline, p.overview, ...p.highlights, ...p.tech, ...p.categories].join(' '),
}));

/**
 * Live demo of the retrieval idea behind Aayush's RAG work: describe what you want and the
 * projects are ranked by TF-IDF cosine similarity, computed right here in the browser.
 */
const ProjectFinder = () => {
  const index = useMemo(() => buildIndex(docs), []);
  const [query, setQuery] = useState('');
  const [showVec, setShowVec] = useState(false);

  const { query: qVec, results } = useMemo(() => search(index, query), [index, query]);
  const top = results[0]?.score || 1;
  const byId = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));

  const run = (q) => {
    setQuery(q);
    if (q.trim()) track('project_finder', { q: q.slice(0, 60) });
  };

  const open = (id) => window.dispatchEvent(new CustomEvent('open-project', { detail: id }));

  return (
    <Reveal className="mb-10">
      <div className="card p-5 sm:p-6">
        <div className="mb-1 flex items-center justify-between gap-3">
          <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Try it: find a project by meaning</h3>
          <span className="tag hidden sm:inline">TF-IDF · runs in your browser</span>
        </div>
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
          Describe what you're looking for. Projects are ranked by cosine similarity between vectors built from their text. It's the
          same retrieval idea behind my RAG work, minus the LLM.
        </p>

        <div className="relative">
          <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => query.trim() && track('project_finder', { q: query.slice(0, 60) })}
            placeholder="e.g. computer vision for farming"
            aria-label="Describe the kind of project you want to find"
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => run(ex)}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:text-indigo-300"
            >
              {ex}
            </button>
          ))}
        </div>

        {query.trim() && (
          <div className="mt-5" aria-live="polite">
            {results.length === 0 ? (
              <p className="text-sm text-slate-500">No project is similar enough. Try words like “vision”, “chatbot”, “cloud” or “React”.</p>
            ) : (
              <ul className="space-y-2">
                {results.map((r) => {
                  const p = byId[r.id];
                  const pct = Math.round((r.score / top) * 100);
                  return (
                    <li key={r.id}>
                      <button
                        type="button"
                        onClick={() => open(r.id)}
                        className="group w-full rounded-xl border border-slate-200 p-3 text-left transition hover:border-indigo-400 dark:border-slate-700"
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="font-semibold text-slate-900 dark:text-white">{p.title}</span>
                          <span className="inline-flex items-center gap-2 font-mono text-xs text-slate-500">
                            sim {r.score.toFixed(2)}
                            <ArrowUpRight size={14} className="transition group-hover:text-indigo-500" aria-hidden />
                          </span>
                        </span>
                        <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800" aria-hidden>
                          <span className="block h-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-all duration-500" style={{ width: `${pct}%` }} />
                        </span>
                        <span className="mt-2 flex flex-wrap gap-1.5">
                          {r.terms.map((t) => (
                            <span key={t.term} className="tag !py-0.5 font-mono">
                              {t.term}
                            </span>
                          ))}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            {qVec.length > 0 && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setShowVec((v) => !v)}
                  aria-expanded={showVec}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400"
                >
                  How was this ranked? <ChevronDown size={14} className={`transition ${showVec ? 'rotate-180' : ''}`} />
                </button>
                {showVec && (
                  <div className="mt-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
                    <p className="mb-2">
                      Your query becomes a weighted term vector (stemmed words, plus related terms at half weight). Each project is
                      scored by cosine similarity with it. Heavier terms are rarer across projects.
                    </p>
                    <p className="flex flex-wrap gap-1.5 font-mono">
                      {qVec.slice(0, 14).map((t) => (
                        <span key={t.term} className="rounded bg-white px-1.5 py-0.5 dark:bg-slate-900">
                          {t.term} <span className="text-indigo-500">{t.weight.toFixed(2)}</span>
                        </span>
                      ))}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Reveal>
  );
};

export default ProjectFinder;
