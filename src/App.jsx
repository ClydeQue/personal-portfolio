import { useEffect, useState } from 'react'
import { matchRoute, navigate, subscribeToRoute } from './app/router'
import { readPortfolioView } from './app/uiState.js'
import PortfolioShell from './components/shell/PortfolioShell.jsx'
import HomePage from './pages/HomePage.jsx'
import JstnMode from './jstn/JstnMode'

function App() {
  const [route, setRoute] = useState(() => matchRoute(window.location.pathname))
  const [view, setView] = useState(() => readPortfolioView(window.localStorage))

  useEffect(() => subscribeToRoute(() => {
    setRoute(matchRoute(window.location.pathname))
  }), [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [route.path])

  if (route.name === 'home') {
    return <PortfolioShell route={route} view={view} onViewChange={setView}>
      <HomePage view={view} onViewChange={setView} />
    </PortfolioShell>
  }

  return <JstnMode route={route} onNavigate={navigate} />
}

export default App 
