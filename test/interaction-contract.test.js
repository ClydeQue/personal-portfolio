import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { renderToStaticMarkup } from 'react-dom/server'
import { build } from 'esbuild'
import { activityYear, nextImageSource } from '../src/app/interaction.js'

const repoRoot = new URL('..', import.meta.url).pathname

const loadActivityHeatmap = async () => {
  const entryFile = new URL('../src/components/ui/ActivityHeatmap.jsx', import.meta.url)
  const result = await build({
    entryPoints: [entryFile.pathname],
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
    jsx: 'automatic',
    packages: 'external',
    absWorkingDir: repoRoot,
  })

  const bundled = result.outputFiles[0]?.text
  const tempDir = join(repoRoot, '.tmp', 'activity-heatmap-test')
  await mkdir(tempDir, { recursive: true })
  const bundlePath = join(tempDir, 'ActivityHeatmap.mjs')
  await writeFile(bundlePath, bundled, 'utf8')
  return import(pathToFileURL(bundlePath).href)
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

test('ActivityHeatmap initially selects the newest numeric year for unordered string inputs', () => {
  return loadActivityHeatmap().then(({ default: ActivityHeatmap }) => {
    const markup = renderToStaticMarkup(React.createElement(ActivityHeatmap, { years: ['2025', '2026'] }))

    assert.match(markup, /Clyde Que&#x27;s contribution activity for 2026\. 48 contributions tracked\./)
    assert.match(markup, /aria-pressed="false">2025<\/button>/)
    assert.match(markup, /aria-pressed="true">2026<\/button>/)
    assert.match(markup, /aria-label="2026 repository activity summary"/)
    assert.match(markup, />48<\/strong><\/span><span><small>Active days<\/small><strong>16<\/strong>/)
  })
})

test('ActivityHeatmap year controls remain wired to requestedYear and selected-year stats', async () => {
  const source = await readFile(new URL('../src/components/ui/ActivityHeatmap.jsx', import.meta.url), 'utf8')

  assert.match(source, /const normalizedEntries = yearOptions\.map\(\(\{ entry \}\) => entry\)/)
  assert.match(source, /const selectedEntry = activityYear\(normalizedEntries, requestedYear\)/)
  assert.match(source, /aria-pressed=\{candidateYear === year\}/)
  assert.match(source, /onClick=\{\(\) => setRequestedYear\(candidateYear\)\}/)
  assert.match(source, /aria-label=\{`\$\{year\} repository activity summary`\}/)
  assert.match(source, /contribution activity for \{year\}\. \{yearMetrics\.totalCommits\} contributions tracked\./)
})
