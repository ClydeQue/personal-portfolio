import { useEffect, useState } from 'react'

function CustomCursor() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setEnabled(finePointer.matches && !reducedMotion.matches)
    sync()
    finePointer.addEventListener('change', sync)
    reducedMotion.addEventListener('change', sync)
    return () => {
      finePointer.removeEventListener('change', sync)
      reducedMotion.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return undefined
    const onMove = ({ clientX, clientY }) => {
      document.documentElement.style.setProperty('--cursor-x', `${clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${clientY}px`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled])

  if (!enabled) return null
  return <div className="portfolio-cursor" aria-hidden="true"><i /><b /></div>
}

export default CustomCursor
