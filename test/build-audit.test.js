import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { auditBuild } from '../scripts/audit-build.mjs'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const createFixture = () => {
  const root = mkdtempSync(join(tmpdir(), 'portfolio-build-audit-'))
  mkdirSync(join(root, 'public', 'images'), { recursive: true })
  mkdirSync(join(root, 'src'), { recursive: true })
  mkdirSync(join(root, 'dist', 'assets'), { recursive: true })
  mkdirSync(join(root, 'dist', 'images'), { recursive: true })
  writeFileSync(join(root, 'public', 'images', 'present.webp'), 'fixture')
  writeFileSync(join(root, 'dist', 'images', 'present.webp'), 'fixture')
  writeFileSync(join(root, 'src', 'Page.jsx'), 'export const image = \'/images/present.webp\'')
  writeFileSync(join(root, 'dist', 'index.html'), '<img src="/images/present.webp">')
  writeFileSync(join(root, 'dist', 'assets', 'site.css'), '.hero { background-image: url("/images/present.webp"); }')
  return root
}

const fixtureRouteTable = Object.freeze([
  { name: 'home', pattern: '/' },
  { name: 'projectDetail', pattern: '/projects/:slug' },
  { name: 'blogDetail', pattern: '/blog/:slug' },
  { name: 'license', pattern: '/license' },
])

const fixturePortfolio = (overrides = {}) => ({
  identity: { portrait: '/images/present.webp' },
  projects: [{ slug: 'present-project', cover: '/images/present.webp', gallery: ['/images/present.webp'] }],
  posts: [{ slug: 'present-post', cover: '/images/present.webp' }],
  navigation: [{ path: '/projects/present-project' }],
  license: { route: '/license' },
  ...overrides,
})

test('build audit checks every route and local media reference', async () => {
  const report = await auditBuild({ root: projectRoot, dist: 'dist' })

  assert.deepEqual(report.missingAssets, [])
  assert.deepEqual(report.forbiddenUrls, [])
  assert.deepEqual(report.unregisteredLinks, [])
})

test('build audit rejects remote, missing, and unregistered portfolio media and links', async (t) => {
  const root = createFixture()
  t.after(() => rmSync(root, { recursive: true, force: true }))

  const report = await auditBuild({
    root,
    dist: 'dist',
    routeTable: fixtureRouteTable,
    portfolio: fixturePortfolio({
      identity: { portrait: 'https://jstn.site/portrait.webp' },
      projects: [{ slug: 'present-project', cover: '/images/missing.webp', gallery: ['/images/present.webp'] }],
      navigation: [{ path: '/projects/not-a-project' }, { path: 'mailto:hello@example.com' }, { path: '#footer' }],
    }),
  })

  assert.deepEqual(report.forbiddenUrls, ['https://jstn.site/portrait.webp'])
  assert.deepEqual(report.missingAssets, ['/images/missing.webp'])
  assert.deepEqual(report.unregisteredLinks, ['/projects/not-a-project'])
})

test('build audit preserves media field meaning for gallery and fallback array members', async (t) => {
  const root = createFixture()
  t.after(() => rmSync(root, { recursive: true, force: true }))

  const report = await auditBuild({
    root,
    dist: 'dist',
    routeTable: fixtureRouteTable,
    portfolio: fixturePortfolio({
      projects: [{
        slug: 'present-project',
        cover: '/images/present.webp',
        gallery: ['https://cdn.example/gallery.webp', '/images/missing-gallery.webp'],
        fallbackSources: ['//cdn.example/fallback.webp', '/images/missing-fallback.webp'],
      }],
    }),
  })

  assert.deepEqual(report.forbiddenUrls, ['//cdn.example/fallback.webp', 'https://cdn.example/gallery.webp'])
  assert.deepEqual(report.missingAssets, ['/images/missing-fallback.webp', '/images/missing-gallery.webp'])
})

test('build audit rejects source and compiled media hotlinks while preserving ordinary external links', async (t) => {
  const root = createFixture()
  t.after(() => rmSync(root, { recursive: true, force: true }))
  writeFileSync(join(root, 'src', 'Media.jsx'), "export const source = <img src={'https://cdn.example/source.webp'} />; export const links = <a href=\"https://www.gnu.org/licenses/gpl-3.0.html\">License</a>; const icons = { hero: '//cdn.example/source-icon.svg' }")
  writeFileSync(join(root, 'dist', 'assets', 'media.js'), "jsx('img',{src:'//cdn.example/built.webp'}); const icons = { hero: 'https://cdn.example/built-icon.svg' }")

  const report = await auditBuild({ root, dist: 'dist', routeTable: fixtureRouteTable, portfolio: fixturePortfolio() })

  assert.deepEqual(report.forbiddenUrls, [
    '//cdn.example/built.webp',
    '//cdn.example/source-icon.svg',
    'https://cdn.example/built-icon.svg',
    'https://cdn.example/source.webp',
  ])
  assert.ok(report.checkedLinks.includes('https://www.gnu.org/licenses/gpl-3.0.html'))
})

