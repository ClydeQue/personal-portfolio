import { useEffect, useRef, useState } from 'react'
import { particlePointerOffset } from '../../app/interaction.js'
import ImageWithFallback from './ImageWithFallback.jsx'
import { portraitSampleKey, shouldRefreshPortraitSample } from './portraitSampleCache.js'
import { createPortraitParticles, createPortraitProjection, projectPortraitParticle, smoothPortraitPose } from './portraitParticles.js'

const PORTRAIT_SOURCES = ['/images/me.webp', '/images/me.png']

function ParticlePortrait({ alt = 'Kenneth Clyde Que', className = '' }) {
  const canvasRef = useRef(null)
  const frameRef = useRef(null)
  const samplePixelsRef = useRef(null)
  const pointerRef = useRef({ active: false, x: 0, y: 0 })
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined

    const source = new Image()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let cancelled = false
    let failed = false
    let loaded = false
    let inViewport = true
    let ready = false
    let lastTime = null
    let pose = { x: 0, y: 0, active: 0 }
    let bounds = canvas.getBoundingClientRect()

    const prepareSamples = (bounds) => {
      if (samplePixelsRef.current && !shouldRefreshPortraitSample(samplePixelsRef.current.cacheKey, bounds)) return samplePixelsRef.current

      const sampleCanvas = document.createElement('canvas')
      // Fixed work budget, including unusually tall layouts: at most 102,400 samples.
      const sampleWidth = Math.max(1, Math.round(320 * Math.min(1, bounds.width / bounds.height)))
      const sampleHeight = Math.max(1, Math.round(sampleWidth * (bounds.height / bounds.width)))
      sampleCanvas.width = sampleWidth
      sampleCanvas.height = sampleHeight

      const sampleContext = sampleCanvas.getContext('2d', { willReadFrequently: true })
      if (!sampleContext) throw new Error('Portrait sampling unavailable')
      const sourceRatio = source.naturalWidth / source.naturalHeight
      const sampleRatio = sampleWidth / sampleHeight
      const sourceWidth = sourceRatio > sampleRatio ? source.naturalHeight * sampleRatio : source.naturalWidth
      const sourceHeight = sourceRatio > sampleRatio ? source.naturalHeight : source.naturalWidth / sampleRatio
      const sourceX = (source.naturalWidth - sourceWidth) / 2
      const sourceY = (source.naturalHeight - sourceHeight) * 0.08

      sampleContext.drawImage(source, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sampleWidth, sampleHeight)
      samplePixelsRef.current = {
        particles: createPortraitParticles(sampleContext.getImageData(0, 0, sampleWidth, sampleHeight).data, sampleWidth, sampleHeight),
        sampleWidth,
        sampleHeight,
        cacheKey: portraitSampleKey(bounds),
      }
      return samplePixelsRef.current
    }

    const stop = () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      frameRef.current = null
      lastTime = null
    }

    const showFallback = () => {
      stop()
      context.clearRect(0, 0, bounds.width, bounds.height)
      setIsReady(false)
    }

    const draw = (time) => {
      frameRef.current = null
      if (cancelled || failed || !loaded || reducedMotion.matches || document.hidden || !inViewport || !bounds.width || !bounds.height) return

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.round(bounds.width * pixelRatio)
      const height = Math.round(bounds.height * pixelRatio)
      if (canvas.width !== width) canvas.width = width
      if (canvas.height !== height) canvas.height = height
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      let sample
      try {
        sample = prepareSamples(bounds)
      } catch {
        failed = true
        showFallback()
        return
      }

      context.fillStyle = '#27323b'
      context.fillRect(0, 0, bounds.width, bounds.height)

      for (let y = 18; y < bounds.height; y += 37) {
        for (let x = 18; x < bounds.width; x += 37) {
          context.fillStyle = 'rgb(167 184 221 / 34%)'
          context.fillRect(x, y, 2, 2)
        }
      }

      const pointerOffset = particlePointerOffset(pointerRef.current, bounds)
      const target = { x: pointerOffset.x / 18, y: pointerOffset.y / 14, active: pointerRef.current.active ? 1 : 0 }
      pose = smoothPortraitPose(pose, target, lastTime === null ? 16 : time - lastTime)
      lastTime = time
      const projection = createPortraitProjection(pose, bounds)
      const step = bounds.width / sample.sampleWidth
      context.globalCompositeOperation = 'lighter'

      for (const particle of sample.particles) {
        const { x, y } = projectPortraitParticle(particle, pose, bounds, false, projection)
        const size = Math.min(2, step * particle.size)
        // A restrained blue halo plus a crisp white-blue core retains point texture.
        context.fillStyle = 'rgba(63, 103, 255, 0.055)'
        context.fillRect(x - size, y - size, size * 2, size * 2)
        context.fillStyle = particle.color
        context.fillRect(x - size / 2, y - size / 2, size, size)
      }

      context.globalCompositeOperation = 'source-over'
      if (!ready) { ready = true; setIsReady(true) }
      // Redraw only until the pointer target is reached. A resting canvas costs no frames.
      if (pose.x !== target.x || pose.y !== target.y || pose.active !== target.active) {
        frameRef.current = requestAnimationFrame(draw)
      } else lastTime = null
    }

    const start = () => {
      if (cancelled || failed || !loaded || reducedMotion.matches || document.hidden || !inViewport || frameRef.current !== null) return
      frameRef.current = requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      if (document.hidden) {
        stop()
        pointerRef.current = { active: false, x: 0, y: 0 }
        return
      }

      start()
    }

    const onMotionChange = () => {
      pose = { x: 0, y: 0, active: 0 }
      pointerRef.current = { active: false, x: 0, y: 0 }
      if (reducedMotion.matches) showFallback()
      else start()
      ready = false
    }

    const resizeObserver = new ResizeObserver(() => {
      bounds = canvas.getBoundingClientRect()
      stop()
      start()
    })
    const intersectionObserver = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting
      if (inViewport) start()
      else {
        stop()
        pointerRef.current = { active: false, x: 0, y: 0 }
      }
    })
    intersectionObserver?.observe(canvas)

    source.onload = () => {
      if (cancelled) return
      loaded = true
      samplePixelsRef.current = null
      start()
    }
    source.onerror = () => {
      if (cancelled) return
      failed = true
      showFallback()
    }
    source.src = PORTRAIT_SOURCES[0]

    resizeObserver.observe(canvas)
    document.addEventListener('visibilitychange', onVisibility)
    reducedMotion.addEventListener('change', onMotionChange)
    const onPointerMove = (event) => {
      if (reducedMotion.matches) return
      const bounds = canvas.getBoundingClientRect()
      pointerRef.current = {
        active: true,
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      }
      start()
    }
    const onPointerLeave = () => {
      pointerRef.current = { active: false, x: 0, y: 0 }
      start()
    }
    canvas.addEventListener('pointermove', onPointerMove, { passive: true })
    canvas.addEventListener('pointerleave', onPointerLeave)
    canvas.addEventListener('pointercancel', onPointerLeave)

    return () => {
      cancelled = true
      stop()
      source.onload = null
      source.onerror = null
      samplePixelsRef.current = null
      resizeObserver.disconnect()
      intersectionObserver?.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      reducedMotion.removeEventListener('change', onMotionChange)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      canvas.removeEventListener('pointercancel', onPointerLeave)
    }
  }, [])

  return <div className={`particle-portrait ${isReady ? 'is-ready' : ''} ${className}`.trim()}>
    <ImageWithFallback className="particle-portrait__fallback" sources={PORTRAIT_SOURCES} alt={alt} />
    <canvas className="particle-portrait__canvas" ref={canvasRef} aria-hidden="true" />
  </div>
}

export default ParticlePortrait
