// Public GitHub data with a 1-hour sessionStorage cache. Every function resolves to null on failure
// (offline, rate-limited at 60 requests/hour unauthenticated, ...) so callers can simply hide the UI.
import { SITE } from '../data/site';

export const USER = SITE.github.replace(/\/$/, '').split('/').pop();
const TTL = 60 * 60 * 1000;
const API = 'https://api.github.com';

const readCache = (key) => {
  try {
    const { at, data } = JSON.parse(sessionStorage.getItem(`gh:${USER}:${key}`));
    return Date.now() - at < TTL ? data : null;
  } catch {
    return null;
  }
};
const writeCache = (key, data) => {
  try {
    sessionStorage.setItem(`gh:${USER}:${key}`, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* storage unavailable */
  }
};

const cached = async (key, load) => {
  const hit = readCache(key);
  if (hit) return hit;
  try {
    const data = await load();
    writeCache(key, data);
    return data;
  } catch {
    return null;
  }
};

const getJson = async (path) => {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
};

/** Cheap synchronous peek, used to render instantly when data is already cached. */
export const peekRepos = () => readCache('repos');

export const getRepos = () =>
  cached('repos', async () => {
    const all = await getJson(`/users/${USER}/repos?sort=pushed&per_page=30`);
    return all
      .filter((r) => !r.fork)
      .map(({ id, name, html_url, description, language, stargazers_count, forks_count, pushed_at }) => ({
        id, name, html_url, description, language, stargazers_count, forks_count, pushed_at,
      }));
  });

export const getProfile = () =>
  cached('profile', async () => {
    const { public_repos, followers, following, created_at } = await getJson(`/users/${USER}`);
    return { public_repos, followers, following, created_at };
  });

/** Latest commits across the most recently pushed repos, newest first. */
export const getRecentCommits = (limit = 6) =>
  cached(`commits:${limit}`, async () => {
    const repos = (await getRepos())?.slice(0, 4) ?? [];
    if (!repos.length) throw new Error('no repos');
    const batches = await Promise.all(
      repos.map(async (r) => {
        try {
          const list = await getJson(`/repos/${USER}/${r.name}/commits?per_page=3`);
          return list.map((c) => ({
            sha: c.sha.slice(0, 7),
            url: c.html_url,
            repo: r.name,
            message: c.commit.message.split('\n')[0].slice(0, 90),
            date: c.commit.author.date,
          }));
        } catch {
          return [];
        }
      }),
    );
    const commits = batches.flat().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);
    if (!commits.length) throw new Error('no commits');
    return commits;
  });
