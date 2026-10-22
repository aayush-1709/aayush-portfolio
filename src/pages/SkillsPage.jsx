import React from 'react';
import { Code2, BrainCircuit, Globe, Cloud } from 'lucide-react';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import SkillConstellation from '../components/SkillConstellation';
import { SKILL_GROUPS } from '../data/skills';

// Presentation per group; the skill lists themselves live in data/skills.js.
const LOOK = {
  programming: { Icon: Code2, tone: 'from-purple-500 to-fuchsia-500' },
  ml: { Icon: BrainCircuit, tone: 'from-indigo-500 to-blue-500' },
  web: { Icon: Globe, tone: 'from-amber-500 to-orange-500' },
  cloud: { Icon: Cloud, tone: 'from-emerald-500 to-teal-500' },
};
const GROUPS = SKILL_GROUPS.map((g) => ({ ...g, ...LOOK[g.id] }));

const SkillsPage = () => (
  <Section
    id="skills"
    eyebrow="Skills"
    title="Toolbox"
    subtitle="The languages, frameworks and platforms I use to take ideas from prototype to production."
  >
    <SkillConstellation />
    <div className="grid gap-6 sm:grid-cols-2">
      {GROUPS.map(({ title, Icon, tone, skills }, i) => (
        <Reveal key={title} delay={i * 80}>
          <div className="card card-hover h-full p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className={`rounded-xl bg-gradient-to-br ${tone} p-2.5 text-white shadow-lg`}>
                <Icon size={20} />
              </span>
              <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="tag !px-3 !py-1.5 !text-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
);

export default SkillsPage;
