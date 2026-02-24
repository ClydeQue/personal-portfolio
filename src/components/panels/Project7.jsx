import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const Project7 = () => {
  const images = [
    '/images/lgbt1.webp',
    '/images/lgbt2.webp',
    '/images/lgbt3.webp',
    '/images/lgbt4.webp',
    '/images/lgbt5.webp'
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

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); goToPrev() }
        else if (e.key === 'ArrowRight') { e.preventDefault(); goToNext() }
        else if (e.key === 'Escape') { e.preventDefault(); setIsFullscreen(false) }
        else if (e.key === ' ') { e.preventDefault() }
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
          <img src={images[currentIndex]} alt={`Mujer LGBTQ+ Screenshot ${currentIndex + 1}`} className="max-w-[90vw] max-h-[90vh] object-contain" onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); goToNext() }} className="absolute right-4 text-white text-4xl hover:text-gray-300 z-[10000] cursor-pointer">›</button>
          <div className="absolute bottom-4 text-white text-lg">{currentIndex + 1} / {images.length}</div>
        </div>
      )}

      <div className="w-full lg:w-2/5 flex flex-col items-center justify-center gap-4">
        <div className="relative group w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[500px] mx-auto">
          <div className="absolute -inset-2.5 border border-[#F6AA10]/30 rounded-lg hidden md:block"></div>
          <div className="absolute -inset-1.5 border border-[#F6AA10]/50 rounded-lg hidden md:block"></div>
          <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-2xl">
            <img ref={imageRef} src={images[currentIndex]} alt={`Mujer LGBTQ+ Screenshot ${currentIndex + 1}`} className="w-full h-full object-cover cursor-pointer" onClick={toggleFullscreen} draggable={false} />
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
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-[gotham] font-bold text-white">Mujer LGBTQ+</h2>
          <div className="flex items-center gap-2">
            <img src="/icons/clock.svg" alt="Clock" className="w-4 h-4 md:w-5 md:h-5" />
            <div className="text-gray-400 text-sm md:text-base">September 2024 - November 2024</div>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <span className="tech-pill">HTML</span>
            <span className="tech-pill">CSS</span>
            <span className="tech-pill">JavaScript</span>
            <span className="tech-pill">Canva</span>
          </div>
        </div>

        <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
          An informative website built for <span className="text-[#F6AA10] font-semibold">Mujer-LGBT Organization Inc.</span>, a Zamboanga City-based registered non-profit human rights group in the Philippines, founded in 2015 by transgender women. The organization advocates for LGBTQIA+ rights, HIV/AIDS awareness, and community empowerment, and has been internationally recognized for its pandemic support and contributions to equality.
        </p>
        <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
          We built this as our team's very first client-based project, covering the organization's history, its advocates, and the goals behind their empowerment work. It marked the beginning of our journey in collaborative web development and showed us what it means to deliver a real product for a real client.
        </p>

        <div className="flex gap-3 md:gap-4">
          <a href="https://mujer-lgbt-zc.vercel.app" target='_blank' className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-[#F6AA10] text-black font-bold rounded-xl hover:bg-[#F6AA10]/90 transition-colors cursor-pointer">
            Live Website
          </a>
          <a href="https://github.com/ClydeQue/MujerLGBT-ZC" target='_blank' className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2 cursor-pointer">
            View Github
            <img src="/icons/arrowdiagonal.svg" alt="External link" className="w-3 h-3 md:w-4 md:h-4" />
          </a>
        </div>
      </div>
    </>
  )
}

export default Project7
