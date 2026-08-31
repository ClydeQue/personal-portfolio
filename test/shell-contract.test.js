import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const readSource = (path) => readFile(new URL(path, import.meta.url), 'utf8')

test('the view switch is shared across routes and selecting another route returns Home', async () => {
  const [menu, shell, header, pages, shellStyles] = await Promise.all([
    readSource('../src/components/shell/MobileMenu.jsx'),
    readSource('../src/components/shell/PortfolioShell.jsx'),
    readSource('../src/components/shell/Header.jsx'),
    readSource('../src/styles/pages.css'),
    readSource('../src/styles/shell.css'),
  ])

  assert.match(menu, /function MobileMenu\(\{ open, view,/)
  assert.doesNotMatch(menu, /route\.name === 'home'/)
  assert.match(menu, /onClose\(\)/)
  assert.match(shell, /<MobileMenu open=\{ui\.menuOpen\} view=\{selectedView\}/)
  assert.match(shell, /route\.name !== 'home'/)
  assert.match(shell, /navigate\('\/'\)/)
  assert.match(header, /<div className="portfolio-view-switch" aria-label="Portfolio view">/)
  assert.doesNotMatch(header, /route\.name === 'home'/)
  assert.match(pages, /\.projects-page__intro h1 \{[^}]*font-weight: 700;[^}]*letter-spacing: -1\.6px;[^}]*line-height: 80px;/)
  assert.match(shellStyles, /\.portfolio-cursor i \{[^}]*background: #858585;[^}]*border: 0;/)
  assert.match(shellStyles, /\.portfolio-cursor b \{[^}]*background: #858585;[^}]*border: 0;/)
})

test('the ambient canvas cancels animation frames while hidden and resumes when visible', async () => {
  const source = await readSource('../src/components/shell/AmbientCanvas.jsx')

  assert.match(source, /const stop = \(\) => \{\s*if \(frame !== undefined\) window\.cancelAnimationFrame\(frame\)/)
  assert.match(source, /const visibility = \(\) => \{\s*if \(document\.hidden\) stop\(\)\s*else start\(\)/)
  assert.match(source, /if \(!document\.hidden\) start\(\)/)
})

test('source-fidelity corrections keep collection controls compact and dark arrows white', async () => {
  const [pages, shell] = await Promise.all([
    readSource('../src/styles/pages.css'),
    readSource('../src/styles/shell.css'),
  ])

  assert.match(pages, /\.collection-page__source > p:not\(\.page-kicker\) \{[^}]*font-size: 11px;[^}]*line-height: 1\.45;/)
  assert.match(pages, /\.home-page--professional \{[^}]*background: #fff;/)
  assert.match(pages, /\.project-detail-page__actions a:first-child img \{[^}]*filter: none;/)
  assert.match(shell, /\.portfolio-header__schedule img \{[^}]*filter: none;/)
})
