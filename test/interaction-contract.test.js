import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { buildSync } from 'esbuild'
import { activityYear, nextImageSource, particlePointerOffset } from '../src/app/interaction.js'

const repoRoot = new URL('..', import.meta.url).pathname

const loadHarness = async (relativeComponentPath, exportedName) => {
  const tempDir = await mkdtemp(join(tmpdir(), 'task9-interaction-'))
  const bundlePath = join(tempDir, `${exportedName}.mjs`)
  const entryFile = new URL(relativeComponentPath, import.meta.url).pathname
  const source = `
    import React from 'react'
    import TestRenderer, { act } from 'react-test-renderer'
    import Component from ${JSON.stringify(entryFile)}

    globalThis.IS_REACT_ACT_ENVIRONMENT = true

    const summaryOf = (root) => {
      const buttons = root.findAll((node) => node.type === 'button')
        .filter((node) => node.parent?.props?.className === 'activity-heatmap__years')
        .map((node) => ({ year: node.children.join(''), pressed: node.props['aria-pressed'], click: node.props.onClick }))
      const metricValues = root.findAll((node) => node.type === 'strong').map((node) => node.children.join(''))
      const summaryNode = root.find((node) => node.props?.className === 'activity-heatmap__summary')

      return {
        buttons,
        summary: summaryNode.children.join(''),
        metrics: metricValues.slice(0, 4),
      }
    }

    export function exercise(props = {}, clickedYear) {
      let renderer
      act(() => {
        renderer = TestRenderer.create(React.createElement(Component, props))
      })

      const initial = summaryOf(renderer.root)
      const target = initial.buttons.find((button) => button.year === String(clickedYear))

      if (target?.click) {
        act(() => {
          target.click()
        })
      }

      const afterClick = summaryOf(renderer.root)

      act(() => {
        renderer.unmount()
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
  const module = await import(pathToFileURL(bundlePath).href)
  return {
    ...module,
    cleanup: async () => rm(tempDir, { recursive: true, force: true }),
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
    const { initial, afterClick } = loaded.exercise({ years: ['2025', '2026'] }, 2025)

    assert.deepEqual(initial.buttons.map(({ year, pressed }) => ({ year, pressed })), [
      { year: '2025', pressed: false },
      { year: '2026', pressed: true },
    ])
    assert.match(initial.summary, /2026.*48 contributions tracked/)
    assert.deepEqual(initial.metrics, ['48', '16', '2 days', '2 days'])

    assert.deepEqual(afterClick.buttons.map(({ year, pressed }) => ({ year, pressed })), [
      { year: '2025', pressed: true },
      { year: '2026', pressed: false },
    ])
    assert.match(afterClick.summary, /2025.*10 contributions tracked/)
    assert.deepEqual(afterClick.metrics, ['10', '7', '0 days', '2 days'])
  } finally {
    await cleanup()
  }
})

test('particle pointer offset scales with pointer position and disables under inactive input', () => {
  assert.deepEqual(particlePointerOffset({ active: false, x: 200, y: 100 }, { width: 400, height: 200 }), { x: 0, y: 0 })
  assert.deepEqual(particlePointerOffset({ active: true, x: 200, y: 100 }, { width: 400, height: 200 }), { x: 0, y: 0 })
  assert.deepEqual(particlePointerOffset({ active: true, x: 400, y: 200 }, { width: 400, height: 200 }), { x: 18, y: 14 })
})

test('ParticlePortrait registers pointer-driven interaction with reduced-motion-safe guards', async () => {
  const source = await readFile(new URL('../src/components/ui/ParticlePortrait.jsx', import.meta.url), 'utf8')

  assert.match(source, /particlePointerOffset/)
  assert.match(source, /pointermove/)
  assert.match(source, /pointerleave/)
  assert.match(source, /if \(reducedMotion\.matches\) return/)
})
