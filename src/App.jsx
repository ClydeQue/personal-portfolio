import { useEffect, useState } from 'react'
import { matchRoute, subscribeToRoute } from './app/router'
import { readPortfolioView } from './app/uiState.js'
import PortfolioShell from './components/shell/PortfolioShell.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import ProjectDetailPage from './pages/ProjectDetailPage.jsx'
import ExperiencePage from './pages/ExperiencePage.jsx'
import CollectionPage from './pages/CollectionPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import BlogDetailPage from './pages/BlogDetailPage.jsx'
import LicensePage from './pages/LicensePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

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
  if (route.name === 'experience') page = <ExperiencePage />
  if (route.name === 'collection') page = <CollectionPage />
  if (route.name === 'blog') page = <BlogPage />
  if (route.name === 'blogDetail') page = <BlogDetailPage slug={route.params.slug} />
  if (route.name === 'license') page = <LicensePage />
  if (route.name === 'notFound') page = <NotFoundPage path={route.path} />

  if (page) {
    return <PortfolioShell route={route} view={view} onViewChange={setView}>
      {page}
    </PortfolioShell>
  }

  return <NotFoundPage path={route.path} />
}

export default App 
