import React from 'react';

const URL_RE = /(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[\w.]+)/g;

/** Renders URLs and emails in `text` as links. */
const Linkified = ({ text }) =>
  text.split(URL_RE).map((part, i) => {
    if (i % 2 === 0) return part; // split() with a capture group puts matches at odd indices
    const href = part.includes('@') && !part.startsWith('http') ? `mailto:${part}` : part;
    return (
      <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="break-all text-indigo-600 underline dark:text-indigo-400">
        {part}
      </a>
    );
  });

export default Linkified;
