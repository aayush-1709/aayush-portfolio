import React from 'react';
import { ExternalLink, Github, Target, Zap, CheckCircle } from 'lucide-react';

const ProjectsPage = () => (
  <div className="min-h-screen bg-white px-6 py-12">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects & Skills</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A showcase of my work in AI/ML and technical expertise across multiple domains
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg overflow-hidden shadow-lg">
          <div className="h-48 bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl mb-2">🌾</div>
              <h3 className="text-lg font-semibold">AI Agriculture</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">AI Crop Doctor</h3>
              <div className="flex space-x-2">
                <a href="https://ai-crop-doctor-app.onrender.com/" target="_blank" rel="noopener noreferrer">
                <ExternalLink size={18} className="text-gray-500 hover:text-blue-500 cursor-pointer" />
                </a>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Full-stack AI application featuring a 150MB TensorFlow/Keras deep learning model for plant disease detection with 98% accuracy across 35+ disease types.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-blue-600">
                <Target className="mr-2" size={16} />
                98% accuracy across 35+ disease types
              </div>
              <div className="flex items-center text-sm text-blue-600">
                <Zap className="mr-2" size={16} />
                Google Cloud Platform deployment
              </div>
              <div className="flex items-center text-sm text-blue-600">
                <CheckCircle className="mr-2" size={16} />
                Google Gemini API integration
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg overflow-hidden shadow-lg">
          <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl mb-2">🏭</div>
              <h3 className="text-lg font-semibold">Climate Tech</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">CO₂ Storage Feasibility</h3>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                Research Paper Accepted
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Machine learning framework to predict CO₂ storage feasibility using a 20-well CCS dataset, achieving over 90% accuracy across global storage sites.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-blue-600">
                <Zap className="mr-2" size={16} />
                90%+ accuracy prediction
              </div>
              <div className="flex items-center text-sm text-blue-600">
                <Target className="mr-2" size={16} />
                20-well CCS dataset analysis
              </div>
              <div className="flex items-center text-sm text-blue-600">
                <CheckCircle className="mr-2" size={16} />
                5 classification models tested
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg overflow-hidden shadow-lg">
          <div className="h-48 bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl mb-2">🚗</div>
              <h3 className="text-lg font-semibold">Autonomous Vehicles</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Drive-Detect</h3>
              <a href="https://github.com/aayush-1709/Drive-Detect" target="_blank" rel="noopener noreferrer">
              <Github size={18} className="text-gray-500 hover:text-blue-500 cursor-pointer" />
              </a>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              CNN-based machine learning model for autonomous vehicles, reaching 95% accuracy in traffic rule prediction from 40,000+ traffic board images.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-green-600">
                <Target className="mr-2" size={16} />
                95% traffic sign accuracy
              </div>
              <div className="flex items-center text-sm text-green-600">
                <Zap className="mr-2" size={16} />
                30% faster inference with ONNX
              </div>
              <div className="flex items-center text-sm text-green-600">
                <CheckCircle className="mr-2" size={16} />
                Real-time recognition system
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Technical Skills</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Programming</h4>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Java', 'Data Structures & Algorithms (DSA)'].map(skill => (
                <span key={skill} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                {skill} </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Machine Learning</h4>
              <div className="flex flex-wrap gap-2">
                {['Neural Network', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Google Colab'].map(skill => (
                  <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Generative AI</h4>
              <div className="flex flex-wrap gap-2">
                {['LLM Integrations', 'Retrieval-Augmented Generation (RAG)', 'LangChain', 'LlamaIndex'].map(skill => (
                  <span key={skill} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Web Development</h4>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'HTML', 'CSS', 'JavaScript', 'API Integration'].map(skill => (
                  <span key={skill} className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Database & Version Control</h4>
              <div className="flex flex-wrap gap-2">
                {['SQL', 'PostgreSQL', 'GitHub'].map(skill => (
                  <span key={skill} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProjectsPage; 