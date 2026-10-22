import React, { useEffect, useRef, useState } from 'react';
import { usePrefs } from '../context/Prefs';

const GLYPHS = '01<>/\\[]{}#$%&*+=-_';

/** Decodes `text` from random glyphs when it first scrolls into view. Static when effects are off. */
const ScrambleText = ({ text, className = '', duration = 900 }) => {
  const { fx } = usePrefs();
  const ref = useRef(null);
  const [out, setOut] = useState(text);

  useEffect(() => {
    setOut(text);
    const el = ref.current;
    if (!fx || !el || !('IntersectionObserver' in window)) return undefined;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const settled = Math.floor(p * text.length);
        setOut(
          text
            .split('')
            .map((ch, i) => (ch === ' ' || i < settled ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
            .join(''),
        );
        if (p < 1) raf = requestAnimationFrame(tick);
        else setOut(text);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    setOut(text.replace(/\S/g, () => GLYPHS[(Math.random() * GLYPHS.length) | 0]));
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, fx, duration]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
};

export default ScrambleText;
