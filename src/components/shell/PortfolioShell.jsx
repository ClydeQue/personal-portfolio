import { useEffect, useReducer, useRef } from 'react'
import { navigate } from '../../app/router.js'
import { readPortfolioView, initialUiState, shouldNavigateHomeForViewChange, uiReducer, writePortfolioView } from '../../app/uiState.js'
import AmbientCanvas from './AmbientCanvas.jsx'
import BackToTop from './BackToTop.jsx'
import CustomCursor from './CustomCursor.jsx'
import Footer from './Footer.jsx'
import Header from './Header.jsx'
import MobileMenu from './MobileMenu.jsx'

function PortfolioShell({ route, view, onViewChange, children }) {
  const [ui, dispatch] = useReducer(uiReducer, initialUiState)
  const menuTriggerRef = useRef(null)
  const storage = (() => {
    try { return window.localStorage } catch { return undefined }
  })()

  useEffect(() => { dispatch({ type: 'navigation/complete' }) }, [route.path])

  const selectedView = view ?? readPortfolioView(storage)

  const selectView = (nextView) => {
    const normalized = nextView === 'professional' ? 'professional' : 'personal'
    writePortfolioView(storage, normalized)
    onViewChange?.(normalized)
    if (shouldNavigateHomeForViewChange(route.name, selectedView, normalized)) navigate('/')
  }

  return (
    <div className="portfolio-shell" data-route={route.name}>
      <a className="portfolio-skip-link" href="#main-content">Skip to content</a>
      <AmbientCanvas />
      <CustomCursor />
      <Header route={route} view={selectedView} onViewChange={selectView} menuOpen={ui.menuOpen} onMenuToggle={() => dispatch({ type: 'menu/toggle' })} menuTriggerRef={menuTriggerRef} />
      <MobileMenu open={ui.menuOpen} view={selectedView} onViewChange={selectView} onClose={() => dispatch({ type: 'menu/close' })} triggerRef={menuTriggerRef} route={route} />
      <main className="portfolio-main" id="main-content" tabIndex={-1}>{children}</main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default PortfolioShell
