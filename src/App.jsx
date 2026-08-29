import React, { useCallback, useEffect, useState, Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import './App.css'
import LoadingSpinner from './components/global/LoadingSpinner'
import ModeSwitcher from './components/ModeSwitcher'
import {
  jstnPathFromEnvironment,
  jstnPathStorageKey,
  modeChangeState,
  modeFromEnvironment,
  modeFromLocation,
  modeStorageKey,
} from './modes/modeRouting'

// Lazy load layouts
const DesktopLayout = React.lazy(() => import('./layouts/DesktopLayout'))
const MobileLayout = React.lazy(() => import('./layouts/MobileLayout'))
const JstnMode = React.lazy(() => import('./jstn/JstnMode'))

const CRITICAL_IMAGES = ['/images/me.webp']

const preloadImage = (src) => {
  return new Promise((resolve) => {
    const image = new Image()
    image.onload = async () => {
      try {
        if (image.decode) {
          await image.decode()
        }
      } catch {
        // The browser already loaded the image, so decoding failure should not block the app.
      }
      resolve()
    }
    image.onerror = resolve
    image.src = src
  })
}

function browserWindow() {
  return typeof window === 'undefined' ? undefined : window
}

function browserStorage(browser) {
  try {
    return browser?.localStorage
  } catch {
    return undefined
  }
}

function persistValue(storage, key, value) {
  try {
    storage?.setItem(key, value)
  } catch {
    // Private browsing and storage-restricted embeds must keep the app usable.
  }
}

/**
 * Main App Component - Routes to Desktop or Mobile Layout
 * Breakpoint: 768px (Tailwind md breakpoint)
 */
function App() {
  const initialBrowser = browserWindow()
  const initialStorage = browserStorage(initialBrowser)
  const [isMobile, setIsMobile] = useState(() => initialBrowser?.innerWidth < 768)
  const [isLoading, setIsLoading] = useState(true)
  const [mode, setMode] = useState(() => modeFromEnvironment({
    pathname: initialBrowser?.location?.pathname,
    storage: initialStorage,
  }))
  const [jstnPath, setJstnPath] = useState(() => jstnPathFromEnvironment({
    pathname: initialBrowser?.location?.pathname,
    storage: initialStorage,
  }))

  useEffect(() => {
    const browser = browserWindow()
    if (!browser) return undefined

    const handleResize = () => {
      setIsMobile(browser.innerWidth < 768)
    }

    browser.addEventListener('resize', handleResize)
    return () => browser.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    let isMounted = true
    const minimumLoadingTime = new Promise(resolve => setTimeout(resolve, 1200))
    const criticalAssets = Promise.all(CRITICAL_IMAGES.map(preloadImage))

    Promise.all([minimumLoadingTime, criticalAssets]).then(() => {
      if (isMounted) {
        setIsLoading(false)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const browser = browserWindow()
    if (!browser) return undefined

    const handlePopState = () => {
      const storage = browserStorage(browser)
      const pathname = browser.location.pathname
      const nextMode = modeFromLocation({ pathname })
      const nextJstnPath = jstnPathFromEnvironment({ pathname, storage })

      setMode(nextMode)
      setJstnPath(nextJstnPath)
      persistValue(storage, modeStorageKey, nextMode)
      persistValue(storage, jstnPathStorageKey, nextJstnPath)
    }

    browser.addEventListener('popstate', handlePopState)
    return () => browser.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const storage = browserStorage(browserWindow())
    persistValue(storage, modeStorageKey, mode)
    persistValue(storage, jstnPathStorageKey, jstnPath)
  }, [jstnPath, mode])

  const handleModeChange = useCallback((nextMode) => {
    const browser = browserWindow()
    const storage = browserStorage(browser)
    const nextState = modeChangeState({
      nextMode,
      pathname: browser?.location?.pathname,
      savedJstnPath: jstnPath,
    })

    setMode(nextState.mode)
    setJstnPath(nextState.jstnPath)
    persistValue(storage, modeStorageKey, nextState.mode)
    persistValue(storage, jstnPathStorageKey, nextState.jstnPath)

    if (browser?.history?.pushState && browser.location.pathname !== nextState.pathname) {
      browser.history.pushState({ portfolioMode: nextState.mode }, '', nextState.pathname)
    }
  }, [jstnPath])

  if (mode === 'original' && isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Analytics />
      <ModeSwitcher compact={isMobile} mode={mode} onChange={handleModeChange} />
      <Suspense fallback={<LoadingSpinner />}>
        {mode === 'jstn'
          ? <JstnMode pathname={jstnPath} />
          : (isMobile ? <MobileLayout /> : <DesktopLayout />)}
      </Suspense>
    </>
  )
}

export default App 
