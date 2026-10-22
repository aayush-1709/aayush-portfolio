import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './index.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import useTheme from './hooks/useTheme';
import { NAV_ITEMS } from './data/site';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';
import Testimonials from './components/Testimonials';
import CommandPalette from './components/CommandPalette';
import AskAayush from './components/AskAayush';
import Terminal from './components/Terminal';
import FxLayer from './components/FxLayer';
import BootScreen from './components/BootScreen';
import { usePrefs } from './context/Prefs';
import { SITE } from './data/site';
import { track } from './lib/analytics';

const HEADER_OFFSET = 72;

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const { dark, toggle, setDark } = useTheme();
  const { setTheme, setFx, setSound } = usePrefs();

  const scrollToSection = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }, []);

  const openProject = useCallback(
    (id) => {
      scrollToSection('projects');
      // ProjectsPage listens for this so the case study opens after the scroll starts.
      setTimeout(() => window.dispatchEvent(new CustomEvent('open-project', { detail: id })), 350);
    },
    [scrollToSection],
  );

  // Shared by the terminal and voice control.
  const actions = useMemo(
    () => ({
      go: scrollToSection,
      openProject,
      setDark,
      resume: () => {
        track('resume_download', { source: 'terminal' });
        window.open(SITE.resumePdf, '_blank', 'noopener,noreferrer');
      },
    }),
    [scrollToSection, openProject, setDark],
  );

  const onVoiceIntent = useCallback(
    ({ action, arg }) => {
      if (action === 'go') scrollToSection(arg);
      else if (action === 'terminal') setTerminalOpen(true);
      else if (action === 'palette') setPaletteOpen(true);
      else if (action === 'resume') actions.resume();
      else if (action === 'mode') setDark(arg === 'dark');
      else if (action === 'theme') setTheme(arg);
      else if (action === 'fx') setFx(arg === 'on');
      else if (action === 'sound') setSound(arg === 'on');
    },
    [scrollToSection, actions, setDark, setTheme, setFx, setSound],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '`' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const t = e.target;
        const typing = t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
        if (!typing) {
          e.preventDefault();
          setTerminalOpen((o) => !o);
        }
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((n) => n.id);

    const updateActive = () => {
      const y = window.scrollY + HEADER_OFFSET + 1;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActiveSection(current);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <NavBar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        dark={dark}
        onToggleTheme={toggle}
        onOpenPalette={() => setPaletteOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onVoiceIntent={onVoiceIntent}
      />
      <main id="main" tabIndex={-1}>
        <HomePage onViewWork={() => scrollToSection('projects')} onContact={() => scrollToSection('contact')} />
        <AboutPage />
        <ExperiencePage />
        <ProjectsPage />
        <SkillsPage />
        <Testimonials />
        <ContactPage />
      </main>
      <Footer />
      <AskAayush />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={scrollToSection}
        onOpenProject={openProject}
        onOpenTerminal={() => setTerminalOpen(true)}
        dark={dark}
        onToggleTheme={toggle}
      />
      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} actions={actions} dark={dark} />
      <FxLayer />
      <BootScreen />
    </div>
  );
};

export default Portfolio;
