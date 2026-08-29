import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { normalizeJstnPath } from '../modes/modeRouting'
import JstnFooter from './components/JstnFooter'
import JstnHeader from './components/JstnHeader'
import AboutPage from './pages/AboutPage'
import CollectionPage from './pages/CollectionPage'
import ExperiencePage from './pages/ExperiencePage'
import HomePage from './pages/HomePage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ProjectsPage from './pages/ProjectsPage'
import './jstn.css'

function JstnMode({ pathname = '/', onExit, onNavigate }) {
  const rootRef = useRef(null)
  const path = normalizeJstnPath(pathname)
  const projectSlug = path.startsWith('/projects/') ? path.slice('/projects/'.length) : undefined

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

  if (path === '/about') page = <AboutPage onNavigate={onNavigate} />
  if (path === '/projects') page = <ProjectsPage onNavigate={onNavigate} />
  if (projectSlug) page = <ProjectDetailPage slug={projectSlug} onNavigate={onNavigate} />
  if (path === '/experience') page = <ExperiencePage onNavigate={onNavigate} />
  if (path === '/collection') page = <CollectionPage onNavigate={onNavigate} />

  return (
    <main className="jstn-mode" ref={rootRef} aria-label="Clyde Que editorial portfolio">
      <JstnHeader path={path} onNavigate={onNavigate} onExit={onExit} />
      <div className="jstn-shell">
        {page}
        <JstnFooter onNavigate={onNavigate} />
      </div>
    </main>
  )
}

export default JstnMode
