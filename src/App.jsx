import React, { useState, useEffect, Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import './App.css'
import LoadingSpinner from './components/global/LoadingSpinner'

// Lazy load layouts
const DesktopLayout = React.lazy(() => import('./layouts/DesktopLayout'))
const MobileLayout = React.lazy(() => import('./layouts/MobileLayout'))

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

/**
 * Main App Component - Routes to Desktop or Mobile Layout
 * Breakpoint: 768px (Tailwind md breakpoint)
 */
function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
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

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Analytics />
      <Suspense fallback={<LoadingSpinner />}>
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </Suspense>
    </>
  )
}

export default App 
