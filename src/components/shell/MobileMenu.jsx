import { useEffect, useRef } from 'react'
import { portfolio } from '../../data/portfolio.js'
import { navigate } from '../../app/router.js'

function MobileMenu({ open, view, onViewChange, onClose, triggerRef }) {
  const wasOpen = useRef(false)

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKeyDown)
    if (wasOpen.current && !open) triggerRef.current?.focus()
    wasOpen.current = open
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose, open, triggerRef])

  if (!open) return null

  const goTo = (path) => {
    onClose()
    navigate(path)
  }

  return (
    <section id="portfolio-mobile-menu" className="portfolio-mobile-menu" role="dialog" aria-label="Navigation menu">
      <nav aria-label="Mobile navigation">
        {portfolio.navigation.map(({ label, path }) => <button key={path} type="button" onClick={() => goTo(path)}>{label}</button>)}
      </nav>
      <div className="portfolio-view-switch" aria-label="Portfolio view">
        <button type="button" aria-pressed={view === 'personal'} onClick={() => onViewChange('personal')}>Personal</button>
        <button type="button" aria-pressed={view === 'professional'} onClick={() => onViewChange('professional')}>Professional</button>
      </div>
      <a className="portfolio-mobile-menu__primary" href={`${portfolio.socials.email}?subject=Portfolio%20call%20request`} onClick={onClose}>Schedule a Call</a>
      <a className="portfolio-mobile-menu__secondary" href={portfolio.socials.email} onClick={onClose}>Send a Message</a>
    </section>
  )
}

export default MobileMenu
