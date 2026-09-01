import test from 'node:test'
import assert from 'node:assert/strict'
import { createProceduralPortrait, portraitFrameEnabled, portraitPose } from '../src/components/ui/proceduralPortrait.js'

test('procedural portrait creates a deterministic half-body point figure without image pixels', () => {
  const first = createProceduralPortrait({ pointBudget: 12000, seed: 42 })
  const second = createProceduralPortrait({ pointBudget: 12000, seed: 42 })

  assert.ok(first.positions instanceof Float32Array)
  assert.ok(first.randomness instanceof Float32Array)
  assert.equal(first.positions.length, 12000 * 3)
  assert.equal(first.randomness.length, 12000)
  assert.deepEqual(first.positions, second.positions)
  assert.deepEqual(first.randomness, second.randomness)
})

test('procedural portrait occupies a centered head, shoulders, torso, and half-body silhouette', () => {
  const { positions } = createProceduralPortrait({ pointBudget: 16000, seed: 7 })
  const xs = []
  const ys = []
  const zs = []
  for (let index = 0; index < positions.length; index += 3) {
    xs.push(positions[index])
    ys.push(positions[index + 1])
    zs.push(positions[index + 2])
  }

  assert.ok(Math.min(...ys) < -1.7)
  assert.ok(Math.max(...ys) > 1.55)
  assert.ok(Math.min(...xs) > -1.9 && Math.max(...xs) < 1.9)
  assert.ok(Math.min(...zs) > -1.05 && Math.max(...zs) < 1.05)
  assert.ok(xs.some((x, index) => ys[index] < .25 && Math.abs(x) > 1.25), 'shoulders extend beyond the head')
  assert.ok(xs.some((x, index) => ys[index] > .75 && Math.abs(x) < .55), 'head points occupy the upper center')
})

test('portrait pose combines idle motion and pointer input within restrained bounds', () => {
  const idleA = portraitPose({ time: 0, pointer: { x: 0, y: 0, active: false } })
  const idleB = portraitPose({ time: 1400, pointer: { x: 0, y: 0, active: false } })
  const pointer = portraitPose({ time: 1400, pointer: { x: 1, y: -1, active: true } })

  assert.notDeepEqual(idleA, idleB)
  assert.ok(pointer.yaw > .35 && pointer.pitch < -.2)
  for (const pose of [idleA, idleB, pointer]) {
    assert.ok(Math.abs(pose.yaw) <= .52)
    assert.ok(Math.abs(pose.pitch) <= .34)
  }
  assert.deepEqual(portraitPose({ time: 1400, pointer: { x: 1, y: 1, active: true }, reducedMotion: true }), { yaw: 0, pitch: 0, pulse: 0 })
})

test('portrait frame lifecycle pauses for accessibility, visibility, viewport, or renderer failure', () => {
  assert.equal(portraitFrameEnabled({ reducedMotion: false, hidden: false, inViewport: true, failed: false }), true)
  for (const blocked of [
    { reducedMotion: true },
    { hidden: true },
    { inViewport: false },
    { failed: true },
  ]) {
    assert.equal(portraitFrameEnabled({ reducedMotion: false, hidden: false, inViewport: true, failed: false, ...blocked }), false)
  }
})
