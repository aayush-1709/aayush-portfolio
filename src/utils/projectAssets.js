/**
 * Discovers images under src/assets/<projectFolder>/ at build time.
 * Add new PNG/JPG/etc. files to a folder and they appear after dev refresh / rebuild.
 * - logo.png → used on the project card
 * - any other images → shown in the click-to-open gallery
 */
const assetModules = import.meta.glob('../assets/*/*.{png,jpg,jpeg,webp,gif,svg}', {
  eager: true,
});

function urlFromModule(mod) {
  if (!mod) return null;
  if (typeof mod === 'string') return mod;
  return mod.default ?? null;
}

function buildAssetIndex() {
  /** @type {Record<string, { file: string; url: string }[]>} */
  const index = {};
  for (const [fullPath, mod] of Object.entries(assetModules)) {
    const normalized = fullPath.replace(/\\/g, '/');
    const match = normalized.match(/assets\/([^/]+)\/([^/]+)$/i);
    if (!match) continue;
    const folder = match[1];
    const file = match[2];
    const url = urlFromModule(mod);
    if (!url) continue;
    if (!index[folder]) index[folder] = [];
    index[folder].push({ file, url, sortKey: file.toLowerCase() });
  }
  for (const folder of Object.keys(index)) {
    index[folder].sort((a, b) => a.sortKey.localeCompare(b.sortKey));
  }
  return index;
}

const PROJECT_ASSET_INDEX = buildAssetIndex();

/**
 * @param {string} folder — e.g. 'cloudmentor', 'cropdoctor', 'drivedetect', 'langchain'
 * @returns {{ logoUrl: string | null, gallery: { file: string; url: string }[] }}
 */
export function getProjectMedia(folder) {
  const items = PROJECT_ASSET_INDEX[folder] || [];
  const logoEntry = items.find((x) => x.file.toLowerCase() === 'logo.png');
  const gallery = items.filter((x) => x.file.toLowerCase() !== 'logo.png');
  return {
    logoUrl: logoEntry?.url ?? null,
    gallery: gallery.map(({ file, url }) => ({ file, url })),
  };
}
