import test from 'node:test'
import assert from 'node:assert/strict'
import { Buffer } from 'node:buffer'
import { buildSync } from 'esbuild'
import { JSDOM } from 'jsdom'

const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/' })
const globalKeys = ['window', 'document', 'navigator', 'HTMLElement', 'Node', 'IS_REACT_ACT_ENVIRONMENT']
const initialGlobals = new Map(globalKeys.map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]))
for (const [key, value] of Object.entries({
  window: dom.window,
  document: dom.window.document,
  navigator: dom.window.navigator,
  HTMLElement: dom.window.HTMLElement,
  Node: dom.window.Node,
  IS_REACT_ACT_ENVIRONMENT: true,
})) {
  Object.defineProperty(globalThis, key, { configurable: true, writable: true, value })
}

const bundle = buildSync({
  stdin: {
    contents: `import React, { act } from 'react'; import { render } from '@testing-library/react';
      import ParticlePortrait from './src/components/ui/ParticlePortrait.jsx';
      export { act }; export const mount = () => render(React.createElement(ParticlePortrait));`,
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
  const sampleContext = {
    drawImage() {},
    getImageData(_x, _y, width, height) {
      metrics.reads += 1
      if (sampleError) throw new Error('sample unavailable')
      const data = new Uint8ClampedArray(width * height * 4)
      data.fill(160)
      return { data }
    },
  }
  const canvasPrototype = dom.window.HTMLCanvasElement.prototype
  const canvasHandlersByElement = new WeakMap()
  const previousCanvasMethods = {
    getContext: canvasPrototype.getContext,
    getBoundingClientRect: canvasPrototype.getBoundingClientRect,
    addEventListener: canvasPrototype.addEventListener,
    removeEventListener: canvasPrototype.removeEventListener,
  }
  let canvas
  canvasPrototype.getContext = function getContext() {
    return this === canvas || !canvas ? context : sampleContext
  }
  canvasPrototype.getBoundingClientRect = () => bounds
  canvasPrototype.addEventListener = function addEventListener(name, handler, options) {
    const handlers = canvasHandlersByElement.get(this) ?? new Map()
    handlers.set(name, handler)
    canvasHandlersByElement.set(this, handlers)
    return previousCanvasMethods.addEventListener.call(this, name, handler, options)
  }
  canvasPrototype.removeEventListener = function removeEventListener(name, handler, options) {
    canvasHandlersByElement.get(this)?.delete(name)
    return previousCanvasMethods.removeEventListener.call(this, name, handler, options)
  }
  const motion = { ...events(), matches: reduce }
  const documentRef = dom.window.document
  const previousDocumentHidden = Object.getOwnPropertyDescriptor(documentRef, 'hidden')
  const previousDocumentHandlers = {
    addEventListener: documentRef.addEventListener,
    removeEventListener: documentRef.removeEventListener,
  }
  const documentHandlers = new Map()
  let hidden = false
  Object.defineProperty(documentRef, 'hidden', { configurable: true, get: () => hidden, set: (value) => { hidden = value } })
  documentRef.addEventListener = (name, handler) => { documentHandlers.set(name, handler) }
  documentRef.removeEventListener = (name) => { documentHandlers.delete(name) }
  documentRef.handlers = documentHandlers
  let image
  let resize
  let frameId = 0
  const replacements = {
    IS_REACT_ACT_ENVIRONMENT: true,
    window: dom.window, document: documentRef,
    Image: class { constructor() { image = this; this.naturalWidth = 600; this.naturalHeight = 900 } },
    ResizeObserver: class { constructor(callback) { resize = callback } observe() {} disconnect() { metrics.disconnected = true } },
    requestAnimationFrame: (callback) => { frames.set(++frameId, callback); return frameId },
    cancelAnimationFrame: (id) => frames.delete(id),
  }
  const previous = new Map(Object.keys(replacements).map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]))
  Object.assign(globalThis, replacements)
  dom.window.matchMedia = () => motion
  dom.window.devicePixelRatio = 1
  dom.window.Image = replacements.Image
  let view
  act(() => { view = mount() })
  canvas = view.container.querySelector('canvas')
  canvas.handlers = canvasHandlersByElement.get(canvas)
  for (const property of ['width', 'height']) {
    let value = 0
    Object.defineProperty(canvas, property, { configurable: true, get: () => value, set: (next) => { metrics.dimensions += 1; value = next } })
  }
  let time = 0
  return {
    metrics, frames, canvas, image, motion, document: documentRef, bounds,
    ready: () => view.container.querySelector('.particle-portrait')?.className.includes('is-ready') ?? false,
    load: () => act(() => image.onload?.()),
    error: () => act(() => image.onerror?.()),
    frame: () => act(() => {
      time += 16
      const pending = [...frames.values()]
      frames.clear()
      pending.forEach((callback) => callback(time))
    }),
    resize: () => act(() => resize()),
    emit: (target, name, event = {}) => act(() => {
      if (target?.handlers instanceof Map) {
        target.handlers.get(name)?.(event)
        return
      }
      const browserEvent = new dom.window.Event(name)
      for (const [key, value] of Object.entries(event)) Object.defineProperty(browserEvent, key, { configurable: true, value })
      target.dispatchEvent(browserEvent)
    }),
    cleanup: () => {
      act(() => view.unmount())
      canvasPrototype.getContext = previousCanvasMethods.getContext
      canvasPrototype.getBoundingClientRect = previousCanvasMethods.getBoundingClientRect
      canvasPrototype.addEventListener = previousCanvasMethods.addEventListener
      canvasPrototype.removeEventListener = previousCanvasMethods.removeEventListener
      documentRef.addEventListener = previousDocumentHandlers.addEventListener
      documentRef.removeEventListener = previousDocumentHandlers.removeEventListener
      if (previousDocumentHidden) Object.defineProperty(documentRef, 'hidden', previousDocumentHidden)
      else delete documentRef.hidden
      for (const [key, descriptor] of previous) {
        if (descriptor) Object.defineProperty(globalThis, key, descriptor)
        else delete globalThis[key]
      }
    },
  }
}

test.after(() => {
  for (const [key, descriptor] of initialGlobals) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor)
    else delete globalThis[key]
  }
  dom.window.close()
})

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
