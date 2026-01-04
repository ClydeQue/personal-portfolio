import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, A11y, EffectCoverflow, Autoplay, Navigation } from 'swiper/modules'
import Tilt from 'react-parallax-tilt'
import Project1 from '../components/panels/Project1'
import Project2 from '../components/panels/Project2'
import Project3 from '../components/panels/Project3'
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
// MObile Layout Component
function MobileLayout() { 
  const swiperRef = useRef(null)
  const titleRef = useRef(null)
  const [fullscreenProject, setFullscreenProject] = useState(null)

  // Smooth scroll function using native smooth scroll (no GSAP conflicts)
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Simple fade-in animations on scroll using Intersection Observer (no GSAP)
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

    return () => {
      observer.disconnect()
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

      {/* SECTION 2: Skills - Interactive 3D Tilt Tech Icons Grid */}
      <section id="skills-mobile" className="min-h-screen relative overflow-hidden bg-[#021019] flex flex-col items-center justify-center py-16 px-4">
        {/* Title */}
        <div className="text-center mb-10 z-10 animate-on-scroll">
          <h2 className="font-[gotham] text-3xl font-bold text-white mb-3">
            Take A Look!
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7BB3D3] via-[#F6AA10] to-[#7BB3D3] rounded-full mx-auto"></div>
          <p className="text-gray-400 text-sm mt-4 font-[gotham]">Technologies I work with</p>
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
        <p className="text-gray-500 text-xs mt-8 font-[gotham] animate-on-scroll">Tilt to interact</p>
      </section>

      {/* SECTION 3: Projects - Improved UX */}
      <section id="projects-mobile" className="min-h-screen flex flex-col justify-center py-12 px-4" style={{ background: 'rgba(2, 16, 25, 0.95)' }}>
        <div className="w-full max-w-md mx-auto animate-on-scroll">
          <div className="text-center mb-8">
            <h2 className="font-[gotham] text-2xl font-bold slate-sky-theme mb-2">
              My Projects
            </h2>
            <p className="text-gray-400 text-xs font-[gotham]">Tap a card to view details</p>
          </div>

          {/* Project Cards with Navigation */}
          <div className="relative">
            {/* Subtle Navigation Arrows - positioned at edges */}
            <button 
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-16 flex items-center justify-center bg-gradient-to-r from-[#021019] to-transparent opacity-60 hover:opacity-100 transition-opacity"
              aria-label="Previous project"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7BB3D3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            
            <button 
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-16 flex items-center justify-center bg-gradient-to-l from-[#021019] to-transparent opacity-60 hover:opacity-100 transition-opacity"
              aria-label="Next project"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7BB3D3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>

            <Swiper
              modules={[Pagination, A11y, EffectCoverflow, Autoplay, Navigation]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1.2}
              spaceBetween={16}
              loop={true}
              autoplay={{
                delay: 6000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              coverflowEffect={{
                rotate: 8,
                stretch: 0,
                depth: 80,
                modifier: 1,
                slideShadows: false,
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
                }
              }}
              onTouchEnd={() => {
                if (swiperRef.current) {
                  setTimeout(() => {
                    if (swiperRef.current) {
                      swiperRef.current.autoplay.start()
                    }
                  }, 3000)
                }
              }}
              className="w-full pb-12"
            >
              <SwiperSlide>
                <Tilt
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  perspective={1000}
                  scale={1}
                  transitionSpeed={300}
                  gyroscope={false}
                >
                  <div 
                    className="backdrop-blur-lg bg-gradient-to-br from-[#004F85]/30 to-[#578e8c]/15 rounded-2xl p-5 shadow-2xl border border-white/15 h-[60vh] overflow-hidden cursor-pointer active:scale-[0.98] transition-all duration-200 relative group"
                    onClick={() => setFullscreenProject(1)}
                  >
                    {/* View indicator */}
                    <div className="absolute top-3 right-3 px-2 py-1 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
                      <span className="text-[10px] text-white font-[gotham]">Tap to view</span>
                    </div>
                    <div className="h-full overflow-y-auto pr-1 scrollbar-thin">
                      <Project1 />
                    </div>
                  </div>
                </Tilt>
              </SwiperSlide>

              <SwiperSlide>
                <Tilt
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  perspective={1000}
                  scale={1}
                  transitionSpeed={300}
                  gyroscope={false}
                >
                  <div 
                    className="backdrop-blur-lg bg-gradient-to-br from-[#004F85]/30 to-[#578e8c]/15 rounded-2xl p-5 shadow-2xl border border-white/15 h-[60vh] overflow-hidden cursor-pointer active:scale-[0.98] transition-all duration-200 relative group"
                    onClick={() => setFullscreenProject(2)}
                  >
                    <div className="absolute top-3 right-3 px-2 py-1 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
                      <span className="text-[10px] text-white font-[gotham]">Tap to view</span>
                    </div>
                    <div className="h-full overflow-y-auto pr-1 scrollbar-thin">
                      <Project2 />
                    </div>
                  </div>
                </Tilt>
              </SwiperSlide>

              <SwiperSlide>
                <Tilt
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  perspective={1000}
                  scale={1}
                  transitionSpeed={300}
                  gyroscope={false}
                >
                  <div 
                    className="backdrop-blur-lg bg-gradient-to-br from-[#004F85]/30 to-[#578e8c]/15 rounded-2xl p-5 shadow-2xl border border-white/15 h-[60vh] overflow-hidden cursor-pointer active:scale-[0.98] transition-all duration-200 relative group"
                    onClick={() => setFullscreenProject(3)}
                  >
                    <div className="absolute top-3 right-3 px-2 py-1 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
                      <span className="text-[10px] text-white font-[gotham]">Tap to view</span>
                    </div>
                    <div className="h-full overflow-y-auto pr-1 scrollbar-thin">
                      <Project3 />
                    </div>
                  </div>
                </Tilt>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-[40vh] flex items-center justify-center bg-[#021019] py-12 animate-on-scroll">
        <div className="text-center px-4 animate-on-scroll">
          <h2 className="font-[gotham] font-bold text-2xl text-white mb-3">Get In Touch</h2>
          <p className="text-sm font-[gotham] text-gray-400">Contact section coming soon...</p>
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
            
            <span className="text-gray-400 text-xs font-[gotham]">Project {fullscreenProject} of 3</span>
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
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#021019] via-[#021019]/90 to-transparent pt-8 pb-4 px-4">
            <div className="flex items-center justify-between max-w-lg mx-auto">
              <button 
                onClick={() => setFullscreenProject(fullscreenProject === 1 ? 3 : fullscreenProject - 1)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 active:scale-95 transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7BB3D3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
                <span className="text-white text-xs font-[gotham]">Prev</span>
              </button>
              
              {/* Project Indicators */}
              <div className="flex gap-2">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setFullscreenProject(num)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      fullscreenProject === num 
                        ? 'bg-[#7BB3D3] w-6' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to project ${num}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={() => setFullscreenProject(fullscreenProject === 3 ? 1 : fullscreenProject + 1)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 active:scale-95 transition-all"
              >
                <span className="text-white text-xs font-[gotham]">Next</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7BB3D3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default MobileLayout
