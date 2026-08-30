import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { portfolio } from '../src/data/portfolio.js'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Home registers both persisted views without a mode switch', () => {
  const source = read('src/pages/HomePage.jsx')
  assert.match(source, /personal/i)
  assert.match(source, /professional/i)
  assert.doesNotMatch(source, /Original mode|JSTN mode|ModeSwitcher/)
})

test('Home presentation content is supplied by the canonical portfolio record', () => {
  assert.ok(portfolio.home.personal.associations.length >= 2)
  assert.ok(portfolio.home.personal.techGroups.length >= 2)
  assert.ok(portfolio.home.personal.description.length >= 1)
  assert.ok(portfolio.home.professional.about.length >= 1)
})
