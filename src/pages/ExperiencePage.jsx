import React from 'react';
import { Target, CheckCircle, Zap } from 'lucide-react';

const ExperiencePage = () => (
  <div className="min-h-screen bg-gray-50 px-6 py-12">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h1>
        <p className="text-lg text-gray-600">My journey in building intelligent systems and web applications</p>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-8 border-l-4 border-blue-500">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">AI and ML Intern</h3>
              <p className="text-blue-600 font-medium">Prodigal AI</p>
              <p className="text-gray-500 text-sm">June 2025 – Present</p>
            </div>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Current
            </span>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Target className="mr-2 text-blue-500" size={18} />
              Intelligent Knowledge Retrieval System
            </h4>
            <div className="space-y-2 ml-6">
              <p className="text-gray-700 flex items-start">
                <CheckCircle className="mr-2 text-green-500 mt-1 flex-shrink-0" size={16} />
                Integrated Google Gemini AI into a RAG-based search system, improving answer accuracy and ensuring 95% of responses had verified sources.
              </p>
              <p className="text-gray-700 flex items-start">
                <CheckCircle className="mr-2 text-green-500 mt-1 flex-shrink-0" size={16} />
                Developed a semantic search feature with LlamaIndex and ChromaDB, reducing search time in seconds while delivering more relevant results.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Zap className="mr-2 text-blue-500" size={18} />
              Telegram Bot Development
            </h4>
            <div className="space-y-2 ml-6">
              <p className="text-gray-700 flex items-start">
                <CheckCircle className="mr-2 text-green-500 mt-1 flex-shrink-0" size={16} />
                Created a modular Telegram bot that gives instant access to important business updates and documents.
              </p>
              <p className="text-gray-700 flex items-start">
                <CheckCircle className="mr-2 text-green-500 mt-1 flex-shrink-0" size={16} />
                Built key command handlers to streamline data retrieval and enable easy integration for multiple startups.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900">Web Developer Intern</h3>
            <p className="text-gray-600 font-medium">IBM - SkillsBuild</p>
            <p className="text-gray-500 text-sm">June 2024 – August 2024</p>
          </div>
          <p className="text-gray-700 flex items-start">
          <CheckCircle className="mr-2 text-green-500 mt-1 flex-shrink-0" size={16} />
          Designed and developed responsive user interfaces using HTML, CSS, JavaScript, and React, ensuring seamless performance across devices and delivering visually engaging user experiences.
          </p>
          <p className="text-gray-700 flex items-start">
          <CheckCircle className="mr-2 text-green-500 mt-1 flex-shrink-0" size={16} />
          Collaborated on complex web applications and resolved critical UX issues, resulting in  increment in user engagement and improved overall customer satisfaction.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900">Diploma Engineer Trainee</h3>
            <p className="text-gray-600 font-medium">Caparo Maruti Pvt. Ltd.</p>
            <p className="text-gray-500 text-sm">May 2022 – June 2023</p>
          </div>
          <p className="text-gray-700 flex items-start">
          <CheckCircle className="mr-2 text-green-500 mt-1 flex-shrink-0" size={16} />
          Maintained full adherence to quality standards while gaining hands-on experience in various automotive production and quality processes.
          </p>
          <p className="text-gray-700 flex items-start">
          <CheckCircle className="mr-2 text-green-500 mt-1 flex-shrink-0" size={16} />
          Led key quality assurance initiatives, ensuring consistency, reducing errors, and driving operational excellence.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default ExperiencePage; 