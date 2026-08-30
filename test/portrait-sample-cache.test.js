import test from 'node:test'
import assert from 'node:assert/strict'
import { portraitSampleKey, shouldRefreshPortraitSample } from '../src/components/ui/portraitSampleCache.js'

test('refreshes portrait samples for a sub-.01 aspect-ratio change', () => {
  const cached = portraitSampleKey({ width: 300, height: 400 })
  const changed = { width: 301, height: 400 }

  assert.ok(Math.abs(300 / 400 - 301 / 400) < .01)
  assert.equal(shouldRefreshPortraitSample(cached, changed), true)
  assert.equal(shouldRefreshPortraitSample(cached, { width: 300, height: 400 }), false)
})
