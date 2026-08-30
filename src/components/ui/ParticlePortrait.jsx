import { useEffect, useRef, useState } from 'react'
import ImageWithFallback from './ImageWithFallback.jsx'

const PORTRAIT_SOURCES = ['/images/me.webp', '/images/me.png']

function ParticlePortrait({ alt = 'Kenneth Clyde Que', className = '' }) {
  const canvasRef = useRef(null)
  const frameRef = useRef(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = canvas.getContext('2d')
    const source = new Image()
    let cancelled = false

    const draw = () => {
      if (cancelled || !context || !source.naturalWidth) return
      const bounds = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(bounds.width * pixelRatio)
      canvas.height = Math.round(bounds.height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      context.clearRect(0, 0, bounds.width, bounds.height)
      context.fillStyle = '#27323b'
      context.fillRect(0, 0, bounds.width, bounds.height)

      const sampleCanvas = document.createElement('canvas')
      const sampleWidth = 190
      const sampleHeight = Math.round(sampleWidth * (bounds.height / bounds.width))
      sampleCanvas.width = sampleWidth
      sampleCanvas.height = sampleHeight
      const sampleContext = sampleCanvas.getContext('2d', { willReadFrequently: true })
      const sourceRatio = source.naturalWidth / source.naturalHeight
      const sampleRatio = sampleWidth / sampleHeight
      const sourceWidth = sourceRatio > sampleRatio ? source.naturalHeight * sampleRatio : source.naturalWidth
      const sourceHeight = sourceRatio > sampleRatio ? source.naturalHeight : source.naturalWidth / sampleRatio
      const sourceX = (source.naturalWidth - sourceWidth) / 2
      const sourceY = (source.naturalHeight - sourceHeight) / 2
      sampleContext.drawImage(source, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sampleWidth, sampleHeight)
      const pixels = sampleContext.getImageData(0, 0, sampleWidth, sampleHeight).data
      const step = Math.max(2.1, bounds.width / 156)
      const time = reducedMotion ? 0 : performance.now() / 850

      for (let y = 0; y < sampleHeight; y += 1) {
        for (let x = 0; x < sampleWidth; x += 1) {
          const offset = (y * sampleWidth + x) * 4
          const brightness = (pixels[offset] + pixels[offset + 1] + pixels[offset + 2]) / 3
          if (brightness < 30) continue
          const alpha = Math.min(1, Math.max(0.17, (brightness - 19) / 178))
          const drift = reducedMotion ? 0 : Math.sin(time + x * 0.31 + y * 0.13) * 1.1
          const size = step * (0.25 + (brightness / 255) * 0.5)
          context.fillStyle = `rgba(${188 + Math.round(brightness * .22)}, ${205 + Math.round(brightness * .17)}, 255, ${alpha})`
          context.fillRect((x / sampleWidth) * bounds.width + drift, (y / sampleHeight) * bounds.height, size, size)
        }
      }
      setIsReady(!reducedMotion)
      if (!reducedMotion && !document.hidden) frameRef.current = requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      cancelAnimationFrame(frameRef.current)
      if (!document.hidden && !reducedMotion) frameRef.current = requestAnimationFrame(draw)
    }
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(draw)
    })

    source.onload = () => { if (!reducedMotion) frameRef.current = requestAnimationFrame(draw) }
    source.onerror = () => setIsReady(false)
    source.src = PORTRAIT_SOURCES[0]
    resizeObserver.observe(canvas)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelled = true
      cancelAnimationFrame(frameRef.current)
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className={`particle-portrait ${isReady ? 'is-ready' : ''} ${className}`}>
      <ImageWithFallback className="particle-portrait__fallback" sources={PORTRAIT_SOURCES} alt={alt} />
      <canvas className="particle-portrait__canvas" ref={canvasRef} aria-hidden="true" />
      <span className="particle-portrait__caption">Zamboanga City, Philippines</span>
    </div>
  )
}

export default ParticlePortrait
