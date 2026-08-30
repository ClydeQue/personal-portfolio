import { portfolio } from './portfolio.js'

export const projectBySlug = (slug) => portfolio.projects.find((item) => item.slug === slug)

export const postBySlug = (slug) => portfolio.posts.find((item) => item.slug === slug)

export function relatedProjects(slug, count = 2) {
  const current = projectBySlug(slug)
  const explicit = current?.relatedSlugs.map(projectBySlug).filter(Boolean) ?? []
  const fallback = portfolio.projects.filter((item) => item.slug !== slug && !explicit.includes(item))
  return [...explicit, ...fallback].slice(0, count)
}

export function relatedPosts(slug, count = 2) {
  return portfolio.posts.filter((item) => item.slug !== slug).slice(0, count)
}

export function collectionItems(query = '', categoryId = 'all') {
  const needle = query.trim().toLowerCase()
  const category = portfolio.collection.categories.find((item) => item.id === categoryId)
  return portfolio.collection.resources.filter((item) => (
    (categoryId === 'all' || item.categoryId === categoryId)
    && (!needle || `${item.name} ${item.description} ${item.tags.join(' ')} ${item.source ?? ''} ${category?.name ?? ''}`.toLowerCase().includes(needle))
  ))
}

export function collectionSelection(query = '', categoryId = 'all', selectionId = null) {
  const visibleItems = collectionItems(query, categoryId)
  return visibleItems.find(({ id }) => id === selectionId) ?? visibleItems[0] ?? null
}
