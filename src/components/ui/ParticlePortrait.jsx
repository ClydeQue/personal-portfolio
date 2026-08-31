import { useEffect, useRef, useState } from 'react'
import ImageWithFallback from './ImageWithFallback.jsx'
import { portraitSampleKey, shouldRefreshPortraitSample } from './portraitSampleCache.js'

const PORTRAIT_SOURCES = ['/images/me.webp', '/images/me.png']

function ParticlePortrait({ alt = 'Kenneth Clyde Que', className = '' }) {
  const canvasRef = useRef(null)
  const frameRef = useRef(null)
  const samplePixelsRef = useRef(null)
  const sourceRef = useRef(null)
  const motionQueryRef = useRef(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined

    const source = new Image()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionQueryRef.current = reducedMotion
    sourceRef.current = source

    let cancelled = false

    const prepareSamples = (bounds) => {
      if (samplePixelsRef.current && !shouldRefreshPortraitSample(samplePixelsRef.current.cacheKey, bounds)) return samplePixelsRef.current

      const sampleCanvas = document.createElement('canvas')
      const sampleWidth = 220
      const sampleHeight = Math.round(sampleWidth * (bounds.height / bounds.width))
      sampleCanvas.width = sampleWidth
      sampleCanvas.height = sampleHeight

      const sampleContext = sampleCanvas.getContext('2d', { willReadFrequently: true })
      const sourceRatio = source.naturalWidth / source.naturalHeight
      const sampleRatio = sampleWidth / sampleHeight
      const sourceWidth = sourceRatio > sampleRatio ? source.naturalHeight * sampleRatio : source.naturalWidth
      const sourceHeight = sourceRatio > sampleRatio ? source.naturalHeight : source.naturalWidth / sampleRatio
      const sourceX = (source.naturalWidth - sourceWidth) / 2
      const sourceY = (source.naturalHeight - sourceHeight) * 0.08

      sampleContext.drawImage(source, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sampleWidth, sampleHeight)
      samplePixelsRef.current = {
        pixels: sampleContext.getImageData(0, 0, sampleWidth, sampleHeight).data,
        sampleWidth,
        sampleHeight,
        cacheKey: portraitSampleKey(bounds),
      }
      return samplePixelsRef.current
    }

    const stop = () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }

    const draw = () => {
      if (cancelled || !source.naturalWidth) return

      const bounds = canvas.getBoundingClientRect()
      if (!bounds.width || !bounds.height) return

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(bounds.width * pixelRatio)
      canvas.height = Math.round(bounds.height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      context.fillStyle = '#27323b'
      context.fillRect(0, 0, bounds.width, bounds.height)

      for (let y = 18; y < bounds.height; y += 37) {
        for (let x = 18; x < bounds.width; x += 37) {
          context.fillStyle = 'rgb(167 184 221 / 34%)'
          context.fillRect(x, y, 2, 2)
        }
      }

      const { pixels, sampleWidth, sampleHeight } = prepareSamples(bounds)
      const step = Math.max(1.55, bounds.width / 205)
      const time = reducedMotion.matches ? 0 : performance.now() / 850
      context.globalCompositeOperation = 'screen'

      for (let y = 0; y < sampleHeight; y += 1) {
        for (let x = 0; x < sampleWidth; x += 1) {
          const offset = (y * sampleWidth + x) * 4
          const brightness = (pixels[offset] + pixels[offset + 1] + pixels[offset + 2]) / 3
          const noise = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
          const random = noise - Math.floor(noise)
          if (brightness < 16 || random > Math.min(0.97, (brightness + 76) / 220)) continue

          const jitter = Math.sin(x * 93.9898 + y * 23.135) * 2731.155
          const jitterRandom = jitter - Math.floor(jitter)
          const alpha = Math.min(1, Math.max(0.38, (brightness + 40) / 126))
          const drift = reducedMotion.matches ? 0 : Math.sin(time + x * 0.31 + y * 0.13) * 1.1
          const size = step * (0.22 + (brightness / 255) * 0.6)
          const jitterX = (jitterRandom - 0.5) * 1.5
          const jitterY = (random - 0.5) * 1.5

          context.fillStyle = `rgba(${120 + Math.round(brightness * 0.5)}, ${170 + Math.round(brightness * 0.32)}, 255, ${alpha})`
          context.fillRect((x / sampleWidth) * bounds.width + drift + jitterX, (y / sampleHeight) * bounds.height + jitterY, size, size)
        }
      }

      context.globalCompositeOperation = 'source-over'
      setIsReady(!reducedMotion.matches)
      frameRef.current = null
      if (!reducedMotion.matches && !document.hidden) frameRef.current = requestAnimationFrame(draw)
    }

    const renderOnce = () => {
      stop()
      draw()
    }

    const start = () => {
      if (reducedMotion.matches || document.hidden || frameRef.current !== null || !source.naturalWidth) return
      frameRef.current = requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      if (document.hidden) {
        stop()
        return
      }

      if (reducedMotion.matches) renderOnce()
      else start()
    }

    const onMotionChange = () => {
      if (reducedMotion.matches) renderOnce()
      else if (!document.hidden) start()
      setIsReady(!reducedMotion.matches)
    }

    const resizeObserver = new ResizeObserver(() => {
      if (reducedMotion.matches) renderOnce()
      else {
        stop()
        start()
      }
    })

    source.onload = () => {
      samplePixelsRef.current = null
      if (reducedMotion.matches) renderOnce()
      else start()
    }
    source.onerror = () => setIsReady(false)
    source.src = PORTRAIT_SOURCES[0]

    resizeObserver.observe(canvas)
    document.addEventListener('visibilitychange', onVisibility)
    reducedMotion.addEventListener('change', onMotionChange)

    return () => {
      cancelled = true
      stop()
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      reducedMotion.removeEventListener('change', onMotionChange)
    }
  }, [])

  return <div className={`particle-portrait ${isReady ? 'is-ready' : ''} ${className}`.trim()}>
    <ImageWithFallback className="particle-portrait__fallback" sources={PORTRAIT_SOURCES} alt={alt} />
    <canvas className="particle-portrait__canvas" ref={canvasRef} aria-hidden="true" />
  </div>
}

export default ParticlePortrait
