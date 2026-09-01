import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { matchRoute, routeTable as productionRouteTable } from '../src/app/router.js'
import { portfolio as productionPortfolio } from '../src/data/portfolio.js'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const defaultRoot = resolve(scriptDirectory, '..')
const assetPrefixes = Object.freeze(['/images/', '/fonts/', '/icons/', '/favicon/', '/portfolio/', '/techstack/'])
const mediaField = /(?:image|media|portrait|cover|gallery|asset|thumbnail|avatar|brandmark|icon|fallback)/i
const linkField = /(?:path|route|destination|href|url)$/i
const publicStaticExtension = /\.(?:avif|gif|ico|jpe?g|pdf|png|svg|txt|webmanifest|webp|woff2?|ttf|otf)$/i

const uniqueSorted = (values) => [...new Set(values)].sort()
const toPosixPath = (value) => value.replace(/\\/g, '/')
const stripSearchAndHash = (value) => value.split(/[?#]/, 1)[0]
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function filesRecursively(directory) {
  if (!existsSync(directory)) return []
  if (!statSync(directory).isDirectory()) return [directory]
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? filesRecursively(path) : [path]
  })
}

function readTextFiles(directory) {
  return filesRecursively(directory).flatMap((path) => {
    if (!['', '.css', '.html', '.js', '.jsx', '.json', '.mjs', '.svg', '.webmanifest'].includes(extname(path).toLowerCase())) return []
    try {
      return [{ path, text: readFileSync(path, 'utf8') }]
    } catch {
      return []
    }
  })
}

function isLocalAsset(value) {
  const path = stripSearchAndHash(value)
  return !isExternal(path) && (assetPrefixes.some((prefix) => path.startsWith(prefix)) || (path.startsWith('/') && publicStaticExtension.test(path)))
}

function isBuiltAsset(value) {
  return stripSearchAndHash(value).startsWith('/assets/')
}

function isExternal(value) {
  return /^(?:https?:)?\/\//i.test(value)
}

function isAllowedNonRoute(value) {
  return value.startsWith('#') || /^(?:mailto|tel):/i.test(value)
}

function publicFileExists(root, value, directory = 'public') {
  const relativePath = stripSearchAndHash(value).replace(/^\/+/, '')
  const base = resolve(root, directory)
  const target = resolve(base, relativePath)
  const containment = relative(base, target)
  return !containment.startsWith('..') && !containment.startsWith(`..${toPosixPath('/')}`) && existsSync(target)
}

function collectMediaReference(value, report) {
  if (isExternal(value)) report.forbiddenUrls.push(value)
  else if (isLocalAsset(value)) report.assetReferences.push(stripSearchAndHash(value))
}

function collectPortfolioReferences(value, report, key = '') {
  if (typeof value === 'string') {
    if (mediaField.test(key)) collectMediaReference(value, report)
    if (key === 'icon' && /^[a-z0-9-]+$/i.test(value)) report.assetReferences.push(`/techstack/${value}.svg`)
    if (isLocalAsset(value)) report.assetReferences.push(stripSearchAndHash(value))
    if (linkField.test(key) && (value.startsWith('/') || isAllowedNonRoute(value))) report.internalLinks.push(value)
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectPortfolioReferences(item, report, key))
    return
  }

  if (!value || typeof value !== 'object') return
  for (const [property, item] of Object.entries(value)) {
    collectPortfolioReferences(item, report, property)
  }
}

