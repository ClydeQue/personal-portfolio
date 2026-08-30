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

test('Home keeps truthful tech icons and a cached, top-biased particle portrait', () => {
  const homeSource = read('src/pages/HomePage.jsx')
  const portraitSource = read('src/components/ui/ParticlePortrait.jsx')

  assert.doesNotMatch(homeSource, /'ASP\.NET Core': 'c\+\+'/)
  assert.doesNotMatch(homeSource, /SQLite: 'mysql'/)
  assert.doesNotMatch(homeSource, /Vite: 'vercel'/)
  assert.match(portraitSource, /samplePixelsRef/)
  assert.match(portraitSource, /portraitSampleKey/)
  assert.match(portraitSource, /sourceY = \(source\.naturalHeight - sourceHeight\) \* 0\.08/)
})

test('Professional Home uses reusable mail, info, and location icons', () => {
  const homeSource = read('src/pages/HomePage.jsx')
  const iconSource = read('src/components/ui/Icon.jsx')

  for (const name of ['mail', 'info', 'mapPin']) {
    assert.match(iconSource, new RegExp(`${name}: '/icons/`))
    assert.match(homeSource, new RegExp(`name="${name}"`))
  }
})
