import React from 'react';
import { CheckCircle } from 'lucide-react';

const ExperiencePage = () => (
  <div className="container">
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h1>
          <p className="text-lg text-gray-600">Building intelligent systems and production-ready applications</p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-8 border-l-4 border-blue-500">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">AI Intern</h3>
                <p className="text-blue-600 font-medium">Infinity Assurance Solutions Pvt Ltd</p>
                <p className="text-gray-500 text-sm">March 2026 – Current</p>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium shrink-0">
                Current
              </span>
            </div>
            <div className="space-y-3">
              <p className="text-gray-700 flex items-start">
                <CheckCircle className="mr-2 text-green-500 mt-1 flex-shrink-0" size={16} />
                Designed and deployed end-to-end AI pipelines, integrating intelligent components into production applications to automate workflows and enhance product capabilities.
              </p>
              <p className="text-gray-700 flex items-start">
                <CheckCircle className="mr-2 text-green-500 mt-1 flex-shrink-0" size={16} />
                Researched and implemented AI-driven solutions, owning the full lifecycle from prototyping to application integration.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900">AI Intern</h3>
              <p className="text-blue-600 font-medium">Prodigal AI</p>
              <p className="text-gray-500 text-sm">June 2025 – August 2025</p>
            </div>
            <div className="space-y-3">
              <p className="text-gray-700 flex items-start">
                <CheckCircle className="mr-2 text-green-500 mt-1 flex-shrink-0" size={16} />
                Built a GenAI knowledge-retrieval system using LLM, semantic search, and vector embeddings, reducing query resolution time by 50%.
              </p>
              <p className="text-gray-700 flex items-start">
                <CheckCircle className="mr-2 text-green-500 mt-1 flex-shrink-0" size={16} />
                Designed scalable backend modules to serve document-grounded, verifiable AI responses with full traceability.
              </p>
              <p className="text-gray-700 flex items-start">
                <CheckCircle className="mr-2 text-green-500 mt-1 flex-shrink-0" size={16} />
                Integrated AI models into existing application workflows, enabling seamless handoff between intelligent components and end-user interfaces.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900">Frontend Engineering Intern</h3>
              <p className="text-gray-600 font-medium">IBM</p>
              <p className="text-gray-500 text-sm">June 2024 – August 2024</p>
            </div>
            <p className="text-gray-700 flex items-start">
              <CheckCircle className="mr-2 text-green-500 mt-1 flex-shrink-0" size={16} />
              Collaborated with a team of 4 engineers on an AI-powered web application, resolving 15+ UI bugs weekly while integrating intelligent frontend components that enhanced user experience and product capability.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ExperiencePage;
