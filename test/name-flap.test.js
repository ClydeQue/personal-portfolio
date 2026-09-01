import test from 'node:test'
import assert from 'node:assert/strict'
import { nameFlapFrame } from '../src/components/ui/nameFlap.js'

test('name scrambles then resolves left to right and finishes without changing its identity', () => {
  const start = nameFlapFrame('CLYDE', 0)
  assert.notEqual(start.text, 'CLYDE')
  assert.equal(start.done, false)
  const middle = nameFlapFrame('CLYDE', 1100)
  assert.equal(middle.text.slice(0, 2), 'CL')
  assert.equal(middle.done, false)
  assert.deepEqual(nameFlapFrame('CLYDE', 4000), { text: 'CLYDE', done: true })
})

test('reduced motion and empty names never scramble or schedule work', () => {
  assert.deepEqual(nameFlapFrame('CLYDE', 0, true), { text: 'CLYDE', done: true })
  assert.deepEqual(nameFlapFrame('', 0), { text: '', done: true })
})
