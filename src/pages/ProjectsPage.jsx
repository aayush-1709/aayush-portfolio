import React from 'react';
import { ExternalLink, Github, CheckCircle } from 'lucide-react';

const GITHUB_PROFILE = 'https://github.com/aayush-1709';

const LINKS = {
  cloudMentor: {
    live: 'http://ec2-13-232-55-143.ap-south-1.compute.amazonaws.com/',
    repo: 'https://github.com/aayush-1709/cloud-mentor',
  },
  cropDoctor: {
    live: 'https://ai-crop-doctor-app.onrender.com/',
    repo: 'https://github.com/aayush-1709/ai-crop-disease-detection-agent',
  },
  langchain: {
    repo: 'https://github.com/aayush-1709/langchain-bot',
  },
  driveDetect: {
    live: 'https://drive-detect.onrender.com',
    repo: 'https://github.com/aayush-1709/Drive-Detect',
  },
};

function ProjectLinks({ live, repo }) {
  return (
    <div className="flex items-center gap-3 shrink-0" role="group" aria-label="Project links">
      {live ? (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          aria-label="Open live demo in new tab"
        >
          <ExternalLink size={18} className="opacity-80" />
          Live
        </a>
      ) : null}
      <a
        href={repo}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="View source on GitHub"
      >
        <Github size={18} />
        Code
      </a>
    </div>
  );
}

