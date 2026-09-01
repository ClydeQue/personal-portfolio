import test from 'node:test'
import assert from 'node:assert/strict'
import { Buffer } from 'node:buffer'
import { buildSync } from 'esbuild'

const bundle = buildSync({
  stdin: {
    contents: `import React from 'react'; import TestRenderer, { act } from 'react-test-renderer';
      import ParticlePortrait from './src/components/ui/ParticlePortrait.jsx';
      export { act }; export const mount = canvas => TestRenderer.create(React.createElement(ParticlePortrait), {
        createNodeMock: node => node.type === 'canvas' ? canvas : null
      });`,
    resolveDir: new URL('..', import.meta.url).pathname,
  },
  bundle: true, format: 'esm', platform: 'browser', jsx: 'automatic', write: false,
})
const { mount, act } = await import(`data:text/javascript;base64,${Buffer.from(`${bundle.outputFiles[0].text}\n//# sourceURL=portrait-harness.mjs`).toString('base64')}`)

function harness({ reduce = false, sampleError = false } = {}) {
  const events = () => {
    const handlers = new Map()
    return { handlers, addEventListener: (name, handler) => handlers.set(name, handler), removeEventListener: (name) => handlers.delete(name) }
  }
  const frames = new Map()
  const metrics = { dimensions: 0, reads: 0, draws: 0, disconnected: false }
  const bounds = { width: 560, height: 600, left: 0, top: 0 }
  const context = { setTransform() {}, clearRect() {}, fillRect() { metrics.draws += 1 } }
  const canvas = { ...events(), getContext: () => context, getBoundingClientRect: () => bounds }
  for (const property of ['width', 'height']) {
    let value = 0
    Object.defineProperty(canvas, property, { get: () => value, set: (next) => { metrics.dimensions += 1; value = next } })
  }
  const motion = { ...events(), matches: reduce }
  const document = { ...events(), hidden: false, createElement: () => ({ getContext: () => ({
    drawImage() {},
    getImageData(_x, _y, width, height) {
      metrics.reads += 1
      if (sampleError) throw new Error('sample unavailable')
      const data = new Uint8ClampedArray(width * height * 4)
      data.fill(160)
      return { data }
    },
  }) }) }
  let image
  let resize
  let frameId = 0
  const replacements = {
    IS_REACT_ACT_ENVIRONMENT: true,
    window: { matchMedia: () => motion, devicePixelRatio: 1 }, document,
    Image: class { constructor() { image = this; this.naturalWidth = 600; this.naturalHeight = 900 } },
    ResizeObserver: class { constructor(callback) { resize = callback } observe() {} disconnect() { metrics.disconnected = true } },
    requestAnimationFrame: (callback) => { frames.set(++frameId, callback); return frameId },
    cancelAnimationFrame: (id) => frames.delete(id),
  }
  const previous = new Map(Object.keys(replacements).map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]))
  Object.assign(globalThis, replacements)
  let renderer
  act(() => { renderer = mount(canvas) })
  let time = 0
  return {
    metrics, frames, canvas, image, motion, document, bounds,
    ready: () => renderer.root.findAllByType('div')[0].props.className.includes('is-ready'),
    load: () => act(() => image.onload?.()),
    error: () => act(() => image.onerror?.()),
    frame: () => act(() => {
      time += 16
      const pending = [...frames.values()]
      frames.clear()
      pending.forEach((callback) => callback(time))
    }),
    resize: () => act(() => resize()),
    emit: (target, name, event) => act(() => target.handlers.get(name)?.(event)),
    cleanup: () => {
      act(() => renderer.unmount())
      for (const [key, descriptor] of previous) {
        if (descriptor) Object.defineProperty(globalThis, key, descriptor)
        else delete globalThis[key]
      }
    },
  }
}

test('animation reuses dimensions and samples until the actual canvas bounds change', () => {
  const h = harness()
  try {
    h.load(); h.frame()
    assert.equal(h.ready(), true)
    assert.equal(h.metrics.reads, 1)
    const initialDimensions = h.metrics.dimensions
    h.frame(); h.frame()
    assert.equal(h.metrics.dimensions, initialDimensions)
    assert.equal(h.metrics.reads, 1)
    h.bounds.width = 561
    h.resize(); h.frame()
    assert.equal(h.metrics.reads, 2)
    assert.ok(h.metrics.dimensions > initialDimensions)
  } finally { h.cleanup() }
})

test('reduced motion shows the accessible local image without sampling or scheduling animation', () => {
  const h = harness({ reduce: true })
  try {
    h.load(); h.resize()
    assert.equal(h.ready(), false)
    assert.equal(h.frames.size, 0)
    assert.equal(h.metrics.reads, 0)
  } finally { h.cleanup() }
})

test('visibility and preference changes stop work; unmount removes listeners and pending image callbacks', () => {
  const h = harness()
  try {
    h.load(); h.frame()
    h.document.hidden = true
    h.emit(h.document, 'visibilitychange')
    assert.equal(h.frames.size, 0)
    const draws = h.metrics.draws
    h.resize(); h.frame()
    assert.equal(h.metrics.draws, draws)
    h.document.hidden = false
    h.emit(h.document, 'visibilitychange'); h.frame()
    assert.equal(h.frames.size, 0)
    h.motion.matches = true
    h.emit(h.motion, 'change')
    assert.equal(h.ready(), false)
    assert.equal(h.frames.size, 0)
  } finally { h.cleanup() }
  assert.equal(h.canvas.handlers.size, 0)
  assert.equal(h.motion.handlers.size, 0)
  assert.equal(h.document.handlers.size, 0)
  assert.equal(h.metrics.disconnected, true)
  assert.equal(h.image.onload, null)
  assert.equal(h.image.onerror, null)
})

test('settled portrait sleeps, pointer motion wakes it, and leaving returns it to sleep', () => {
  const h = harness()
  try {
    h.load(); h.frame()
    assert.equal(h.frames.size, 0)
    h.emit(h.canvas, 'pointermove', { clientX: 480, clientY: 240 })
    assert.equal(h.frames.size, 1)
    for (let i = 0; i < 100; i++) h.frame()
    assert.equal(h.frames.size, 0)
    h.emit(h.canvas, 'pointerleave')
    assert.equal(h.frames.size, 1)
    for (let i = 0; i < 100; i++) h.frame()
    assert.equal(h.frames.size, 0)
  } finally { h.cleanup() }
})

test('image or sample failure retains the local fallback without scheduling a failing loop', () => {
  for (const sampleError of [false, true]) {
    const h = harness({ sampleError })
    try {
      if (sampleError) { h.load(); h.frame() }
      else h.error()
      assert.equal(h.ready(), false)
      assert.equal(h.frames.size, 0)
    } finally { h.cleanup() }
  }
})
