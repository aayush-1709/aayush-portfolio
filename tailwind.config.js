/** @type {import('tailwindcss').Config} */
const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
// Accent scales are CSS variables so themes (src/themes.css) can swap them at runtime.
const themed = (slot) =>
  Object.fromEntries(SHADES.map((s) => [s, `rgb(var(--${slot}-${s}) / <alpha-value>)`]));

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { indigo: themed('indigo'), violet: themed('violet'), fuchsia: themed('fuchsia') },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-24px) scale(1.05)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)', textShadow: 'none' },
          '20%': { transform: 'translate(-2px, 1px)', textShadow: '2px 0 rgb(var(--fuchsia-500)), -2px 0 rgb(var(--indigo-400))' },
          '40%': { transform: 'translate(2px, -1px)', textShadow: '-2px 0 rgb(var(--fuchsia-500)), 2px 0 rgb(var(--indigo-400))' },
          '60%': { transform: 'translate(-1px, -1px)', textShadow: '1px 0 rgb(var(--fuchsia-500))' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 9s ease-in-out infinite',
        'float-slow': 'float 14s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        'fade-up': 'fadeUp 0.8s ease-out both',
        marquee: 'marquee 40s linear infinite',
        glitch: 'glitch 0.35s steps(2) 1',
      },
    },
  },
  plugins: [],
};
