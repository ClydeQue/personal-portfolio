import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap' // Import gsap for stopOverscroll function

// Desktop orbs config: 8 orbs with complex animations
const ORBS_CONFIG = [
  { color: '#60A5FA', size: 200, x: 10, y: 18, opacity: 0.55, scrollSpeed: 0.3, floatSpeed: 0.0025, floatRange: 30, delay: 0 },
  { color: '#FBBF24', size: 220, x: 72, y: 58, opacity: 0.50, scrollSpeed: -0.18, floatSpeed: 0.002, floatRange: 38, delay: 200 },
  { color: '#60A5FA', size: 170, x: 32, y: 70, opacity: 0.55, scrollSpeed: 0.15, floatSpeed: 0.003, floatRange: 26, delay: 400 },
  { color: '#FBBF24', size: 150, x: 60, y: 28, opacity: 0.60, scrollSpeed: -0.25, floatSpeed: 0.0028, floatRange: 22, delay: 600 },
  { color: '#60A5FA', size: 120, x: 86, y: 14, opacity: 0.55, scrollSpeed: 0.33, floatSpeed: 0.0032, floatRange: 34, delay: 800 },
  { color: '#FBBF24', size: 110, x: 14, y: 50, opacity: 0.65, scrollSpeed: -0.38, floatSpeed: 0.003, floatRange: 16, delay: 1000 },
  { color: '#60A5FA', size: 90,  x: 46, y: 85, opacity: 0.75, scrollSpeed: 0.5,  floatSpeed: 0.004, floatRange: 12, delay: 1200 },
  { color: '#FBBF24', size: 100, x: 20, y: 90, opacity: 0.70, scrollSpeed: -0.45, floatSpeed: 0.0035, floatRange: 14, delay: 1400 },
];

// Mobile orbs config: Only 3 orbs with simpler animations for better performance
const ORBS_CONFIG_MOBILE = [
  { color: '#60A5FA', size: 150, x: 15, y: 20, opacity: 0.4, scrollSpeed: 0.2, floatSpeed: 0.002, floatRange: 20, delay: 0 },
  { color: '#FBBF24', size: 160, x: 70, y: 60, opacity: 0.35, scrollSpeed: -0.15, floatSpeed: 0.0015, floatRange: 25, delay: 400 },
  { color: '#60A5FA', size: 120, x: 45, y: 85, opacity: 0.45, scrollSpeed: 0.25, floatSpeed: 0.0025, floatRange: 15, delay: 800 },
];

