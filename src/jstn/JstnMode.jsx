import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { normalizeJstnPath } from '../modes/modeRouting'
import JstnFooter from './components/JstnFooter'
import JstnHeader from './components/JstnHeader'
import EditorialPanel from './components/EditorialPanel'
import HomePage from './pages/HomePage'
import './jstn.css'

function RouteFallback({ path, onNavigate }) {
  return (
    <EditorialPanel className="jstn-route-fallback" label="Public route" title="This section is being prepared">
      <p>
        <code>{path}</code> is part of Clyde’s public portfolio route map. Its dedicated page arrives in the next pass; the shared shell and home route are ready now.
      </p>
      <button className="jstn-text-link" type="button" onClick={() => onNavigate('/')}>
        Return home <span aria-hidden="true">↗</span>
      </button>
    </EditorialPanel>
  )
}

function JstnMode({ pathname = '/', onExit, onNavigate }) {
  const rootRef = useRef(null)
  const path = normalizeJstnPath(pathname)

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

  return (
    <main className="jstn-mode" ref={rootRef} aria-label="Clyde Que editorial portfolio">
      <JstnHeader path={path} onNavigate={onNavigate} onExit={onExit} />
      <div className="jstn-shell">
        {path === '/'
          ? <HomePage onNavigate={onNavigate} />
          : <RouteFallback path={path} onNavigate={onNavigate} />}
        <JstnFooter onNavigate={onNavigate} />
      </div>
    </main>
  )
}

export default JstnMode
