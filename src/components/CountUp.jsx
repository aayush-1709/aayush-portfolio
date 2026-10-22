import React, { useEffect, useRef, useState } from 'react';

const REDUCED = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Animates the first number in `value` (e.g. "96%+") up from 0 once it scrolls into view. */
const CountUp = ({ value, duration = 1200 }) => {
  const match = String(value).match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const ref = useRef(null);
  const [n, setN] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!match || !el || REDUCED() || !('IntersectionObserver' in window)) return undefined;
    const target = parseFloat(match[2]);
    let raf;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        setN(target * (1 - (1 - t) ** 3));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return <span ref={ref}>{value}</span>;
  const decimals = (match[2].split('.')[1] || '').length;
  return (
    <span ref={ref}>
      {match[1]}
      {n === null ? match[2] : n.toFixed(decimals)}
      {match[3]}
    </span>
  );
};

export default CountUp;
