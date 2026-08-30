import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { portfolio } from '../src/data/portfolio.js'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

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

test('App registers About, Projects, and project detail pages', () => {
  const source = read('src/App.jsx')
  for (const page of ['AboutPage', 'ProjectsPage', 'ProjectDetailPage']) assert.match(source, new RegExp(page))
})

test('App registers writing, license, and not-found surfaces', () => {
  const source = read('src/App.jsx')
  for (const page of ['BlogPage', 'BlogDetailPage', 'LicensePage', 'NotFoundPage']) assert.match(source, new RegExp(page))
})

test('writing detail stays text-focused without unsupported article chrome', () => {
  const source = read('src/pages/BlogDetailPage.jsx')

  assert.doesNotMatch(source, /relatedPosts|shareProject|ImageWithFallback|readingTime/)
  assert.match(source, /Back to writing/)
  assert.match(source, /postBySlug/)
})

test('Home keeps truthful tech icons and a cached, top-biased particle portrait', () => {
  const homeSource = read('src/pages/HomePage.jsx')
  const portraitSource = read('src/components/ui/ParticlePortrait.jsx')

  assert.doesNotMatch(homeSource, /'ASP\.NET Core': 'c\+\+'/)
  assert.doesNotMatch(homeSource, /SQLite: 'mysql'/)
  assert.doesNotMatch(homeSource, /Vite: 'vercel'/)
  assert.match(portraitSource, /samplePixelsRef/)
  assert.match(portraitSource, /portraitSampleKey/)
  assert.match(portraitSource, /sourceY = \(source\.naturalHeight - sourceHeight\) \* 0\.08/)
})

test('Professional Home uses reusable mail, info, and location icons', () => {
  const homeSource = read('src/pages/HomePage.jsx')
  const iconSource = read('src/components/ui/Icon.jsx')

  for (const name of ['mail', 'info', 'mapPin']) {
    assert.match(iconSource, new RegExp(`${name}: '/icons/`))
    assert.match(homeSource, new RegExp(`name="${name}"`))
  }
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
