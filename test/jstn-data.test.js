import test from 'node:test'
import assert from 'node:assert/strict'
import { experience, projects, techStack } from '../src/jstn/data.js'

test('JSTN data exports immutable local portfolio records', () => {
  assert.ok(Object.isFrozen(projects))
  assert.ok(Object.isFrozen(experience))
  assert.ok(Object.isFrozen(techStack))
  assert.equal(projects.length, 6)
  assert.equal(experience.length, 3)

  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    assert.match(project.image, /^\/images\//)
    assert.ok(Object.isFrozen(project))
  }
})

test('JSTN career records retain the verified employers and dates', () => {
  assert.deepEqual(experience.map(({ company, period }) => ({ company, period })), [
    { company: 'Ngnair Payments', period: 'Jul 2026–Present' },
    { company: 'Capytech E-Learning Solutions', period: 'Jun 2026' },
    { company: 'JP Consulting and Services', period: 'Apr 2026–May 2026' },
  ])
})
