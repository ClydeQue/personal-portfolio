import React, { useState, useEffect, Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import './App.css'
import LoadingSpinner from './components/global/LoadingSpinner'

// Lazy load layouts
const DesktopLayout = React.lazy(() => import('./layouts/DesktopLayout'))
const MobileLayout = React.lazy(() => import('./layouts/MobileLayout'))

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
    // Minimum loading time of 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
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
