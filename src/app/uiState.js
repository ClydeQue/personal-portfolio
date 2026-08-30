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
  if (action.type === 'collection/category') {
    const categoryExists = action.id === 'all' || portfolio.collection.categories.some(({ id }) => id === action.id)
    const selectionRemainsVisible = action.id === 'all' || portfolio.collection.resources.some(({ id, categoryId }) => id === state.collectionSelection && categoryId === action.id)
    return categoryExists ? { ...state, collectionCategory: action.id, collectionSelection: selectionRemainsVisible ? state.collectionSelection : null } : state
  }
  if (action.type === 'collection/select') {
    const resourceExists = portfolio.collection.resources.some(({ id }) => id === action.id)
    return resourceExists ? { ...state, collectionSelection: action.id } : state
  }
  if (action.type === 'collection/clear-selection') return { ...state, collectionSelection: null }
  if (action.type === 'collection/reset') return { ...state, collectionCategory: 'all', collectionSelection: null }
  return state
}
