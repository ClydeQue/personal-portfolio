import test from 'node:test'
import assert from 'node:assert/strict'
import {
  collectionItems,
  postBySlug,
  projectBySlug,
  relatedPosts,
  relatedProjects,
} from '../src/data/selectors.js'
import * as selectors from '../src/data/selectors.js'
import { portfolio } from '../src/data/portfolio.js'

test('every published project resolves to a complete detail record', () => {
  for (const project of portfolio.projects) {
    const resolved = projectBySlug(project.slug)
    assert.ok(resolved.bodySections.length >= 2)
    assert.ok(resolved.gallery.length >= 1)
    assert.equal(relatedProjects(project.slug, 2).length, 2)
  }
})

test('selectors return deterministic related records', () => {
  assert.equal(projectBySlug('waiveright').title, 'WaiveRight')
  assert.equal(relatedProjects('waiveright', 2).length, 2)
  assert.equal(postBySlug('capytech-scorm-qa-sandbox').slug, 'capytech-scorm-qa-sandbox')
})

test('related project records honor explicit order and omit the current project', () => {
  assert.deepEqual(relatedProjects('waiveright', 2).map(({ slug }) => slug), [
    'social-development-unit', 'offline-pos',
  ])
  assert.deepEqual(relatedPosts('waiveright-role-based-workflow', 2).map(({ slug }) => slug), [
    'capytech-scorm-qa-sandbox', 'sdu-multi-office-dashboard',
  ])
})

test('collection filtering is case-insensitive and does not mutate the source', () => {
  const firstSearch = collectionItems('SCORM', 'ai-development')
  const secondSearch = collectionItems('SCORM', 'ai-development')

  assert.deepEqual(firstSearch.map(({ name }) => name), ['SCORM package testing'])
  assert.notEqual(firstSearch, secondSearch)
  assert.deepEqual(collectionItems('not-present', 'all'), [])
})

test('collection search finds a named category and source within that category', () => {
  const categoryMatches = collectionItems('learning & references', 'learning-references')
  const sourceMatches = collectionItems('official documentation', 'tools-libraries')

  assert.ok(categoryMatches.length > 0)
  assert.ok(categoryMatches.every((item) => item.categoryId === 'learning-references'))
  assert.ok(sourceMatches.length > 0)
  assert.ok(sourceMatches.every((item) => item.source === 'Official documentation'))
})

test('collection detail defaults to the first visible resource and clears for empty results', () => {
  assert.equal(selectors.collectionSelection('', 'all')?.id, 'scorm-package-testing')
  assert.equal(selectors.collectionSelection('learning & references', 'learning-references', 'scorm-package-testing')?.id, 'local-first-business-workflows')
  assert.equal(selectors.collectionSelection('a-query-that-does-not-exist', 'all', 'scorm-package-testing'), null)
})
