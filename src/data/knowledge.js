import { SITE } from './site';
import { PROJECTS } from './projects';

// Facts below are lifted from the site's own sections (Experience, About, Skills).
// Update them here when those sections change.
const FACTS = [
  {
    id: 'intro',
    keys: ['who', 'about', 'intro', 'yourself', 'background'],
    text: `Aayush is an AI/ML engineer (B.Tech in AI & ML, GGSIPU Delhi, batch 2026) who builds RAG systems, GenAI products and ML models. He moved into AI from a diploma in Mechanical Engineering.`,
  },
  {
    id: 'experience',
    keys: ['experience', 'intern', 'internship', 'work', 'job', 'company', 'ibm', 'prodigal', 'infinity', 'vezras', 'caparo'],
    text: `Experience: AI Associate at Vezras (Jun 2026 – present); AI Intern at Infinity Assurance Solutions (Mar–Apr 2026, end-to-end AI pipelines in production); AI Intern at Prodigal AI (Jun–Aug 2025, GenAI retrieval that cut query resolution time by 50%); Frontend Engineering Intern at IBM (Jun–Aug 2024, AI-powered web app, 15+ UI bugs resolved weekly); earlier, Diploma Engineer in the Quality department at Caparo Engineering India Ltd (May–Nov 2022).`,
  },
  {
    id: 'skills',
    keys: ['skill', 'tech', 'stack', 'language', 'tools', 'know', 'python', 'react', 'aws', 'llm'],
    text: `Skills: Python and Java; PyTorch, TensorFlow, Scikit-learn, RAG, LangChain and LLMs; React, Next.js, FastAPI and REST APIs; MySQL, PostgreSQL, AWS, GitHub, Postman, Vercel and Render.`,
  },
  {
    id: 'awards',
    keys: ['hackathon', 'award', 'win', 'won', 'achievement', 'recognition', 'prize', 'rank', 'competition'],
    text: `Recognition: Winner of an Inter-University Hackathon (200+ teams), Finalist at India Innovates 2026 (MCD), 23rd at Google PromptWar 2.0, and Top 100 at the BYD Innovate-a-thon.`,
  },
  {
    id: 'education',
    keys: ['education', 'study', 'degree', 'college', 'university', 'btech', 'graduate', 'graduation', 'diploma'],
    text: `Education: B.Tech in AI & ML at the University School of Automation and Robotics, GGSIPU (2023 – present), and a Diploma in Mechanical Engineering from Guru Nanak Dev Institute of Technology (2019 – 2022).`,
  },
  {
    id: 'hire',
    keys: ['hire', 'hiring', 'available', 'availability', 'open', 'opportunity', 'role', 'full-time', 'fulltime'],
    text: `Aayush is open to AI/ML roles as a 2026 graduate. The best way to reach him is the contact form or ${SITE.email}.`,
  },
  {
    id: 'contact',
    keys: ['contact', 'email', 'reach', 'linkedin', 'github', 'resume', 'cv', 'location', 'where'],
    text: `Email: ${SITE.email} · Location: ${SITE.location} · GitHub: ${SITE.github} · LinkedIn: ${SITE.linkedin} · Resume (PDF): ${SITE.resumePdf}`,
  },
  ...PROJECTS.map((p) => ({
    id: `project-${p.id}`,
    keys: [p.id, p.title.toLowerCase(), ...p.title.toLowerCase().split(/\s+/), ...p.tech.map((t) => t.toLowerCase())],
    text: `${p.title} — ${p.overview} Tech: ${p.tech.join(', ')}. ${p.metrics.join(' · ')}.${p.live ? ` Live: ${p.live}.` : ''}${p.repo ? ` Code: ${p.repo}` : ''}`,
  })),
  {
    id: 'projects',
    keys: ['project', 'projects', 'built', 'build', 'portfolio', 'made'],
    text: `Projects: ${PROJECTS.map((p) => `${p.title} (${p.tagline})`).join('; ')}. Ask about any of them by name.`,
  },
];

/** All facts as one block, used as grounding context for the optional LLM endpoint. */
export const CONTEXT_TEXT = () => FACTS.map((f) => f.text).join('\n');

export const getFact = (id) => FACTS.find((f) => f.id === id)?.text;

const tokenize = (s) => s.toLowerCase().split(/[^a-z0-9+.#-]+/).filter(Boolean);

/** Keyword-overlap retrieval over FACTS. No network, no LLM. Returns { text, matched } */
export function answer(question) {
  const words = new Set(tokenize(question));
  const q = question.toLowerCase();
  const scored = FACTS.map((f) => {
    const score = f.keys.reduce((n, k) => n + (words.has(k) || q.includes(k) ? (k.length > 3 ? 2 : 1) : 0), 0);
    return { f, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) {
    return {
      matched: false,
      text: `I can only answer from what's on this site — try asking about experience, projects, skills, hackathons, education, or how to get in touch.`,
    };
  }
  return { matched: true, text: scored.slice(0, 2).map((x) => x.f.text).join('\n\n') };
}

export const SUGGESTIONS = ['What has Aayush built?', 'Tell me about his experience', 'What are his skills?', 'How can I contact him?'];
