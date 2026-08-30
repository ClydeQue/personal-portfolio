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
