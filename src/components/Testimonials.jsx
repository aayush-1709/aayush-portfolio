import React from 'react';
import { Quote } from 'lucide-react';
import Section from './Section';
import Reveal from './Reveal';
import { TESTIMONIALS } from '../data/site';

/** Renders nothing until real quotes are added to TESTIMONIALS in data/site.js. */
const Testimonials = () => {
  if (!TESTIMONIALS.length) return null;
  return (
    <Section id="testimonials" eyebrow="Kind words" title="What people say" alt>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map(({ quote, name, role }, i) => (
          <Reveal key={name} delay={i * 80}>
            <figure className="card h-full p-6">
              <Quote className="mb-3 text-indigo-500" size={22} aria-hidden />
              <blockquote className="text-slate-700 dark:text-slate-300">{quote}</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-slate-900 dark:text-white">{name}</span>
                <span className="block text-slate-500">{role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default Testimonials;
