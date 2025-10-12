import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * Custom hook for Lenis smooth scrolling
 * Initializes Lenis and provides the instance for GSAP integration
 */
export const useLenis = () => {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Check if mobile device - use native scroll on mobile for better performance
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      console.log('📱 Mobile detected: Using native scroll (Lenis disabled for performance)');
      return; // Don't initialize Lenis on mobile
    }

    console.log('💻 Desktop detected: Initializing Lenis smooth scroll');

    // Initialize Lenis with normal scrolling speed (Desktop only)
    const lenis = new Lenis({
      duration: 1.2,        // Normal animation duration 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      direction: 'vertical', // Scroll direction
      gestureDirection: 'vertical', // Gesture direction
      smooth: true,         // Enable smooth scrolling
      mouseMultiplier: 1,   // Normal mouse wheel sensitivity
      smoothTouch: false,   // Disable smooth scrolling on touch devices
      touchMultiplier: 2,   // Normal touch gesture sensitivity
      infinite: false,      // Disable infinite scrolling
      syncTouch: false,     // Don't sync touch gestures (better performance)
    })

    lenisRef.current = lenis

    // Animation frame function for Lenis
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    // Start the animation loop
    requestAnimationFrame(raf)

    // Cleanup function
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef.current
}