import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitMessage = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setSendError('Please fill in name, email, and message.');
      return;
    }
    setSendError('');
    setIsSending(true);
    try {
      await addDoc(collection(db, 'messages'), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'general',
        message: formData.message,
        createdAt: serverTimestamp(),
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Message sent!');
    } catch (err) {
      console.error(err);
      setSendError('Failed to send message. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="container">
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            I'm always interested in discussing new opportunities, innovative projects, and collaborations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Let's Connect</h2>
            <p className="text-gray-600 mb-8">
            Whether you’re seeking a skilled engineer, exploring a project collaboration, or simply reaching out to connect, I’d be glad to hear from you—especially if it involves emerging technologies, innovative applications, or transformative digital solutions.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">aayushsinha172@gmail.com</p>
                </div>
              </div>

              {/* <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+91 7303221709</p>
                </div>
              </div> */}

              <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="text-gray-600">New Delhi, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select 
                  value={formData.subject}
                  onChange={(e) => handleFormChange('subject', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="job">Job Opportunity</option>
                  <option value="project">Project Collaboration</option>
                  <option value="general">General Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleFormChange('message', e.target.value)}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-none"
                />
              </div>
              
              {sendError && (
                <p className="text-red-600 text-sm">{sendError}</p>
              )}
              <button
                onClick={handleSubmitMessage}
                disabled={isSending}
                className={`w-full bg-blue-500 text-white py-3 px-6 rounded-lg transition-colors font-medium ${isSending ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-600'}`}
              >
                {isSending ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactPage; 