const ProjectsPage = () => (
  <div className="min-h-screen bg-white px-6 py-12">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects & Skills</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          AI/ML builds and GenAI systems — repos and demos from{' '}
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium underline underline-offset-2"
          >
            github.com/aayush-1709
          </a>
        </p>
      </div>

      <div className="space-y-8 mb-12">
        <article className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-xl overflow-hidden shadow-lg border border-sky-100">
          <div className="h-40 bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center px-4">
            <div className="text-white text-center">
              <div className="text-5xl mb-2">☁️</div>
              <h2 className="text-lg font-semibold">Cloud &amp; GenAI</h2>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">CloudMentor AI</h3>
                <p className="text-sm text-gray-600">AI-Powered AWS Skill Mastery Platform</p>
                <p className="text-sm text-gray-500 mt-1">Feb 2026</p>
              </div>
              <ProjectLinks live={LINKS.cloudMentor.live} repo={LINKS.cloudMentor.repo} />
            </div>
            <p className="text-xs font-medium text-indigo-700 mb-4">
              React.js · Next.js · FastAPI · PostgreSQL · AWS (S3, EC2, VPC) · Amazon Bedrock
            </p>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li className="flex items-start">
                <CheckCircle className="mr-2 text-indigo-500 mt-0.5 flex-shrink-0" size={16} />
                Currently building an AI-driven cloud learning platform simulating real-world AWS environments with intelligent mentorship and adaptive learning paths.
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 text-indigo-500 mt-0.5 flex-shrink-0" size={16} />
                Designed AI-powered modules including real-time AWS console supervision, certification readiness prediction, security misconfiguration analysis, and scenario-based evaluation for personalized learning.
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 text-indigo-500 mt-0.5 flex-shrink-0" size={16} />
                Developed end-to-end architecture using AWS services, enabling scalable deployment, seamless API integration, and interactive dashboards for progress tracking and skill analytics.
              </li>
            </ul>
          </div>
        </article>

        <article className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl overflow-hidden shadow-lg border border-amber-100">
          <div className="h-40 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center px-4">
            <div className="text-white text-center">
              <div className="text-5xl mb-2">🌾</div>
              <h2 className="text-lg font-semibold">Vision &amp; GenAI</h2>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">AI Crop Doctor</h3>
                <p className="text-sm text-gray-500 mt-1">June 2025 · repo: ai-crop-disease-detection-agent</p>
              </div>
              <ProjectLinks live={LINKS.cropDoctor.live} repo={LINKS.cropDoctor.repo} />
            </div>
            <p className="text-xs font-medium text-amber-800 mb-4">
              TensorFlow · Keras · PyTorch · CNN · Python · HTML · JS · Firebase · Gemini
            </p>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li className="flex items-start">
                <CheckCircle className="mr-2 text-orange-500 mt-0.5 flex-shrink-0" size={16} />
                Full-stack GenAI + vision system for plant disease detection (38 classes) on 70k+ images with 96%+ accuracy.
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 text-orange-500 mt-0.5 flex-shrink-0" size={16} />
                Implemented an LLM-grounded reasoning layer for action-oriented recommendations, context-aware disease explanations, and a custom contextual chatbot to support farmers in field testing.
              </li>
            </ul>
          </div>
        </article>

        <article className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl overflow-hidden shadow-lg border border-violet-100">
          <div className="h-40 bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center px-4">
            <div className="text-white text-center">
              <div className="text-5xl mb-2">🔗</div>
              <h2 className="text-lg font-semibold">RAG &amp; LangChain</h2>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Langchain Assistant</h3>
                <p className="text-sm text-gray-500 mt-1">Jan 2026 · repo: langchain-bot</p>
              </div>
              <ProjectLinks repo={LINKS.langchain.repo} />
            </div>
            <p className="text-xs font-medium text-violet-800 mb-4">
              RAG · LangChain · Bot · Data Indexing · ChromaDB
            </p>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li className="flex items-start">
                <CheckCircle className="mr-2 text-violet-500 mt-0.5 flex-shrink-0" size={16} />
                Built a RAG-based knowledge assistant using LangChain, with PDF, CSV, and TXT ingestion and chunking for accurate, context-aware natural language querying.
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 text-violet-500 mt-0.5 flex-shrink-0" size={16} />
                Implemented ChromaDB with 10k+ embeddings and optimized similarity search, plus CLI and Streamlit interfaces for ingestion and querying, achieving sub-second responses and faster retrieval.
              </li>
            </ul>
          </div>
        </article>

        <article className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl overflow-hidden shadow-lg border border-emerald-100">
          <div className="h-36 bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center px-4">
            <div className="text-white text-center">
              <div className="text-4xl mb-1">🚗</div>
              <h2 className="text-lg font-semibold">Computer vision</h2>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Drive-Detect</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Pinned on GitHub — CNN-based traffic sign recognition for intelligent driving (40k+ images, high accuracy).
                </p>
              </div>
              <ProjectLinks live={LINKS.driveDetect.live} repo={LINKS.driveDetect.repo} />
            </div>
            <p className="text-gray-700 text-sm">
              TypeScript stack with a trained model on large traffic-sign datasets for robust recognition—suitable for ADAS and autonomous driving research.{' '}
              <span className="text-gray-500">Live app on Render; open source on GitHub.</span>
            </p>
          </div>
        </article>
      </div>

      <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-6 md:p-8 shadow-inner border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Technical Skills</h3>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Programming</h4>
            <div className="flex flex-wrap gap-2">
              {['Python', 'Java'].map((skill) => (
                <span key={skill} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Machine Learning &amp; GenAI</h4>
            <div className="flex flex-wrap gap-2">
              {['Neural Networks', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'RAG', 'LangChain', 'LLMs'].map((skill) => (
                <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Web &amp; APIs</h4>
            <div className="flex flex-wrap gap-2">
              {['React.js', 'Next.js', 'HTML', 'CSS', 'JavaScript', 'FastAPI', 'REST APIs'].map((skill) => (
                <span key={skill} className="px-2 py-1 bg-yellow-100 text-yellow-900 text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Database, cloud &amp; tools</h4>
            <div className="flex flex-wrap gap-2">
              {['MySQL', 'PostgreSQL', 'AWS', 'GitHub', 'JIRA', 'Postman', 'Vercel', 'Render'].map((skill) => (
                <span key={skill} className="px-2 py-1 bg-red-100 text-red-900 text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-gray-600">
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800"
          >
            <Github size={18} />
            Browse all repositories on GitHub
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default ProjectsPage;
