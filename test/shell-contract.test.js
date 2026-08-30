import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const readSource = (path) => readFile(new URL(path, import.meta.url), 'utf8')

test('the mobile view switch is available only to the Home route', async () => {
  const [menu, shell] = await Promise.all([
    readSource('../src/components/shell/MobileMenu.jsx'),
    readSource('../src/components/shell/PortfolioShell.jsx'),
  ])

  assert.match(menu, /function MobileMenu\(\{ open, route, view,/)
  assert.match(menu, /\{route\.name === 'home' && \(/)
  assert.match(shell, /<MobileMenu open=\{ui\.menuOpen\} route=\{route\}/)
})

test('the ambient canvas cancels animation frames while hidden and resumes when visible', async () => {
  const source = await readSource('../src/components/shell/AmbientCanvas.jsx')

  assert.match(source, /const stop = \(\) => \{\s*if \(frame !== undefined\) window\.cancelAnimationFrame\(frame\)/)
  assert.match(source, /const visibility = \(\) => \{\s*if \(document\.hidden\) stop\(\)\s*else start\(\)/)
  assert.match(source, /if \(!document\.hidden\) start\(\)/)
})
