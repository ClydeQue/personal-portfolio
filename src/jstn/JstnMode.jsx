import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { matchRoute } from '../app/router'
import JstnFooter from './components/JstnFooter'
import JstnHeader from './components/JstnHeader'
import AboutPage from './pages/AboutPage'
import CollectionPage from './pages/CollectionPage'
import ExperiencePage from './pages/ExperiencePage'
import HomePage from './pages/HomePage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ProjectsPage from './pages/ProjectsPage'
import './jstn.css'

function JstnMode({ pathname = '/', route = matchRoute(pathname), onNavigate }) {
  const rootRef = useRef(null)
  const { name, params, path } = route

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || typeof window === 'undefined') return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const reveals = root.querySelectorAll('.jstn-reveal')
    if (reveals.length === 0) return undefined

    const context = gsap.context(() => {
      gsap.fromTo(reveals,
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.56, ease: 'power2.out', stagger: 0.055, clearProps: 'transform,opacity,visibility' },
      )
    }, root)

    return () => context.revert()
  }, [path])

  let page = <HomePage onNavigate={onNavigate} />

  if (name === 'about') page = <AboutPage onNavigate={onNavigate} />
  if (name === 'projects') page = <ProjectsPage onNavigate={onNavigate} />
  if (name === 'projectDetail') page = <ProjectDetailPage slug={params.slug} onNavigate={onNavigate} />
  if (name === 'experience') page = <ExperiencePage onNavigate={onNavigate} />
  if (name === 'collection') page = <CollectionPage onNavigate={onNavigate} />

  return (
    <main className="jstn-mode" ref={rootRef} aria-label="Clyde Que editorial portfolio">
      <JstnHeader path={path} onNavigate={onNavigate} />
      <div className="jstn-shell">
        {page}
        <JstnFooter onNavigate={onNavigate} />
      </div>
    </main>
  )
}

export default JstnMode
