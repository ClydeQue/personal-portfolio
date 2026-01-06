import ParallaxLights from '../components/ParallaxLights'
import NavBar from '../components/global/NavBar'
import HomeScrollAnimations from '../components/animations/HomeScrollAnimations'
import Project1 from '../components/panels/Project1'
import Project2 from '../components/panels/Project2'
import Project3 from '../components/panels/Project3'
import { TechStackBackground, Windmill } from '../components/section2'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useEffect, useRef } from 'react'
import '../App.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

/**
 * Desktop Layout - GSAP Scroll Animations
 */
function DesktopLayout() {
  const animationRefs = HomeScrollAnimations();
  // Contact section refs - animations now handled in HomeScrollAnimations
  const contactTitleRef = useRef(null);
  const contactFormRef = useRef(null);
  const contactInfoRef = useRef(null);

  return (
    <div className="App relative">
      {/* Scrollable Gradient Background */}
      <div 
        className="absolute top-0 left-0 w-full pointer-events-none z-0"
        style={{
          height: '4000vh',
          background: `
            radial-gradient(ellipse 350% 55% at 50% 0%, #fafafa 0%, #fafafa 25%, transparent 80%),
            radial-gradient(ellipse 300% 45% at 50% 20%, #F6AA10 30%, #143E5B 40%, transparent 80%),
            radial-gradient(ellipse 250% 25% at 50% 20%, #021019 0%, #021019 35%, transparent 80%),
            linear-gradient(to bottom, #fafafa 0%, #fafafa 8%, #F6AA10 20%, #143E5B 25%, #021019 30%, #021019 100%)
          `,
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      />
      
      {/* Fixed ParallaxLights - Lower z-index to stay behind content but above background */}
      <div className="fixed inset-0 z-[5] pointer-events-none">
        <ParallaxLights />
      </div>
      
      {/* Fixed Navigation */}
      <NavBar />
      
      {/* Content container - height:auto lets ScrollTrigger pins create scroll space */}
      {/* Background stays 4000vh for gradient, but content flows naturally */}
      <div style={{ minHeight: '100vh' }} className="relative z-10">
        
        {/* SECTION 1: Home */}
        <section ref={animationRefs.homeSectionRef} id="home" className="relative w-full min-h-[100vh] z-[10]">
          <div className="flex items-center h-full min-h-[100vh] py-8 md:py-0">
            {/* Left side content */}
            <div className="w-full md:w-[70%] mb-10 ml-4 md:ml-20 px-4 md:px-0 text-left space-y-4 md:space-y-5">
              <div className="space-y-1 md:space-y-2">
                <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-[gotham] font-medium text-gray-800 inline-block px-3 md:px-3 rounded-full outline-1 mb-3" ref={animationRefs.helloRef}>
                  Hello!
                </h1>

                <h2 className="text-sm sm:text-lg md:text-xl lg:text-3xl font-[gotham] font-bold" ref={animationRefs.nameRef}>
                  I'M CLYDE QUE,
                </h2>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-[gotham-narrow] font-extra slate-sky-theme" ref={animationRefs.titleRef}>
                  A Full Stack Web Developer
                </h3>
              </div>
              
              <div className="min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem] lg:min-h-[4.5rem] flex items-start">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black font-medium font-[gotham] leading-relaxed" ref={animationRefs.descriptionRef}>
                 Let's Bring Your <span className='font-extrabold slate-sky-theme'>Next Idea</span> to Life!
                </p>
              </div>
              
              <div className="mt-6 md:mt-8 lg:mt-15" ref={animationRefs.connectRef}>
                <div className="flex items-center space-x-4 mb-4 md:mb-6">
                  <p 
                    onClick={() => {
                      gsap.to(window, { 
                        duration: 3, 
                        scrollTo: "#contact",
                        ease: "sine.inOut"
                      })
                    }}
                    className="text-xs sm:text-xs md:text-sm lg:text-lg font-[gotham] font-bold text-black cursor-pointer hover:text-blue-600 hover:scale-105 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                  >
                    CONNECT WITH ME:
                  </p>
                  
                  {/* Social Media Icons */}
                  <div className="flex items-center space-x-3">
                    <a href="https://facebook.com/kc012s" target="_blank" rel="noopener noreferrer" className="hover:scale-125 hover:rotate-6 transition-all duration-300 ease-out">
                      <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 hover:opacity-75 transition-opacity hover:drop-shadow-[0_0_8px_rgba(24,119,242,0.8)]" />
                    </a>
                    <a href="https://github.com/Clydefois" target="_blank" rel="noopener noreferrer" className="hover:scale-125 hover:rotate-6 transition-all duration-300 ease-out">
                      <img src="/icons/github.svg" alt="GitHub" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 hover:opacity-75 transition-opacity hover:drop-shadow-[0_0_8px_rgba(88,166,255,0.8)]" />
                    </a>
                    <a href="https://www.linkedin.com/in/kcque101/" target="_blank" rel="noopener noreferrer" className="hover:scale-125 hover:rotate-6 transition-all duration-300 ease-out">
                      <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 hover:opacity-75 transition-opacity hover:drop-shadow-[0_0_8px_rgba(0,119,181,0.8)]" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:scale-125 hover:rotate-6 transition-all duration-300 ease-out">
                      <img src="/icons/twitter.svg" alt="Twitter" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 hover:opacity-75 transition-opacity hover:drop-shadow-[0_0_8px_rgba(29,161,242,0.8)]" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-3" ref={animationRefs.buttonsRef}>
                <button 
                  onClick={() => {
                    gsap.to(window, { 
                      duration: 3, 
                      scrollTo: "#projects",
                      ease: "sine.inOut"
                    })
                  }}
                  className="slate-sky-theme-bg text-black font-black outline-1 outline-neutral-400 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-6 md:px-8 lg:px-13 py-2 sm:py-1.5 rounded-[15px] font-[gotham] hover:scale-110 hover:shadow-[0px_8px_12px_0px_rgba(20,62,91,0.5)] hover:brightness-110 hover:-translate-y-1 transition-all duration-300 ease-out active:scale-95 w-full sm:w-auto cursor-pointer"
                >
                  PROJECTS
                </button>
                <button 
                  onClick={() => {
                    gsap.to(window, { 
                      duration: 3, 
                      scrollTo: "#skills",
                      ease: "sine.inOut"
                    })
                  }}
                  className="yellow-gradient-2-bg text-black font-black outline-1 outline-neutral-400 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-6 md:px-8 py-2 sm:py-1.5 rounded-[15px] font-[gotham] hover:scale-110 hover:shadow-[0px_8px_12px_0px_rgba(246,170,16,0.5)] hover:brightness-110 hover:-translate-y-1 transition-all duration-300 ease-out active:scale-95 w-full sm:w-auto cursor-pointer"
                >
                  SKILLS
                </button>
              </div>
            </div>
            
            {/* Person and Background Elements */}
            <div ref={animationRefs.personGroupRef} className="absolute bottom-0 right-0 w-full h-full pointer-events-none">
              <img 
                draggable="false"
                src="/images/me.png" 
                alt="Clyde Que - Full Stack Developer"
                className="absolute z-20 bottom-20  cursor-none sm:bottom-24 md:bottom-40 right-4 sm:right-8 md:right-12 w-48 sm:w-64 md:w-80 h-auto max-h-[400px] sm:max-h-[480px] md:max-h-[560px] object-contain object-center pointer-events-auto"
              />
              
              {/* Stroke outlines */}
              <div className="absolute w-48 sm:w-60 md:w-62 h-[400px] sm:h-[480px] md:h-[550px] rounded-tr-full rounded-tl-full bottom-0 right-6 sm:right-10 md:right-20 overflow-visible"
                style={{ 
                  transform: 'scale(1.08)',
                  background: 'linear-gradient(to bottom, rgba(27, 55, 75, 0.8), rgba(255, 255, 255, 0.8))',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  padding: '4px'
                }}
              />
              <div className="absolute w-48 sm:w-60 md:w-72 h-[400px] sm:h-[480px] md:h-[580px] rounded-tr-full rounded-tl-full bottom-0 right-6 sm:right-10 md:right-14 overflow-visible"
                style={{ 
                  transform: 'scale(1.08)',
                  background: 'linear-gradient(to bottom, rgba(27, 55, 75, 0.8), rgba(255, 255, 255, 0.8))',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  padding: '4px'
                }}
              />
              <div className="absolute w-48 sm:w-60 md:w-82 h-[400px] sm:h-[480px] md:h-[600px] rounded-tr-full rounded-tl-full bottom-0 right-6 sm:right-10 md:right-10 overflow-visible"
                style={{ 
                  transform: 'scale(1.08)',
                  background: 'linear-gradient(to bottom, rgba(27, 55, 75, 0.8), rgba(255, 255, 255, 0.8))',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  padding: '4px'
                }}
              />
            </div>
            
            {/* Left Corner Geometric Shapes */}
            <div ref={animationRefs.leftRectanglesRef} className="absolute bottom-0 left-0 z-10">
              <div className="absolute bottom-0 left-32 sm:left-40 md:left-60 w-8 sm:w-12 md:w-16 h-24 sm:h-32 md:h-40 bg-[#7BB3D3] rounded-tr-full rounded-tl-full"></div>
              <div className="absolute bottom-0 left-48 sm:left-60 md:left-80 w-8 sm:w-12 md:w-16 h-20 sm:h-26 md:h-32 bg-[#B5D3E7] rounded-tr-full rounded-tl-full"></div>
              <div className="absolute bottom-0 left-20 sm:left-28 md:left-40 w-8 sm:w-12 md:w-16 h-16 sm:h-22 md:h-28 bg-[#D1D5DB] rounded-tr-full rounded-tl-full"></div>
            </div>
            
            {/* Stats Container */}
            <div ref={animationRefs.rectangleRef} className="absolute z-[100] w-full sm:w-[600px] md:w-[700px] lg:w-[848px] h-32 sm:h-36 md:h-40 lg:h-44 px-4 sm:px-6 md:px-9 py-4 sm:py-5 md:py-6 bg-[#1B374B] rounded-tl-[35px] sm:rounded-tl-[45px] md:rounded-tl-[65px] bottom-0 right-0 bg-gradient-to-br">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-8 h-full items-center text-center">
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold yellow-theme-text-3 font-[gotham]">15+</h3>
                  <div className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-300 font-[gotham] text-center leading-tight">
                    <span className="text-white font-semibold">Delivered websites</span>
                    <span className="text-gray-400"> and </span>
                    <br className="hidden lg:block" />
                    <span className="font-semibold">web apps</span>
                    <span className="yellow-theme-text-2 font-bold"> across industries</span>
                  </div>
                </div>

                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl yellow-theme-text-3 font-bold text-white font-[gotham]">10+</h3>
                  <div className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-300 font-[gotham] leading-tight">
                    <span className="text-white font-semibold">Professional clients</span>
                    <span className="text-gray-400">, turning ideas into </span>
                    <span className="yellow-theme-text-2 font-semibold">digital solutions</span>
                  </div>
                </div>

                <div className="space-y-1 md:space-y-2 sm:col-span-2 lg:col-span-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl yellow-theme-text-3 font-bold text-white font-[gotham]">10K+</h3>
                  <div className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-300 font-[gotham] leading-tight">
                    <span className="text-white font-semibold">Hours</span>
                    <span className="text-gray-400"> coding and perfecting </span>
                    <span className="yellow-theme-text-2 font-semibold">web solutions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pull-Up Content - Who am I */}
            <div ref={animationRefs.pullUpContentRef} className="absolute bottom-[-300px] right-0 w-full z-[100] h-[300px] bg-[#1B374B]">
              <div className="flex flex-col sm:flex-row h-full relative items-end">
                {/* Services */}
                <div className="w-full sm:w-1/2 flex flex-col justify-end px-4 sm:px-8 md:px-12 lg:px-20 py-3 sm:py-4 md:py-6">
                  <div className="space-y-3 sm:space-y-4 md:space-y-6">
                    <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-8">
                      <div className="relative">
                        <div className="w-1 h-8 sm:h-10 md:h-12 bg-white rounded-full"></div>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                        <img src="/icons/webdev.svg" alt="Website Development" className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10" />
                        <h3 className="text-white font-bold text-sm sm:text-base md:text-lg font-[gotham]">Website Development</h3>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-8">
                      <div className="relative">
                        <div className="w-1 h-8 sm:h-10 md:h-12 bg-white rounded-full"></div>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                        <img src="/icons/appdev.svg" alt="Application Development" className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10" />
                        <h3 className="text-white font-bold text-sm sm:text-base md:text-lg font-[gotham]">Application Development</h3>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-8">
                      <div className="relative">
                        <div className="w-1 h-8 sm:h-10 md:h-12 bg-white rounded-full"></div>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                        <img src="/icons/host.svg" alt="Hosting Services" className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10" />
                        <h3 className="text-white font-bold text-sm sm:text-base md:text-lg font-[gotham]">Hosting Services</h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="absolute left-1/2 bottom-6 sm:bottom-8 w-[10px] sm:w-[12px] md:w-[15px] h-[120px] sm:h-[160px] md:h-[200px] bg-white rounded-full transform -translate-x-1/2"></div>

                {/* About */}
                <div className="w-full sm:w-1/2 flex flex-col justify-end px-4 sm:px-8 md:px-12 lg:px-15 py-3 sm:py-4 md:py-6">
                  <div className="space-y-2 sm:space-y-3 md:space-y-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-[gotham] mb-2 sm:mb-3 md:mb-4">Who am I?</h2>
                    <div className="text-xs sm:text-sm md:text-sm text-gray-300 font-[gotham] leading-relaxed space-y-1 sm:space-y-2">
                      <p>
                        My name is <span className="gradient-theme-text font-semibold">Kenneth Clyde A. Que</span>. I started my 
                        <span className="font-semibold"> software journey</span> back in college.
                      </p>
                      <p>
                        Now, as a 3rd-year CS student, I've grown into building 
                        <span className="yellow-theme-text font-semibold"> professional websites</span> and apps.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 - Skills */}
        <section
          id="skills"
          ref={animationRefs.section2Ref}
          style={{
            width: "100vw",
            height: "100vh",
            display: "grid",
            placeItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <TechStackBackground />
          <Windmill />
          <h2 className="title font-[gotham] font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl" style={{ position: "relative", zIndex: 1 }}>
            Take A Look!
          </h2>
        </section>

        <div id="pin-windmill-wrap" style={{ height: "1px", width: "100%" }} />

        {/* SECTION 3 - Projects (Horizontal Scroll) */}
        <section 
          id="projects"
          ref={animationRefs.section3Ref} 
          style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
        >
          <div ref={animationRefs.wrapperRef}>
            <article className="panel" style={{ minWidth: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="panel-inner flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4 md:px-6 gap-4 md:gap-8 overflow-y-auto md:overflow-visible py-6 md:py-0">
                <Project1/>
              </div>
            </article>

            <article className="panel" style={{ minWidth: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="panel-inner flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4 md:px-6 gap-4 md:gap-8 overflow-y-auto md:overflow-visible py-6 md:py-0">
                <Project2/>
              </div>
            </article>

            <article className="panel" style={{ minWidth: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="panel-inner flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4 md:px-6 gap-4 md:gap-8 overflow-y-auto md:overflow-visible py-6 md:py-0">
                <Project3/>
              </div>
            </article>

            <article className="panel" style={{ minWidth: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="panel-inner flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4 md:px-6 gap-4 md:gap-8 overflow-y-auto md:overflow-visible py-6 md:py-0">
                <Project3/>
              </div>
            </article>

            <article className="panel" style={{ minWidth: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="panel-inner flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4 md:px-6 gap-4 md:gap-8 overflow-y-auto md:overflow-visible py-6 md:py-0">
                <Project3/>
              </div>
            </article>

            <article className="panel" style={{ minWidth: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="panel-inner flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4 md:px-6 gap-4 md:gap-8 overflow-y-auto md:overflow-visible py-6 md:py-0">
                <Project3/>
              </div>
            </article>
          </div>
        </section>

        {/* Contact Section - Dennis Snellenberg Style (GSAP animation handled in HomeScrollAnimations) */}
        <section 
          id="contact" 
          className="relative w-full bg-[#021019] overflow-hidden"
          style={{ zIndex: 40, minHeight: '100vh', paddingBottom: '60px' }}
        >
          {/* Parallax Lights Background for Contact */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
            {/* Animated gradient orbs */}
            <div className="absolute w-[400px] h-[400px] rounded-full bg-[#7BB3D3]/20 blur-[120px] animate-float" style={{ top: '10%', left: '5%' }}></div>
            <div className="absolute w-[350px] h-[350px] rounded-full bg-[#F6AA10]/15 blur-[100px] animate-float-slow" style={{ top: '50%', right: '10%' }}></div>
            <div className="absolute w-[300px] h-[300px] rounded-full bg-[#004F85]/20 blur-[80px] animate-float-slower" style={{ bottom: '20%', left: '30%' }}></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-20 lg:py-24">
            {/* Title - Centered */}
            <div ref={contactTitleRef} className="mb-12 md:mb-16 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[gotham] font-light text-white leading-tight">
                Let's start a
              </h2>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[gotham] font-bold slate-sky-theme leading-tight">
                project together
              </h2>
            </div>

            {/* Content Grid - Justified Around */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start justify-items-center lg:justify-items-stretch">
              {/* Left - Contact Form */}
              <div ref={contactFormRef} className="space-y-6 w-full max-w-md lg:max-w-none lg:justify-self-start">
                {/* Form Item 1 */}
                <div className="contact-form-item border-b border-white/10 pb-5 group cursor-pointer hover:border-[#7BB3D3]/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="text-white/40 text-sm font-[gotham]">01</span>
                    <div className="flex-1">
                      <label className="text-white text-base font-[gotham] font-medium block mb-2">What's your name?</label>
                      <input 
                        type="text" 
                        placeholder="John Doe *"
                        className="w-full bg-transparent text-white/60 text-sm font-[gotham] placeholder-white/30 outline-none focus:text-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Item 2 */}
                <div className="contact-form-item border-b border-white/10 pb-5 group cursor-pointer hover:border-[#7BB3D3]/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="text-white/40 text-sm font-[gotham]">02</span>
                    <div className="flex-1">
                      <label className="text-white text-base font-[gotham] font-medium block mb-2">What's your email?</label>
                      <input 
                        type="email" 
                        placeholder="john@doe.com *"
                        className="w-full bg-transparent text-white/60 text-sm font-[gotham] placeholder-white/30 outline-none focus:text-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Item 3 */}
                <div className="contact-form-item border-b border-white/10 pb-5 group cursor-pointer hover:border-[#7BB3D3]/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="text-white/40 text-sm font-[gotham]">03</span>
                    <div className="flex-1">
                      <label className="text-white text-base font-[gotham] font-medium block mb-2">What's the name of your organization?</label>
                      <input 
                        type="text" 
                        placeholder="Company Name ®"
                        className="w-full bg-transparent text-white/60 text-sm font-[gotham] placeholder-white/30 outline-none focus:text-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Item 4 */}
                <div className="contact-form-item border-b border-white/10 pb-5 group cursor-pointer hover:border-[#7BB3D3]/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="text-white/40 text-sm font-[gotham]">04</span>
                    <div className="flex-1">
                      <label className="text-white text-base font-[gotham] font-medium block mb-2">What services are you looking for?</label>
                      <input 
                        type="text" 
                        placeholder="Web Design, Web Development..."
                        className="w-full bg-transparent text-white/60 text-sm font-[gotham] placeholder-white/30 outline-none focus:text-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Item 5 */}
                <div className="contact-form-item border-b border-white/10 pb-5 group cursor-pointer hover:border-[#7BB3D3]/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="text-white/40 text-sm font-[gotham]">05</span>
                    <div className="flex-1">
                      <label className="text-white text-base font-[gotham] font-medium block mb-2">Your message</label>
                      <textarea 
                        placeholder="Hello Clyde, can you help me with..."
                        rows={2}
                        className="w-full bg-transparent text-white/60 text-sm font-[gotham] placeholder-white/30 outline-none focus:text-white transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button className="contact-form-item mt-6 group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#004F85] to-[#578e8c] rounded-full text-white font-[gotham] font-bold hover:scale-105 hover:shadow-[0_0_30px_rgba(123,179,211,0.4)] transition-all duration-300">
                  <span>Send Message</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              {/* Right - Contact Info - Left aligned inside, right side of grid */}
              <div ref={contactInfoRef} className="space-y-8 flex flex-col items-start w-full max-w-md lg:max-w-none lg:justify-self-end">
                {/* Profile Image - BIGGER */}
                <div className="contact-info-item flex flex-col items-center lg:items-start gap-3">
                  <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-[#7BB3D3]/40 shadow-[0_0_30px_rgba(123,179,211,0.3)]">
                    <img src="/images/me.png" alt="Clyde Que" className="w-full h-full object-contain scale-100" />
                  </div>
                  <div className="flex items-center gap-2 text-[#7BB3D3]">
                    <span className="font-[gotham] text-sm">Let's connect</span>
                    <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="contact-info-item space-y-3 text-left">
                  <h4 className="text-white/40 text-xs font-[gotham] uppercase tracking-widest">Contact Details</h4>
                  <div className="space-y-1">
                    <a href="mailto:kennethque101@gmail.com" className="block text-white font-[gotham] hover:text-[#7BB3D3] transition-colors">kennethque101@gmail.com</a>
                    <a href="mailto:co230718@adzu.edu.ph" className="block text-white font-[gotham] hover:text-[#7BB3D3] transition-colors">co230718@adzu.edu.ph</a>
                    <a href="tel:+639690919791" className="block text-white font-[gotham] hover:text-[#7BB3D3] transition-colors">+63 969 091 9791</a>
                  </div>
                </div>

                {/* About Me */}
                <div className="contact-info-item space-y-3 text-left">
                  <h4 className="text-white/40 text-xs font-[gotham] uppercase tracking-widest">About Me</h4>
                  <div className="space-y-2 font-[gotham] text-sm">
                    <p className="text-white/80">Fullstack Developer</p>
                    <p className="text-white/80">📍 Zamboanga City, Philippines</p>
                    <a href="tel:+639060364511" className="block text-white hover:text-[#7BB3D3] transition-colors">📞 +63 906 036 4511</a>
                    <a href="https://wa.me/639060364511" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-[#25D366] transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Socials - Horizontal on desktop */}
                <div className="contact-info-item space-y-3 text-left">
                  <h4 className="text-white/40 text-xs font-[gotham] uppercase tracking-widest">Socials</h4>
                  <div className="flex flex-wrap justify-start gap-4">
                    <a href="https://github.com/Clydefois" target="_blank" rel="noopener noreferrer" className="text-white font-[gotham] hover:text-[#7BB3D3] transition-colors flex items-center gap-2">
                      <img src="/icons/github.svg" alt="GitHub" className="w-5 h-5" />
                      <span className="hidden sm:inline">GitHub</span>
                    </a>
                    <a href="https://www.linkedin.com/in/kcque101/" target="_blank" rel="noopener noreferrer" className="text-white font-[gotham] hover:text-[#7BB3D3] transition-colors flex items-center gap-2">
                      <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
                      <span className="hidden sm:inline">LinkedIn</span>
                    </a>
                    <a href="https://facebook.com/kc012s" target="_blank" rel="noopener noreferrer" className="text-white font-[gotham] hover:text-[#7BB3D3] transition-colors flex items-center gap-2">
                      <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5" />
                      <span className="hidden sm:inline">Facebook</span>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white font-[gotham] hover:text-[#7BB3D3] transition-colors flex items-center gap-2">
                      <img src="/icons/twitter.svg" alt="Twitter" className="w-5 h-5" />
                      <span className="hidden sm:inline">Twitter</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-20 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/40 text-sm font-[gotham]">© 2026 ClydeDevs. All rights reserved.</p>
              <p className="text-white/40 text-sm font-[gotham]">Designed & Built with passion</p>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  )
}

export default DesktopLayout