const ParallaxLights = () => {
  const containerRef = useRef(null)
  const orbRefs = useRef([])
  const animationFrameRef = useRef()
  const scrollY = useRef(0)
  // Removed scrollVelocity ref as it's no longer used
  // Removed mouse ref as it's no longer used for parallax movement
  // Removed isInitialized state

  useEffect(() => {
    if (!containerRef.current) return

    // Detect mobile for optimized config
    const isMobile = window.innerWidth < 768;
    const activeConfig = isMobile ? ORBS_CONFIG_MOBILE : ORBS_CONFIG;
    
    console.log(`✨ ParallaxLights: ${isMobile ? 'Mobile' : 'Desktop'} mode - ${activeConfig.length} orbs`);

    // Setup Lenis for smooth scroll
    const lenis = new Lenis({
      duration: 1.2,   // scroll inertia
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease-out expo
    })

    function raf(time) {
      lenis.raf(time)
      animationFrameRef.current = requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    let time = 0

    // Removed Mouse move parallax

    // Animation loop
    const animate = () => {
      time += 1

      orbRefs.current.forEach((orb, index) => {
        if (!orb) return
        const config = activeConfig[index]
        if (!config) return // Skip if this orb doesn't exist in mobile config

        // base viewport positioning
        const viewportHeight = window.innerHeight
        const viewportWidth = window.innerWidth
        const baseX = (config.x / 100) * viewportWidth
        const baseY = (config.y / 100) * viewportHeight

        // Scroll offset via Lenis
        const scrollOffset = scrollY.current * config.scrollSpeed * 0.1

        // Floating motion with per-orb delay
        const t = time + config.delay
        const floatX = Math.sin(t * config.floatSpeed + index) * config.floatRange
        const floatY = Math.cos(t * config.floatSpeed * 1.4 + index) * config.floatRange

        // Breathing scale + pulse opacity
        const scale = 1 + Math.sin(t * 0.003 + index) * 0.08
        const pulseOpacity = config.opacity + Math.sin(t * 0.002 + index) * 0.05

        orb.style.transform = `translate3d(${baseX + floatX}px, ${baseY + scrollOffset + floatY}px, 0) scale(${scale})`
        orb.style.opacity = pulseOpacity
      })

      requestAnimationFrame(animate)
    }
    animate()

    // listen for Lenis scroll updates
    const updateScroll = (e) => {
      scrollY.current = e.scroll
    }
    lenis.on('scroll', updateScroll)

    // Activate overscroll prevention
    stopOverscroll(window);

    // Removed fade in container logic

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
      lenis.destroy()
      // Removed mousemove event listener
    }
  }, [])

  // Use mobile or desktop config based on screen size
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const displayConfig = isMobile ? ORBS_CONFIG_MOBILE : ORBS_CONFIG;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-hidden pointer-events-none z-20 opacity-100"
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10" />

      {/* Main glowing orbs - 3 on mobile, 8 on desktop */}
      {displayConfig.map((orb, index) => (
        <div
          key={`orb-${index}`}
          ref={el => orbRefs.current[index] = el}
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `radial-gradient(circle at 30% 30%, ${orb.color}CC, ${orb.color}88, transparent)`,
            opacity: orb.opacity,
            filter: `blur(${Math.max(12, orb.size * 0.45)}px)`,
            transform: 'translate3d(0, 0, 0)',
            // Removed mixBlendMode: 'screen' for better visibility
          }}
        />
      ))}
    </div>
  )
}

export default ParallaxLights

// Added stopOverscroll function outside the component
function stopOverscroll(element) {
  element = gsap.utils.toArray(element)[0] || window;
  (element === document.body || element === document.documentElement) &&
    (element = window);
  let lastScroll = 0,
    lastTouch,
    forcing,
    forward = true,
    isRoot = element === window,
    scroller = isRoot ? document.scrollingElement : element,
    ua = window.navigator.userAgent + "",
    getMax = isRoot
      ? () => scroller.scrollHeight - window.innerHeight
      : () => scroller.scrollHeight - scroller.clientHeight,
    addListener = (type, func) =>
      element.addEventListener(type, func, { passive: false }),
    revert = () => {
      scroller.style.overflowY = "auto";
      forcing = false;
    },
    kill = () => {
      forcing = true;
      scroller.style.overflowY = "hidden";
      !forward && scroller.scrollTop < 1
        ? (scroller.scrollTop = 1)
        : (scroller.scrollTop = getMax() - 1);
      setTimeout(revert, 1);
    },
    handleTouch = (e) => {
      let evt = e.changedTouches ? e.changedTouches[0] : e,
        forward = evt.pageY <= lastTouch;
      if (
        ((!forward && scroller.scrollTop <= 1) ||
          (forward && scroller.scrollTop >= getMax() - 1)) &&
        e.type === "touchmove"
      ) {
        e.preventDefault();
      } else {
        lastTouch = evt.pageY;
      }
    },
    handleScroll = (e) => {
      if (!forcing) {
        let scrollTop = scroller.scrollTop;
        forward = scrollTop > lastScroll;
        if (
          (!forward && scrollTop < 1) ||
          (forward && scrollTop >= getMax() - 1)
        ) {
          e.preventDefault();
          kill();
        }
        lastScroll = scrollTop;
      }
    };
  if ("ontouchend" in document && /\bSafari\b/i.test(ua)) { // Simplified Safari check
    addListener("scroll", handleScroll);
    addListener("touchstart", handleTouch);
    addListener("touchmove", handleTouch);
  }
  scroller.style.overscrollBehavior = "none";
}