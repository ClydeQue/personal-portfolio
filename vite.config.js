import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { absoluteUrl, pageMeta, renderHead, sitemapPaths } from './src/app/seo.js'

const SEO_MARKER = /<!-- seo:head[^>]*-->/

// Writes each route's own head into a static HTML file, plus sitemap.xml, so crawlers and
// link previews get the right title, description, and canonical without running JavaScript.
function seo() {
  let outDir = 'dist'
  return {
    name: 'portfolio-seo',
    configResolved(config) { outDir = config.build.outDir },
    transformIndexHtml(html, context) {
      return html.replace(SEO_MARKER, renderHead(pageMeta(context.originalUrl?.split('?')[0] || '/')))
    },
    async closeBundle() {
      const template = await readFile(join(outDir, 'index.html'), 'utf8')
      const headStart = template.indexOf('<title>')
      const headEnd = template.indexOf('</script>', template.indexOf('application/ld+json')) + '</script>'.length
      const paths = sitemapPaths()
      for (const path of paths.filter((item) => item !== '/')) {
        const file = join(outDir, path, 'index.html')
        await mkdir(dirname(file), { recursive: true })
        await writeFile(file, template.slice(0, headStart) + renderHead(pageMeta(path)) + template.slice(headEnd))
      }
      const lastmod = new Date().toISOString().slice(0, 10)
      const urls = paths.map((path) => `  <url><loc>${absoluteUrl(path)}</loc><lastmod>${lastmod}</lastmod><priority>${path === '/' ? '1.0' : path.split('/').length > 2 ? '0.7' : '0.8'}</priority></url>`)
      await writeFile(join(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seo()],
})
