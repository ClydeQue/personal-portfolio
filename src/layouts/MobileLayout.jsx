import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, A11y, EffectCoverflow, Autoplay, Navigation } from 'swiper/modules'
import Tilt from 'react-parallax-tilt'
import gsap from 'gsap'
import Project1 from '../components/panels/Project1'
import Project2 from '../components/panels/Project2'
import Project3 from '../components/panels/Project3'
import Project4 from '../components/panels/Project4'
import Project5 from '../components/panels/Project5'
import Project6 from '../components/panels/Project6'
import Project7 from '../components/panels/Project7'
import PDFModal from '../components/global/PDFModal'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import '../App.css'

// Programming language icons from techstack folder
const techIcons = [
  { name: 'React', src: '/techstack/react.svg' },
  { name: 'JavaScript', src: '/techstack/javascript.svg' },
  { name: 'TypeScript', src: '/techstack/typescript.svg' },
  { name: 'Python', src: '/techstack/python.svg' },
  { name: 'Java', src: '/techstack/java.svg' },
  { name: 'Node.js', src: '/techstack/nodejs.svg' },
  { name: 'HTML', src: '/techstack/html.svg' },
  { name: 'CSS', src: '/techstack/css.svg' },
  { name: 'Tailwind', src: '/techstack/tailwind.svg' },
  { name: 'MySQL', src: '/techstack/mysql.svg' },
  { name: 'PostgreSQL', src: '/techstack/postgre.svg' },
  { name: 'Docker', src: '/techstack/docker.svg' },
  { name: 'Git', src: '/techstack/git.svg' },
  { name: 'PHP', src: '/techstack/php.svg' },
  { name: 'C++', src: '/techstack/c++.svg' },
]

