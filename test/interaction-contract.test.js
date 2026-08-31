import test from 'node:test'
import assert from 'node:assert/strict'
import { activityYear, nextImageSource } from '../src/app/interaction.js'

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
