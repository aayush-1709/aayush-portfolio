import React from 'react';
import { GraduationCap, Trophy, Award, Medal, Sparkles } from 'lucide-react';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import JourneyTimeline from '../components/JourneyTimeline';

// Aayush's own story (lightly proofread). LEAD is the headline, LESSON is styled as a pull-quote.
const LEAD = "From fine-tuning the chassis of vehicles to fine-tuning AI/ML models, I've come a very long way.";

const STORY = [
  "On 23rd May 2022, I completed my Diploma in Mechanical Engineering and started my first job as a Diploma Engineer in the Quality department at Caparo Engineering India Ltd, one of Maruti Suzuki India Limited's vendors. Waking up at 4:30 AM and travelling 25 KM to reach before 6:15 AM was tough, but I did it for 5 months. In the very first week, I realised this was not the place I belonged, because I couldn't see my growth in manufacturing. I was cursing my life there, and in November 2022 many people were laid off and I was one of them. I saw it as an opportunity, took the chance to get out of that place, and decided to do a B.Tech.",
  'So, in May 2023, I gave the entrance exam (Rank: 56/1902) and got admission to B.Tech in AIML at University School of Automation and Robotics (USAR), Guru Gobind Singh Indraprastha University (GGSIPU), Delhi. No clear direction, no one to tell me what to study, how to study, how to find opportunities, how to prepare for interviews, how to build a network, nothing. And when you don’t have direction, you have to create your own.',
  'I entered class for the first time on 1st September 2023, directly in 3rd semester, in a DSA lecture, without even knowing what coding was. My SGPA for 3rd semester was 5.7. Studying was hard at first because I had no coding or software background, and I had also lost some of my learning ability after not studying since COVID and then working a job. Still, I passed, and later managed an overall CGPA of 7.5.',
  'I was late, but my mindset was never behind. I tried very hard during these years to understand the fast-moving world of development and deployment. I pushed my first code to GitHub on 14th June 2024 (ML Classification, a 4th semester project), and now I have 40+ repos (not forked), including personal projects, company assignments and hackathons.',
  'Three years have passed. I won one competition, and took part in many hackathons, becoming a finalist in several but never winning one.',
  "2 unpaid internships and 1 paid internship done. I risked my early career here: I left an internship that came with a full-time offer, just to learn something useful and valuable for my career. I didn't want basic OCR as my full-time job, and I wanted to work on a valuable product. So I moved on in the middle of it with no offer in hand, and in June I joined Vezras as an AI Associate. I always wanted to work at a company with a bigger vision, and here I go.",
];

const LESSON = [
  'One major learning from these 4 years is "Comparison is the culprit". We compare ourselves with people who had every direction and support on their side even before they started. (Everyone has their own destiny.)',
  'Just remember: "There will always be someone better than you and someone worse than you. So be yourself."',
];

const CLOSING = "I don’t know exactly where this journey will take me, but I know one thing: I want to build a life I’ll be proud to remember, with no regrets.";

const ACHIEVEMENTS = [
  {
    Icon: Medal,
    rank: 'Finalist',
    title: 'India Innovates 2026',
    desc: 'Hackathon by the Municipal Corporation of Delhi',
    tone: 'from-indigo-500 to-violet-500',
  },
  {
    Icon: Award,
    rank: '23rd place',
    title: 'Google PromptWar 2.0',
    desc: 'Secured 23rd position in the competition',
    tone: 'from-sky-500 to-cyan-500',
  },
  {
    Icon: Trophy,
    rank: 'Winner',
    title: 'Inter-University Hackathon',
    desc: 'Won against 200+ competing teams',
    tone: 'from-amber-500 to-orange-500',
  },
  {
    Icon: Sparkles,
    rank: 'Top 100',
    title: 'BYD Innovate-a-thon',
    desc: 'Automotive ML innovation challenge',
    tone: 'from-emerald-500 to-teal-500',
  },
];

const EDUCATION = [
  {
    degree: 'Bachelor of Technology',
    field: 'Artificial Intelligence & Machine Learning',
    school: 'University School of Automation and Robotics, GGSIPU',
    period: '2023 - Present',
  },
  {
    degree: 'Diploma in Mechanical Engineering',
    school: 'Guru Nanak Dev Institute of Technology',
    period: '2019 - 2022',
  },
];

const AboutPage = () => (
  <Section
    id="about"
    eyebrow="About"
    title="My story"
    alt
  >
    <div className="grid items-start gap-12 lg:grid-cols-5">
      <Reveal className="lg:col-span-3">
        <p className="mb-6 font-display text-2xl font-bold leading-snug text-slate-900 dark:text-white sm:text-3xl">
          <span className="gradient-text">{LEAD}</span>
        </p>
        <div className="space-y-4 leading-relaxed text-slate-600 dark:text-slate-400">
          {STORY.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>
        <blockquote className="my-6 rounded-r-xl border-l-4 border-indigo-500 bg-indigo-50/60 px-5 py-4 italic text-slate-700 dark:bg-indigo-500/10 dark:text-slate-200">
          {LESSON.map((line) => (
            <p key={line.slice(0, 40)} className="leading-relaxed">
              {line}
            </p>
          ))}
        </blockquote>
        <p className="font-medium leading-relaxed text-slate-800 dark:text-slate-200">{CLOSING}</p>
      </Reveal>

      <Reveal delay={120} className="lg:sticky lg:top-24 lg:col-span-2">
        <div className="card p-6">
          <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-semibold text-slate-900 dark:text-white">
            <GraduationCap className="text-indigo-500" size={22} /> Education
          </h3>
          <ol className="relative space-y-6 border-l border-slate-200 pl-6 dark:border-slate-700">
            {EDUCATION.map((e) => (
              <li key={e.degree} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-indigo-500 dark:border-slate-900" />
                <h4 className="font-semibold text-slate-900 dark:text-white">{e.degree}</h4>
                {e.field && <p className="text-sm text-indigo-600 dark:text-indigo-400">{e.field}</p>}
                <p className="text-sm text-slate-600 dark:text-slate-400">{e.school}</p>
                <p className="text-xs text-slate-500">{e.period}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </div>

    <JourneyTimeline />

    <div className="mt-20">
      <Reveal className="mb-8 text-center">
        <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Recognition</h3>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Competing, building and shipping under pressure.</p>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ACHIEVEMENTS.map(({ Icon, rank, title, desc, tone }, i) => (
          <Reveal key={title} delay={i * 90}>
            <div className="card card-hover h-full p-6">
              <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${tone} p-3 text-white shadow-lg`}>
                <Icon size={22} />
              </div>
              <p className="font-display text-2xl font-bold text-slate-900 dark:text-white">{rank}</p>
              <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">{title}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </Section>
);

export default AboutPage;