function collectIconMapReferences(text, report) {
  for (const match of text.matchAll(/\b(?:const|let|var)?\s*(icons|iconFor|techIconMap)\s*=\s*(?:Object\.freeze\()?\{([\s\S]*?)\}/g)) {
    const [, mapName, entries] = match
    for (const entry of entries.matchAll(/:\s*['"]([^'"]+)['"]/g)) {
      const value = entry[1]
      if (isExternal(value) || value.startsWith('/')) collectMediaReference(value, report)
      else if (mapName !== 'icons' && /^[a-z0-9-]+$/i.test(value)) report.assetReferences.push(`/techstack/${value}.svg`)
    }
  }
}

function collectBoundMediaMapReferences(text, report) {
  const bindings = new Set([...text.matchAll(/\b(?:src|poster)\s*:\s*([a-z_$][\w$]*)\s*\[/gi)].map((match) => match[1]))
  for (const binding of bindings) {
    const declaration = new RegExp(`\\b(?:const|let|var)\\s+${escapeRegExp(binding)}\\s*=\\s*(?:Object\\.freeze\\()?\\{([\\s\\S]*?)\\}`, 'g')
    for (const map of text.matchAll(declaration)) {
      for (const entry of map[1].matchAll(/:\s*['"]([^'"]+)['"]/g)) collectMediaReference(entry[1], report)
    }
  }
}

function collectStaticReferences(text, report) {
  const assetPattern = /['"`]((?:\/images|\/fonts|\/icons|\/favicon|\/portfolio|\/techstack)(?:\/[^'"`\s)]+)?)(?:[?#][^'"`\s)]*)?['"`]/g
  for (const match of text.matchAll(assetPattern)) {
    if (!match[1].includes('${')) report.assetReferences.push(stripSearchAndHash(match[1]))
  }

  for (const match of text.matchAll(/\b(?:src|poster)\s*=\s*["']([^"']+)["']/gi)) {
    collectMediaReference(match[1], report)
  }

  for (const match of text.matchAll(/\b(?:src|poster)\s*=\s*\{\s*["']([^"']+)["']\s*\}/gi)) {
    collectMediaReference(match[1], report)
  }

  for (const match of text.matchAll(/\b(?:src|poster)\s*:\s*["']([^"']+)["']/gi)) {
    collectMediaReference(match[1], report)
  }

  for (const match of text.matchAll(/url\(\s*["']?([^\s'"()]+)["']?\s*\)/gi)) {
    collectMediaReference(match[1], report)
  }

  for (const match of text.matchAll(/\bhref\s*=\s*["']([^"']+)["']/gi)) {
    // React's production runtime builds selector strings such as
    // `href="`+value+`"`. They are not rendered links and should not be
    // treated as portfolio routes by the static audit.
    if (!match[1].includes('`')) report.internalLinks.push(match[1])
  }
  for (const match of text.matchAll(/\bnavigate\(\s*["']([^"']+)["']/gi)) report.internalLinks.push(match[1])

  collectIconMapReferences(text, report)
  collectBoundMediaMapReferences(text, report)
}

function normalizeRoute(value) {
  const clean = stripSearchAndHash(value).replace(/\/{2,}/g, '/')
  return clean.length > 1 ? clean.replace(/\/$/, '') : clean || '/'
}

function matchTable(pathname, table) {
  const path = normalizeRoute(pathname)
  for (const route of table) {
    const names = []
    const source = route.pattern.replace(/:([a-z]+)/g, (_, name) => {
      names.push(name)
      return '([a-z0-9]+(?:-[a-z0-9]+)*)'
    })
    const match = path.match(new RegExp(`^${source}$`))
    if (match) return { name: route.name, params: Object.fromEntries(names.map((name, index) => [name, match[index + 1]])) }
  }
  return { name: 'notFound', params: {} }
}

function isRegisteredRoute(value, table, portfolio, useProductionMatcher) {
  if (isAllowedNonRoute(value) || isExternal(value)) return true
  if (!value.startsWith('/')) return false

  const match = useProductionMatcher ? matchRoute(value) : matchTable(value, table)
  if (match.name === 'notFound') return false
  if (match.name === 'projectDetail') return portfolio.projects?.some(({ slug }) => slug === match.params.slug) ?? false
  if (match.name === 'blogDetail') return portfolio.posts?.some(({ slug }) => slug === match.params.slug) ?? false
  return true
}

function auditOverflowRisk(text, location, report) {
  if (/data-overflow-risk|audit-overflow-risk/i.test(text)) report.overflowRiskMarkers.push(toPosixPath(location))
}

export async function auditBuild({
  root = defaultRoot,
  dist = 'dist',
  routeTable = productionRouteTable,
  portfolio = productionPortfolio,
} = {}) {
  const report = {
    missingAssets: [],
    forbiddenUrls: [],
    unregisteredLinks: [],
    overflowRiskMarkers: [],
    checkedAssets: [],
    checkedLinks: [],
  }
  const references = { assetReferences: [], internalLinks: [], forbiddenUrls: [] }
  const sourceFiles = [...readTextFiles(join(root, 'src')), ...readTextFiles(join(root, 'index.html'))]
  const distDirectory = join(root, dist)
  const distFiles = readTextFiles(distDirectory)

  collectPortfolioReferences(portfolio, references)
  for (const source of sourceFiles) {
    collectStaticReferences(source.text, references)
    auditOverflowRisk(source.text, relative(root, source.path), report)
  }
  for (const built of distFiles) {
    collectStaticReferences(built.text, references)
    for (const match of built.text.matchAll(/['"](\/assets\/[^'"\s?#]+)(?:[?#][^'"\s)]*)?['"]/g)) {
      if (!publicFileExists(root, match[1], dist)) report.missingAssets.push(match[1])
    }
    auditOverflowRisk(built.text, relative(root, built.path), report)
  }

  for (const asset of uniqueSorted(references.assetReferences)) {
    const sourceExists = publicFileExists(root, asset)
    const distExists = publicFileExists(root, asset, dist)
    if (!sourceExists || !distExists) report.missingAssets.push(asset)
    else report.checkedAssets.push(asset)
  }

  const useProductionMatcher = routeTable === productionRouteTable
  for (const link of uniqueSorted(references.internalLinks)) {
    if (isLocalAsset(link) || isBuiltAsset(link)) {
      const sourceExists = isBuiltAsset(link) || publicFileExists(root, link)
      const distExists = publicFileExists(root, link, dist)
      if (!sourceExists || !distExists) report.missingAssets.push(stripSearchAndHash(link))
      else report.checkedLinks.push(link)
    } else if (!isRegisteredRoute(link, routeTable, portfolio, useProductionMatcher)) report.unregisteredLinks.push(link)
    else report.checkedLinks.push(link)
  }

  if (!existsSync(distDirectory)) report.missingAssets.push(`${toPosixPath(dist)}/`)
  report.missingAssets = uniqueSorted(report.missingAssets)
  report.forbiddenUrls = uniqueSorted(references.forbiddenUrls)
  report.unregisteredLinks = uniqueSorted(report.unregisteredLinks)
  report.overflowRiskMarkers = uniqueSorted(report.overflowRiskMarkers)
  report.checkedAssets = uniqueSorted(report.checkedAssets)
  report.checkedLinks = uniqueSorted(report.checkedLinks)
  return report
}

function hasFindings(report) {
  return report.missingAssets.length || report.forbiddenUrls.length || report.unregisteredLinks.length || report.overflowRiskMarkers.length
}

async function runCli() {
  const report = await auditBuild()
  console.log(JSON.stringify(report, null, 2))
  if (hasFindings(report)) process.exitCode = 1
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) runCli()
