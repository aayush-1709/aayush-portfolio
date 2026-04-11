import React, { useState, useEffect, useCallback } from 'react';
import './index.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const HEADER_OFFSET = 72;

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((n) => n.id);

    const updateActive = () => {
      const y = window.scrollY + HEADER_OFFSET + 1;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) {
          current = id;
        }
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

  const NavBar = () => (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-4 sm:px-6 py-4 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <button
        type="button"
        onClick={() => scrollToSection('home')}
        className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors text-left"
      >
        Aayush Sinha
      </button>
      <div className="flex flex-wrap justify-end gap-x-4 gap-y-2 sm:gap-x-8">
        {NAV_ITEMS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollToSection(id)}
            className={`text-sm font-medium transition-colors ${
              activeSection === id
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main>
        <section id="home" className="scroll-mt-[72px]">
          <HomePage onViewWork={() => scrollToSection('projects')} />
        </section>
        <section id="about" className="scroll-mt-[72px]">
          <AboutPage />
        </section>
        <section id="experience" className="scroll-mt-[72px]">
          <ExperiencePage />
        </section>
        <section id="projects" className="scroll-mt-[72px]">
          <ProjectsPage />
        </section>
        <section id="contact" className="scroll-mt-[72px]">
          <ContactPage />
        </section>
      </main>
    </div>
  );
};

export default Portfolio;
