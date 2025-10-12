import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

const Project1 = () => {
  const images = [
    '/images/pos.webp',
    '/images/pos1.webp',
    '/images/pos2.webp',
    '/images/pos3.webp',
    '/images/pos4.webp',
    '/images/pos5.webp',
    '/images/pos6.webp'
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const imageRef = useRef(null)
  const autoplayRef = useRef(null)
  const lastInteractionRef = useRef(Date.now())

  // Auto slideshow
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
      
      autoplayRef.current = setInterval(() => {
        const timeSinceInteraction = Date.now() - lastInteractionRef.current
        if (timeSinceInteraction >= 4000) {
          setCurrentIndex((prev) => (prev + 1) % images.length)
        }
      }, 5000)
    }

    startAutoplay()
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [images.length])

  // GSAP mixed animation when index changes
  useEffect(() => {
    if (imageRef.current) {
      // Array of different transition effects
      const transitions = [
        // Fade + Scale
        {
          from: { opacity: 0, scale: 0.9 },
          to: { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
        },
        // Slide from right + Fade
        {
          from: { opacity: 0, x: 100 },
          to: { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
        },
        // Slide from left + Fade
        {
          from: { opacity: 0, x: -100 },
          to: { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
        },
        // Zoom in + Fade
        {
          from: { opacity: 0, scale: 1.2 },
          to: { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
        },
        // Rotate + Fade
        {
          from: { opacity: 0, rotation: -5, scale: 0.95 },
          to: { opacity: 1, rotation: 0, scale: 1, duration: 0.6, ease: 'back.out(1.2)' }
        },
        // Slide up + Fade
        {
          from: { opacity: 0, y: 50 },
          to: { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        }
      ]

      // Randomly pick a transition
      const randomTransition = transitions[Math.floor(Math.random() * transitions.length)]
      
      gsap.fromTo(
        imageRef.current,
        randomTransition.from,
        randomTransition.to
      )
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

  return (
    <>
      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          onClick={toggleFullscreen}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleFullscreen()
            }}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-[10000]"
          >
            ×
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrev()
            }}
            className="absolute left-4 text-white text-4xl hover:text-gray-300 z-[10000]"
          >
            ‹
          </button>
          
          <img
            src={images[currentIndex]}
            alt={`POS System Screenshot ${currentIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-4 text-white text-4xl hover:text-gray-300 z-[10000]"
          >
            ›
          </button>

          {/* Image counter */}
          <div className="absolute bottom-4 text-white text-lg">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Project Image */}
      <div className="w-full md:w-2/5 flex flex-col items-center justify-center gap-4">
        <div className="relative group w-full">
          <div className="absolute -inset-2.5 border border-[#F6AA10]/30 rounded-lg hidden md:block"></div>
          <div className="absolute -inset-1.5 border border-[#F6AA10]/50 rounded-lg hidden md:block"></div>
          
          <div className="relative w-full md:w-[500px] h-[200px] md:h-[300px] overflow-hidden rounded-lg shadow-2xl">
            <img
              ref={imageRef}
              src={images[currentIndex]}
              alt={`POS System Screenshot ${currentIndex + 1}`}
              className="w-full h-full object-cover cursor-pointer"
              onClick={toggleFullscreen}
              draggable={false}
            />
          </div>
        </div>

        {/* Navigation and indicators below the image */}
        <div className="flex items-center gap-4">
          {/* Previous button */}
          <button
            onClick={goToPrev}
            className="bg-[#F6AA10]/20 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#F6AA10]/40 transition-colors text-2xl"
          >
            ‹
          </button>

          {/* Slide indicators */}
          <div className="flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  lastInteractionRef.current = Date.now()
                  setCurrentIndex(index)
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-[#F6AA10] w-8' 
                    : 'bg-white/30 w-2 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={goToNext}
            className="bg-[#F6AA10]/20 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#F6AA10]/40 transition-colors text-2xl"
          >
            ›
          </button>
        </div>
      </div>


             <div className="w-full md:w-3/5 space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-[gotham] font-bold text-white">Offline Point of Sale System</h2>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">Java</span>
                    <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">JavaFX</span>
                    <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">SceneBuilder</span>
                    <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">SQLite</span>
                    <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">Figma</span>
                    <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">CSS</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-gray-400 text-sm md:text-base">May 2025 - August 2025</div>
                </div>

                <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
                  I built a custom offline POS system in Java for my client, a local mini grocery store in Zamboanga City. Their main challenge was keeping track of stock levels and sales transactions without relying on an internet connection. I designed and delivered a solution tailored to their daily operations, enabling them to easily manage inventory, monitor product movement, and streamline checkout.
                </p>

                <div className="flex gap-3 md:gap-4">
                  <a href="#" className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-[#F6AA10] text-black font-bold rounded-xl hover:bg-[#F6AA10]/90 transition-colors">
                    View Project
                  </a>
                  <a href="#" className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
                    View Github
                  </a>
                </div>
              </div>

              
    </>
  )
}

export default Project1