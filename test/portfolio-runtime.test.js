import test from 'node:test'
import assert from 'node:assert/strict'
import { projects } from '../src/jstn/data.js'
import {
  jstnPathStorageKey,
  jstnRoutes,
  modeStorageKey,
  normalizeJstnPath,
} from '../src/modes/modeRouting.js'

test('publishes every project detail through the JSTN route family', () => {
  assert.ok(jstnRoutes.includes('/projects/:slug'))
  assert.equal(projects.length, 6)

  for (const project of projects) {
    assert.equal(
      normalizeJstnPath(`/projects/${project.slug}`),
      `/projects/${project.slug}`,
      `${project.title} must have a stable public detail path`,
    )
  }
})

test('keeps the mode persistence contract stable', () => {
  assert.equal(modeStorageKey, 'portfolio-mode')
  assert.equal(jstnPathStorageKey, 'portfolio-jstn-path')
  assert.notEqual(modeStorageKey, jstnPathStorageKey)
})
