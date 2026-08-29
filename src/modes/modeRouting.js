export const modeStorageKey = 'portfolio-mode'
export const jstnPathStorageKey = 'portfolio-jstn-path'

// The detail route is represented as a route family because project slugs are data-driven.
export const jstnRoutes = Object.freeze([
  '/',
  '/about',
  '/projects',
  '/projects/:slug',
  '/experience',
  '/collection',
])

const staticJstnPaths = new Set(jstnRoutes.filter((route) => !route.includes(':')))
const projectSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function cleanPathname(pathname) {
  if (typeof pathname !== 'string' || pathname.length === 0) return '/'

  const pathOnly = pathname.split(/[?#]/, 1)[0]
  if (!pathOnly.startsWith('/')) return '/'

  const normalized = pathOnly.replace(/\/+/g, '/').replace(/\/+$/, '')
  return normalized || '/'
}

export function normalizeJstnPath(pathname) {
  const cleanedPath = cleanPathname(pathname).toLowerCase()

  if (staticJstnPaths.has(cleanedPath)) return cleanedPath

  const projectMatch = cleanedPath.match(/^\/projects\/([^/]+)$/)
  if (projectMatch && projectSlugPattern.test(projectMatch[1])) {
    return `/projects/${projectMatch[1]}`
  }

  return '/'
}

export function modeFromLocation({ pathname, savedMode } = {}) {
  if (savedMode === 'original' || savedMode === 'jstn') return savedMode

  return normalizeJstnPath(pathname) === '/' ? 'original' : 'jstn'
}

function storedValue(storage, key) {
  try {
    if (!storage || typeof storage.getItem !== 'function') return null

    const value = storage.getItem(key)
    return typeof value === 'string' ? value : null
  } catch {
    return null
  }
}

export function modeFromEnvironment({ pathname, storage } = {}) {
  return modeFromLocation({
    pathname,
    savedMode: storedValue(storage, modeStorageKey),
  })
}

export function jstnPathFromEnvironment({ pathname, storage } = {}) {
  const locationPath = normalizeJstnPath(pathname)
  if (locationPath !== '/') return locationPath

  return normalizeJstnPath(storedValue(storage, jstnPathStorageKey))
}

export function modeChangeState({ nextMode, pathname, savedJstnPath } = {}) {
  const currentJstnPath = normalizeJstnPath(pathname)
  const storedJstnPath = normalizeJstnPath(savedJstnPath)
  const jstnPath = currentJstnPath !== '/' ? currentJstnPath : storedJstnPath

  if (nextMode === 'original') {
    return { mode: 'original', pathname: '/', jstnPath }
  }

  return { mode: 'jstn', pathname: jstnPath, jstnPath }
}
