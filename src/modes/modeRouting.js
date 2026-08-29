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
