import test from 'node:test'
import assert from 'node:assert/strict'
import { createPortraitParticles, projectPortraitParticle, smoothPortraitPose } from '../src/components/ui/portraitParticles.js'

const bounds = { width: 560, height: 600 }
const rest = { x: 0, y: 0, active: 0 }
const point = { x: .5, y: .46, depth: .2, size: 1 }

test('rest preserves the original image coordinates without changing the immutable point', () => {
  const original = Object.freeze({ ...point, x: .3, y: .4 })
  const projected = projectPortraitParticle(original, rest, bounds)
  assert.equal(projected.x, 168)
  assert.equal(projected.y, 240)
})

test('opposite pointer directions turn the relief in opposite directions with visible depth parallax', () => {
  const left = projectPortraitParticle(point, { x: -1, y: 0, active: 0 }, bounds)
  const right = projectPortraitParticle(point, { x: 1, y: 0, active: 0 }, bounds)
  const flat = projectPortraitParticle({ ...point, depth: 0 }, { x: 1, y: 0, active: 0 }, bounds)
  assert.ok(left.x < 245)
  assert.ok(right.x > 315)
  assert.equal(flat.x, 280)
  assert.ok(Math.abs((280 - left.x) - (right.x - 280)) < .001)
})

test('vertical input tilts depth in opposite directions', () => {
  const upper = projectPortraitParticle(point, { x: 0, y: -1, active: 0 }, bounds)
  const lower = projectPortraitParticle(point, { x: 0, y: 1, active: 0 }, bounds)
  assert.ok(upper.y < 256)
  assert.ok(lower.y > 296)
})

test('center hover displaces nearby particles without moving distant particles', () => {
  const nearby = { ...point, x: .54, y: .51 }
  const far = { ...point, x: .9, y: .8 }
  const pose = { x: 0, y: 0, active: 1 }
  const projected = projectPortraitParticle(nearby, pose, bounds)
  assert.ok(Math.hypot(projected.x - 302.4, projected.y - 306) > 8)
  assert.deepEqual(projectPortraitParticle(far, pose, bounds), { x: 504, y: 480 })
})

test('corner interactions stay finite, inside the canvas, and within the displacement budget', () => {
  for (const x of [.002, .25, .5, .75, .998]) {
    for (const y of [.002, .25, .5, .75, .998]) {
      for (const direction of [-1, 1]) {
        const projected = projectPortraitParticle({ ...point, x, y }, { x: direction * 100, y: direction * 100, active: 1 }, bounds)
        assert.ok(projected.x >= 1 && projected.x <= 559)
        assert.ok(projected.y >= 1 && projected.y <= 599)
        assert.ok(Math.hypot(projected.x - x * 560, projected.y - y * 600) <= 85)
      }
    }
  }
})

test('pointer leave converges smoothly to exact rest without overshoot and is frame-rate independent', () => {
  const start = { x: 1, y: -1, active: 1 }
  const halfway = smoothPortraitPose(start, rest, 16)
  assert.ok(halfway.x > 0 && halfway.x < 1)
  assert.ok(halfway.y < 0 && halfway.y > -1)
  const once = smoothPortraitPose(start, rest, 32)
  const twice = smoothPortraitPose(halfway, rest, 16)
  assert.ok(Math.abs(once.x - twice.x) < .00001)
  let current = start
  for (let frame = 0; frame < 120; frame += 1) current = smoothPortraitPose(current, rest, 16)
  assert.deepEqual(current, rest)
  assert.deepEqual(smoothPortraitPose(rest, start, 0), rest)
})

test('reduced motion bypasses interpolation and particle displacement', () => {
  const active = { x: 1, y: 1, active: 1 }
  assert.deepEqual(smoothPortraitPose(active, active, 16, true), rest)
  assert.deepEqual(projectPortraitParticle(point, active, bounds, true), { x: 280, y: 276 })
})

test('cached samples omit transparent background and give dark clothing luminous blue-white points', () => {
  const pixels = new Uint8ClampedArray([
    0, 0, 0, 0, 40, 40, 40, 255, 180, 150, 130, 255, 255, 255, 255, 0,
    0, 0, 0, 0, 45, 45, 45, 255, 175, 145, 125, 255, 255, 255, 255, 0,
  ])
  const particles = createPortraitParticles(pixels, 4, 2)
  assert.equal(particles.length, 4)
  assert.deepEqual(createPortraitParticles(pixels, 4, 2), particles)
  assert.ok(particles.every(({ x, depth, tone }) => x > .2 && x < .8 && depth > 0 && tone >= .5))
  assert.ok(particles[1].tone > particles[0].tone)
})
