import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { JSDOM } from 'jsdom'
import { buildSync } from 'esbuild'
import { activityYear, nextImageSource, particlePointerOffset } from '../src/app/interaction.js'
import { portfolio } from '../src/data/portfolio.js'

const repoRoot = new URL('..', import.meta.url).pathname

const loadHarness = async (relativeComponentPath, exportedName) => {
  const tempDir = await mkdtemp(join(tmpdir(), 'task9-interaction-'))
  const bundlePath = join(tempDir, `${exportedName}.mjs`)
  const entryFile = new URL(relativeComponentPath, import.meta.url).pathname
  const source = `
    import React, { act } from 'react'
    import { render } from '@testing-library/react'
    import Component from ${JSON.stringify(entryFile)}

    globalThis.IS_REACT_ACT_ENVIRONMENT = true

    const summaryOf = (container) => {
      const buttons = [...container.querySelectorAll('.activity-heatmap__years button')]
        .map((node) => ({ year: node.textContent, pressed: node.getAttribute('aria-pressed') === 'true', click: () => node.click() }))
      const metricValues = [...container.querySelectorAll('strong')].map((node) => node.textContent)
      const summaryNode = container.querySelector('.activity-heatmap__summary')

      return {
        buttons,
        summary: summaryNode?.textContent ?? '',
        metrics: metricValues.slice(0, 4),
      }
    }

    export function exercise(props = {}, clickedYear) {
      let view
      act(() => {
        view = render(React.createElement(Component, props))
      })

      const initial = summaryOf(view.container)
      const target = initial.buttons.find((button) => button.year === String(clickedYear))

      if (target?.click) {
        act(() => {
          target.click()
        })
      }

      const afterClick = summaryOf(view.container)

      act(() => {
        view.unmount()
      })

      return { initial, afterClick }
    }
  `

  const result = buildSync({
    stdin: {
      contents: source,
      resolveDir: repoRoot,
      sourcefile: `${exportedName}.entry.mjs`,
      loader: 'js',
    },
    bundle: true,
    format: 'esm',
    platform: 'browser',
    write: false,
    jsx: 'automatic',
  })

  await writeFile(bundlePath, result.outputFiles[0].text, 'utf8')
  const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/' })
  const globalKeys = ['window', 'document', 'navigator', 'HTMLElement', 'Node', 'IS_REACT_ACT_ENVIRONMENT']
  const previous = new Map(globalKeys.map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]))
  const replacements = {
    window: dom.window,
    document: dom.window.document,
    navigator: dom.window.navigator,
    HTMLElement: dom.window.HTMLElement,
    Node: dom.window.Node,
    IS_REACT_ACT_ENVIRONMENT: true,
  }
  for (const [key, value] of Object.entries(replacements)) {
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value })
  }
  const module = await import(pathToFileURL(bundlePath).href)
  return {
    ...module,
    cleanup: async () => {
      for (const [key, descriptor] of previous) {
        if (descriptor) Object.defineProperty(globalThis, key, descriptor)
        else delete globalThis[key]
      }
      dom.window.close()
      await rm(tempDir, { recursive: true, force: true })
    },
  }
}

test('image fallback advances locally then returns null', () => {
  const sources = ['/images/a.webp', '/images/b.webp']

  assert.equal(nextImageSource(sources, 0), '/images/b.webp')
  assert.equal(nextImageSource(sources, 1), null)
})

test('image fallback ignores invalid sources and exhausted indexes', () => {
  assert.equal(nextImageSource(['/images/a.webp', '', null, '/images/b.webp'], -1), '/images/a.webp')
  assert.equal(nextImageSource([], 0), null)
  assert.equal(nextImageSource(['/images/a.webp'], 4), null)
})

test('activity selection falls back to the newest available year', () => {
  const years = [{ year: 2026 }, { year: 2025 }]

  assert.equal(activityYear(years, 2024).year, 2026)
})

test('activity selection normalizes string years and preserves real matches', () => {
  const years = ['2025', '2026', '2024']

  assert.equal(activityYear(years, '2025').year, 2025)
  assert.equal(activityYear(years, 2024).year, 2024)
})

test('activity selection handles unordered and empty year inputs safely', () => {
  assert.equal(activityYear([{ year: 2023 }, { year: 2026 }, { year: 2024 }], null).year, 2026)
  assert.equal(activityYear([], 2026), null)
})

test('ActivityHeatmap updates pressed state, summary, and stats after clicking a year', async () => {
  let cleanup = async () => {}
  try {
    const loaded = await loadHarness('../src/components/ui/ActivityHeatmap.jsx', 'ActivityHeatmapHarness')
    cleanup = loaded.cleanup
    const activityYears = portfolio.activity.years
    const newestYear = activityYears.at(-1)
    const historicalYear = activityYears.find(({ year }) => year < newestYear.year)
    const metricValues = ({ totalContributions, activeDays, currentStreak, longestStreak }) => [
      String(totalContributions),
      String(activeDays),
      `${currentStreak} ${currentStreak === 1 ? 'day' : 'days'}`,
      `${longestStreak} ${longestStreak === 1 ? 'day' : 'days'}`,
    ]
    const { initial, afterClick } = loaded.exercise({}, historicalYear.year)

    assert.deepEqual(initial.buttons.map(({ year, pressed }) => ({ year, pressed })), [
      ...activityYears.map(({ year }) => ({ year: String(year), pressed: year === newestYear.year })),
    ])
    assert.match(initial.summary, new RegExp(`${newestYear.year}.*${newestYear.totalContributions} contributions tracked`))
    assert.deepEqual(initial.metrics, metricValues(newestYear))

    assert.deepEqual(afterClick.buttons.map(({ year, pressed }) => ({ year, pressed })), [
      ...activityYears.map(({ year }) => ({ year: String(year), pressed: year === historicalYear.year })),
    ])
    assert.match(afterClick.summary, new RegExp(`${historicalYear.year}.*${historicalYear.totalContributions} contributions tracked`))
    assert.deepEqual(afterClick.metrics, metricValues(historicalYear))
  } finally {
    await cleanup()
  }
})

test('particle pointer offset scales with pointer position and disables under inactive input', () => {
  assert.deepEqual(particlePointerOffset({ active: false, x: 200, y: 100 }, { width: 400, height: 200 }), { x: 0, y: 0 })
  assert.deepEqual(particlePointerOffset({ active: true, x: 200, y: 100 }, { width: 400, height: 200 }), { x: 0, y: 0 })
  assert.deepEqual(particlePointerOffset({ active: true, x: 400, y: 200 }, { width: 400, height: 200 }), { x: 18, y: 14 })
})

test('ParticlePortrait registers Three.js pointer interaction with reduced-motion-safe guards', async () => {
  const source = await readFile(new URL('../src/components/ui/ParticlePortrait.jsx', import.meta.url), 'utf8')

  assert.match(source, /WebGLRenderer/)
  assert.match(source, /new THREE\.Points/)
  assert.match(source, /pointermove/)
  assert.match(source, /pointerleave/)
  assert.match(source, /prefers-reduced-motion/)
  assert.doesNotMatch(source, /getImageData|drawImage|createPortraitParticles/)
})
