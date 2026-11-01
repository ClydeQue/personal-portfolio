import test from 'node:test'
import assert from 'node:assert/strict'
import { matchRoute, navigateFromLink, normalizePath, routeTable } from '../src/app/router.js'

test('publishes the complete single-mode route family', () => {
  assert.deepEqual(routeTable.map(({ pattern }) => pattern), [
    '/', '/about', '/projects', '/projects/:slug', '/experience',
    '/collection', '/blog', '/blog/:slug',
  ])
})

test('normalizes case, query, hash, and trailing slash', () => {
  assert.equal(normalizePath('/PROJECTS/Court-Avenue/?view=full#gallery'), '/projects/court-avenue')
})

test('matches detail routes and returns notFound for unknown paths', () => {
  assert.deepEqual(matchRoute('/projects/court-avenue'), {
    name: 'projectDetail', path: '/projects/court-avenue', params: { slug: 'court-avenue' },
  })
  assert.equal(matchRoute('/missing').name, 'notFound')
  assert.equal(matchRoute('/license').name, 'notFound')
})

test('navigation links preserve browser shortcuts and middle clicks', () => {
  for (const modifier of [{ button: 1 }, { metaKey: true }, { ctrlKey: true }, { shiftKey: true }, { altKey: true }, { defaultPrevented: true }]) {
    let prevented = false
    navigateFromLink({ button: 0, preventDefault: () => { prevented = true }, ...modifier })
    assert.equal(prevented, false)
  }
})
