import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import react from '@vitejs/plugin-react'

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