// Project preview data for mobile cards (only image, title, tech stack)
// Ordered by date: latest first
const projectPreviews = [
  {
    id: 1,
    title: 'WaiveRight',
    image: '/images/waiveright1.webp',
    techStack: ['react', 'tailwind']
  },
  {
    id: 2,
    title: 'Social Development Unit',
    image: '/images/sdu1.webp',
    techStack: ['react', 'tailwind']
  },
  {
    id: 3,
    title: 'HealthMate',
    image: null,
    techStack: ['react', 'tailwind']
  },
  {
    id: 4,
    title: 'LeoRentACar',
    image: '/images/leo1.webp',
    techStack: ['react', 'tailwind', 'javascript']
  },
  {
    id: 5,
    title: 'OrSem 2025 Family Feud',
    image: '/images/feud.png',
    techStack: ['typescript', 'javascript', 'postgresql', 'tailwind']
  },
  {
    id: 6,
    title: 'Offline Point of Sale System',
    image: '/images/pos.webp',
    techStack: ['java', 'mysql', 'css']
  },
  {
    id: 7,
    title: 'Mujer LGBTQ+',
    image: null,
    techStack: ['react', 'tailwind']
  }
]
// MObile Layout Component
function MobileLayout() { 
  const swiperRef = useRef(null)
  const titleRef = useRef(null)
  const taglineRef = useRef(null)
  const viewCVRef = useRef(null)
  const scrollYRef = useRef(0)
  const [fullscreenProject, setFullscreenProject] = useState(null)
  const [isPDFOpen, setIsPDFOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Track active section on scroll
  useEffect(() => {
    const sections = ['home', 'skills-mobile', 'projects-mobile', 'contact']
    
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    }
    
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }
    
    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) observer.observe(element)
    })
    
    return () => observer.disconnect()
  }, [])

  // Smooth scroll function using native smooth scroll (no GSAP conflicts)
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Fix scroll when fullscreen modal is open/closed
  // Uses position:fixed pattern for iOS Safari scroll-lock compatibility
  useEffect(() => {
    if (fullscreenProject) {
      scrollYRef.current = window.scrollY
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollYRef.current}px`
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollYRef.current)
    }
  }, [fullscreenProject])

  // Simple fade-in animations on scroll using Intersection Observer (no GSAP)
  useEffect(() => {
    // CRITICAL: Ensure body can scroll immediately on page load
    // Set all scroll-related properties synchronously
    const html = document.documentElement
    const body = document.body
    const root = document.getElementById('root')
    
    // Force enable scrolling on all containers
    html.style.overflow = 'auto'
    html.style.overflowX = 'hidden'
    html.style.overflowY = 'auto'
    html.style.touchAction = 'pan-y'
    html.style.webkitOverflowScrolling = 'touch'
    
    body.style.overflow = 'auto'
    body.style.overflowX = 'hidden'
    body.style.overflowY = 'auto'
    body.style.position = 'static'
    body.style.height = 'auto'
    body.style.width = 'auto'
    body.style.touchAction = 'pan-y'
    body.style.webkitOverflowScrolling = 'touch'
    
    if (root) {
      root.style.touchAction = 'pan-y'
      root.style.webkitOverflowScrolling = 'touch'
    }
    
    // Use Intersection Observer for simple fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('mobile-visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    
    // Observe all animate-on-scroll elements
    const animateElements = document.querySelectorAll('.animate-on-scroll')
    animateElements.forEach((el) => observer.observe(el))

    // Section fade-in observer (fade in only, no fade out for performance)
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    
    // Observe all section-fade elements
    const sectionElements = document.querySelectorAll('.section-fade')
    sectionElements.forEach((el) => sectionObserver.observe(el))

    return () => {
      observer.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  // GSAP entrance animation for tagline and View CV button
  useLayoutEffect(() => {
    const tagline = taglineRef.current
    const viewCV = viewCVRef.current
    
    if (!tagline || !viewCV) return
    
    const ctx = gsap.context(() => {
      // Create timeline with entrance animations
      const tl = gsap.timeline({ delay: 0.3 })
      
      // Animate tagline sliding up and fading in
      tl.fromTo(tagline, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          clearProps: 'transform'
        }
      )
      // Animate View CV button following tagline
      .fromTo(viewCV, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: 'power3.out',
          clearProps: 'transform'
        }, 
        '-=0.4'
      )
    })
    
    return () => ctx.revert()
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
    <div className="App relative w-full bg-[#021019]" style={{
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
          <div className="bg-black rounded-full py-1 px-1.5">
            <ul className="flex space-x-0.5">
              <li>
                <button 
                  onClick={() => scrollToSection('home')} 
                  className={`cursor-pointer transition-all duration-300 font-[gotham] font-bold text-center flex items-center justify-center text-xs py-1.5 px-2.5 rounded-full ${
                    activeSection === 'home' 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <img src="/icons/home.svg" alt="Home" className="w-3.5 h-3.5 filter invert" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('skills-mobile')} 
                  className={`cursor-pointer transition-all duration-300 font-[gotham] font-bold text-center flex items-center justify-center text-xs py-1.5 px-2.5 rounded-full ${
                    activeSection === 'skills-mobile' 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <img src="/icons/projects.svg" alt="Skills" className="w-3.5 h-3.5 filter invert" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('projects-mobile')} 
                  className={`cursor-pointer transition-all duration-300 font-[gotham] font-bold text-center flex items-center justify-center text-xs py-1.5 px-2.5 rounded-full ${
                    activeSection === 'projects-mobile' 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <img src="/icons/folder.svg" alt="Projects" className="w-3.5 h-3.5 filter invert" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className={`cursor-pointer transition-all duration-300 font-[gotham] font-bold text-center flex items-center justify-center text-xs py-1.5 px-2.5 rounded-full ${
                    activeSection === 'contact' 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <img src="/icons/about.svg" alt="Contact" className="w-3.5 h-3.5 filter invert" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* SECTION 1: Home */}
      <section id="home" className="section-fade min-h-screen flex flex-col justify-center px-5 pt-16 pb-10 relative bg-[#021019]">
        <div className="space-y-6 relative z-10 max-w-sm mx-auto w-full">
          {/* Header Section */}
          <div className="space-y-3 text-center">
            {/* Greeting - Simple text */}
            <p className="text-sm font-[gotham] text-gray-400 font-medium animate-on-scroll">
              Hello, I'm
            </p>
            
            {/* Name - Bold emphasis */}
            <h1 className="text-2xl font-[gotham] font-black text-white animate-on-scroll">
              Kenneth Clyde Que
            </h1>
            
            {/* Dynamic Title with Typewriter */}
            <p 
              ref={titleRef}
              className="text-lg font-[gotham] font-bold slate-sky-theme leading-tight min-h-[1.75rem] animate-on-scroll"
            >
              A Full Stack Web Developer|
            </p>

            {/* Tagline - GSAP animated */}
            <p 
              ref={taglineRef} 
              className="text-base text-gray-300 font-medium font-[gotham] leading-relaxed pt-1"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              Let's Bring Your <span className='font-bold slate-sky-theme'>Next Idea</span> to Life!
            </p>
          </div>
          
          {/* CTA Buttons - Primary + Underline style */}
          <div className="flex items-center justify-center gap-6 pt-2 animate-on-scroll">
            <button
              onClick={() => scrollToSection('projects-mobile')}
              className="py-3 px-6 bg-gradient-to-r from-[#004F85] to-[#143E5B] text-white font-bold text-sm rounded-xl font-[gotham] active:scale-[0.98] transition-transform shadow-lg shadow-[#004F85]/25"
            >
              View My Work
            </button>
            <button
              ref={viewCVRef}
              onClick={() => setIsPDFOpen(true)}
              className="group flex items-center gap-1.5 text-white/80 hover:text-white font-medium text-sm font-[gotham] transition-colors"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              <span className="border-b border-white/40 group-hover:border-white/70 pb-0.5 transition-colors">View CV</span>
              <svg className="w-3.5 h-3.5 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="w-16 h-0.5 bg-white/10 mx-auto animate-on-scroll"></div>

          {/* Social Links - Clean icons only */}
          <div className="flex items-center justify-center gap-5 animate-on-scroll">
            <a href="https://github.com/ClydeQue" target="_blank" rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/5 border border-white/10 active:bg-white/10 transition-colors">
              <img src="/icons/github.svg" alt="GitHub" className="w-5 h-5 invert opacity-80" />
            </a>
            <a href="https://www.linkedin.com/in/kenneth-que/" target="_blank" rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/5 border border-white/10 active:bg-white/10 transition-colors">
              <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://wa.me/639060364511" target="_blank" rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/5 border border-white/10 active:bg-white/10 transition-colors">
              <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a href="mailto:kennethque101@gmail.com"
              className="p-2.5 rounded-full bg-white/5 border border-white/10 active:bg-white/10 transition-colors">
              <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

          {/* Availability Badge - Subtle, not a button */}
          <div className="flex items-center justify-center gap-2 pt-2 animate-on-scroll">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <p className="text-xs font-[gotham] text-gray-400">Responds as soon as possible</p>
          </div>

          {/* Contact Me - Subtle link */}
          <div className="flex justify-center pt-4 animate-on-scroll">
            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center gap-2 text-xs font-[gotham] text-gray-500 active:text-[#7BB3D3] transition-colors"
            >
              <span>Have a project in mind?</span>
              <span className="text-[#7BB3D3] font-medium">Let's talk →</span>
            </button>
          </div>
        </div>
      </section>

      {/* BACKGROUND & JOURNEY SECTION - Education & Experience */}
      <section 
        id="stats-mobile" 
        className="section-fade min-h-screen flex flex-col justify-center px-5 py-12 relative overflow-hidden bg-[#021019]"
      >
        <div className="w-full max-w-md mx-auto space-y-5 animate-on-scroll relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-[#7BB3D3] text-xs font-[gotham] uppercase tracking-[0.3em] mb-2">My Journey</p>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#7BB3D3] to-transparent mx-auto"></div>
          </div>

          {/* Education Card */}
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <img src="/images/adzu_logo.png" alt="ADZU" className="w-16 h-16 object-contain" />
              </div>
              <div className="flex-1">
                <p className="text-[#7BB3D3] text-[10px] font-[gotham] uppercase tracking-wider mb-1">Education</p>
                <h3 className="text-white text-base font-[gotham] font-bold leading-tight">BS Computer Science</h3>
                <a 
                  href="https://www.adzu.edu.ph" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 text-sm font-[gotham] mt-1 hover:text-[#7BB3D3] transition-colors inline-flex items-center gap-1"
                >
                  Ateneo de Zamboanga University
                  <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Stats - 2 Column */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-white font-[gotham]">3</span>
                <span className="text-[#7BB3D3] text-sm font-bold">+</span>
              </div>
              <p className="text-gray-400 text-xs font-[gotham] mt-1">Years Coding</p>
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-white font-[gotham]">15</span>
                <span className="text-[#7BB3D3] text-sm font-bold">+</span>
              </div>
              <p className="text-gray-400 text-xs font-[gotham] mt-1">Technologies</p>
            </div>
          </div>

          {/* Core Expertise - 5 Categories with Real Icons */}
          <div className="space-y-3">
            {/* Frontend Development */}
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
              <h4 className="text-white text-sm font-[gotham] font-medium mb-3">Frontend Development</h4>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/react.svg" alt="React" className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">React</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/javascript.svg" alt="JavaScript" className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">JavaScript</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/typescript.svg" alt="TypeScript" className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">TypeScript</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/tailwind.svg" alt="Tailwind" className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">Tailwind</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/mui.svg" alt="MUI" className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">MUI</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <svg className="w-3.5 h-3.5 text-[#88CE02]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.182c5.423 0 9.818 4.395 9.818 9.818S17.423 21.818 12 21.818 2.182 17.423 2.182 12 6.577 2.182 12 2.182z"/>
                  </svg>
                  <span className="text-[10px] text-gray-300 font-[gotham]">GSAP</span>
                </div>
              </div>
            </div>

            {/* Backend Development */}
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
              <h4 className="text-white text-sm font-[gotham] font-medium mb-3">Backend Development</h4>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/nodejs.svg" alt="Node.js" className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">Node.js</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/express.svg" alt="Express" className="w-3.5 h-3.5 invert opacity-70" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">Express</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/python.svg" alt="Python" className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">Python</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/php.svg" alt="PHP" className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">PHP</span>
                </div>
              </div>
            </div>

            {/* Databases */}
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
              <h4 className="text-white text-sm font-[gotham] font-medium mb-3">Databases</h4>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/postgre.svg" alt="PostgreSQL" className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">PostgreSQL</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/mysql.svg" alt="MySQL" className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">MySQL</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/mongodb.svg" alt="MongoDB" className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">MongoDB</span>
                </div>
              </div>
            </div>

            {/* Tools & AI */}
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
              <h4 className="text-white text-sm font-[gotham] font-medium mb-3">Tools & AI</h4>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/git.svg" alt="Git" className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">Git</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/docker.svg" alt="Docker" className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">Docker</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/figma.svg" alt="Figma" className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">Figma</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/openai.svg" alt="ChatGPT" className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">AI Tools</span>
                </div>
              </div>
            </div>

            {/* Cloud Platforms */}
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
              <h4 className="text-white text-sm font-[gotham] font-medium mb-3">Cloud Platforms</h4>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/aws.svg" alt="AWS" className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">AWS</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/azure.svg" alt="Azure" className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">Azure</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/vercel.svg" alt="Vercel" className="w-3.5 h-3.5 invert" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">Vercel</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/cloudflare.svg" alt="Cloudflare" className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">Cloudflare</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/firebase.svg" alt="Firebase" className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">Firebase</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04]">
                  <img src="/techstack/supabase.svg" alt="Supabase" className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-300 font-[gotham]">Supabase</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="rounded-xl bg-[#F7DF1E]/5 border border-[#F7DF1E]/10 p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#F7DF1E]/10 flex items-center justify-center">
                <img src="/techstack/javascript.svg" alt="" className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-[gotham] font-medium">Currently Mastering</p>
                <p className="text-gray-400 text-xs font-[gotham]">JavaScript & TypeScript — 2026</p>
              </div>
          
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - Mobile */}
            {/* ABOUT SECTION - Who am I? */}
      <section id="about-mobile" className="section-fade min-h-screen flex flex-col justify-center px-5 py-16 bg-[#021019] relative overflow-hidden">
        <div className="w-full max-w-md mx-auto space-y-6 animate-on-scroll relative z-10">
          <div className="text-center mb-6">
            <p className="text-[#7BB3D3] text-xs font-[gotham] uppercase tracking-[0.3em] mb-2">About Me</p>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#7BB3D3] to-transparent mx-auto"></div>
          </div>
          
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
            Full stack web developer focused on building clean, responsive, and user-friendly applications, with an emphasis on modern frameworks and real-world problem solving.
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

      {/* SECTION 2: Skills - Interactive 3D Tilt Tech Icons Grid */}
      <section id="skills-mobile" className="section-fade min-h-screen relative overflow-hidden bg-[#021019] flex flex-col items-center justify-start py-16 px-4 pb-24">
        {/* Title */}
        <div className="text-center mb-10 z-10 animate-on-scroll">
          <p className="text-[#7BB3D3] text-xs font-[gotham] uppercase tracking-[0.3em] mb-2">Tech Stack</p>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#7BB3D3] to-transparent mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm font-[gotham]">Technologies / Programmatic</p>
        </div>
        
        {/* 3D Tilt Tech Icons Grid */}
        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto animate-on-scroll">
          {techIcons.map((icon, idx) => (
            <Tilt
              key={`tech-${idx}`}
              tiltMaxAngleX={25}
              tiltMaxAngleY={25}
              perspective={1000}
              scale={1.05}
              transitionSpeed={400}
              gyroscope={true}
              glareEnable={true}
              glareMaxOpacity={0.3}
              glareColor="#7BB3D3"
              glarePosition="all"
              glareBorderRadius="12px"
            >
              <div className="w-full aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex flex-col items-center justify-center border border-white/10 hover:border-[#7BB3D3]/50 transition-all shadow-lg backdrop-blur-sm p-3 cursor-pointer">
                <img 
                  src={icon.src} 
                  alt={icon.name} 
                  className="w-10 h-10 object-contain mb-2 drop-shadow-lg" 
                />
                <span className="text-[10px] text-gray-300 font-[gotham] text-center leading-tight">{icon.name}</span>
              </div>
            </Tilt>
          ))}
        </div>
        
        {/* Subtle hint */}
        <p className="text-gray-500 text-xs mt-8 font-[gotham] animate-on-scroll">and still learning!</p>
        
        {/* Additional Tools - UI/UX Design */}
        <div className="mt-6 animate-on-scroll">
          <p className="text-gray-400 text-[10px] font-[gotham] text-center mb-3">Also knowledgeable for UI/UX Design</p>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <img src="/techstack/figma.svg" alt="Figma" className="w-6 h-6" />
              <span className="text-white text-[10px] font-[gotham] font-bold">Figma</span>
              <span className="text-gray-400 text-[8px] font-[gotham]">Prototyping</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Projects - Compact Preview Cards */}
      <section id="projects-mobile" className="section-fade min-h-screen flex flex-col justify-center py-8 px-3 bg-[#021019]">
        <div className="w-full max-w-sm mx-auto animate-on-scroll">
          <div className="text-center mb-6">
            <p className="text-[#7BB3D3] text-xs font-[gotham] uppercase tracking-[0.3em] mb-2">My Work</p>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#7BB3D3] to-transparent mx-auto mb-3"></div>
            <p className="text-gray-400 text-[10px] font-[gotham]">Tap to view details</p>
          </div>

          {/* Project Preview Cards */}
          <div className="relative">
            <Swiper
              modules={[Pagination, A11y, Autoplay]}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1.15}
              spaceBetween={12}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: true,
              }}
              pagination={{ 
                dynamicBullets: true,
                clickable: true 
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              className="w-full pb-8"
            >
              {projectPreviews.map((project) => (
                <SwiperSlide key={project.id}>
                  <Tilt
                    tiltMaxAngleX={5}
                    tiltMaxAngleY={5}
                    perspective={1000}
                    scale={1}
                    transitionSpeed={300}
                    gyroscope={false}
                  >
                    <div 
                      className="bg-gradient-to-br from-[#004F85]/25 to-[#578e8c]/10 rounded-xl overflow-hidden border border-white/10 cursor-pointer active:scale-[0.98] transition-all duration-200 shadow-lg"
                      onClick={() => setFullscreenProject(project.id)}
                    >
                      {/* Project Image or Placeholder */}
                      <div className="relative h-40 overflow-hidden">
                        {project.image ? (
                          <>
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = '/images/pos.webp'
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#021019]/80 to-transparent"></div>
                          </>
                        ) : (
                          <div className="w-full h-full bg-[#021019] flex flex-col items-center justify-center">
                            <svg className="w-10 h-10 text-[#7BB3D3]/40 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            <span className="text-gray-500 text-xs font-[gotham]">Coming Soon</span>
                          </div>
                        )}
                        
                        {/* Title overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="text-white font-[gotham] font-bold text-sm">{project.title}</h3>
                        </div>
                      </div>
                      
                      {/* Tech Stack */}
                      <div className="p-3 flex items-center gap-2">
                        <span className="text-[9px] text-gray-400 font-[gotham] uppercase">Tech:</span>
                        <div className="flex gap-1.5">
                          {project.techStack.map((tech, idx) => {
                            const techIcon = techIcons.find(t => t.name.toLowerCase() === tech)
                            return techIcon ? (
                              <img 
                                key={idx}
                                src={techIcon.src} 
                                alt={tech} 
                                className="w-4 h-4 object-contain opacity-70"
                              />
                            ) : null
                          })}
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Contact Reveal Animation */}
      <section className="relative h-[20vh] bg-[#021019] flex items-center justify-center overflow-hidden">
        <div className="animate-on-scroll text-center">
          <p className="text-[#7BB3D3] text-xs font-[gotham] uppercase tracking-[0.3em] mb-2">Get In Touch</p>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#7BB3D3] to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Contact Section - Single Column Layout */}
      <section id="contact" className="section-fade relative bg-[#021019] overflow-hidden" style={{ minHeight: '80vh' }}>
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[150px] h-[150px] rounded-full bg-[#7BB3D3]/10 blur-[60px]" style={{ top: '10%', left: '5%' }}></div>
          <div className="absolute w-[120px] h-[120px] rounded-full bg-[#F6AA10]/8 blur-[50px]" style={{ bottom: '15%', right: '10%' }}></div>
        </div>

        <div className="relative z-10 max-w-sm mx-auto px-5 py-8">
          {/* Title */}
          <div className="text-center mb-8 animate-on-scroll">
            <h2 className="text-2xl font-[gotham] font-light text-white leading-tight">
              Let's start a
            </h2>
            <h2 className="text-2xl font-[gotham] font-bold slate-sky-theme leading-tight">
              project together
            </h2>
          </div>

          {/* Contact Form */}
          <div className="space-y-4 mb-10 animate-on-scroll">
            <div className="border-b border-white/15 pb-3">
              <label className="text-white/40 text-xs font-[gotham] uppercase tracking-wider block mb-2">Name</label>
              <input 
                type="text" 
                placeholder="Your name *"
                className="w-full bg-transparent text-white text-sm font-[gotham] placeholder-white/30 outline-none"
              />
            </div>

            <div className="border-b border-white/15 pb-3">
              <label className="text-white/40 text-xs font-[gotham] uppercase tracking-wider block mb-2">Email</label>
              <input 
                type="email" 
                placeholder="your@email.com *"
                className="w-full bg-transparent text-white text-sm font-[gotham] placeholder-white/30 outline-none"
              />
            </div>

            <div className="border-b border-white/15 pb-3">
              <label className="text-white/40 text-xs font-[gotham] uppercase tracking-wider block mb-2">Service</label>
              <input 
                type="text" 
                placeholder="Web Development, etc."
                className="w-full bg-transparent text-white text-sm font-[gotham] placeholder-white/30 outline-none"
              />
            </div>

            <div className="border-b border-white/15 pb-3">
              <label className="text-white/40 text-xs font-[gotham] uppercase tracking-wider block mb-2">Message</label>
              <textarea 
                placeholder="Tell me about your project..."
                rows={3}
                className="w-full bg-transparent text-white text-sm font-[gotham] placeholder-white/30 outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#004F85] to-[#578e8c] rounded-xl text-white font-[gotham] font-bold text-sm active:scale-[0.98] transition-transform mt-4">
              <span>Send Message</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            {/* Or Connect With Me */}
            <div className="pt-6 animate-on-scroll">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="text-white/40 text-xs font-[gotham] uppercase tracking-wider">or connect directly</span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              {/* Direct Contact Options */}
              <div className="space-y-3">
                {/* Email */}
                <a 
                  href="mailto:kennethque101@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 active:bg-white/10 active:scale-[0.98] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#EA4335]/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#EA4335]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-[gotham] font-medium">Send me an email</p>
                    <p className="text-white/50 text-xs font-[gotham]">kennethque101@gmail.com</p>
                  </div>
                  <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Phone */}
                <a 
                  href="tel:+639690919791"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 active:bg-white/10 active:scale-[0.98] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#7BB3D3]/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#7BB3D3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-[gotham] font-medium">Give me a call</p>
                    <p className="text-white/50 text-xs font-[gotham] flex items-center gap-1">
                      <span>🇵🇭</span>
                      <span>+63 969 091 9791</span>

                    </p>
                  </div>
                  <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* WhatsApp */}  
                <a 
                  href="https://wa.me/639060364511"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 active:bg-[#25D366]/10 active:scale-[0.98] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-[gotham] font-medium">Message me on WhatsApp</p>
                
                  </div>
                  <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/10 mb-6"></div>

          {/* Socials & Location */}
          <div className="space-y-6 animate-on-scroll">
            {/* Location */}
            <div className="text-center">
              <p className="text-white/40 text-xs font-[gotham] uppercase tracking-wider mb-1">Based in</p>
              <p className="text-white text-sm font-[gotham]">Zamboanga City, Philippines</p>
            </div>

            {/* Socials */}
            <div className="text-center">
              <p className="text-white/40 text-xs font-[gotham] uppercase tracking-wider mb-3">Follow Me</p>
              <div className="flex justify-center gap-3">
                <a href="https://github.com/ClydeQue" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-[#7BB3D3]/20 hover:border-[#7BB3D3]/30 transition-all">
                  <img src="/icons/github.svg" alt="GitHub" className="w-5 h-5 filter invert opacity-70" />
                </a>
                <a href="https://www.linkedin.com/in/kenneth-que/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-[#7BB3D3]/20 hover:border-[#7BB3D3]/30 transition-all">
                  <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-5 h-5 filter invert opacity-70" />
                </a>
                <a href="https://facebook.com/kc012s" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-[#7BB3D3]/20 hover:border-[#7BB3D3]/30 transition-all">
                  <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5 filter invert opacity-70" />
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-white/10 text-center">
            <p className="text-white/30 text-xs font-[gotham]">© 2026 ClydeDevs. All rights reserved.</p>
          </div>
        </div>
      </section>

      {/* Fullscreen Project Modal - Improved UX */}
      {fullscreenProject && (
        <div 
          className="fixed inset-0 z-[9999] bg-[#021019]/98 backdrop-blur-md flex flex-col"
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          {/* Top Bar with Close */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-[#021019] to-transparent">
            <button 
              onClick={() => setFullscreenProject(null)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 active:scale-95 transition-all"
              aria-label="Close project view"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span className="text-white text-xs font-[gotham]">Back</span>
            </button>
            
            <span className="text-gray-400 text-xs font-[gotham]">Project {fullscreenProject} of 7</span>
          </div>

          {/* Project Content */}
          <div 
            className="flex-1 overflow-y-auto px-4 pb-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-lg mx-auto backdrop-blur-lg bg-gradient-to-br from-[#004F85]/25 to-[#578e8c]/15 rounded-2xl p-5 shadow-2xl border border-white/15 my-4">
              {fullscreenProject === 1 && <Project1 />}
              {fullscreenProject === 2 && <Project2 />}
              {fullscreenProject === 3 && <Project3 />}
              {fullscreenProject === 4 && <Project4 />}
              {fullscreenProject === 5 && <Project5 />}
              {fullscreenProject === 6 && <Project6 />}
              {fullscreenProject === 7 && <Project7 />}
            </div>
          </div>

          {/* Bottom Navigation - Minimal & Subtle */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#021019] to-transparent pt-6 pb-3 px-4">
            <div className="flex items-center justify-center gap-6 max-w-lg mx-auto">
              <button 
                onClick={() => setFullscreenProject(fullscreenProject === 1 ? 7 : fullscreenProject - 1)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition-all"
                aria-label="Previous project"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7BB3D3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              
              {/* Subtle Project Indicators */}
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <button
                    key={num}
                    onClick={() => setFullscreenProject(num)}
                    className={`rounded-full transition-all duration-300 ${
                      fullscreenProject === num 
                        ? 'bg-[#7BB3D3]/80 w-5 h-1.5' 
                        : 'bg-white/20 w-1.5 h-1.5 hover:bg-white/40'
                    }`}
                    aria-label={`Go to project ${num}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={() => setFullscreenProject(fullscreenProject === 7 ? 1 : fullscreenProject + 1)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition-all"
                aria-label="Next project"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7BB3D3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* PDF Modal for CV */}
      <PDFModal 
        isOpen={isPDFOpen} 
        onClose={() => setIsPDFOpen(false)} 
        pdfUrl="/portfolio/KennethClydeQue_CV.pdf"
        title="Kenneth Clyde Que - CV"
      />
    </div>
  )
}

export default MobileLayout
