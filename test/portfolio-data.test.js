import test from 'node:test'
import assert from 'node:assert/strict'
import { portfolio } from '../src/data/portfolio.js'
import { projectBySlug as jstnProjectBySlug, projects as jstnProjects } from '../src/jstn/data.js'

const collectMediaPaths = (value, found = []) => {
  if (typeof value === 'string' && /^\/(images|icons|fonts|favicon|portfolio)\//.test(value)) found.push(value)
  else if (Array.isArray(value)) value.forEach((item) => collectMediaPaths(item, found))
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectMediaPaths(item, found))
  return found
}

test('contains six truthful project case studies and four writing entries', () => {
  assert.equal(portfolio.projects.length, 6)
  assert.equal(portfolio.posts.length, 4)
  assert.equal(portfolio.experiencePhases.length, 4)
  assert.deepEqual(portfolio.experiencePhases.map(({ organization }) => organization), [
    'Ngnair Brice Holding', 'Capytech E-Learning Solutions',
    'JP Consulting and Services', 'Ateneo de Zamboanga University',
  ])
})

test('writing entries keep unpublished case-study metadata and do not invent reading times', () => {
  for (const post of portfolio.posts) {
    assert.match(post.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    assert.equal(post.published, null)
    assert.equal(post.readingTime, undefined)
    assert.equal(post.category, 'Portfolio case-study note')
    assert.ok(post.sections.length >= 3)
  }
})

test('writing case-study copy stays factual about the work instead of publication rationale', () => {
  const copy = portfolio.posts.flatMap(({ sections }) => sections.map(({ body }) => body)).join(' ')

  assert.doesNotMatch(copy, /previously published|unsupported outcomes|rather than presenting/i)
})

test('experience skills do not turn generic cloud learning into an AWS qualification', () => {
  const universityPhase = portfolio.experiencePhases.at(-1)

  assert.equal(universityPhase.skills.find(({ label }) => label === 'Cloud computing').icon, undefined)
  assert.ok(portfolio.experiencePhases.flatMap(({ skills }) => skills).every(({ icon }) => icon !== 'aws'))
})

test('all production media references are local', () => {
  for (const path of collectMediaPaths(portfolio)) assert.match(path, /^\//)
})

test('recursively freezes the portfolio content domain', () => {
  assert.ok(Object.isFrozen(portfolio))
  assert.ok(Object.isFrozen(portfolio.projects))
  assert.ok(Object.isFrozen(portfolio.projects[0]))
  assert.ok(Object.isFrozen(portfolio.projects[0].responsibilities))
  assert.ok(Object.isFrozen(portfolio.posts[0].sections))
})

test('the temporary JSTN facade derives page-compatible project records', () => {
  const project = jstnProjectBySlug('waiveright')

  assert.equal(project, jstnProjects[0])
  assert.equal(project.image, '/images/waiveright1.webp')
  assert.deepEqual(project.detail, portfolio.projects[0].bodySections.map(({ body }) => body))
  assert.ok(Object.isFrozen(project.detail))
  assert.throws(() => project.detail.push('mutable facade detail'), TypeError)
})

test('activity metrics agree with the preserved repository snapshot', () => {
  const { activity } = portfolio

  assert.equal(activity.totalCommits, activity.commitsByDate.reduce((total, day) => total + day.commits, 0))
  assert.equal(activity.activeDays, activity.commitsByDate.length)
  assert.equal(activity.currentStreak, 2)
  assert.equal(activity.longestStreak, 2)
})
