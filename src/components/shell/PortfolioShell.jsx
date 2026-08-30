import { useEffect, useReducer, useRef } from 'react'
import { readPortfolioView, initialUiState, uiReducer, writePortfolioView } from '../../app/uiState.js'
import AmbientCanvas from './AmbientCanvas.jsx'
import BackToTop from './BackToTop.jsx'
import CustomCursor from './CustomCursor.jsx'
import Footer from './Footer.jsx'
import Header from './Header.jsx'
import MobileMenu from './MobileMenu.jsx'
import StatusBar from './StatusBar.jsx'

function PortfolioShell({ route, view, onViewChange, children }) {
  const [ui, dispatch] = useReducer(uiReducer, initialUiState)
  const menuTriggerRef = useRef(null)
  const storage = (() => {
    try { return window.localStorage } catch { return undefined }
  })()

  useEffect(() => { dispatch({ type: 'navigation/complete' }) }, [route.path])

  const selectView = (nextView) => {
    const normalized = nextView === 'professional' ? 'professional' : 'personal'
    writePortfolioView(storage, normalized)
    onViewChange?.(normalized)
  }

  const selectedView = view ?? readPortfolioView(storage)

  return (
    <div className="portfolio-shell" data-route={route.name}>
      <AmbientCanvas />
      <CustomCursor />
      {route.name !== 'projectDetail' && <StatusBar />}
      <Header route={route} view={selectedView} onViewChange={selectView} menuOpen={ui.menuOpen} onMenuToggle={() => dispatch({ type: 'menu/toggle' })} menuTriggerRef={menuTriggerRef} />
      <MobileMenu open={ui.menuOpen} route={route} view={selectedView} onViewChange={selectView} onClose={() => dispatch({ type: 'menu/close' })} triggerRef={menuTriggerRef} />
      <main className="portfolio-main">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default PortfolioShell
