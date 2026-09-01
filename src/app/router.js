export const routeTable = Object.freeze([
  { name: 'home', pattern: '/' },
  { name: 'about', pattern: '/about' },
  { name: 'projects', pattern: '/projects' },
  { name: 'projectDetail', pattern: '/projects/:slug' },
  { name: 'experience', pattern: '/experience' },
  { name: 'collection', pattern: '/collection' },
  { name: 'blog', pattern: '/blog' },
  { name: 'blogDetail', pattern: '/blog/:slug' },
])

export function normalizePath(pathname = '/') {
  const clean = pathname.split(/[?#]/, 1)[0].toLowerCase().replace(/\/{2,}/g, '/')
  const normalized = clean.length > 1 ? clean.replace(/\/$/, '') : clean
  return normalized || '/'
}

export function matchRoute(pathname) {
  const path = normalizePath(pathname)
  for (const route of routeTable) {
    const names = []
    const source = route.pattern.replace(/:([a-z]+)/g, (_, name) => {
      names.push(name)
      return '([a-z0-9]+(?:-[a-z0-9]+)*)'
    })
    const match = path.match(new RegExp(`^${source}$`))
    if (match) return { name: route.name, path, params: Object.fromEntries(names.map((name, index) => [name, match[index + 1]])) }
  }
  return { name: 'notFound', path, params: {} }
}

export function navigate(to, { replace = false } = {}) {
  const path = normalizePath(to)
  window.history[replace ? 'replaceState' : 'pushState']({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function subscribeToRoute(listener) {
  window.addEventListener('popstate', listener)
  return () => window.removeEventListener('popstate', listener)
}
