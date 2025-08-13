import React, { useState } from 'react';
import './index.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

const Portfolio = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const NavBar = () => (
    <nav className="flex justify-between items-center p-6 bg-white shadow-sm">
      <h1 className="text-xl font-bold text-gray-900">Aayush Sinha</h1>
      <div className="flex space-x-8">
        {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item) => (
          <button
            key={item}
            onClick={() => setCurrentPage(item.toLowerCase())}
            className={`text-sm font-medium transition-colors ${
              currentPage === item.toLowerCase()
                ? 'text-blue-500'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );














  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} />;
      case 'about': return <AboutPage />;
      case 'experience': return <ExperiencePage />;
      case 'projects': return <ProjectsPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      {renderPage()}
    </div>
  );
};

export default Portfolio;