import React, { useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const navItems = [
  { name: 'HOME', id: 'home' },
  { name: 'PROJECTS', id: 'projects' },
  { name: 'SKILLS', id: 'skills' },
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
    
    // Track which section is active based on scroll position (Desktop only)
    const sections = document.querySelectorAll('section[id]')
    
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          const sectionId = section.getAttribute('id')
          if (sectionId === 'home') setActiveSection('HOME')
          else if (sectionId === 'skills') setActiveSection('SKILLS')
          else if (sectionId === 'projects') setActiveSection('PROJECTS')
          else if (sectionId === 'contact') setActiveSection('CONTACT')
        },
        onEnterBack: () => {
          const sectionId = section.getAttribute('id')
          if (sectionId === 'home') setActiveSection('HOME')
          else if (sectionId === 'skills') setActiveSection('SKILLS')
          else if (sectionId === 'projects') setActiveSection('PROJECTS')
          else if (sectionId === 'contact') setActiveSection('CONTACT')
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Smooth scroll to section when clicked
  const scrollToSection = (sectionId) => {
    if (sectionId === 'home') {
      gsap.to(window, { 
        duration: 3, 
        scrollTo: { y: 0, autoKill: false },
        ease: "sine.inOut"
      })
    } else if (sectionId === 'skills') {
      gsap.to(window, { 
        duration: 3, 
        scrollTo: "#skills",
        ease: "sine.inOut"
      })
    } else if (sectionId === 'projects') {
      gsap.to(window, { 
        duration: 3, 
        scrollTo: "#projects",
        ease: "sine.inOut"
      })
    }
    // Contact is non-functional for now
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
                            className={`cursor-pointer transition-all duration-500 font-[gotham] font-bold text-center flex items-center justify-center text-xs sm:text-xs md:text-sm lg:text-sm ${
                                activeSection === item.name 
                                    ? 'bg-white text-black py-1 px-2 sm:py-1 sm:px-2 md:px-3 rounded-full' 
                                    : 'text-white hover:text-gray-300 py-1 px-2 sm:py-1 sm:px-2'
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
                              {item.name === 'PROJECTS' && (
                                <img 
                                  src="/icons/folder.svg" 
                                  alt="Projects" 
                                  className={`w-3 h-3 ${activeSection === 'PROJECTS' ? '' : 'filter invert'}`}
                                />
                              )}
                              {item.name === 'SKILLS' && (
                                <img 
                                  src="/icons/projects.svg" 
                                  alt="Projects" 
                                  className={`w-3 h-3 ${activeSection === 'SKILLS' ? '' : 'filter invert'}`}
                                />
                              )}
                              {item.name === 'CONTACT' && (
                                <img 
                                  src="/icons/about.svg" 
                                  alt="About" 
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