import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'

test('Vite serves the SPA entry for the case-colliding /license route', async (context) => {
  const server = await createServer({
    root: new URL('..', import.meta.url).pathname,
    logLevel: 'error',
    server: { host: '127.0.0.1', port: 0 },
    optimizeDeps: { noDiscovery: true },
  })

  context.after(async () => {
    await server.close()
  })
  await server.listen()
  const port = server.httpServer.address().port

  const route = await fetch(`http://127.0.0.1:${port}/license?direct=1`)
  const staticLicense = await fetch(`http://127.0.0.1:${port}/LICENSE.txt?download=1`)
  const module = await fetch(`http://127.0.0.1:${port}/src/main.jsx`)

  assert.equal(route.status, 200)
  assert.match(await route.text(), /<div id="root"><\/div>/)
  assert.equal(staticLicense.status, 200)
  assert.match(await staticLicense.text(), /GNU GENERAL PUBLIC LICENSE/)
  assert.equal(module.status, 200)
  assert.match(await module.text(), /StrictMode/)
})
