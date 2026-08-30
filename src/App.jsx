import { useEffect, useState } from 'react'
import { matchRoute, navigate, subscribeToRoute } from './app/router'
import { readPortfolioView } from './app/uiState.js'
import PortfolioShell from './components/shell/PortfolioShell.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import ProjectDetailPage from './pages/ProjectDetailPage.jsx'
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

  let page

  if (route.name === 'home') page = <HomePage view={view} onViewChange={setView} />
  if (route.name === 'about') page = <AboutPage />
  if (route.name === 'projects') page = <ProjectsPage />
  if (route.name === 'projectDetail') page = <ProjectDetailPage slug={route.params.slug} />

  if (page) {
    return <PortfolioShell route={route} view={view} onViewChange={setView}>
      {page}
    </PortfolioShell>
  }

  return <JstnMode route={route} onNavigate={navigate} />
}

export default App 
