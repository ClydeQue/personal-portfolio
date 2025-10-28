import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, A11y, EffectCoverflow, Autoplay, Navigation } from 'swiper/modules'
import Project1 from '../components/panels/Project1'
import Project2 from '../components/panels/Project2'
import Project3 from '../components/panels/Project3'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import '../App.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
// MObile Layout Component
function MobileLayout() { 
  const skillsSectionRef = useRef(null)
  const headerRef = useRef(null)
  const iconsContainerRef = useRef(null)
  const swiperRef = useRef(null)
  const titleRef = useRef(null)
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true)
  const [fullscreenProject, setFullscreenProject] = useState(null)

  // Smooth scroll function using GSAP
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: section,
          offsetY: 60 // Offset for fixed navbar
        },
        ease: 'power2.inOut'
      })
    }
  }

  // Scroll-based fade in/out animations for child containers only
  useEffect(() => {
    // CRITICAL: Ensure body can scroll immediately on page load
    document.body.style.overflow = 'auto'
    document.body.style.overflowX = 'hidden'
    document.body.style.overflowY = 'scroll'
    document.documentElement.style.overflow = 'auto'
    document.documentElement.style.overflowX = 'hidden'
    
    // Disable any scroll-locking that might be active
    document.body.style.position = 'static'
    document.body.style.height = 'auto'
    document.body.style.width = 'auto'
    
    // Configure ScrollTrigger to not interfere with normal scrolling
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      ignoreMobileResize: true
    })
    
    // Setup animations immediately - don't delay
    // Only animate child containers/content divs, not section backgrounds
    const animateElements = document.querySelectorAll('div')
    
    animateElements.forEach((element) => {
      // Check if element is in viewport on load - if yes, show it immediately
      const rect = element.getBoundingClientRect()
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
      
      // Set initial state based on viewport position
      gsap.set(element, {
        opacity: isInViewport ? 1 : 0,
        y: isInViewport ? 0 : 30
      })
      
      // Create scroll animation
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          // markers: true // Uncomment to see trigger points
        }
      })
    })
    
    // Refresh ScrollTrigger after a tiny delay to ensure DOM is ready
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger?.id !== 'skills-mobile') {
          trigger.kill()
        }
      })
    }
  }, [])

  useEffect(() => {
    const section = skillsSectionRef.current
    const header = headerRef.current
    const iconsContainer = iconsContainerRef.current

    if (!section || !header || !iconsContainer) return

    // Create timeline for the pinned section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    })

    // Animate header - scale up, rotate, then fade out
    tl.fromTo(header, 
      { scale: 1, rotation: 0, opacity: 1 },
      { scale: 1.5, rotation: 5, opacity: 1, duration: 0.3 }
    )
    .to(header, {
      scale: 2,
      rotation: -5,
      opacity: 0.8,
      duration: 0.3
    })
    .to(header, {
      scale: 0.5,
      rotation: 360,
      opacity: 0,
      duration: 0.4
    })

    // Animate icons - fade in and scale up
    tl.fromTo(iconsContainer.children,
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        stagger: 0.05,
        duration: 0.5
      },
      '-=0.2'
    )

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill()
      tl.kill()
    }
  }, [])

  // Typewriter effect with rotating titles
  useEffect(() => {
    const titles = [
      'A Full Stack Web Developer',
      'A Backend Engineer',
      'A Frontend Web Developer'
    ]
    let currentTitleIndex = 0
    let typewriterIntervals = []
    let isTypewriterActive = true

    const typeWriterEffect = () => {
      if (!titleRef.current || !isTypewriterActive) return

      const targetText = titles[currentTitleIndex]
      let charIndex = 0
      let isDeleting = false
      let currentText = ''

      const type = () => {
        if (!isTypewriterActive) {
          typewriterIntervals.forEach(id => clearInterval(id))
          return
        }

        if (!isDeleting && charIndex < targetText.length) {
          // Type forward
          currentText = targetText.substring(0, charIndex + 1)
          titleRef.current.textContent = currentText + '|'
          charIndex++
          setTimeout(type, 100)
        } else if (!isDeleting && charIndex === targetText.length) {
          // Pause at end
          setTimeout(() => {
            isDeleting = true
            type()
          }, 2000)
        } else if (isDeleting && charIndex > 0) {
          // Delete backward
          currentText = targetText.substring(0, charIndex - 1)
          titleRef.current.textContent = currentText + '|'
          charIndex--
          setTimeout(type, 50)
        } else if (isDeleting && charIndex === 0) {
          // Move to next title
          isDeleting = false
          currentTitleIndex = (currentTitleIndex + 1) % titles.length
          setTimeout(typeWriterEffect, 500)
        }
      }

      type()
    }

    typeWriterEffect()

    return () => {
      isTypewriterActive = false
      typewriterIntervals.forEach(id => clearInterval(id))
    }
  }, [])

  return (
    <div className="App relative w-full" style={{
      background: 'linear-gradient(to bottom, #fafafa 0%, #fafafa 15%, #F6AA10 25%, #143E5B 35%, #021019 50%, #021019 100%)',
      minHeight: '100vh',
      overflow: 'visible',
      touchAction: 'pan-y'
    }}>
      
      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="flex items-center justify-between px-3 py-2">
          {/* Logo */}
          <div className="bg-black py-1 px-3 rounded-md">
            <p className="font-[gotham] font-bold text-xs slate-sky-theme">ClydeDevs</p>
          </div>
          
          {/* Navigation Pills */}
          <div className="bg-black rounded-full py-1 px-2">
            <ul className="flex space-x-1">
              <li>
                <button onClick={() => scrollToSection('home')} className="cursor-pointer transition-all duration-300 font-[gotham] font-bold text-center flex items-center justify-center text-xs text-white hover:text-gray-300 py-1 px-2">
                  <img src="/icons/home.svg" alt="Home" className="w-3 h-3 filter invert" />
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('skills-mobile')} className="cursor-pointer transition-all duration-300 font-[gotham] font-bold text-center flex items-center justify-center text-xs text-white hover:text-gray-300 py-1 px-2">
                  <img src="/icons/projects.svg" alt="Skills" className="w-3 h-3 filter invert" />
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('projects-mobile')} className="cursor-pointer transition-all duration-300 font-[gotham] font-bold text-center flex items-center justify-center text-xs text-white hover:text-gray-300 py-1 px-2">
                  <img src="/icons/folder.svg" alt="Projects" className="w-3 h-3 filter invert" />
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="cursor-pointer transition-all duration-300 font-[gotham] font-bold text-center flex items-center justify-center text-xs text-white hover:text-gray-300 py-1 px-2">
                  <img src="/icons/about.svg" alt="Contact" className="w-3 h-3 filter invert" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* SECTION 1: Home */}
      <section id="home" className="h-screen flex flex-col justify-center px-6 pt-20 pb-12 relative">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0,79,133,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,79,133,0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="space-y-8 relative z-10 max-w-xl mx-auto w-full text-center animate-on-scroll">
          {/* Header Section */}
          <div className="space-y-4 animate-on-scroll">
            {/* Greeting */}
            <p className="text-base font-[gotham] text-gray-600 font-medium">
              Hi! I'm <span className="font-bold text-black">Clyde Que</span>
            </p>
            
            {/* Dynamic Title with Typewriter */}
            <h1 
              ref={titleRef}
              className="text-3xl font-[gotham-narrow] font-bold slate-sky-theme leading-tight min-h-[2.5rem]"
            >
              A Full Stack Web Developer|
            </h1>

            {/* Tagline */}
            <p className="text-lg text-black font-bold font-[gotham] leading-relaxed pt-2">
              Let's Bring Your <span className='font-extrabold slate-sky-theme text-xl'>Next Idea</span> to Life!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 animate-on-scroll">
            <a 
              href="#projects-mobile"
              className="flex-1 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#004F85] to-[#578e8c] rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#578e8c] to-[#004F85] rounded-xl opacity-0 group-active:opacity-100 transition-opacity"></div>
              <div className="relative text-white font-bold text-center text-sm px-6 py-3.5 rounded-xl font-[gotham] group-active:scale-95 transition-transform">
                View Projects
              </div>
            </a>
            <a 
              href="#contact"
              className="px-6 py-3.5 bg-white/70 backdrop-blur-sm border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-800 font-[gotham] hover:border-[#004F85] active:scale-95 transition-all"
            >
              Get in Touch
            </a>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-on-scroll"></div>

          {/* Connect With Me */}
          <div className="space-y-3 animate-on-scroll">
            <h3 className="text-xs font-[gotham] font-bold text-gray-500 uppercase tracking-wider">Connect With Me</h3>
            <div className="grid grid-cols-2 gap-2">
              <a href="https://github.com/Clydefois" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg hover:border-gray-400 active:scale-95 transition-all">
                <img src="/icons/github.svg" alt="GitHub" className="w-4 h-4 social-icon-github" />
                <span className="text-xs font-[gotham] font-semibold text-gray-700">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/kcque101/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg hover:border-gray-400 active:scale-95 transition-all">
                <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-4 h-4 social-icon-linkedin" />
                <span className="text-xs font-[gotham] font-semibold text-gray-700">LinkedIn</span>
              </a>
              <a href="https://facebook.com/kc012s" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg hover:border-gray-400 active:scale-95 transition-all">
                <img src="/icons/facebook.svg" alt="Facebook" className="w-4 h-4 social-icon-facebook" />
                <span className="text-xs font-[gotham] font-semibold text-gray-700">Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg hover:border-gray-400 active:scale-95 transition-all">
                <img src="/icons/twitter.svg" alt="Twitter" className="w-4 h-4 social-icon-twitter" />
                <span className="text-xs font-[gotham] font-semibold text-gray-700">Twitter</span>
              </a>
              <a href="mailto:clydeque@example.com"
                className="col-span-2 flex items-center justify-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg hover:border-gray-400 active:scale-95 transition-all">
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-[gotham] font-semibold text-gray-700">Email Me</span>
              </a>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="space-y-2 pt-2 animate-on-scroll">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-xs font-[gotham] text-gray-600">Available for freelance projects</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-xs font-[gotham] text-gray-600">Open for job opportunities</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION - Full Screen with Animations */}
      <section id="stats-mobile" className="min-h-screen flex flex-col justify-center px-5 py-16" style={{ background: 'rgba(2, 16, 25, 0.95)' }}>
        {/* Container with animations */}
        <div className="w-full max-w-md mx-auto space-y-6 animate-on-scroll">
          {/* Title at top */}
          <h2 className="text-3xl font-bold slate-sky-theme font-[gotham] text-center mb-8">
            By The Numbers
          </h2>
          
          {/* 2x2 Grid - Top Stats with staggered animation */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="backdrop-blur-lg bg-gradient-to-br from-[#004F85]/20 to-[#578e8c]/10 rounded-2xl p-5 border border-white/10 hover:border-[#578e8c]/50 hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="text-4xl font-black slate-sky-theme font-[gotham] mb-2">15+</div>
              <div className="text-gray-200 text-sm font-[gotham]">Projects</div>
              <div className="text-gray-400 text-xs font-[gotham]">Completed</div>
            </div>

            <div className="backdrop-blur-lg bg-gradient-to-br from-[#004F85]/20 to-[#578e8c]/10 rounded-2xl p-5 border border-white/10 hover:border-[#578e8c]/50 hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="text-4xl font-black slate-sky-theme font-[gotham] mb-2">3+</div>
              <div className="text-gray-200 text-sm font-[gotham]">Years</div>
              <div className="text-gray-400 text-xs font-[gotham]">Experience</div>
            </div>

            <div className="backdrop-blur-lg bg-gradient-to-br from-[#004F85]/20 to-[#578e8c]/10 rounded-2xl p-5 border border-white/10 hover:border-[#578e8c]/50 hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="text-4xl font-black slate-sky-theme font-[gotham] mb-2">20+</div>
              <div className="text-gray-200 text-sm font-[gotham]">Technologies</div>
              <div className="text-gray-400 text-xs font-[gotham]">Mastered</div>
            </div>

            <div className="backdrop-blur-lg bg-gradient-to-br from-[#004F85]/20 to-[#578e8c]/10 rounded-2xl p-5 border border-white/10 hover:border-[#578e8c]/50 hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="text-4xl font-black slate-sky-theme font-[gotham] mb-2">10+</div>
              <div className="text-gray-200 text-sm font-[gotham]">Clients</div>
              <div className="text-gray-400 text-xs font-[gotham]">Satisfied</div>
            </div>
          </div>
          
          {/* Full-width Cards with staggered animation */}
          <div className="space-y-4">
            <div className="backdrop-blur-lg bg-gradient-to-br from-[#004F85]/20 to-[#578e8c]/10 rounded-2xl p-5 border border-white/10 hover:border-[#578e8c]/50 hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#7BB3D3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-black slate-sky-theme font-[gotham]">24/7</div>
                  <div className="text-gray-300 text-xs font-[gotham]">Programming All Day</div>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-lg bg-gradient-to-br from-[#004F85]/20 to-[#578e8c]/10 rounded-2xl p-5 border border-white/10 hover:border-[#578e8c]/50 hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#F6AA10]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 21h19v-3H2v3zM20 8H4V4h16v4zM2 12h3v-2H2v2zm3 4H2v-2h3v2zm18-8h-3V6h3v2zm-3 2h3v2h-3v-2zm0 4h3v2h-3v-2z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-black slate-sky-theme font-[gotham]">∞</div>
                  <div className="text-gray-300 text-xs font-[gotham]">Cups of Coffee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - Mobile */}
            {/* ABOUT SECTION - Who am I? */}
      <section id="about-mobile" className="min-h-screen flex flex-col justify-center px-5 py-16" style={{ background: 'rgba(2, 16, 25, 0.95)' }}>
        <div className="w-full max-w-md mx-auto space-y-6 animate-on-scroll">
          <h2 className="text-3xl font-bold slate-sky-theme font-[gotham] mb-6 text-center">
            Who am I?
          </h2>
          
          {/* Profile Image - Pill Shape */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img 
                src="/images/me.png" 
                alt="Profile" 
                className="w-54 h-54 rounded-full object-contain border-2 border-[#578e8c]/50 shadow-lg"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#004F85]/20 to-transparent"></div>
            </div>
          </div>
          
          <p className="text-gray-300 text-base leading-relaxed mb-8 font-[gotham] text-center">
            I'm a passionate Full Stack Developer who loves turning ideas into reality through code. 
            With expertise in modern web technologies and a keen eye for design, I create seamless 
            digital experiences that make a difference.
          </p>

          <h3 className="text-xl font-bold text-white font-[gotham] mb-5 text-center">What I Do</h3>
          
          <div className="space-y-4">
            <div className="backdrop-blur-lg bg-gradient-to-br from-[#004F85]/20 to-[#578e8c]/10 rounded-xl p-4 border border-white/10 hover:border-[#578e8c]/50 hover:scale-105 transition-all duration-300 flex items-start gap-4 shadow-lg">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#7BB3D3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-[gotham] font-bold text-sm mb-1">Full Stack Development</h4>
                <p className="text-gray-300 text-xs font-[gotham]">Building robust applications from front to back</p>
              </div>
            </div>

            <div className="backdrop-blur-lg bg-gradient-to-br from-[#004F85]/20 to-[#578e8c]/10 rounded-xl p-4 border border-white/10 hover:border-[#578e8c]/50 hover:scale-105 transition-all duration-300 flex items-start gap-4 shadow-lg">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#7BB3D3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-[gotham] font-bold text-sm mb-1">UI/UX Design</h4>
                <p className="text-gray-300 text-xs font-[gotham]">Creating beautiful and intuitive interfaces</p>
              </div>
            </div>

            <div className="backdrop-blur-lg bg-gradient-to-br from-[#004F85]/20 to-[#578e8c]/10 rounded-xl p-4 border border-white/10 hover:border-[#578e8c]/50 hover:scale-105 transition-all duration-300 flex items-start gap-4 shadow-lg">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#7BB3D3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-[gotham] font-bold text-sm mb-1">Performance Optimization</h4>
                <p className="text-gray-300 text-xs font-[gotham]">Making applications fast and efficient</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Skills with GSAP Animations */}
      <section ref={skillsSectionRef} id="skills-mobile" className="min-h-screen relative overflow-hidden bg-[#021019]">
        {/* Animated Header */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div ref={headerRef} className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl px-8 py-6 shadow-2xl">
            <h2 className="font-[gotham] text-3xl font-bold text-white text-center whitespace-nowrap">
              Take A Look!
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#7BB3D3] via-[#F6AA10] to-[#7BB3D3] rounded-full mx-auto mt-3"></div>
          </div>
        </div>
        
        {/* Animated Programming Language Icons - Will fade in after header animates */}
        <div ref={iconsContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden opacity-0">
          <div className="absolute top-[10%] left-0 w-[200%] flex gap-12 animate-scroll-right">
            <span className="text-5xl opacity-30">⚛️</span><span className="text-5xl opacity-30">🔷</span><span className="text-5xl opacity-30">💚</span>
            <span className="text-5xl opacity-30">🐍</span><span className="text-5xl opacity-30">☕</span><span className="text-5xl opacity-30">📱</span>
            <span className="text-5xl opacity-30">⚛️</span><span className="text-5xl opacity-30">🔷</span><span className="text-5xl opacity-30">💚</span>
          </div>
          
          <div className="absolute top-[30%] left-0 w-[200%] flex gap-12 animate-scroll-left">
            <span className="text-4xl opacity-25">🐍</span><span className="text-4xl opacity-25">☕</span><span className="text-4xl opacity-25">📱</span>
            <span className="text-4xl opacity-25">⚛️</span><span className="text-4xl opacity-25">🔷</span><span className="text-4xl opacity-25">💚</span>
            <span className="text-4xl opacity-25">🐍</span><span className="text-4xl opacity-25">☕</span><span className="text-4xl opacity-25">📱</span>
          </div>
          
          <div className="absolute top-[50%] left-0 w-[200%] flex gap-16 animate-scroll-right-slow text-[#7BB3D3]">
            <span className="text-3xl font-bold opacity-35">JS</span><span className="text-3xl font-bold opacity-35">TS</span><span className="text-3xl font-bold opacity-35">PY</span>
            <span className="text-3xl font-bold opacity-35">JAVA</span><span className="text-3xl font-bold opacity-35">C++</span><span className="text-3xl font-bold opacity-35">GO</span>
            <span className="text-3xl font-bold opacity-35">JS</span><span className="text-3xl font-bold opacity-35">TS</span><span className="text-3xl font-bold opacity-35">PY</span>
          </div>
          
          <div className="absolute top-[70%] left-0 w-[200%] flex gap-10 animate-scroll-left">
            <span className="text-3xl opacity-20">🚀</span><span className="text-3xl opacity-20">💡</span><span className="text-3xl opacity-20">⚡</span>
            <span className="text-3xl opacity-20">🎨</span><span className="text-3xl opacity-20">🔥</span><span className="text-3xl opacity-20">✨</span>
            <span className="text-3xl opacity-20">🚀</span><span className="text-3xl opacity-20">💡</span><span className="text-3xl opacity-20">⚡</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: Projects */}
      <section id="projects-mobile" className="min-h-screen flex flex-col justify-center py-12 px-4" style={{ background: 'rgba(2, 16, 25, 0.95)' }}>
        <div className="w-full max-w-md mx-auto animate-on-scroll">
          <div className="text-center mb-6">
            <h2 className="font-[gotham] text-2xl font-bold slate-sky-theme mb-2">
              My Projects
            </h2>
            <p className="text-gray-400 text-[10px]">Swipe to explore my work</p>
          </div>

          <Swiper
            modules={[Pagination, A11y, EffectCoverflow, Autoplay]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ 
              dynamicBullets: true,
              clickable: true 
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            onTouchStart={() => {
              if (swiperRef.current) {
                swiperRef.current.autoplay.stop()
                setIsAutoplayEnabled(false)
              }
            }}
            onTouchEnd={() => {
              if (swiperRef.current) {
                setTimeout(() => {
                  if (swiperRef.current) {
                    swiperRef.current.autoplay.start()
                    setIsAutoplayEnabled(true)
                  }
                }, 2000)
              }
            }}
            className="w-full pb-10"
            style={{ maxHeight: '80vh' }}
          >
            <SwiperSlide style={{ width: '90%', maxWidth: '360px' }}>
              <div 
                className="backdrop-blur-lg bg-gradient-to-br from-[#004F85]/20 to-[#578e8c]/10 rounded-xl p-5 shadow-2xl border border-white/10 h-[70vh] overflow-y-auto cursor-pointer active:scale-95 transition-transform"
                onClick={() => setFullscreenProject(1)}
              >
                <Project1 />
              </div>
            </SwiperSlide>

            <SwiperSlide style={{ width: '90%', maxWidth: '360px' }}>
              <div 
                className="backdrop-blur-lg bg-gradient-to-br from-[#004F85]/20 to-[#578e8c]/10 rounded-xl p-5 shadow-2xl border border-white/10 h-[70vh] overflow-y-auto cursor-pointer active:scale-95 transition-transform"
                onClick={() => setFullscreenProject(2)}
              >
                <Project2 />
              </div>
            </SwiperSlide>

            <SwiperSlide style={{ width: '90%', maxWidth: '360px' }}>
              <div 
                className="backdrop-blur-lg bg-gradient-to-br from-[#004F85]/20 to-[#578e8c]/10 rounded-xl p-5 shadow-2xl border border-white/10 h-[70vh] overflow-y-auto cursor-pointer active:scale-95 transition-transform"
                onClick={() => setFullscreenProject(3)}
              >
                <Project3 />
              </div>
            </SwiperSlide>
          </Swiper>


          


          
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-[40vh] flex items-center justify-center bg-[#021019] py-12 animate-on-scroll">
        <div className="text-center px-4 animate-on-scroll">
          <h2 className="font-[gotham] font-bold text-2xl text-white mb-3">Get In Touch</h2>
          <p className="text-sm font-[gotham] text-gray-400">Contact section coming soon...</p>
        </div>
      </section>

      {/* Fullscreen Project Modal */}
      {fullscreenProject && (
        <div 
          className="fixed inset-0 z-[9999] bg-[#021019] flex items-center justify-center animate-on-scroll"
          onClick={() => setFullscreenProject(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 z-[10000] w-10 h-10 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all"
            onClick={() => setFullscreenProject(null)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          {/* Fullscreen Content */}
          <div 
            className="w-full h-full overflow-y-auto p-6 pt-16"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-4xl mx-auto backdrop-blur-lg bg-gradient-to-br from-[#004F85]/30 to-[#578e8c]/20 rounded-2xl p-6 shadow-2xl border border-white/20">
              {fullscreenProject === 1 && <Project1 />}
              {fullscreenProject === 2 && <Project2 />}
              {fullscreenProject === 3 && <Project3 />}
            </div>
          </div>

          {/* Tap to close hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <div className="px-4 py-2 backdrop-blur-lg bg-white/10 border border-white/20 rounded-full">
              <span className="text-white text-xs font-[gotham]">Tap anywhere to close</span>
            </div>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default MobileLayout
