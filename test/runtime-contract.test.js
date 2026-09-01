import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { portfolio } from '../src/data/portfolio.js'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const productionFiles = (directory) => readdirSync(directory).flatMap((name) => {
  const path = join(directory, name)
  return statSync(path).isDirectory() ? productionFiles(path) : [path]
})
const readProductionSources = () => productionFiles('src').map((path) => readFileSync(path, 'utf8')).join('\n')

test('legacy mode, GSAP, Lenis, and analytics sources are absent', () => {
  for (const path of ['src/modes', 'src/layouts', 'src/jstn', 'src/components/ModeSwitcher.jsx']) {
    assert.equal(existsSync(path), false, `${path} must be removed`)
  }

  const production = readProductionSources()
  assert.doesNotMatch(production, /\bgsap\b|\blenis\b|@vercel\/analytics|Original mode|JSTN mode/i)
})

test('production media and fonts contain no remote hotlinks', () => {
  assert.doesNotMatch(readProductionSources(), /raw\.githubusercontent\.com|pbs\.twimg\.com|media\.licdn\.com|jstn\.site\//i)
})

test('test dependencies avoid the deprecated React test renderer', () => {
  const packageJson = JSON.parse(read('package.json'))

  assert.equal(packageJson.devDependencies['react-test-renderer'], undefined)
  assert.ok(packageJson.devDependencies['@testing-library/react'])
  assert.ok(packageJson.devDependencies.jsdom)
  assert.equal(packageJson.engines.node, '>=22.22.2')
})

test('Vercel serves the SPA entry for every client-side route', () => {
  const vercelConfig = JSON.parse(read('vercel.json'))

  assert.deepEqual(vercelConfig.rewrites, [{ source: '/(.*)', destination: '/index.html' }])
})

test('Home registers both persisted views without a mode switch', () => {
  const source = read('src/pages/HomePage.jsx')
  assert.match(source, /personal/i)
  assert.match(source, /professional/i)
  assert.doesNotMatch(source, /Original mode|JSTN mode|ModeSwitcher/)
})

test('Home presentation content is supplied by the canonical portfolio record', () => {
  assert.ok(portfolio.home.personal.associations.length >= 2)
  assert.ok(portfolio.home.personal.techGroups.length >= 2)
  assert.ok(portfolio.home.personal.description.length >= 1)
  assert.ok(portfolio.home.professional.about.length >= 1)
})

test('activity consumers present GitHub contributions, not local repository commits', () => {
  for (const path of ['src/pages/HomePage.jsx', 'src/pages/ExperiencePage.jsx', 'src/components/ui/ActivityHeatmap.jsx']) {
    const source = read(path)
    assert.doesNotMatch(source, /commitsByDate|totalCommits|repository snapshot/i)
  }

  const heatmap = read('src/components/ui/ActivityHeatmap.jsx')
  assert.match(heatmap, /GitHub contribution activity/)
  assert.match(heatmap, /contributions/)
})

test('App registers About, Projects, and project detail pages', () => {
  const source = read('src/App.jsx')
  for (const page of ['AboutPage', 'ProjectsPage', 'ProjectDetailPage']) assert.match(source, new RegExp(page))
})

test('App registers writing and not-found surfaces without a public license page', () => {
  const source = read('src/App.jsx')
  for (const page of ['BlogPage', 'BlogDetailPage', 'NotFoundPage']) assert.match(source, new RegExp(page))
  assert.doesNotMatch(source, /LicensePage/)
  assert.equal(existsSync('src/pages/LicensePage.jsx'), false)
  assert.equal(existsSync('LICENSE'), false)
  assert.equal(existsSync('public/LICENSE.txt'), false)
  assert.equal(JSON.parse(read('package.json')).license, undefined)

  const footer = read('src/components/shell/Footer.jsx')
  assert.doesNotMatch(footer, /JSTN|GPL|license/i)
})

test('writing detail stays text-focused without unsupported article chrome', () => {
  const source = read('src/pages/BlogDetailPage.jsx')

  assert.doesNotMatch(source, /relatedPosts|shareProject|ImageWithFallback|readingTime/)
  assert.match(source, /Back to writing/)
  assert.match(source, /postBySlug/)
})

test('writing detail places its case-study label after the title and lede', () => {
  const source = read('src/pages/BlogDetailPage.jsx')

  assert.ok(source.indexOf('blog-detail-page__dek') < source.indexOf('blog-detail-page__meta'))
})

test('Home keeps truthful tech icons and a procedural Three.js particle portrait', () => {
  const homeSource = read('src/pages/HomePage.jsx')
  const portraitSource = read('src/components/ui/ParticlePortrait.jsx')

  assert.doesNotMatch(homeSource, /'ASP\.NET Core': 'c\+\+'/)
  assert.doesNotMatch(homeSource, /SQLite: 'mysql'/)
  assert.doesNotMatch(homeSource, /Vite: 'vercel'/)
  assert.match(portraitSource, /createProceduralPortrait/)
  assert.match(portraitSource, /THREE\.Points/)
  assert.doesNotMatch(portraitSource, /getImageData|drawImage|samplePixelsRef/)
})

test('Professional Home uses reusable mail and info icons without exposing home location', () => {
  const homeSource = read('src/pages/HomePage.jsx')
  const iconSource = read('src/components/ui/Icon.jsx')
  const documentSource = read('index.html')

  for (const name of ['mail', 'info']) {
    assert.match(iconSource, new RegExp(`${name}: '/icons/`))
    assert.match(homeSource, new RegExp(`name="${name}"`))
  }
  for (const source of [homeSource, read('src/pages/AboutPage.jsx'), read('src/components/shell/StatusBar.jsx')]) {
    assert.doesNotMatch(source, /identity\.location|professional\.location|Based in/)
  }
  assert.doesNotMatch(documentSource, /based in Zamboanga City|Zamboanga City, Philippines/i)
})

test('Task 5 mobile action and index-card semantics use local schedule and share icons', () => {
  const detailSource = read('src/pages/ProjectDetailPage.jsx')
  const cardSource = read('src/components/ui/ProjectCard.jsx')
  const iconSource = read('src/components/ui/Icon.jsx')

  assert.match(iconSource, /calendar: '\/icons\/calendar\.svg'/)
  assert.match(iconSource, /share: '\/icons\/share\.svg'/)
  assert.match(detailSource, /name="calendar"/)
  assert.match(detailSource, /name="share"/)
  assert.doesNotMatch(cardSource, /project-card__index-copy"><small>/)
})

test('Experience route contains the complete interactive sections', () => {
  const path = new URL('../src/pages/ExperiencePage.jsx', import.meta.url)
  const source = existsSync(path) ? readFileSync(path, 'utf8') : ''
  for (const label of ['Career Path', 'Proof of work', 'Writing', 'Education']) assert.match(source, new RegExp(label, 'i'))
})

test('Experience writing entries open their local case-study route without a provisional reading-time claim', () => {
  const source = read('src/pages/ExperiencePage.jsx')
  assert.match(source, /navigate\(`\/blog\/\$\{post\.slug\}`\)/)
  assert.doesNotMatch(source, /post\.readingTime/)
})

test('Experience preserves the mobile text space after the Career Path ampersand', () => {
  const source = read('src/pages/ExperiencePage.jsx')
  assert.match(source, /Career Path &amp;<br \/>\{' '\}Milestones/)
})
