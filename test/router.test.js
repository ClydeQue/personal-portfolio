import test from 'node:test'
import assert from 'node:assert/strict'
import { matchRoute, normalizePath, routeTable } from '../src/app/router.js'

test('publishes the complete single-mode route family', () => {
  assert.deepEqual(routeTable.map(({ pattern }) => pattern), [
    '/', '/about', '/projects', '/projects/:slug', '/experience',
    '/collection', '/blog', '/blog/:slug',
  ])
})

test('normalizes case, query, hash, and trailing slash', () => {
  assert.equal(normalizePath('/PROJECTS/WaiveRight/?view=full#gallery'), '/projects/waiveright')
})

test('matches detail routes and returns notFound for unknown paths', () => {
  assert.deepEqual(matchRoute('/projects/waiveright'), {
    name: 'projectDetail', path: '/projects/waiveright', params: { slug: 'waiveright' },
  })
  assert.equal(matchRoute('/missing').name, 'notFound')
  assert.equal(matchRoute('/license').name, 'notFound')
})
