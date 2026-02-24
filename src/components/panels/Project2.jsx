import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const Project2 = () => {
  const images = [
    '/images/sdu1.webp',
    '/images/sdu2.webp',
    '/images/sdu3.webp',
    '/images/sdu4.webp',
    '/images/sdu6.webp',
    '/images/sdu7.webp',
    '/images/sdu8.webp',
    '/images/sdu9.webp',
    '/images/sdu10.webp',
    '/images/sdu11.webp'
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
      gsap.fromTo(imageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.inOut' })
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
  }, [isFullscreen]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isFullscreen && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center" onClick={toggleFullscreen}>
          <button onClick={(e) => { e.stopPropagation(); toggleFullscreen() }} className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-[10000] cursor-pointer">×</button>
          <button onClick={(e) => { e.stopPropagation(); goToPrev() }} className="absolute left-4 text-white text-4xl hover:text-gray-300 z-[10000] cursor-pointer">‹</button>
          <img src={images[currentIndex]} alt={`Social Development Unit Screenshot ${currentIndex + 1}`} className="max-w-[90vw] max-h-[90vh] object-contain" onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); goToNext() }} className="absolute right-4 text-white text-4xl hover:text-gray-300 z-[10000] cursor-pointer">›</button>
          <div className="absolute bottom-4 text-white text-lg">{currentIndex + 1} / {images.length}</div>
        </div>
      )}

      <div className="w-full lg:w-2/5 flex flex-col items-center justify-center gap-4">
        <div className="relative group w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[500px] mx-auto">
          <div className="absolute -inset-2.5 border border-[#F6AA10]/30 rounded-lg hidden md:block"></div>
          <div className="absolute -inset-1.5 border border-[#F6AA10]/50 rounded-lg hidden md:block"></div>
          <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-2xl">
            <img ref={imageRef} src={images[currentIndex]} alt={`Social Development Unit Screenshot ${currentIndex + 1}`} className="w-full h-full object-cover cursor-pointer" onClick={toggleFullscreen} draggable={false} />
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
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-[gotham] font-bold text-white">Social Development Unit</h2>
          <div className="flex items-center gap-2">
            <img src="/icons/clock.svg" alt="Clock" className="w-4 h-4 md:w-5 md:h-5" />
            <div className="text-gray-400 text-sm md:text-base">September 2025 - December 2025</div>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <span className="tech-pill">React 19</span>
            <span className="tech-pill">Tailwind CSS</span>
            <span className="tech-pill">Material UI</span>
            <span className="tech-pill">TanStack React Query</span>
            <span className="tech-pill">Node.js</span>
            <span className="tech-pill">Express.js</span>
            <span className="tech-pill">PostgreSQL (Supabase)</span>
            <span className="tech-pill">Vercel</span>
          </div>
        </div>

        <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
          A large-scale, full-stack web application built for the{' '}
          <span className="text-[#F6AA10] font-semibold">Social Development Unit (SDU)</span> of Ateneo de Zamboanga University, the central body overseeing six offices responsible for managing programs, projects, and community initiatives. The SDU previously relied entirely on manual reporting workflows, fragmented spreadsheets, and informal group-chat coordination, which caused major inconsistencies, duplicated data, and delayed oversight across all offices.
        </p>
        <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
          To solve this, a{' '}
          <span className="text-white font-semibold">centralized project monitoring platform</span> was designed and built from the ground up, successfully standardizing report submissions across all six offices, giving the Unit Director real-time visibility and consolidated monthly reports, automating notifications to eliminate missed deadlines, and tracking each project's alignment with the{' '}
          <span className="text-[#F6AA10] font-semibold">Sustainable Development Goals (SDGs)</span>. This is one of the most complex projects in this portfolio, involving deep system design, multi-role access control, and end-to-end data integrity across a live institutional environment.
        </p>

        <div className="flex gap-3 md:gap-4">
          <a href="https://ateneo-sdu.vercel.app" target='_blank' className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-[#F6AA10] text-black font-bold rounded-xl hover:bg-[#F6AA10]/90 transition-colors cursor-pointer">
            Live Website
          </a>
          <a href="/documentation/sduDocumentation.pdf" target="_blank" rel="noopener noreferrer" className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2 cursor-pointer">
            Documentation
            <img src="/icons/arrowdiagonal.svg" alt="External link" className="w-3 h-3 md:w-4 md:h-4" />
          </a>
        </div>
      </div>
    </>
  )
}

export default Project2
