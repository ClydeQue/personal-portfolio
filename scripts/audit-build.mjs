import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { matchRoute, routeTable as productionRouteTable } from '../src/app/router.js'
import { portfolio as productionPortfolio } from '../src/data/portfolio.js'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const defaultRoot = resolve(scriptDirectory, '..')
const assetPrefixes = Object.freeze(['/images/', '/fonts/', '/icons/', '/favicon/', '/portfolio/', '/techstack/', '/LICENSE.txt'])
const mediaField = /(?:image|media|portrait|cover|gallery|asset|thumbnail|avatar|brandmark|icon)/i
const linkField = /(?:path|route|destination|href|url)$/i
const publicStaticExtension = /\.(?:avif|gif|ico|jpe?g|pdf|png|svg|txt|webmanifest|webp|woff2?|ttf|otf)$/i

const uniqueSorted = (values) => [...new Set(values)].sort()
const toPosixPath = (value) => value.replace(/\\/g, '/')
const stripSearchAndHash = (value) => value.split(/[?#]/, 1)[0]

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
  return assetPrefixes.some((prefix) => path.startsWith(prefix)) || (path.startsWith('/') && publicStaticExtension.test(path))
}

function isBuiltAsset(value) {
  return stripSearchAndHash(value).startsWith('/assets/')
}

function isExternal(value) {
  return /^https?:\/\//i.test(value)
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

function collectPortfolioReferences(value, report, key = '') {
  if (Array.isArray(value)) {
    value.forEach((item) => collectPortfolioReferences(item, report, key))
    return
  }

  if (!value || typeof value !== 'object') return
  for (const [property, item] of Object.entries(value)) {
    if (typeof item === 'string') {
      if (mediaField.test(property) && isExternal(item)) report.forbiddenUrls.push(item)
      if (isLocalAsset(item)) report.assetReferences.push(stripSearchAndHash(item))
      if (linkField.test(property) && (item.startsWith('/') || isAllowedNonRoute(item))) report.internalLinks.push(item)
      continue
    }
    collectPortfolioReferences(item, report, property)
  }
}

function collectStaticReferences(text, report) {
  const assetPattern = /['"`]((?:\/images|\/fonts|\/icons|\/favicon|\/portfolio|\/techstack)(?:\/[^'"`\s)]+)?|\/LICENSE\.txt)(?:[?#][^'"`\s)]*)?['"`]/g
  for (const match of text.matchAll(assetPattern)) {
    if (!match[1].includes('${')) report.assetReferences.push(stripSearchAndHash(match[1]))
  }

  for (const match of text.matchAll(/\b(?:src|poster)\s*=\s*["']([^"']+)["']/gi)) {
    const value = match[1]
    if (isExternal(value)) report.forbiddenUrls.push(value)
    else if (isLocalAsset(value)) report.assetReferences.push(stripSearchAndHash(value))
  }

  for (const match of text.matchAll(/url\(\s*["']?([^\s'"()]+)["']?\s*\)/gi)) {
    const value = match[1]
    if (isExternal(value)) report.forbiddenUrls.push(value)
    else if (isLocalAsset(value)) report.assetReferences.push(stripSearchAndHash(value))
  }

  for (const match of text.matchAll(/\bhref\s*=\s*["']([^"']+)["']/gi)) report.internalLinks.push(match[1])
  for (const match of text.matchAll(/\bnavigate\(\s*["']([^"']+)["']/gi)) report.internalLinks.push(match[1])

  const usesDynamicTechstack = /\/techstack\/\$\{[^}]+\}\.svg/.test(text)
  if (!usesDynamicTechstack) return
  for (const match of text.matchAll(/\bicon\s*:\s*['"]([a-z0-9-]+)['"]/gi)) report.assetReferences.push(`/techstack/${match[1]}.svg`)
  for (const match of text.matchAll(/\b(?:iconFor|techIconMap)\s*=\s*\{([\s\S]*?)\}/g)) {
    for (const value of match[1].matchAll(/:\s*['"]([a-z0-9-]+)['"]/gi)) report.assetReferences.push(`/techstack/${value[1]}.svg`)
  }
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
  if (isLocalAsset(value) || isBuiltAsset(value)) return true
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
    if (!isRegisteredRoute(link, routeTable, portfolio, useProductionMatcher)) report.unregisteredLinks.push(link)
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
