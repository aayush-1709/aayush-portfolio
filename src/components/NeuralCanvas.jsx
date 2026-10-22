import React, { useEffect, useRef } from 'react';
import { usePrefs } from '../context/Prefs';

const LINK_DIST = 130;
const MOUSE_DIST = 170;

const cssRgb = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim().replace(/ /g, ',');

/**
 * Drifting node network with signal pulses that reacts to the cursor.
 * Theme-aware (reads --indigo/--fuchsia vars), pauses off-screen and in background tabs.
 */
const NeuralCanvas = ({ className = '' }) => {
  const { fx, theme } = usePrefs();
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!fx || !canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const colA = cssRgb('--indigo-400');
    const colB = cssRgb('--fuchsia-400');

    let w = 0;
    let h = 0;
    let nodes = [];
    let pulses = [];
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      w = box.width;
      h = box.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(28, Math.min(90, Math.round((w * h) / 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.6,
        hue: Math.random() < 0.7 ? 0 : 1,
      }));
      pulses = [];
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_DIST * MOUSE_DIST && d2 > 1) {
          const f = (1 - Math.sqrt(d2) / MOUSE_DIST) * 0.02;
          n.vx += dx * f * 0.05;
          n.vy += dy * f * 0.05;
        }
        n.vx *= 0.995;
        n.vy *= 0.995;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      const links = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.35;
            ctx.strokeStyle = `rgba(${colA},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            links.push([a, b]);
          }
        }
      }

      if (links.length && pulses.length < 6 && Math.random() < 0.04) {
        pulses.push({ link: links[(Math.random() * links.length) | 0], t: 0 });
      }
      pulses = pulses.filter((p) => p.t < 1);
      for (const p of pulses) {
        p.t += 0.025;
        const [a, b] = p.link;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
        g.addColorStop(0, `rgba(${colB},0.95)`);
        g.addColorStop(1, `rgba(${colB},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const n of nodes) {
        const dm = Math.hypot(mouse.x - n.x, mouse.y - n.y);
        if (dm < MOUSE_DIST) {
          ctx.strokeStyle = `rgba(${colB},${(1 - dm / MOUSE_DIST) * 0.55})`;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(${n.hue ? colB : colA},0.85)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e) => {
      const box = canvas.getBoundingClientRect();
      mouse.x = e.clientX - box.left;
      mouse.y = e.clientY - box.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [fx, theme]);

  if (!fx) return null;
  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
};

export default NeuralCanvas;
