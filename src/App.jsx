import React, { useState, useEffect, Suspense } from 'react'
import './App.css'

// Lazy load layouts
const DesktopLayout = React.lazy(() => import('./layouts/DesktopLayout'))
const MobileLayout = React.lazy(() => import('./layouts/MobileLayout'))

/**
 * Main App Component - Routes to Desktop or Mobile Layout
 * Breakpoint: 768px (Tailwind md breakpoint)
 */
function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#021019]">
        <div className="text-white text-2xl font-[gotham]">Loading...</div>
      </div>
    }>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </Suspense>
  )
}

export default App 
