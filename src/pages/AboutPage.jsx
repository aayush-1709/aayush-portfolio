import React from 'react';
import { Target, Trophy } from 'lucide-react';

const AboutPage = () => (
  <div className="container">
  <div className="min-h-screen bg-white px-6 py-12">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        A passionate engineer driven to advance data science and emerging technologies, developing innovative, data-driven systems that deliver meaningful real-world impact.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Journey</h2>
          <div className="prose text-gray-600 mb-8">
            <p className="mb-4">
            I’m currently pursuing a Bachelor’s in Technology at University School of Automation and Robotics - Guru Gobind Singh Indraprastha University, after starting my academic journey with a diploma in Mechanical Engineering. My passion for extracting insights from data and applying them to solve real-world challenges inspired me to transition into the field of AIML & data science. I focus on building impactful, data-driven solutions through a blend of analytics, machine learning, and software development. Along the way, I’ve gained hands-on experience with modern data science tools, frameworks, and databases, working on projects that combine technical precision with practical value.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">Generative AI</span>
            <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm">Machine Learning</span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">Data Science</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">RAG Systems</span>
            <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">Cloud User</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Problem Solver</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Team Player</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Quick Learner</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Innovation Focused</span>
            {/* <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Full Stack Developer</span> */}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="mr-2 text-blue-500" size={20} />
              Education
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Bachelor of Technology</h4>
                <p className="text-sm text-gray-700">Artificial Intelligence & Machine Learning</p>
                <p className="text-sm text-gray-600">University School of Automation and Robotics</p>
                <p className="text-sm text-gray-500">Guru Gobind Singh Indraprastha University</p>
                <p className="text-sm text-gray-500">2023 - Present</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Diploma in Mechanical Engineering</h4>
                <p className="text-sm text-gray-600">Guru Nanak Dev Institute of Technology</p>
                <p className="text-sm text-gray-500">2019 - 2022</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Trophy className="mr-2 text-green-500" size={20} />
              Achievements
            </h3>
            <div className="space-y-2">
            <p className="text-sm text-gray-700 flex items-center">
                <span className="text-green-500 mr-2">⚡</span>
                Secured 1st place in the Inter-University Game Development Hackathon, outperforming 200+ competing teams.
              </p>
              <p className="text-sm text-gray-700 flex items-center">
                <span className="text-yellow-500 mr-2">⚡</span>
                Secured a Top 100 ranking in the competitive BYD Innovate-a-thon Hackathon through innovative ideas that
                addressed key industry challenges in ML and AI vehicles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
);

export default AboutPage; 