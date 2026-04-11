import React from 'react';
import { Mail, Linkedin, Github, Download, Rocket, Code } from 'lucide-react';

const HomePage = ({ onViewWork }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-6">
    <div className="text-center max-w-4xl">
      <div className="mb-8 mt-10">
        <div className="w-48 h-48 bg-gray-300 rounded-full mx-auto mb-6 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <span className="text-white text-6xl font-bold ">
            <img src="/aayush.jpg" alt="Description of the image" className="w-full h-full object-cover rounded-full" />
            </span>
          </div>
        </div>
      </div>
      
      <h1 className="text-5xl font-bold text-gray-900 mb-4">
        Hi, I'm <span className="text-blue-500">Aayush Sinha</span>
      </h1>
      
      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
      Aspiring Software, AI & ML Learner focused on implementing Generative AI and Machine Learning for innovative development.
      </p>
      
      {/* <div className="flex flex-wrap justify-center gap-4 mb-8"> */}
        {/* <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          AI/ML Engineer
        </span>
        <span className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
          RAG Systems
        </span>
        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
          LLM Orchestration
        </span> */}
        {/* <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">
          LLM Orchestration
        </span> */}
      {/* </div> */}
      
      <div className="flex justify-center space-x-4 mb-8">
        <button 
          type="button"
          onClick={onViewWork}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
        >
          <Rocket size={20} />
          <span>View My Work</span>
        </button>
        <a href="https://drive.google.com/file/d/19p4LoIAH6FKWZZ-p5QIC5XnEPAZVoXaQ/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="border border-blue-500 text-blue-500 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2">
          <Download size={20} />
          <span>View Resume</span>
        </a>
      </div>
      
      <div className="flex justify-center space-x-6 text-gray-400 mb-10 rounded-lg p-2 w-1/2 mx-auto">
        <a href="mailto:aayushsinha172@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
          <Mail size={24} />
        </a>
        <a href="https://www.linkedin.com/in/aayush-sinha-481345230/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
          <Linkedin size={24} />
        </a>
        <a href="https://github.com/aayush-1709" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
          <Github size={24} />
        </a>
        <a href="https://leetcode.com/u/aayush-1709/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
          <Code size={24} />
        </a>
      </div>
    </div>
  </div>
);

export default HomePage; 