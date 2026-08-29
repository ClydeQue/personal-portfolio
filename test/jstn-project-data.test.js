import test from 'node:test'
import assert from 'node:assert/strict'
import { projectBySlug, projects } from '../src/jstn/data.js'

test('finds each published project by its stable detail-route slug', () => {
  assert.equal(projects.length, 6)

  for (const project of projects) {
    assert.equal(projectBySlug(project.slug), project)
  }
})

test('returns no project for an unknown detail-route slug', () => {
  assert.equal(projectBySlug('not-a-portfolio-project'), undefined)
})
