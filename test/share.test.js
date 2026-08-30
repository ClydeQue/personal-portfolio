import test from 'node:test'
import assert from 'node:assert/strict'
import { shareProject } from '../src/app/share.js'

const input = { title: 'WaiveRight', text: 'A workflow', url: 'https://portfolio.test/projects/waiveright' }

test('shareProject reports Shared only after Web Share resolves', async () => {
  const result = await shareProject(input, { share: async () => undefined })
  assert.equal(result, 'Shared')
})

test('shareProject falls back to the clipboard when Web Share is unavailable or rejects', async () => {
  const copied = []
  const clipboard = { writeText: async (url) => copied.push(url) }

  assert.equal(await shareProject(input, { clipboard }), 'Link copied')
  assert.equal(await shareProject(input, { share: async () => { throw new Error('cancelled') }, clipboard }), 'Link copied')
  assert.deepEqual(copied, [input.url, input.url])
})

test('shareProject exposes the URL when neither sharing API succeeds', async () => {
  const result = await shareProject(input, { share: async () => { throw new Error('failed') }, clipboard: { writeText: async () => { throw new Error('blocked') } } })
  assert.equal(result, `Share this URL: ${input.url}`)
})