test('build audit validates every local static href in public and dist', async (t) => {
  const root = createFixture()
  t.after(() => rmSync(root, { recursive: true, force: true }))
  mkdirSync(join(root, 'public', 'documents'), { recursive: true })
  mkdirSync(join(root, 'dist', 'documents'), { recursive: true })
  writeFileSync(join(root, 'public', 'documents', 'resume.pdf'), 'source-and-build')
  writeFileSync(join(root, 'dist', 'documents', 'resume.pdf'), 'source-and-build')
  writeFileSync(join(root, 'public', 'documents', 'public-only.pdf'), 'source-only')
  writeFileSync(join(root, 'dist', 'documents', 'dist-only.pdf'), 'build-only')
  writeFileSync(join(root, 'src', 'Downloads.jsx'), '<a href="/documents/resume.pdf">Resume</a><a href="/documents/public-only.pdf">Public only</a><a href="/documents/dist-only.pdf">Dist only</a><a href="/documents/missing.pdf">Missing</a>')

  const report = await auditBuild({ root, dist: 'dist', routeTable: fixtureRouteTable, portfolio: fixturePortfolio() })

  assert.deepEqual(report.missingAssets, ['/documents/dist-only.pdf', '/documents/missing.pdf', '/documents/public-only.pdf'])
  assert.equal(report.unregisteredLinks.includes('/documents/resume.pdf'), false)
  assert.ok(report.checkedLinks.includes('/documents/resume.pdf'))
})

test('build audit resolves dynamic tech-stack icon fields across split source and dist files', async (t) => {
  const root = createFixture()
  t.after(() => rmSync(root, { recursive: true, force: true }))
  mkdirSync(join(root, 'public', 'techstack'), { recursive: true })
  mkdirSync(join(root, 'dist', 'techstack'), { recursive: true })
  writeFileSync(join(root, 'public', 'techstack', 'react.svg'), '<svg/>')
  writeFileSync(join(root, 'dist', 'techstack', 'react.svg'), '<svg/>')
  writeFileSync(join(root, 'src', 'Skill.jsx'), 'export const Skill = ({ skill }) => <img src={`/techstack/${skill.icon}.svg`} alt="" />')
  writeFileSync(join(root, 'dist', 'assets', 'skill.js'), "jsx('img',{src:`/techstack/${skill.icon}.svg`})")

  const report = await auditBuild({
    root,
    dist: 'dist',
    routeTable: fixtureRouteTable,
    portfolio: fixturePortfolio({ experiencePhases: [{ skills: [{ icon: 'react' }, { icon: 'absent-skill' }] }] }),
  })

  assert.deepEqual(report.missingAssets, ['/techstack/absent-skill.svg'])
  assert.ok(report.checkedAssets.includes('/techstack/react.svg'))
})

test('build audit accepts registered slugs, local legal files, hash, mailto, and SVG icon paths', async (t) => {
  const root = createFixture()
  t.after(() => rmSync(root, { recursive: true, force: true }))
  mkdirSync(join(root, 'public', 'icons'), { recursive: true })
  mkdirSync(join(root, 'public', 'techstack'), { recursive: true })
  mkdirSync(join(root, 'dist', 'icons'), { recursive: true })
  mkdirSync(join(root, 'dist', 'techstack'), { recursive: true })
  writeFileSync(join(root, 'public', 'icons', 'github.svg'), '<svg/>')
  writeFileSync(join(root, 'public', 'techstack', 'react.svg'), '<svg/>')
  writeFileSync(join(root, 'public', 'LICENSE.txt'), 'license')
  writeFileSync(join(root, 'dist', 'icons', 'github.svg'), '<svg/>')
  writeFileSync(join(root, 'dist', 'techstack', 'react.svg'), '<svg/>')
  writeFileSync(join(root, 'dist', 'LICENSE.txt'), 'license')
  writeFileSync(join(root, 'src', 'Icon.jsx'), "const iconFor = { React: 'react' }; export const icon = '/icons/github.svg'; export const tech = `/techstack/${iconFor.React}.svg`; export const legal = '/LICENSE.txt'")

  const report = await auditBuild({
    root,
    dist: 'dist',
    routeTable: fixtureRouteTable,
    portfolio: fixturePortfolio({
      navigation: [
        { path: '/projects/present-project' },
        { path: '/blog/present-post' },
        { path: '/LICENSE.txt' },
        { path: 'mailto:hello@example.com' },
        { path: '#footer' },
      ],
    }),
  })

  assert.deepEqual(report.missingAssets, [])
  assert.deepEqual(report.forbiddenUrls, [])
  assert.deepEqual(report.unregisteredLinks, [])
  assert.ok(report.checkedAssets.includes('/techstack/react.svg'))
})

test('build audit reports explicit overflow-risk markers without changing fixture files', async (t) => {
  const root = createFixture()
  t.after(() => rmSync(root, { recursive: true, force: true }))
  writeFileSync(join(root, 'src', 'Overflow.jsx'), '<main data-overflow-risk />')

  const report = await auditBuild({ root, dist: 'dist', routeTable: fixtureRouteTable, portfolio: fixturePortfolio() })

  assert.deepEqual(report.overflowRiskMarkers, ['src/Overflow.jsx'])
})
