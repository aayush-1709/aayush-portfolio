import React, { useEffect, useState } from 'react';
import { Star, GitFork, Github } from 'lucide-react';
import Reveal from './Reveal';
import { getRepos, peekRepos } from '../lib/github';

const monthYear = (iso) => new Date(iso).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });

/** Live, public GitHub data: the most recently active repos. Hides itself on any failure. */
const GithubActivity = () => {
  const [repos, setRepos] = useState(() => peekRepos()?.slice(0, 6) ?? null);

  useEffect(() => {
    let alive = true;
    getRepos().then((r) => alive && r && setRepos(r.slice(0, 6)));
    return () => {
      alive = false;
    };
  }, []);

  if (!repos?.length) return null;

  return (
    <div className="mt-16">
      {repos?.length > 0 && (
        <>
          <Reveal className="mb-6 text-center">
            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Latest on GitHub</h3>
            <p className="mt-1 text-sm text-slate-500">Live from the GitHub API · most recently active repositories</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((r, i) => (
              <Reveal key={r.id} delay={i * 60}>
                <a href={r.html_url} target="_blank" rel="noopener noreferrer" className="card card-hover flex h-full flex-col p-5">
                  <span className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                    <Github size={16} className="shrink-0 text-indigo-500" /> <span className="truncate">{r.name}</span>
                  </span>
                  <span className="mt-2 line-clamp-2 flex-1 text-sm text-slate-600 dark:text-slate-400">{r.description || 'No description yet.'}</span>
                  <span className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                    {r.language && <span className="tag">{r.language}</span>}
                    <span className="inline-flex items-center gap-1"><Star size={13} /> {r.stargazers_count}</span>
                    <span className="inline-flex items-center gap-1"><GitFork size={13} /> {r.forks_count}</span>
                    <span className="ml-auto">{monthYear(r.pushed_at)}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GithubActivity;
