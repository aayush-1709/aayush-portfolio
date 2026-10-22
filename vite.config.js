import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Domain-dependent SEO. With VITE_SITE_URL set (e.g. https://aayush.dev) it injects the canonical URL,
 * og:url and absolute share-image URLs, and emits sitemap.xml + robots.txt. Without it the build is unchanged
 * (robots.txt still allows everything), so nothing breaks before you have a domain.
 */
function siteMeta(rawUrl) {
  const site = (rawUrl || '').replace(/\/+$/, '')
  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      if (!site) return html
      return {
        html: html.replaceAll('content="/og-image.jpg"', `content="${site}/og-image.jpg"`),
        tags: [
          { tag: 'link', attrs: { rel: 'canonical', href: `${site}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: `${site}/` }, injectTo: 'head' },
        ],
      }
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${site ? `\nSitemap: ${site}/sitemap.xml\n` : ''}`,
      })
      if (site) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${site}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>\n</urlset>\n`,
        })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return { plugins: [react(), siteMeta(env.VITE_SITE_URL)] }
})
