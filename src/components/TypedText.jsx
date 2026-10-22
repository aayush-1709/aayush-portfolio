import React, { useEffect, useState } from 'react';

const TypedText = ({ words, className = '' }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let delay = deleting ? 40 : 85;
    if (!deleting && text === word) delay = 1600;
    if (deleting && text === '') delay = 300;

    const id = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, index, words]);

  return (
    <span className={className} aria-label={words.join(', ')}>
      <span aria-hidden>{text}</span>
      <span aria-hidden className="ml-0.5 inline-block w-[2px] animate-blink bg-current align-middle" style={{ height: '1em' }} />
    </span>
  );
};

export default TypedText;
