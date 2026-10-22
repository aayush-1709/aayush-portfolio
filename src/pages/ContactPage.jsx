import React, { useState } from 'react';
import { Mail, MapPin, Github, Linkedin, Copy, Check, Send, CheckCircle2, CalendarDays } from 'lucide-react';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import { SITE, BOOKING_URL } from '../data/site';
import { track } from '../lib/analytics';

const EMPTY = { name: '', email: '', subject: '', message: '', website: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white';

const ContactPage = () => {
  const [formData, setFormData] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const set = (field) => (e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.website) return; // honeypot
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in your name, email and message.');
      setStatus('error');
      return;
    }
    if (!EMAIL_RE.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      setStatus('error');
      return;
    }
    setError('');
    setStatus('sending');
    try {
      const [{ db }, { addDoc, collection, serverTimestamp }] = await Promise.all([
        import('../firebase'),
        import('firebase/firestore'),
      ]);
      await addDoc(collection(db, 'messages'), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject || 'general',
        message: formData.message.trim(),
        createdAt: serverTimestamp(),
      });
      setFormData(EMPTY);
      setStatus('success');
      track('contact_submit', { subject: formData.subject || 'general' });
    } catch (err) {
      console.error(err);
      setError(`Couldn't send your message. Please try again, or email me directly at ${SITE.email}.`);
      setStatus('error');
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something together"
      subtitle="Open to AI/ML roles, internships and collaborations. I usually reply within a day or two."
      alt
    >
      <div className="grid gap-10 lg:grid-cols-5">
        <Reveal className="space-y-5 lg:col-span-2">
          <div className="card p-5">
            <div className="flex items-center gap-4">
              <span className="rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 p-3 text-white">
                <Mail size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Email</p>
                <a href={`mailto:${SITE.email}`} className="block truncate text-sm text-slate-600 hover:text-indigo-500 dark:text-slate-400">
                  {SITE.email}
                </a>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-indigo-500 dark:hover:bg-slate-800"
              >
                {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
              </button>
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-4">
              <span className="rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 p-3 text-white">
                <MapPin size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Location</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{SITE.location}</p>
              </div>
            </div>
          </div>
          {BOOKING_URL && (
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
              <CalendarDays size={18} /> Book a 30-min call
            </a>
          )}
          <div className="flex gap-3">
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1">
              <Linkedin size={18} /> LinkedIn
            </a>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1">
              <Github size={18} /> GitHub
            </a>
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-3">
          <div className="card p-6 sm:p-8">
            {status === 'success' ? (
              <div className="flex flex-col items-center py-10 text-center" role="status">
                <CheckCircle2 className="mb-4 text-emerald-500" size={56} />
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Message sent!</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">Thanks for reaching out. I'll get back to you soon.</p>
                <button type="button" onClick={() => setStatus('idle')} className="btn-secondary mt-6">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">Send a message</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Full name
                    </label>
                    <input id="c-name" type="text" autoComplete="name" value={formData.name} onChange={set('name')} placeholder="Your name" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email address
                    </label>
                    <input id="c-email" type="email" autoComplete="email" value={formData.email} onChange={set('email')} placeholder="you@example.com" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="c-subject" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Subject
                  </label>
                  <select id="c-subject" value={formData.subject} onChange={set('subject')} className={inputClass}>
                    <option value="">Select a subject</option>
                    <option value="job">Job opportunity</option>
                    <option value="project">Project collaboration</option>
                    <option value="general">General inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="c-message" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Message
                  </label>
                  <textarea id="c-message" rows={5} value={formData.message} onChange={set('message')} placeholder="Tell me about your project or opportunity..." className={`${inputClass} resize-none`} />
                </div>
                {/* honeypot: hidden from people, catches bots */}
                <input type="text" tabIndex={-1} autoComplete="off" value={formData.website} onChange={set('website')} className="hidden" aria-hidden />

                {status === 'error' && (
                  <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
                    {error}
                  </p>
                )}
                <button type="submit" disabled={status === 'sending'} className={`btn-primary w-full ${status === 'sending' ? 'cursor-not-allowed opacity-60' : ''}`}>
                  <Send size={18} /> {status === 'sending' ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

export default ContactPage;
