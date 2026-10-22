import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { SITE } from '../data/site';

const Footer = () => (
  <footer className="border-t border-slate-200 bg-white px-6 py-10 dark:border-slate-800 dark:bg-slate-950">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} {SITE.name}. Built with React, Vite &amp; Tailwind.
      </p>
      <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
        <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-indigo-500">
          <Github size={20} />
        </a>
        <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-indigo-500">
          <Linkedin size={20} />
        </a>
        <a href={`mailto:${SITE.email}`} aria-label="Email" className="hover:text-indigo-500">
          <Mail size={20} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
