import { useEffect, useRef } from 'react'
import { portfolio } from '../../data/portfolio.js'
import { navigateFromLink } from '../../app/router.js'

function MobileMenu({ open, view, onViewChange, onClose, triggerRef, route }) {
  const wasOpen = useRef(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    const onPointerDown = (event) => {
      if (!menuRef.current?.contains(event.target) && !triggerRef.current?.contains(event.target)) onClose()
    }
    if (open) {
      document.addEventListener('keydown', onKeyDown)
      document.addEventListener('pointerdown', onPointerDown)
      if (!wasOpen.current) menuRef.current?.querySelector('a')?.focus()
    }
    if (wasOpen.current && !open) triggerRef.current?.focus()
    wasOpen.current = open
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [onClose, open, triggerRef])

  if (!open) return null

  const selectView = (nextView) => {
    onClose()
    onViewChange(nextView)
  }

  return (
    <section id="portfolio-mobile-menu" className="portfolio-mobile-menu" ref={menuRef} aria-label="Navigation menu">
      <nav aria-label="Mobile navigation">
        {portfolio.navigation.map(({ label, path }) => <a key={path} href={path} aria-current={route.path === path || route.path.startsWith(`${path}/`) ? 'page' : undefined} onClick={(event) => { navigateFromLink(event); onClose() }}>{label}<span aria-hidden="true">↗</span></a>)}
      </nav>
      <div className="portfolio-view-switch" aria-label="Portfolio view">
        <button type="button" aria-pressed={view === 'personal'} onClick={() => selectView('personal')}>Personal</button>
        <button type="button" aria-pressed={view === 'professional'} onClick={() => selectView('professional')}>Professional</button>
      </div>
      <a className="portfolio-mobile-menu__primary" href={`${portfolio.socials.email}?subject=Portfolio%20call%20request`} onClick={onClose}>Schedule a Call</a>
      <a className="portfolio-mobile-menu__secondary" href={portfolio.socials.email} onClick={onClose}>Send a Message</a>
    </section>
  )
}

export default MobileMenu
