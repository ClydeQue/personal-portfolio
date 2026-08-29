import test from 'node:test'
import assert from 'node:assert/strict'
import * as modeRouting from '../src/modes/modeRouting.js'

import {
  jstnPathStorageKey,
  jstnRoutes,
  modeFromLocation,
  modeStorageKey,
  normalizeJstnPath,
} from '../src/modes/modeRouting.js'

function contractFunction(name) {
  assert.equal(typeof modeRouting[name], 'function', `${name} must be exported by the routing contract`)
  return modeRouting[name]
}

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

test('initializes from the location when storage is unavailable or throws', () => {
  const modeFromEnvironment = contractFunction('modeFromEnvironment')

  assert.equal(modeFromEnvironment({ pathname: '/about' }), 'jstn')
  assert.equal(modeFromEnvironment({ pathname: '/about', storage: null }), 'jstn')
  assert.equal(modeFromEnvironment({
    pathname: '/about',
    storage: { getItem() { throw new Error('storage is blocked') } },
  }), 'jstn')
})

test('restores valid storage values without accepting an invalid JSTN path', () => {
  const modeFromEnvironment = contractFunction('modeFromEnvironment')
  const jstnPathFromEnvironment = contractFunction('jstnPathFromEnvironment')
  const storage = {
    getItem(key) {
      return {
        [modeStorageKey]: 'jstn',
        [jstnPathStorageKey]: '/projects/suntastic-solar-ims',
      }[key] ?? null
    },
  }

  assert.equal(modeFromEnvironment({ pathname: '/', storage }), 'jstn')
  assert.equal(jstnPathFromEnvironment({ pathname: '/', storage }), '/projects/suntastic-solar-ims')
  assert.equal(jstnPathFromEnvironment({
    pathname: '/',
    storage: { getItem: () => '/not-a-jstn-route' },
  }), '/')
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

test('switching to Original preserves a JSTN deep link for a later restore', () => {
  const modeChangeState = contractFunction('modeChangeState')

  assert.deepEqual(modeChangeState({
    nextMode: 'original',
    pathname: '/projects/suntastic-solar-ims',
    savedJstnPath: '/',
  }), {
    mode: 'original',
    pathname: '/',
    jstnPath: '/projects/suntastic-solar-ims',
  })
})

test('switching to JSTN restores the persisted public route from Original', () => {
  const modeChangeState = contractFunction('modeChangeState')

  assert.deepEqual(modeChangeState({
    nextMode: 'jstn',
    pathname: '/',
    savedJstnPath: '/projects/suntastic-solar-ims',
  }), {
    mode: 'jstn',
    pathname: '/projects/suntastic-solar-ims',
    jstnPath: '/projects/suntastic-solar-ims',
  })
})
