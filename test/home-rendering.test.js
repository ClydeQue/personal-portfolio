import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import react from '@vitejs/plugin-react'
import { JSDOM } from 'jsdom'
import { portfolio } from '../src/data/portfolio.js'
import { readFile } from 'node:fs/promises'

const renderHome = async (view) => {
  const server = await createServer({ appType: 'custom', plugins: [react()], server: { middlewareMode: true } })
  try {
    const { default: HomePage } = await server.ssrLoadModule('/src/pages/HomePage.jsx')
    return renderToStaticMarkup(React.createElement(HomePage, { view, onViewChange: () => {} }))
  } finally {
    await server.close()
  }
}

const renderParticlePortrait = async () => {
  const server = await createServer({ appType: 'custom', plugins: [react()], server: { middlewareMode: true } })
  try {
    const { default: ParticlePortrait } = await server.ssrLoadModule('/src/components/ui/ParticlePortrait.jsx')
    return renderToStaticMarkup(React.createElement(ParticlePortrait, { alt: 'Kenneth Clyde Que' }))
  } finally {
    await server.close()
  }
}

test('personal home renders organization marks and emphasized description copy', async () => {
  const html = await renderHome('personal')

  assert.match(html, /<img[^>]+alt="Ngnair Brice Holding"/)
  assert.match(html, /<img[^>]+alt="Ateneo de Zamboanga University"/)
  assert.match(html, /<img[^>]+alt="Capytech E-Learning Solutions"/)
  assert.match(html, /<strong[^>]*>microservices and microfrontends<\/strong>/)
})

test('professional home renders compact rich copy without exposing a location', async () => {
  const html = await renderHome('professional')

  assert.match(html, /<strong[^>]*>frontend design, full-stack systems, microservices, and microfrontends<\/strong>/)
  assert.doesNotMatch(html, /Metro Manila|Philippines/)
  assert.match(html, /Tech stack/)
  assert.match(html, /Codex CLI/)
})

test('associated organizations are keyboard-accessible links to their official sites', async () => {
  const dom = new JSDOM(await renderHome('personal'))
  try {
    const links = [...dom.window.document.querySelectorAll('.home-associations a')]
    assert.deepEqual(links.map((link) => link.href), ['https://ngnair.com/', 'https://adzu.edu.ph/', 'https://capytech.com/en/'])
    for (const link of links) {
      assert.ok(link.querySelector('img')?.alt)
      assert.equal(link.target, '_blank')
      assert.match(link.rel, /noopener/)
    }
  } finally { dom.window.close() }
})

test('personal icon groups cover the professional stack without text-only fallback badges', async () => {
  const dom = new JSDOM(await renderHome('personal'))
  try {
    const items = [...dom.window.document.querySelectorAll('.home-panel--stack .tech-list__icon')]
    const expected = portfolio.home.professional.techGroups.flatMap(({ items }) => items)
    assert.deepEqual(items.map((item) => item.getAttribute('aria-label')).sort(), [...expected].sort())
    assert.equal(dom.window.document.querySelectorAll('.home-panel--stack .tech-list__text').length, 0)
    for (const item of items) assert.ok(item.querySelector('img, svg'), item.getAttribute('aria-label'))
  } finally { dom.window.close() }
})

test('pale single-color logos render as dark shapes without flattening multicolor badges', async () => {
  const css = await readFile(new URL('../src/styles/pages.css', import.meta.url), 'utf8')
  const dom = new JSDOM(`<style>${css}</style>${await renderHome('personal')}`)
  try {
    for (const label of ['TanStack Query', 'Cloud Storage', 'React', 'Neon']) {
      const img = dom.window.document.querySelector(`[aria-label="${label}"] img`)
      assert.match(dom.window.getComputedStyle(img).filter, /brightness\(0\)/, `${label} must not retain a pale foreground`)
    }
    for (const label of ['C#', 'Codex CLI', 'TypeScript']) {
      const img = dom.window.document.querySelector(`[aria-label="${label}"] img`)
      assert.doesNotMatch(dom.window.getComputedStyle(img).filter, /brightness\(0\)/, `${label} must preserve its internal detail`)
    }
  } finally { dom.window.close() }
})

test('particle hero never renders the profile photo behind the Three.js canvas', async () => {
  const dom = new JSDOM(await renderParticlePortrait())
  try {
    const portrait = dom.window.document.querySelector('.particle-portrait')
    assert.ok(portrait.querySelector('canvas'))
    assert.equal(portrait.querySelector('img, picture'), null)
    assert.equal(portrait.querySelector('.sr-only')?.textContent, 'Kenneth Clyde Que')
  } finally { dom.window.close() }
})

test('both portfolio views expose the same technology groups and accessible icons', async () => {
  const views = await Promise.all(['personal', 'professional'].map(renderHome))
  const doms = views.map((html) => new JSDOM(html))
  try {
    const entries = doms.map(({ window }) => [...window.document.querySelectorAll('.tech-list section')].map((section) => ({
      title: section.querySelector('h3').textContent,
      items: [...section.querySelectorAll('.tech-list__icon')].map((icon) => icon.getAttribute('aria-label')),
    })))
    assert.deepEqual(entries[0], entries[1])
    for (const icon of doms[1].window.document.querySelectorAll('.tech-list__icon')) {
      assert.ok(icon.querySelector('img, svg'))
      assert.equal(icon.querySelector('.tech-list__label').textContent, icon.getAttribute('aria-label'))
    }
  } finally { doms.forEach((dom) => dom.window.close()) }
})

test('IMS feature renders infrastructure and labeled placeholders without a client destination', async () => {
  const server = await createServer({ appType: 'custom', plugins: [react()], server: { middlewareMode: true } })
  try {
    const { default: Page } = await server.ssrLoadModule('/src/pages/ProjectDetailPage.jsx')
    const dom = new JSDOM(renderToStaticMarkup(React.createElement(Page, { slug: 'ims' })))
    try {
      assert.equal(portfolio.projects[0].slug, 'ims')
      assert.equal(portfolio.projects[0].externalUrl, undefined)
      assert.ok(dom.window.document.querySelector('.project-placeholder'))
      assert.equal(dom.window.document.querySelectorAll('.project-infrastructure li').length, 5)
      assert.match(dom.window.document.body.textContent, /Cloud Run/)
      assert.match(dom.window.document.body.textContent, /Cloudflare R2/)
      assert.doesNotMatch(dom.window.document.body.innerHTML, /ims\.suntasticzc|github\.com\/.*Suntastic/)
    } finally { dom.window.close() }
  } finally { await server.close() }
})
