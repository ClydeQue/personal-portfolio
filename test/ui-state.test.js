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

test('experience keyboard navigation wraps and supports phase endpoints', () => {
  assert.equal(getExperienceKeyboardIndex('ArrowDown', 3, 4), 0)
  assert.equal(getExperienceKeyboardIndex('ArrowUp', 0, 4), 3)
  assert.equal(getExperienceKeyboardIndex('Home', 2, 4), 0)
  assert.equal(getExperienceKeyboardIndex('End', 0, 4), 3)
  assert.equal(getExperienceKeyboardIndex('Enter', 1, 4), null)
})

test('view persistence normalizes writes and tolerates unavailable storage', () => {
  const writes = []
  assert.equal(writePortfolioView({ setItem: (...args) => writes.push(args) }, 'professional'), true)
  assert.deepEqual(writes, [['portfolio-view', 'professional']])
  assert.equal(writePortfolioView({ setItem: () => { throw new Error('blocked') } }, 'personal'), false)
})
