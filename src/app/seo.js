import { portfolio } from '../data/portfolio.js'
import { matchRoute } from './router.js'

export const SITE_URL = 'https://www.kcque.dev'
export const SITE_NAME = 'Kenneth Clyde Que'
export const DEFAULT_IMAGE = '/og-image.png'

const person = 'Kenneth Clyde Que'
const defaults = {
  title: `${person} | Software Engineer in Zamboanga City, Philippines`,
  description: 'Kenneth Clyde Que (Clyde Que) is a software engineer in Zamboanga City, Philippines, building full-stack web applications, business systems, and interfaces. Software Engineer at Ngnair Brice Holding and BS Computer Science student at Ateneo de Zamboanga University.',
}

const staticPages = {
  about: { title: `About | ${person}, Software Engineer`, description: 'About Kenneth Clyde Que: software engineer and product builder from Zamboanga City, Philippines, working across frontend, full-stack systems, QA, and cloud delivery.' },
  projects: { title: `Projects | ${person}`, description: 'Projects by Kenneth Clyde Que: an inventory management system, court and camera booking platforms, university systems, and client websites.' },
  experience: { title: `Experience | ${person}`, description: 'Work experience of Kenneth Clyde Que: Software Engineer at Ngnair Brice Holding, Solutions Developer Intern at Capytech, and Web Development Intern at JP Consulting.' },
  collection: { title: `Collection | ${person}`, description: 'Reference notes and resources collected by Kenneth Clyde Que on development, architecture, and tooling.' },
  blog: { title: `Writing | ${person}`, description: 'Case-study notes by Kenneth Clyde Que on the systems he has built.' },
}

export function pageMeta(pathname) {
  const route = matchRoute(pathname)
  const path = route.name === 'notFound' ? pathname : route.path
  if (route.name === 'projectDetail') {
    const project = portfolio.projects.find(({ slug }) => slug === route.params.slug)
    if (project) return { path, title: `${project.title} | ${person}`, description: project.summary, image: project.cover ?? DEFAULT_IMAGE }
  }
  if (route.name === 'blogDetail') {
    const post = portfolio.posts.find(({ slug }) => slug === route.params.slug)
    if (post) return { path, title: `${post.title} | ${person}`, description: post.dek, image: post.cover ?? DEFAULT_IMAGE }
  }
  const page = staticPages[route.name]
  return { path, image: DEFAULT_IMAGE, ...(page ?? defaults), noindex: route.name === 'notFound' }
}

export function sitemapPaths() {
  return [
    '/', '/about', '/projects', '/experience', '/collection', '/blog',
    ...portfolio.projects.map(({ slug }) => `/projects/${slug}`),
    ...portfolio.posts.map(({ slug }) => `/blog/${slug}`),
  ]
}

export const absoluteUrl = (path) => new URL(path, SITE_URL).href

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: person,
  alternateName: ['Clyde Que', 'Kenneth Que'],
  url: SITE_URL,
  image: absoluteUrl('/images/profme.webp'),
  jobTitle: 'Software Engineer',
  worksFor: { '@type': 'Organization', name: 'Ngnair Brice Holding', url: 'https://ngnair.com/' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Ateneo de Zamboanga University', url: 'https://adzu.edu.ph/' },
  address: { '@type': 'PostalAddress', addressLocality: 'Zamboanga City', addressCountry: 'PH' },
  knowsAbout: ['Software engineering', 'Full-stack development', 'React', 'Next.js', 'TypeScript', 'ASP.NET Core', 'Cloudflare Workers', 'QA automation'],
  sameAs: [portfolio.socials.github, portfolio.socials.linkedin],
}

const escapeHtml = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function renderHead(meta) {
  const url = absoluteUrl(meta.path)
  const image = absoluteUrl(meta.image)
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    `<link rel="canonical" href=${JSON.stringify(url)} />`,
    `<meta property="og:type" content="${meta.path === '/' ? 'profile' : 'website'}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${JSON.stringify(personSchema)}</script>`,
  ].join('\n    ')
}

export function applyDocumentMeta(meta) {
  document.title = meta.title
  const set = (selector, attribute, value) => document.head.querySelector(selector)?.setAttribute(attribute, value)
  const url = absoluteUrl(meta.path)
  const image = absoluteUrl(meta.image)
  set('meta[name="description"]', 'content', meta.description)
  set('meta[name="robots"]', 'content', meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large')
  set('link[rel="canonical"]', 'href', url)
  set('meta[property="og:url"]', 'content', url)
  set('meta[property="og:title"]', 'content', meta.title)
  set('meta[property="og:description"]', 'content', meta.description)
  set('meta[property="og:image"]', 'content', image)
  set('meta[name="twitter:title"]', 'content', meta.title)
  set('meta[name="twitter:description"]', 'content', meta.description)
  set('meta[name="twitter:image"]', 'content', image)
}
