import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const licenseRouteFallback = () => ({
  name: 'license-route-fallback',
  configureServer(server) {
    server.middlewares.use((request, _response, next) => {
      const url = new URL(request.url ?? '/', 'http://vite.local')

      if ((request.method === 'GET' || request.method === 'HEAD') && url.pathname === '/license') {
        request.url = `/index.html${url.search}`
      }

      next()
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [licenseRouteFallback(), react(), tailwindcss()],
})
