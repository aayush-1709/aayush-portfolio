import React, { useEffect, useRef } from 'react';
import { usePrefs } from '../context/Prefs';
import { SKILL_GROUPS } from '../data/skills';
import Reveal from './Reveal';

const GROUP_COLORS = ['#c084fc', '#818cf8', '#fbbf24', '#34d399'];
const FOCAL = 6; // camera distance for the perspective divide

/** n points spread evenly over a unit sphere (Fibonacci lattice). */
const spherePoints = (n) =>
  Array.from({ length: n }, (_, i) => {
    const y = n === 1 ? 0 : 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * Math.PI * (3 - Math.sqrt(5));
    return [Math.cos(phi) * r, y, Math.sin(phi) * r];
  });

const buildGraph = () => {
  const nodes = [{ label: 'Aayush', pos: [0, 0, 0], group: -1, size: 7 }];
  const links = [];
  const centers = spherePoints(SKILL_GROUPS.length).map((p) => p.map((v) => v * 1.15));
  SKILL_GROUPS.forEach((g, gi) => {
    const ci = nodes.length;
    nodes.push({ label: g.title, pos: centers[gi], group: gi, size: 5, hub: true });
    links.push([0, ci]);
    const spread = 0.4 + g.skills.length * 0.035;
    spherePoints(g.skills.length).forEach((p, si) => {
      const idx = nodes.length;
      nodes.push({ label: g.skills[si], pos: centers[gi].map((c, k) => c + p[k] * spread), group: gi, size: 3 });
      links.push([ci, idx]);
    });
  });
  return { nodes, links };
};

/**
 * Draggable 3D map of the skill set: real perspective projection on a 2D canvas (no WebGL, no dependencies).
 * Drag to rotate, hover a node to highlight its group. Hidden when effects are off.
 */
const SkillConstellation = () => {
  const { fx } = usePrefs();
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!fx || !canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { nodes, links } = buildGraph();

    let w = 0;
    let h = 0;
    let rotY = 0.6;
    let rotX = -0.25;
    let velY = 0.0035;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let hover = -1;
    let raf = 0;
    let visible = true;
    let projected = [];

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      w = box.width;
      h = box.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = () => {
      const cy = Math.cos(rotY);
      const sy = Math.sin(rotY);
      const cx = Math.cos(rotX);
      const sx = Math.sin(rotX);
      // Stretch horizontally on wide canvases so labels don't pile up; scale keeps the graph inside the box.
      const aspect = Math.min(2.6, Math.max(1, w / (h * 1.25)));
      const scale = Math.min(h * 0.22, (w * 0.3) / aspect);
      projected = nodes.map((n, i) => {
        const [x, y, z] = n.pos;
        const x1 = x * cy + z * sy;
        const z1 = -x * sy + z * cy;
        const y2 = y * cx - z1 * sx;
        const z2 = y * sx + z1 * cx;
        const k = FOCAL / (FOCAL + z2);
        return { i, n, sx: w / 2 + x1 * scale * k * aspect, sy: h / 2 + y2 * scale * k, depth: z2, k };
      });
    };

    const frame = () => {
      if (!dragging) {
        rotY += velY;
        velY += (0.0035 - velY) * 0.03; // ease back to the idle spin after a flick
      }
      project();
      ctx.clearRect(0, 0, w, h);
      const dark = document.documentElement.classList.contains('dark');
      const activeGroup = hover >= 0 ? nodes[hover].group : null;

      for (const [a, b] of links) {
        const pa = projected[a];
        const pb = projected[b];
        const g = nodes[b].group;
        const lit = activeGroup !== null && g === activeGroup;
        ctx.strokeStyle = GROUP_COLORS[g] ?? '#94a3b8';
        ctx.globalAlpha = (lit ? 0.85 : 0.28) * Math.min(1, 0.45 + ((pa.k + pb.k) / 2 - 0.7));
        ctx.lineWidth = lit ? 1.6 : 1;
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.stroke();
      }

      const order = [...projected].sort((p, q) => q.depth - p.depth); // far to near
      for (const p of order) {
        const { n } = p;
        const color = GROUP_COLORS[n.group] ?? (dark ? '#e2e8f0' : '#334155');
        const lit = activeGroup === null || n.group === activeGroup || n.group === -1;
        const depthAlpha = Math.min(1, Math.max(0.25, 0.55 + (p.k - 1) * 1.1));
        ctx.globalAlpha = lit ? depthAlpha : depthAlpha * 0.25;
        const r = n.size * p.k * (p.i === hover ? 1.5 : 1);

        const glow = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r * 3.2);
        glow.addColorStop(0, `${color}88`);
        glow.addColorStop(1, `${color}00`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r * 3.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fill();

        // On narrow canvases only hubs, the centre and the hovered/tapped node get labels, to avoid pile-ups.
        const compact = w < 520;
        if (n.hub || n.group === -1 || p.i === hover || (!compact && lit && p.k > 0.95)) {
          ctx.font = `${n.hub || n.group === -1 ? 600 : 500} ${Math.round((compact ? 10.5 : n.hub ? 13 : 12) * Math.min(1.15, p.k))}px Inter, system-ui, sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillStyle = dark ? '#e2e8f0' : '#0f172a';
          ctx.fillText(n.label, p.sx, p.sy - r - 8);
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const pick = (clientX, clientY) => {
      const box = canvas.getBoundingClientRect();
      const x = clientX - box.left;
      const y = clientY - box.top;
      let best = -1;
      let bestD = 18 * 18;
      for (const p of projected) {
        const d = (p.sx - x) ** 2 + (p.sy - y) ** 2;
        if (d < bestD) {
          bestD = d;
          best = p.i;
        }
      }
      return best;
    };

    const onDown = (e) => {
      dragging = true;
      hover = pick(e.clientX, e.clientY); // a tap on touch screens highlights that node's group
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e) => {
      if (dragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        rotY += dx * 0.008;
        velY = dx * 0.002;
        rotX = Math.max(-1.2, Math.min(1.2, rotX + dy * 0.006));
      } else {
        hover = pick(e.clientX, e.clientY);
        canvas.style.cursor = hover >= 0 ? 'pointer' : 'grab';
      }
    };
    const onUp = () => {
      dragging = false;
    };
    const onLeave = () => {
      hover = -1;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
    canvas.addEventListener('pointerleave', onLeave);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [fx]);

  if (!fx) return null;
  return (
    <Reveal className="mb-10">
      <div className="card relative overflow-hidden">
        <canvas
          ref={ref}
          role="img"
          aria-label="Interactive 3D map of skills grouped by area. The same skills are listed below."
          className="block h-[320px] w-full cursor-grab touch-pan-y sm:h-[420px]"
        />
        <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs text-slate-500">
          Drag to rotate · tap or hover a node to highlight its group
        </p>
      </div>
    </Reveal>
  );
};

export default SkillConstellation;
