export const FILTERS = ['All', 'GenAI', 'ML', 'Web'];

/** `folder` must match the directory name under src/assets/ */
export const PROJECTS = [
  {
    id: 'cloudmentor',
    folder: 'cloudmentor',
    title: 'CloudMentor AI',
    tagline: 'AI-powered AWS skill mastery platform',
    status: 'In progress · Feb 2026',
    categories: ['GenAI', 'Web'],
    gradient: 'from-sky-500/20 via-indigo-500/20 to-violet-500/20',
    metrics: ['AWS + Bedrock', 'Adaptive learning'],
    tech: ['React.js', 'Next.js', 'FastAPI', 'PostgreSQL', 'AWS (S3, EC2, VPC)', 'Amazon Bedrock'],
    overview:
      'An AI-driven cloud learning platform that simulates real-world AWS environments with intelligent mentorship and adaptive learning paths.',
    highlights: [
      'Designed AI-powered modules including real-time AWS console supervision, certification readiness prediction, security misconfiguration analysis, and scenario-based evaluation for personalized learning.',
      'Developed end-to-end architecture using AWS services, enabling scalable deployment, seamless API integration, and interactive dashboards for progress tracking and skill analytics.',
    ],
    live: 'http://ec2-13-232-55-143.ap-south-1.compute.amazonaws.com/',
    repo: 'https://github.com/aayush-1709/cloud-mentor',
  },
  {
    id: 'cropdoctor',
    folder: 'cropdoctor',
    title: 'AI Crop Doctor',
    tagline: 'Vision + GenAI plant disease detection for farmers',
    status: 'June 2025',
    categories: ['GenAI', 'ML'],
    gradient: 'from-amber-500/20 via-orange-500/20 to-yellow-500/20',
    metrics: ['96%+ accuracy', '38 classes', '70k+ images'],
    tech: ['TensorFlow', 'Keras', 'PyTorch', 'CNN', 'Python', 'JavaScript', 'Firebase', 'Gemini'],
    overview:
      'A full-stack GenAI and computer-vision system that detects plant diseases across 38 classes and explains what to do next.',
    highlights: [
      'Built a plant disease detection model (38 classes) on 70k+ images with 96%+ accuracy.',
      'Implemented an LLM-grounded reasoning layer for action-oriented recommendations, context-aware disease explanations, and a custom contextual chatbot to support farmers in field testing.',
    ],
    live: 'https://ai-crop-doctor-app.onrender.com/',
    repo: 'https://github.com/aayush-1709/ai-crop-disease-detection-agent',
  },
  {
    id: 'langchain',
    folder: 'langchain',
    title: 'Langchain Assistant',
    tagline: 'RAG knowledge assistant over your own documents',
    status: 'Jan 2026',
    categories: ['GenAI'],
    gradient: 'from-violet-500/20 via-purple-500/20 to-fuchsia-500/20',
    metrics: ['10k+ embeddings', 'Sub-second responses'],
    tech: ['RAG', 'LangChain', 'ChromaDB', 'Streamlit', 'Python'],
    overview:
      'A RAG-based assistant that ingests PDF, CSV and TXT files and answers natural-language questions grounded in their content.',
    highlights: [
      'Built a RAG-based knowledge assistant using LangChain, with PDF, CSV, and TXT ingestion and chunking for accurate, context-aware natural language querying.',
      'Implemented ChromaDB with 10k+ embeddings and optimized similarity search, plus CLI and Streamlit interfaces for ingestion and querying, achieving sub-second responses and faster retrieval.',
    ],
    repo: 'https://github.com/aayush-1709/langchain-bot',
  },
  {
    id: 'drivedetect',
    folder: 'drivedetect',
    title: 'Drive-Detect',
    tagline: 'CNN-based traffic sign recognition for intelligent driving',
    status: 'Pinned on GitHub',
    categories: ['ML', 'Web'],
    gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
    metrics: ['40k+ images', 'ADAS research'],
    tech: ['CNN', 'Computer Vision', 'TypeScript', 'Render'],
    overview:
      'A model trained on large traffic-sign datasets for robust recognition, suitable for ADAS and autonomous driving research.',
    highlights: [
      'CNN-based traffic sign recognition trained on 40k+ images for high accuracy.',
      'TypeScript stack with a live app on Render; open source on GitHub.',
    ],
    live: 'https://drive-detect.onrender.com',
    repo: 'https://github.com/aayush-1709/Drive-Detect',
  },
];
