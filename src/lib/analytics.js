// Optional, lazy Firebase Analytics. No-op unless VITE_FIREBASE_MEASUREMENT_ID is set,
// so the site never loads analytics code (or tracks anyone) by default.
let analyticsPromise = null;

const getAnalytics = () => {
  if (!import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) return Promise.resolve(null);
  if (!analyticsPromise) {
    analyticsPromise = Promise.all([import('../firebase'), import('firebase/analytics')])
      .then(async ([{ app }, { getAnalytics: init, isSupported }]) => ((await isSupported()) ? init(app) : null))
      .catch(() => null);
  }
  return analyticsPromise;
};

export const track = (event, params = {}) => {
  if (navigator.doNotTrack === '1') return;
  getAnalytics().then(async (analytics) => {
    if (!analytics) return;
    const { logEvent } = await import('firebase/analytics');
    logEvent(analytics, event, params);
  });
};
