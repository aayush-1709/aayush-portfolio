import { useEffect, useRef } from 'react';
import { usePrefs } from '../context/Prefs';
import { setSoundEnabled, sfx } from '../lib/sound';

const FINE_POINTER = '(hover: hover) and (pointer: fine)';
const MAGNETIC = '.btn-primary, .btn-secondary';
const INTERACTIVE = 'a, button, [role="button"]';

/**
 * Global pointer effects, all driven from a few delegated listeners (no per-element handlers):
 * card spotlight, glowing cursor trail, magnetic buttons and opt-in UI sounds.
 */
const FxLayer = () => {
  const { fx, sound } = usePrefs();
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => setSoundEnabled(sound), [sound]);

  useEffect(() => {
    if (!sound) return undefined;
    let last = 0;
    const onOver = (e) => {
      const el = e.target.closest?.(INTERACTIVE);
      if (!el || el.contains(e.relatedTarget)) return;
      const now = performance.now();
      if (now - last < 60) return;
      last = now;
      sfx.hover();
    };
    const onClick = (e) => e.target.closest?.(INTERACTIVE) && sfx.click();
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('click', onClick, { passive: true });
    return () => {
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('click', onClick);
    };
  }, [sound]);

  useEffect(() => {
    if (!fx || !window.matchMedia(FINE_POINTER).matches) return undefined;

    const d = dot.current;
    const r = ring.current;
    let tx = -100;
    let ty = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let magnet = null;
    let tilted = null;

    const resetMagnet = () => {
      if (!magnet) return;
      magnet.style.removeProperty('--tw-translate-x');
      magnet = null;
    };

    const resetTilt = () => {
      if (!tilted) return;
      tilted.style.transform = '';
      tilted = null;
    };

    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = Math.abs(tx - rx) + Math.abs(ty - ry) > 0.5 ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      d.style.opacity = '1';
      r.style.opacity = '1';
      d.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      if (!raf) raf = requestAnimationFrame(loop);

      const card = e.target.closest?.('.card');
      if (card) {
        const box = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - box.left}px`);
        card.style.setProperty('--my', `${e.clientY - box.top}px`);
      }

      const btn = e.target.closest?.(MAGNETIC);
      if (btn !== magnet) resetMagnet();
      if (btn) {
        magnet = btn;
        const box = btn.getBoundingClientRect();
        const dx = (e.clientX - (box.left + box.width / 2)) / box.width;
        btn.style.setProperty('--tw-translate-x', `${(dx * 10).toFixed(1)}px`);
      }

      const tiltEl = e.target.closest?.('[data-tilt]');
      if (tiltEl !== tilted) resetTilt();
      if (tiltEl) {
        tilted = tiltEl;
        const box = tiltEl.getBoundingClientRect();
        const px = (e.clientX - box.left) / box.width - 0.5;
        const py = (e.clientY - box.top) / box.height - 0.5;
        tiltEl.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 7).toFixed(2)}deg) translateY(-4px)`;
      }

      r.dataset.hot = e.target.closest?.(INTERACTIVE) ? '1' : '0';
    };
    const onLeave = () => {
      d.style.opacity = '0';
      r.style.opacity = '0';
      resetMagnet();
      resetTilt();
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
      resetMagnet();
      resetTilt();
    };
  }, [fx]);

  if (!fx) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div
        ref={ring}
        data-hot="0"
        className="absolute left-0 top-0 -ml-4 -mt-4 h-8 w-8 rounded-full border border-indigo-400/70 opacity-0 shadow-[0_0_18px_rgb(var(--indigo-500)/0.5)] transition-[width,height,margin,opacity,background-color] duration-200 data-[hot='1']:-ml-6 data-[hot='1']:-mt-6 data-[hot='1']:h-12 data-[hot='1']:w-12 data-[hot='1']:bg-indigo-500/10"
      />
      <div ref={dot} className="absolute left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-indigo-400 opacity-0 shadow-[0_0_10px_rgb(var(--indigo-400))]" />
    </div>
  );
};

export default FxLayer;
