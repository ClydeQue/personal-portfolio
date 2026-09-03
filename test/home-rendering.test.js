import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import react from '@vitejs/plugin-react'
import { JSDOM } from 'jsdom'
import { portfolio } from '../src/data/portfolio.js'

const renderHome = async (view) => {
  const server = await createServer({ appType: 'custom', plugins: [react()], server: { middlewareMode: true } })
  try {
    const { default: HomePage } = await server.ssrLoadModule('/src/pages/HomePage.jsx')
    return renderToStaticMarkup(React.createElement(HomePage, { view, onViewChange: () => {} }))
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
