import test from 'node:test'
import assert from 'node:assert/strict'
import {
  initialUiState,
  readPortfolioView,
  uiReducer,
  VIEW_STORAGE_KEY,
  writePortfolioView,
} from '../src/app/uiState.js'
import { getExperienceKeyboardIndex } from '../src/app/interaction.js'
import { collectionSelection } from '../src/data/selectors.js'

test('view storage accepts only Personal and Professional', () => {
  assert.equal(readPortfolioView({ getItem: () => 'professional' }), 'professional')
  assert.equal(readPortfolioView({ getItem: () => 'original' }), 'personal')
  assert.equal(VIEW_STORAGE_KEY, 'portfolio-view')
})

test('the reducer closes the menu after navigation and selects experience phases', () => {
  const open = uiReducer(initialUiState, { type: 'menu/open' })
  assert.equal(uiReducer(open, { type: 'navigation/complete' }).menuOpen, false)
  assert.equal(uiReducer(initialUiState, { type: 'experience/select', index: 2 }).experienceIndex, 2)
})

test('the reducer resets an invalid experience phase to the first phase', () => {
  assert.equal(uiReducer(initialUiState, { type: 'experience/select', index: -1 }).experienceIndex, 0)
  assert.equal(uiReducer(initialUiState, { type: 'experience/select', index: 99 }).experienceIndex, 0)
})

test('collection selection keeps a real resource selected when a stale id is requested', () => {
  const selected = uiReducer(initialUiState, { type: 'collection/select', id: 'scorm-package-testing' })
  const next = uiReducer(selected, { type: 'collection/select', id: 'removed-resource' })

  assert.equal(selected.collectionSelection, 'scorm-package-testing')
  assert.equal(next.collectionSelection, 'scorm-package-testing')
})

test('collection search can clear a stale detail selection', () => {
  const selected = { ...initialUiState, collectionSelection: 'scorm-package-testing' }

  assert.equal(uiReducer(selected, { type: 'collection/clear-selection' }).collectionSelection, null)
})

test('collection category change preserves selection when the resource remains visible', () => {
  const selected = uiReducer(initialUiState, { type: 'collection/select', id: 'tanstack-query' })
  const next = uiReducer(selected, { type: 'collection/category', id: 'all' })

  assert.equal(next.collectionCategory, 'all')
  assert.equal(next.collectionSelection, 'tanstack-query')
})

test('collection reset clears explicit state so detail returns the first resource', () => {
  const selected = { ...initialUiState, collectionCategory: 'tools-libraries', collectionSelection: 'figma-first-interface-work' }
  const reset = uiReducer(selected, { type: 'collection/reset' })

  assert.equal(reset.collectionCategory, 'all')
  assert.equal(reset.collectionSelection, null)
  assert.equal(collectionSelection('', reset.collectionCategory, reset.collectionSelection)?.id, 'scorm-package-testing')
})

test('experience keyboard navigation wraps and supports phase endpoints', () => {
  assert.equal(getExperienceKeyboardIndex('ArrowDown', 3, 4), 0)
  assert.equal(getExperienceKeyboardIndex('ArrowUp', 0, 4), 3)
  assert.equal(getExperienceKeyboardIndex('Home', 2, 4), 0)
  assert.equal(getExperienceKeyboardIndex('End', 0, 4), 3)
  assert.equal(getExperienceKeyboardIndex('Enter', 1, 4), null)
  assert.equal(getExperienceKeyboardIndex('ArrowDown', 0, 0), null)
})

test('view persistence normalizes writes and tolerates unavailable storage', () => {
  const writes = []
  assert.equal(writePortfolioView({ setItem: (...args) => writes.push(args) }, 'professional'), true)
  assert.deepEqual(writes, [['portfolio-view', 'professional']])
  assert.equal(writePortfolioView({ setItem: () => { throw new Error('blocked') } }, 'personal'), false)
})
