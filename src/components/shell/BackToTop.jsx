import { useEffect, useState } from 'react'

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 600)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  if (!visible) return null
  return <button className="portfolio-back-to-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}>↑</button>
}

export default BackToTop
