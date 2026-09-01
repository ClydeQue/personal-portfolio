import test from 'node:test'
import assert from 'node:assert/strict'
import { portfolio } from '../src/data/portfolio.js'

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

test('tech stack reflects project, GitHub, cloud, AI, and editor evidence without mixing categories', () => {
  const groups = new Map(portfolio.home.professional.techGroups.map(({ title, items }) => [title, items]))

  assert.deepEqual([...groups.keys()], [
    'Languages & frontend', 'Services & application architecture', 'Data & security',
    'Cloud & delivery', 'AI engineering', 'Developer tooling',
  ])
  assert.deepEqual(groups.get('Data & security'), [
    'PostgreSQL', 'CockroachDB', 'Supabase', 'Neon', 'SQLite', 'EF Core', 'JWT', 'Row-Level Security',
  ])
  for (const item of ['GCP', 'Cloud Run', 'Cloud Build', 'Cloud Storage', 'AWS', 'EC2', 'S3', 'Cloudflare Workers', 'Cloudflare R2', 'Docker']) {
    assert.ok(groups.get('Cloud & delivery').includes(item), `${item} is categorized under Cloud & delivery`)
  }
  for (const item of ['Codex CLI', 'Claude Code CLI', 'OpenAI API', 'AI-assisted QA', 'Context engineering']) {
    assert.ok(groups.get('AI engineering').includes(item), `${item} is categorized under AI engineering`)
  }
  for (const item of ['Neovim', 'lazy.nvim', 'Custom Lua modules', 'LazyGit']) {
    assert.ok(groups.get('Developer tooling').includes(item), `${item} is categorized under Developer tooling`)
  }
  assert.ok(groups.get('Services & application architecture').includes('Microservices'))
  assert.ok(groups.get('Services & application architecture').includes('Microfrontends'))
  assert.equal(portfolio.identity.location, undefined)
  const descriptionCopy = portfolio.home.personal.description
    .flatMap(({ segments }) => segments.map(({ text }) => text))
    .join(' ')
  assert.match(descriptionCopy, /microservices and microfrontends/i)
})

test('home associations render as meaningful local organization marks', () => {
  assert.deepEqual(portfolio.home.personal.associations.map(({ name }) => name), [
    'Ngnair Brice Holding',
    'Ateneo de Zamboanga University',
    'Capytech E-Learning Solutions',
  ])
  for (const association of portfolio.home.personal.associations) {
    assert.match(association.logo, /^\/images\/(?:associations\/[a-z0-9-]+\.svg|adzu_logo\.png)$/)
    assert.equal(association.alt, association.name)
  }
})

test('home and professional descriptions expose accessible emphasized phrases', () => {
  for (const paragraphs of [portfolio.home.personal.description, portfolio.home.professional.about]) {
    assert.ok(paragraphs.length >= 2)
    for (const paragraph of paragraphs) {
      assert.ok(paragraph.segments.length >= 2)
      assert.ok(paragraph.segments.every(({ text }) => typeof text === 'string' && text.length > 0))
    }
    assert.ok(paragraphs.flatMap(({ segments }) => segments).some(({ emphasis }) => emphasis === true))
  }
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

test('activity uses the generated GitHub contribution calendar snapshot', () => {
  const { activity } = portfolio

  assert.equal(activity.label, 'GitHub contribution activity')
  assert.match(activity.snapshotDate, /^\d{4}-\d{2}-\d{2}$/)
  assert.ok(activity.years.length > 0)
  assert.equal(activity.years[0].year, 2024)
  assert.deepEqual(activity.years.map(({ year }) => year), [...activity.years.map(({ year }) => year)].sort((left, right) => left - right))
  for (const year of activity.years) {
    assert.equal(year.totalContributions, year.contributionsByDate.reduce((total, day) => total + day.contributions, 0))
    assert.equal(year.activeDays, year.contributionsByDate.length)
    assert.equal(typeof year.currentStreak, 'number')
    assert.equal(typeof year.longestStreak, 'number')
  }
})
