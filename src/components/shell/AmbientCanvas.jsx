import { useEffect, useRef } from 'react'

function AmbientCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return undefined

    let frame
    let paused = document.hidden
    const dots = Array.from({ length: 30 }, (_, index) => ({ x: (index * 97) % 1000, y: (index * 53) % 800, speed: 0.08 + (index % 4) * 0.025 }))
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
    const draw = (time) => {
      if (!paused) {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight)
        context.fillStyle = 'rgba(19, 66, 255, 0.09)'
        dots.forEach((dot) => {
          const x = (dot.x + time * dot.speed) % window.innerWidth
          const y = (dot.y + time * dot.speed * 0.35) % window.innerHeight
          context.fillRect(x, y, 1, 1)
        })
      }
      frame = window.requestAnimationFrame(draw)
    }
    const visibility = () => { paused = document.hidden }
    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', visibility)
    frame = window.requestAnimationFrame(draw)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="portfolio-ambient" aria-hidden="true" />
}

export default AmbientCanvas
