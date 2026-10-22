// Small TF-IDF + cosine-similarity engine, run entirely in the browser.
// A hand-written synonym map expands queries so "vision" can reach "CNN" or "image" documents.
const STOP = new Set('a an and are as at be but by for from has have i in into is it its of on or that the their this to was were with you your me my can do how what which who about tell show find'.split(' '));

const RAW_SYNONYMS = {
  vision: ['cnn', 'image', 'images', 'detection', 'recognition'],
  image: ['cnn', 'vision', 'recognition', 'detection'],
  retrieval: ['rag', 'embeddings', 'search', 'similarity', 'vector'],
  search: ['retrieval', 'embeddings', 'similarity', 'rag'],
  chatbot: ['assistant', 'llm', 'langchain', 'chatbot'],
  assistant: ['chatbot', 'llm', 'rag'],
  llm: ['genai', 'gemini', 'bedrock', 'langchain', 'rag'],
  genai: ['llm', 'gemini', 'bedrock', 'langchain', 'rag'],
  ai: ['genai', 'llm', 'ml', 'cnn'],
  ml: ['cnn', 'tensorflow', 'pytorch', 'keras', 'model', 'learning'],
  deep: ['cnn', 'neural', 'tensorflow', 'pytorch'],
  cloud: ['aws', 'ec2', 's3', 'bedrock', 'render', 'deployment'],
  aws: ['cloud', 'ec2', 's3', 'bedrock'],
  farming: ['crop', 'plant', 'disease', 'farmer'],
  agriculture: ['crop', 'plant', 'disease', 'farmer'],
  plant: ['crop', 'disease', 'farmer'],
  driving: ['traffic', 'adas', 'autonomous', 'sign'],
  car: ['traffic', 'adas', 'autonomous', 'driving'],
  automotive: ['traffic', 'adas', 'autonomous', 'driving'],
  frontend: ['react', 'nextjs', 'javascript', 'typescript', 'web'],
  web: ['react', 'nextjs', 'javascript', 'typescript', 'fastapi'],
  backend: ['fastapi', 'postgresql', 'python', 'api'],
  learning: ['adaptive', 'education', 'mentorship', 'skill'],
  education: ['learning', 'mentorship', 'skill', 'adaptive'],
  python: ['fastapi', 'tensorflow', 'pytorch', 'streamlit', 'langchain'],
  database: ['postgresql', 'chromadb', 'vector', 'embeddings'],
};

const stem = (w) => (w.length > 4 ? w.replace(/(ing|ed|es|s)$/, '') : w);

// Query tokens are stemmed, so the lookup keys must be too ("farming" -> "farm").
const SYNONYMS = Object.fromEntries(Object.entries(RAW_SYNONYMS).map(([k, v]) => [stem(k), v]));

export const tokenize = (text) =>
  text
    .toLowerCase()
    .replace(/next\.js/g, 'nextjs')
    .replace(/react\.js/g, 'react')
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map(stem);

const expand = (tokens) => {
  const out = new Map();
  for (const t of tokens) {
    out.set(t, Math.max(out.get(t) ?? 0, 1));
    for (const s of SYNONYMS[t] ?? []) {
      const st = stem(s);
      out.set(st, Math.max(out.get(st) ?? 0, 0.5)); // synonyms count for half
    }
  }
  return out;
};

/** Build an index from [{ id, text }]. */
export function buildIndex(docs) {
  const tokenized = docs.map((d) => ({ id: d.id, tokens: tokenize(d.text) }));
  const df = new Map();
  for (const d of tokenized) for (const t of new Set(d.tokens)) df.set(t, (df.get(t) ?? 0) + 1);
  const N = docs.length;
  const idf = (t) => Math.log((N + 1) / ((df.get(t) ?? 0) + 1)) + 1; // smoothed, always > 0

  const vectors = tokenized.map((d) => {
    const tf = new Map();
    for (const t of d.tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
    const vec = new Map();
    let norm = 0;
    for (const [t, c] of tf) {
      const v = (1 + Math.log(c)) * idf(t);
      vec.set(t, v);
      norm += v * v;
    }
    return { id: d.id, vec, norm: Math.sqrt(norm) || 1 };
  });

  return { vectors, idf, df };
}

/** Rank documents for a query. Returns [{ id, score, terms: [{ term, weight }] }] plus the query vector. */
export function search(index, query) {
  const weights = expand(tokenize(query));
  if (!weights.size) return { query: [], results: [] };

  const q = new Map();
  let qNorm = 0;
  for (const [t, w] of weights) {
    const v = w * index.idf(t);
    q.set(t, v);
    qNorm += v * v;
  }
  qNorm = Math.sqrt(qNorm) || 1;

  const results = index.vectors
    .map(({ id, vec, norm }) => {
      let dot = 0;
      const terms = [];
      for (const [t, qv] of q) {
        const dv = vec.get(t);
        if (dv) {
          dot += qv * dv;
          terms.push({ term: t, weight: qv * dv });
        }
      }
      terms.sort((a, b) => b.weight - a.weight);
      return { id, score: dot / (qNorm * norm), terms: terms.slice(0, 4) };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  const queryVec = [...q].map(([term, weight]) => ({ term, weight })).sort((a, b) => b.weight - a.weight);
  return { query: queryVec, results };
}
