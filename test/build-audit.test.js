import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { auditBuild } from '../scripts/audit-build.mjs'

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
  const report = await auditBuild({ root: process.cwd(), dist: 'dist' })

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
