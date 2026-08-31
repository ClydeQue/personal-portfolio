import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { readFileSync } from 'node:fs'
import {
  buildSnapshot,
  formatSnapshotModule,
  normalizeContributionCalendar,
  writeSnapshotAtomically,
} from '../scripts/github-activity-sync.mjs'

const calendar = {
  totalContributions: 6,
  weeks: [
    { contributionDays: [
      { date: '2024-01-03', contributionCount: 3 },
      { date: '2024-01-01', contributionCount: 0 },
    ] },
    { contributionDays: [
      { date: '2024-01-02', contributionCount: 1 },
      { date: '2024-01-04', contributionCount: 2 },
    ] },
  ],
}

test('publishes the GitHub activity sync command without client credentials', () => {
  const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

  assert.equal(packageJson.scripts['sync:github-activity'], 'node scripts/github-activity-sync.mjs')
})

test('normalizes GraphQL contribution days in stable date order and derives year metrics', () => {
  assert.deepEqual(normalizeContributionCalendar(calendar, { year: 2024, snapshotDate: '2024-01-04' }), {
    year: 2024,
    from: '2024-01-01T00:00:00Z',
    to: '2024-12-31T23:59:59Z',
    totalContributions: 6,
    activeDays: 3,
    currentStreak: 3,
    longestStreak: 3,
    contributionsByDate: [
      { date: '2024-01-02', contributions: 1 },
      { date: '2024-01-03', contributions: 3 },
      { date: '2024-01-04', contributions: 2 },
    ],
  })
})

test('rejects empty and malformed contribution calendar responses', () => {
  assert.throws(() => normalizeContributionCalendar({}, { year: 2024, snapshotDate: '2024-01-04' }), /contributionCalendar/)
  assert.throws(() => normalizeContributionCalendar({ totalContributions: 0, weeks: [{}] }, { year: 2024, snapshotDate: '2024-01-04' }), /contributionDays/)
  assert.throws(() => normalizeContributionCalendar({ totalContributions: 1, weeks: [{ contributionDays: [{ date: 'not-a-date', contributionCount: 1 }] }] }, { year: 2024, snapshotDate: '2024-01-04' }), /ISO date/)
  assert.throws(() => normalizeContributionCalendar({ totalContributions: 1, weeks: [{ contributionDays: [{ date: '2026-02-30', contributionCount: 1 }] }] }, { year: 2026, snapshotDate: '2026-08-31' }), /ISO date/)
  assert.throws(() => buildSnapshot({ years: [2024], calendars: new Map([[2024, calendar]]), snapshotDate: '2024-02-30' }), /ISO snapshot date/)
})

test('generates a deterministic public module with calendar-year data', () => {
  const calendars = new Map([[2024, calendar], [2025, { ...calendar, totalContributions: 0, weeks: [{ contributionDays: [] }] }]])
  const snapshot = buildSnapshot({ years: [2025, 2024], calendars, snapshotDate: '2026-08-31' })
  const first = formatSnapshotModule(snapshot)
  const second = formatSnapshotModule(buildSnapshot({ years: [2024, 2025], calendars, snapshotDate: '2026-08-31' }))

  assert.deepEqual(snapshot.years.map(({ year }) => year), [2024, 2025])
  assert.equal(first, second)
  assert.match(first, /GitHub contribution activity/)
  assert.doesNotMatch(first, /commitsByDate|totalCommits/)
})

test('keeps an existing public snapshot when an atomic write cannot finish', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'github-activity-sync-'))
  const destination = join(directory, 'githubActivity.js')
  await writeFile(destination, 'previous snapshot\n', 'utf8')

  try {
    await assert.rejects(
      writeSnapshotAtomically(destination, 'next snapshot\n', {
        renameFile: async () => { throw new Error('simulated rename failure') },
      }),
      /simulated rename failure/,
    )
    assert.equal(await readFile(destination, 'utf8'), 'previous snapshot\n')
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})
