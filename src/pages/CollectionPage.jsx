import { useMemo, useReducer, useState } from 'react'
import { initialUiState, uiReducer } from '../app/uiState.js'
import { navigate } from '../app/router.js'
import { portfolio } from '../data/portfolio.js'
import { collectionItems, collectionSelection } from '../data/selectors.js'

const isExternal = (destination) => /^https?:\/\//.test(destination)

function ResourceAction({ resource }) {
  if (!resource.destination) return null

  if (isExternal(resource.destination)) {
    return <a className="collection-detail__action" href={resource.destination} target="_blank" rel="noreferrer">{resource.actionLabel ?? 'Open resource'} <span aria-hidden="true">↗</span></a>
  }

  return <button className="collection-detail__action" type="button" onClick={() => navigate(resource.destination)}>{resource.actionLabel ?? 'Open resource'} <span aria-hidden="true">↗</span></button>
}

function ResourceDestination({ resource }) {
  if (isExternal(resource.destination)) return <a href={resource.destination} target="_blank" rel="noreferrer">{resource.destination}</a>
  return <a href={resource.destination} onClick={(event) => { event.preventDefault(); navigate(resource.destination) }}>{resource.destination}</a>
}

function CollectionPage() {
  const [state, dispatch] = useReducer(uiReducer, initialUiState)
  const [query, setQuery] = useState('')
  const { categories, resources } = portfolio.collection
  const items = useMemo(() => collectionItems(query, state.collectionCategory), [query, state.collectionCategory])
  const selectedResource = useMemo(() => collectionSelection(query, state.collectionCategory, state.collectionSelection), [query, state.collectionCategory, state.collectionSelection])
  const availableFileCount = resources.reduce((count, resource) => count + (resource.files?.length ?? 0), 0)
  const categoryEntries = [portfolio.collection.allCategory, ...categories]

  const resetFilters = () => {
    setQuery('')
    dispatch({ type: 'collection/reset' })
  }

  const updateQuery = (nextQuery) => {
    setQuery(nextQuery)
    if (state.collectionSelection && !collectionItems(nextQuery, state.collectionCategory).some(({ id }) => id === state.collectionSelection)) {
      dispatch({ type: 'collection/clear-selection' })
    }
  }

  return <div className="collection-page portfolio-frame">
    <section className="collection-page__intro" aria-labelledby="collection-title">
      <p className="page-kicker">Collection</p>
      <h1 id="collection-title">Curated repositories and developer resources</h1>
      <p>These are project notes, tools, and documentation I use while building. Pick a category to explore the resources and see how they connect to my work.</p>
      <div className="collection-page__stats" aria-label="Collection statistics">
        <div><span>Categories</span><strong>{categories.length}</strong></div>
        <div><span>Resources</span><strong>{resources.length}</strong></div>
        <div><span>Available files</span><strong>{availableFileCount}</strong></div>
      </div>
    </section>

    <section className="collection-page__controls" aria-label="Collection controls">
      <div className="collection-page__source">
        <p className="page-kicker">Local collection</p>
        <p>I keep my project notes and useful documentation together here.</p>
        <button type="button" onClick={resetFilters}>Reset</button>
      </div>
      <label className="collection-page__search"><span className="sr-only">Search collection</span><input value={query} onChange={(event) => updateQuery(event.target.value)} type="search" placeholder="Search resources, tools, categories…" /></label>
    </section>

    <section className="collection-browser" aria-label="Collection browser">
      <div className="collection-browser__column collection-browser__categories">
        <h2>Categories</h2>
        <div>{categoryEntries.map((category) => {
          const count = category.id === 'all' ? resources.length : collectionItems('', category.id).length
          const active = state.collectionCategory === category.id
          return <button type="button" key={category.id} aria-pressed={active} className={active ? 'is-active' : ''} onClick={() => dispatch({ type: 'collection/category', id: category.id })}>
            <span><strong>{category.name}</strong><small>{category.description}</small></span><b>{count}</b>
          </button>
        })}</div>
      </div>

      <div className="collection-browser__column collection-browser__marketplace">
        <h2>Marketplace</h2>
        <div>{items.length > 0 ? items.map((resource) => {
          const category = categories.find(({ id }) => id === resource.categoryId)
          const active = resource.id === selectedResource?.id
          const sourceBadge = resource.source === 'Official documentation' ? 'Docs' : 'Portfolio'
          return <button type="button" key={resource.id} aria-pressed={active} className={active ? 'is-active' : ''} onClick={() => dispatch({ type: 'collection/select', id: resource.id })}>
            <span className="collection-marketplace__meta">{category?.name}</span><strong>{resource.name}</strong><small>{resource.description}</small><em>{sourceBadge}</em>
          </button>
        }) : <div className="collection-browser__empty"><strong>No matching resources</strong><p>Try a different search term or reset the collection filters.</p></div>}</div>
      </div>

      <article className="collection-browser__column collection-detail" aria-live="polite">
        <h2>Detail</h2>
        {selectedResource ? <div className="collection-detail__card">
          <div className="collection-detail__intro">
            <p className="page-kicker">{categories.find(({ id }) => id === selectedResource.categoryId)?.name}</p>
            <h3>{selectedResource.name}</h3>
            <p>{selectedResource.description}</p>
            {selectedResource.tags?.length ? <ul aria-label={`${selectedResource.name} tags`}>{selectedResource.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul> : null}
            <ResourceAction resource={selectedResource} />
          </div>
          <div className="collection-detail__lower">
            <div className="collection-detail__source"><span>Source</span><strong>{selectedResource.source}</strong></div>
            <div className="collection-detail__destination"><span>Destination</span><ResourceDestination resource={selectedResource} /></div>
          </div>
        </div> : <div className="collection-detail__placeholder"><strong>Select a resource</strong><p>Choose an item from Marketplace to inspect its source, tags, and destination.</p></div>}
      </article>
    </section>
  </div>
}

export default CollectionPage
