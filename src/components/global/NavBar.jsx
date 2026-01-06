import React, { useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const navItems = [
  { name: 'HOME', id: 'home' },
  { name: 'SKILLS', id: 'skills' },
  { name: 'PROJECTS', id: 'projects' },
  { name: 'CONTACT', id: 'contact' }
]

const NavBar = () => {
  const [activeSection, setActiveSection] = useState('HOME')

  useEffect(() => {
    // Check if mobile device - skip ScrollTrigger on mobile
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      console.log('📱 Mobile detected: Skipping NavBar ScrollTriggers');
      
      // On mobile, use IntersectionObserver instead for better performance
      const sections = document.querySelectorAll('section[id]')
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id')
            if (sectionId === 'home') setActiveSection('HOME')
            else if (sectionId === 'skills' || sectionId === 'skills-mobile') setActiveSection('SKILLS')
            else if (sectionId === 'projects' || sectionId === 'projects-mobile') setActiveSection('PROJECTS')
            else if (sectionId === 'contact') setActiveSection('CONTACT')
          }
        })
      }, { threshold: 0.3 })
      
      sections.forEach(section => observer.observe(section))
      
      return () => observer.disconnect()
    }

    console.log('💻 Desktop detected: Using ScrollTrigger for NavBar');
    
    // Wait for GSAP ScrollTriggers to be created, then monitor them
    const setupNavTracking = () => {
      // Create custom ScrollTriggers that work with pinned sections
      // Use scroll position percentage to determine active section
      
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Calculated thresholds based on scroll structure:
          // Section 1 (Home): 7000vh pin
          // Section 2 (Take A Look/Skills): 1000% pin  
          // Section 3 (Projects): 3 panels horizontal scroll
          // Section 4 (Contact): 100vh
          // HOME: 0% to 55% (before skills section)
          // SKILLS: 55% to 74% (Take A Look technologies)
          // PROJECTS: 74% to 97% (horizontal panels)
          // CONTACT: 97% to 100% (contact section)
          
          if (progress < 0.55) {
            setActiveSection('HOME')
          } else if (progress < 0.74) {
            setActiveSection('SKILLS')
          } else if (progress < 0.97) {
            setActiveSection('PROJECTS')
          } else {
            setActiveSection('CONTACT')
          }
        }
      })
    }
    
    // Delay setup to ensure GSAP ScrollTriggers are initialized
    const timer = setTimeout(setupNavTracking, 500)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => {
        // Only kill nav-related triggers, not the main animation ones
        if (trigger.vars && !trigger.vars.id) {
          trigger.kill()
        }
      })
    }
  }, [])

  // Smooth scroll to section when clicked
  const scrollToSection = (sectionId) => {
    if (sectionId === 'home') {
      gsap.to(window, { 
        duration: 2, 
        scrollTo: { y: 0, autoKill: false },
        ease: "power2.inOut"
      })
    } else if (sectionId === 'skills') {
      gsap.to(window, { 
        duration: 2, 
        scrollTo: { y: "#skills", autoKill: false },
        ease: "power2.inOut"
      })
    } else if (sectionId === 'projects') {
      gsap.to(window, { 
        duration: 2, 
        scrollTo: { y: "#projects", autoKill: false },
        ease: "power2.inOut"
      })
    } else if (sectionId === 'contact') {
      gsap.to(window, { 
        duration: 2.5, 
        scrollTo: { y: "#contact", autoKill: false },
        ease: "power2.inOut"
      })
    }
  }

  return (
    //container
    <div 
      className='fixed top-0 left-0 right-0 z-50 bg-transparent '
    >
      <div className='flex items-center justify-between px-3 py-2 sm:px-4 md:px-6 lg:px-8 xl:px-10'>
        {/* left box - Logo */}
        <div className='bg-black py-1 px-3 rounded-md flex-shrink-0'>
            <p className='font-[gotham] font-bold text-xs sm:text-sm md:text-base lg:text-lg blue-theme-text'>
              <span className='hidden sm:inline'>ClydeDevs</span>
              <span className='sm:hidden'>C&C</span>
            </p>
        </div>
        
        {/* right box - Navigation */}
        <div className='flex items-center'>
            <div className='bg-black rounded-full py-1 px-2 sm:py-2 sm:px-3 md:px-4'>
                <ul className='flex space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4'>
                    {navItems.map((item) => (
                        <li 
                            key={item.name}
                            onClick={() => scrollToSection(item.id)}
                            className={`cursor-pointer font-[gotham] font-bold text-center flex items-center justify-center text-xs sm:text-xs md:text-sm lg:text-sm rounded-full py-1 px-2 sm:py-1 sm:px-2 md:px-3 transition-colors duration-300 ease-out ${
                                activeSection === item.name 
                                    ? 'bg-white text-black' 
                                    : 'bg-transparent text-white hover:text-gray-300'
                            }`}
                        >
                            <span className='hidden sm:inline'>{item.name}</span>
                            <span className='sm:hidden flex items-center justify-center'>
                              {item.name === 'HOME' && (
                                <img 
                                  src="/icons/home.svg" 
                                  alt="Home" 
                                  className={`w-3 h-3 ${activeSection === 'HOME' ? '' : 'filter invert'}`}
                                />
                              )}
                              {item.name === 'SKILLS' && (
                                <img 
                                  src="/icons/projects.svg" 
                                  alt="Skills" 
                                  className={`w-3 h-3 ${activeSection === 'SKILLS' ? '' : 'filter invert'}`}
                                />
                              )}
                              {item.name === 'PROJECTS' && (
                                <img 
                                  src="/icons/folder.svg" 
                                  alt="Projects" 
                                  className={`w-3 h-3 ${activeSection === 'PROJECTS' ? '' : 'filter invert'}`}
                                />
                              )}
                              {item.name === 'CONTACT' && (
                                <img 
                                  src="/icons/about.svg" 
                                  alt="Contact" 
                                  className={`w-3 h-3 ${activeSection === 'CONTACT' ? '' : 'filter invert'}`}
                                />
                              )}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar