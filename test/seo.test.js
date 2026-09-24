import test from 'node:test'
import assert from 'node:assert/strict'
import { pageMeta, renderHead, sitemapPaths } from '../src/app/seo.js'
import { portfolio } from '../src/data/portfolio.js'

test('sitemap lists every page, project, and post', () => {
  const paths = sitemapPaths()
  assert.ok(paths.includes('/'))
  for (const { slug } of portfolio.projects) assert.ok(paths.includes(`/projects/${slug}`))
  for (const { slug } of portfolio.posts) assert.ok(paths.includes(`/blog/${slug}`))
})

test('every route head names Kenneth Clyde Que with an absolute canonical', () => {
  for (const path of sitemapPaths()) {
    const head = renderHead(pageMeta(path))
    assert.match(head, /<title>[^<]*Kenneth Clyde Que[^<]*<\/title>/)
    assert.match(head, new RegExp(`<link rel="canonical" href="https://www\\.kcque\\.dev${path === '/' ? '/' : path}"`))
    assert.match(head, /og:image" content="https:\/\/www\.kcque\.dev\//)
  }
  assert.match(renderHead(pageMeta('/missing-page')), /noindex/)
})
