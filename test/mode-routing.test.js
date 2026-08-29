import test from 'node:test'
import assert from 'node:assert/strict'

import {
  jstnPathStorageKey,
  jstnRoutes,
  modeFromLocation,
  modeStorageKey,
  normalizeJstnPath,
} from '../src/modes/modeRouting.js'

test('exports stable mode and route storage constants', () => {
  assert.equal(modeStorageKey, 'portfolio-mode')
  assert.equal(jstnPathStorageKey, 'portfolio-jstn-path')
  assert.deepEqual(jstnRoutes, [
    '/',
    '/about',
    '/projects',
    '/projects/:slug',
    '/experience',
    '/collection',
  ])
})

test('defaults the root location to Original mode', () => {
  assert.equal(modeFromLocation({ pathname: '/' }), 'original')
  assert.equal(modeFromLocation({ pathname: undefined }), 'original')
})

test('uses a valid saved mode before inferring from the location', () => {
  assert.equal(modeFromLocation({ pathname: '/about', savedMode: 'original' }), 'original')
  assert.equal(modeFromLocation({ pathname: '/', savedMode: 'jstn' }), 'jstn')
  assert.equal(modeFromLocation({ pathname: '/', savedMode: 'not-a-mode' }), 'original')
})

test('infers JSTN mode for public deep links without saved mode', () => {
  assert.equal(modeFromLocation({ pathname: '/about' }), 'jstn')
  assert.equal(modeFromLocation({ pathname: '/projects' }), 'jstn')
  assert.equal(modeFromLocation({ pathname: '/projects/suntastic-solar-ims' }), 'jstn')
  assert.equal(modeFromLocation({ pathname: '/experience' }), 'jstn')
  assert.equal(modeFromLocation({ pathname: '/collection' }), 'jstn')
})

test('normalizes valid project slugs and route formatting', () => {
  assert.equal(normalizeJstnPath('/projects/suntastic-solar-ims/'), '/projects/suntastic-solar-ims')
  assert.equal(normalizeJstnPath('/PROJECTS/Suntastic-Solar-IMS'), '/projects/suntastic-solar-ims')
  assert.equal(normalizeJstnPath('/projects/leo-rent-a-car?view=case-study'), '/projects/leo-rent-a-car')
})

test('falls back to the JSTN home route for unknown paths', () => {
  assert.equal(normalizeJstnPath('/missing'), '/')
  assert.equal(normalizeJstnPath('/projects/'), '/projects')
  assert.equal(normalizeJstnPath('/projects/not a slug'), '/')
  assert.equal(modeFromLocation({ pathname: '/missing' }), 'original')
})
