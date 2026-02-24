import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const Project4 = () => {
  const images = [
    '/images/leo1.webp',
    '/images/leo2.webp',
    '/images/leo3.webp',
    '/images/leo4.webp',
    '/images/leo5.webp',
    '/images/leo6.webp',
    '/images/leo7.webp',
    '/images/leo8.webp'
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const imageRef = useRef(null)
  const autoplayRef = useRef(null)
  const lastInteractionRef = useRef(Date.now())

  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
      
      autoplayRef.current = setInterval(() => {
        const timeSinceInteraction = Date.now() - lastInteractionRef.current
        if (timeSinceInteraction >= 2000) {
          setCurrentIndex((prev) => (prev + 1) % images.length)
        }
      }, 3000)
    }

    startAutoplay()
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [images.length])

  useEffect(() => {
    if (imageRef.current) {
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        gsap.fromTo(imageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' })
      } else {
        const transitions = [
          { from: { opacity: 0, scale: 0.9 }, to: { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' } },
          { from: { opacity: 0, x: 100 }, to: { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' } },
          { from: { opacity: 0, x: -100 }, to: { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' } },
          { from: { opacity: 0, scale: 1.2 }, to: { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' } },
          { from: { opacity: 0, rotation: -5, scale: 0.95 }, to: { opacity: 1, rotation: 0, scale: 1, duration: 0.6, ease: 'back.out(1.2)' } },
          { from: { opacity: 0, y: 50 }, to: { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' } }
        ]
        const randomTransition = transitions[Math.floor(Math.random() * transitions.length)]
        gsap.fromTo(imageRef.current, randomTransition.from, randomTransition.to)
      }
    }
  }, [currentIndex])

  const goToNext = () => {
    lastInteractionRef.current = Date.now()
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrev = () => {
    lastInteractionRef.current = Date.now()
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const toggleFullscreen = () => {
    lastInteractionRef.current = Date.now()
    setIsFullscreen(!isFullscreen)
  }

  // Handle keyboard navigation and body scroll lock when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden'
      
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          goToPrev()
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          goToNext()
        } else if (e.key === 'Escape') {
          e.preventDefault()
          setIsFullscreen(false)
        } else if (e.key === ' ') {
          e.preventDefault()
        }
      }
      
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [isFullscreen])

  return (
    <>
      {isFullscreen && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center" onClick={toggleFullscreen}>
          <button onClick={(e) => { e.stopPropagation(); toggleFullscreen() }} className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-[10000] cursor-pointer">×</button>
          <button onClick={(e) => { e.stopPropagation(); goToPrev() }} className="absolute left-4 text-white text-4xl hover:text-gray-300 z-[10000] cursor-pointer">‹</button>
          <img src={images[currentIndex]} alt={`LeoRentACar Screenshot ${currentIndex + 1}`} className="max-w-[90vw] max-h-[90vh] object-contain" onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); goToNext() }} className="absolute right-4 text-white text-4xl hover:text-gray-300 z-[10000] cursor-pointer">›</button>
          <div className="absolute bottom-4 text-white text-lg">{currentIndex + 1} / {images.length}</div>
        </div>
      )}

      <div className="w-full lg:w-2/5 flex flex-col items-center justify-center gap-4">
        <div className="relative group w-full max-w-[85vw] sm:max-w-[75vw] md:max-w-[55vw] lg:max-w-[450px] mx-auto">
          <div className="absolute -inset-3 border border-[#F6AA10]/30 rounded-lg hidden md:block"></div>
          <div className="absolute -inset-1.5 border border-[#F6AA10]/50 rounded-lg hidden md:block"></div>
          <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-2xl">
            <img ref={imageRef} src={images[currentIndex]} alt={`LeoRentACar Screenshot ${currentIndex + 1}`} className="w-full h-full object-contain cursor-pointer bg-black/20" onClick={toggleFullscreen} draggable={false} />
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mt-2">
          <button onClick={goToPrev} className="bg-white/10 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-white/20 transition-colors text-xl md:text-2xl cursor-pointer">‹</button>
          <div className="flex gap-1.5">
            {images.map((_, index) => (
              <button key={index} onClick={() => { lastInteractionRef.current = Date.now(); setCurrentIndex(index) }} className={`rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex ? 'bg-[#F6AA10]/90 w-4 md:w-6 h-1.5' : 'bg-white/20 w-1.5 h-1.5 hover:bg-white/40'}`} />
            ))}
          </div>
          <button onClick={goToNext} className="bg-white/10 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-white/20 transition-colors text-xl md:text-2xl cursor-pointer">›</button>
        </div>
      </div>

      <div className="w-full lg:w-3/5 space-y-4 md:space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-[gotham] font-bold text-white">LeoRentACar</h2>
          <div className="flex items-center gap-2">
            <img src="/icons/clock.svg" alt="Clock" className="w-4 h-4 md:w-5 md:h-5" />
            <div className="text-gray-400 text-sm md:text-base">July 2025 - August 2025</div>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <span className="tech-pill">Figma</span>
            <span className="tech-pill">React</span>
            <span className="tech-pill">Vite</span>
            <span className="tech-pill">TailwindCSS v4</span>
            <span className="tech-pill">React Router DOM</span>
            <span className="tech-pill">React Helmet Async</span>
            <span className="tech-pill">Resend API</span>
            <span className="tech-pill">Vercel Serverless</span>
          </div>
        </div>

        <p className="text-gray-300 text-xs md:text-sm lg:text-base leading-relaxed">
          A real-world client project for a private car rental business in Zamboanga City. The entire UI was designed first in{' '}
          <span className="text-[#F6AA10] font-semibold">Figma</span>, going through layout planning and UI/UX refinement before a single line of code was written, ensuring a polished and deliberate visual outcome from the start.
        </p>
        <p className="text-gray-300 text-xs md:text-sm lg:text-base leading-relaxed">
          The Figma designs were then translated into a fully responsive website, allowing customers to browse vehicle fleets, explore services like airport transfers and corporate travel, and submit booking inquiries through an integrated contact system. The project also achieved SEO-optimized multi-page routing with React Router DOM and React Helmet Async, serverless email handling with auto-reply via the Resend API, scroll-triggered animations through custom IntersectionObserver hooks, and optimized lazy-loaded images for strong memory performance.
        </p>

        <div className="flex gap-3 md:gap-4">
          <a href="https://www.leorentacarph.com" target="_blank" rel="noopener noreferrer" className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-[#F6AA10] text-black font-bold rounded-xl hover:bg-[#F6AA10]/90 transition-colors cursor-pointer">
            View Project
          </a>
         
        </div>
      </div>
    </>
  )
}

export default Project4
