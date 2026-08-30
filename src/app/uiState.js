import { portfolio } from '../data/portfolio.js'

export const VIEW_STORAGE_KEY = 'portfolio-view'

export const initialUiState = Object.freeze({
  menuOpen: false,
  experienceIndex: 0,
  collectionCategory: 'all',
  collectionSelection: null,
})

export function readPortfolioView(storage) {
  try {
    return storage?.getItem(VIEW_STORAGE_KEY) === 'professional' ? 'professional' : 'personal'
  } catch {
    return 'personal'
  }
}

export function writePortfolioView(storage, view) {
  try {
    storage?.setItem(VIEW_STORAGE_KEY, view === 'professional' ? 'professional' : 'personal')
  } catch {
    return false
  }
  return true
}

export function uiReducer(state, action) {
  if (action.type === 'menu/open') return { ...state, menuOpen: true }
  if (action.type === 'menu/toggle') return { ...state, menuOpen: !state.menuOpen }
  if (action.type === 'navigation/complete' || action.type === 'menu/close') return { ...state, menuOpen: false }
  if (action.type === 'experience/select') {
    const index = Number.isInteger(action.index) && action.index >= 0 && action.index < portfolio.experiencePhases.length
      ? action.index
      : 0
    return { ...state, experienceIndex: index }
  }
  if (action.type === 'collection/category') return { ...state, collectionCategory: action.id, collectionSelection: null }
  if (action.type === 'collection/select') return { ...state, collectionSelection: action.id }
  return state
}
