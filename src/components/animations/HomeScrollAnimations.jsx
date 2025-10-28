import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Register the plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function HomeScrollStepByStep() {
  const connectRef = useRef(null)
  const helloRef = useRef(null)
  const nameRef = useRef(null)
  const rectangleRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const buttonsRef = useRef(null)
  const personGroupRef = useRef(null)
  const leftRectanglesRef = useRef(null)
  const pullUpContentRef = useRef(null)
  const groupContainerRef = useRef(null) // Parent wrapper for rectangleRef + pullUpContentRef
  const homeSectionRef = useRef(null)
  const nextSectionRef = useRef(null)
  const parallaxLightsRef = useRef(null)
  const panelRefs = useRef([])
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const wrapperRef = useRef(null);

  useLayoutEffect(() => {
    // capture refs in locals when needed inside cleanup blocks
    if (!homeSectionRef.current) return;

    // ====== MOBILE DETECTION ======
    const isMobile = window.innerWidth < 768;
    
    console.log(`🔍 Device detected: ${isMobile ? 'MOBILE' : 'DESKTOP'}`);
    
    // ====== MOBILE: DISABLE ALL GSAP ANIMATIONS ======
    if (isMobile) {
      console.log('📱 Mobile mode: GSAP animations DISABLED - Using simple scroll');
      
      // Show all panels immediately on mobile (no GSAP)
      panelRefs.current.forEach((panel, index) => {
        if (panel) {
          panel.style.opacity = '1';
          panel.style.transform = 'translateX(0) scale(1)';
          console.log(`Panel ${index + 1} visible (mobile)`);
        }
      });
      
      // No GSAP animations - just return
      return;
    }

    // ====== DESKTOP: FULL GSAP ANIMATIONS ======
    console.log('💻 Desktop mode: GSAP animations ENABLED');
    
    panelRefs.current.forEach((panel, index) => {
      if (panel) {
        gsap.set(panel, {
          opacity: 0,
          x: 100,
          scale: 0.9
        });
        console.log(`Panel ${index + 1} initialized for animation`);
      }
    });

    // ====== CONFIG ======
    // Timeline controls all animations
    
    // ====== HELPERS ======
    // Removed animateDescription function to let timeline control all animations
    
    // ====== TYPEWRITER ANIMATION ======
    const titles = [
      'A Full Stack Web Developer',
      'A Backend Engineer',
      'A Frontend Web Developer'
    ];
    let currentTitleIndex = 0;
    let typewriterIntervals = [];
    let isTypewriterActive = true;

    const typeWriterEffect = () => {
      if (!titleRef.current || !isTypewriterActive) return;

      const targetText = titles[currentTitleIndex];
      let charIndex = 0;
      let isDeleting = false;
      let currentText = '';

      const type = () => {
        if (!isTypewriterActive) {
          typewriterIntervals.forEach(id => clearInterval(id));
          return;
        }

        if (!isDeleting && charIndex < targetText.length) {
          // Type forward
          currentText = targetText.substring(0, charIndex + 1);
          titleRef.current.textContent = currentText + '|';
          charIndex++;
          
          const interval = setTimeout(type, 50); // Fast typing speed
          typewriterIntervals.push(interval);
        } else if (!isDeleting && charIndex === targetText.length) {
          // Finished typing, show cursor blinking for 2 seconds
          titleRef.current.textContent = currentText + '|';
          
          const blinkInterval = setInterval(() => {
            if (!isTypewriterActive) {
              clearInterval(blinkInterval);
              return;
            }
            titleRef.current.textContent = titleRef.current.textContent.endsWith('|') 
              ? currentText 
              : currentText + '|';
          }, 500);
          typewriterIntervals.push(blinkInterval);

          const timeout = setTimeout(() => {
            clearInterval(blinkInterval);
            isDeleting = true;
            type();
          }, 2000); // Wait 2 seconds before deleting
          typewriterIntervals.push(timeout);
        } else if (isDeleting && charIndex > 0) {
          // Delete backward
          charIndex--;
          currentText = targetText.substring(0, charIndex);
          titleRef.current.textContent = currentText + '|';
          
          const interval = setTimeout(type, 30); // Fast deleting speed
          typewriterIntervals.push(interval);
        } else if (isDeleting && charIndex === 0) {
          // Finished deleting, move to next title
          titleRef.current.textContent = '|';
          currentTitleIndex = (currentTitleIndex + 1) % titles.length;
          isDeleting = false;
          
          const timeout = setTimeout(() => {
            typeWriterEffect();
          }, 300); // Small pause before next title
          typewriterIntervals.push(timeout);
        }
      };

      type();
    };

    // Start the typewriter effect
    if (titleRef.current) {
      typeWriterEffect();
    }

    // Track current phase
    let currentPhase = 0;
    
    const restartAnimations = () => {
      // Timeline controls all animations, no manual restarts needed
    };

    const stopAnimations = () => {
      // Stop typewriter when titleRef animation begins
      isTypewriterActive = false;
      typewriterIntervals.forEach(id => {
        clearTimeout(id);
        clearInterval(id);
      });
      typewriterIntervals = [];
    };

    // MASTER timeline - Vertical cinematic intro ONLY
    // Responsive scroll distance: shorter on mobile for faster animations
    // Note: isMobile already declared above at line 34
    const scrollDistance = isMobile ? "+=2000vh" : "+=7000vh";
    // Mobile: instant response (scrub: true), Desktop: slight delay (scrub: 1)
    const scrubValue = isMobile ? true : 1;
    
    console.log(`Section 1: ${isMobile ? 'Mobile' : 'Desktop'} mode - Scrub: ${scrubValue}`);
    
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: homeSectionRef.current,
        start: "top top",
        end: scrollDistance, // Mobile: 2000vh, Desktop: 7000vh
        scrub: scrubValue, // Mobile: instant (true), Desktop: 1 second delay
        pin: true,
        pinSpacing: true,
        markers: false,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          let newPhase;
          
          if (progress < 0.01) {
            newPhase = 0;
          } else if (progress < 0.08) {
            newPhase = 1;
          } else if (progress < 0.20) {
            newPhase = 2;
          } else if (progress < 0.35) {
            newPhase = 3;
          } else if (progress < 0.50) {
            newPhase = 4;
          } else {
            newPhase = 5;
          }
          
          if (newPhase !== currentPhase) {
            if (newPhase <= 1 && currentPhase >= 2) {
              console.log(`ScrollTrigger: Returning to Phase ${newPhase} - restarting animations`);
              currentPhase = newPhase;
              restartAnimations();
            } else if (currentPhase <= 1 && newPhase >= 2) {
              console.log(`ScrollTrigger: Entering Phase ${newPhase} - stopping animations`);
                stopAnimations();
              currentPhase = newPhase;
            } else {
              currentPhase = newPhase;
            }
          }
        }
      }
    });




    // ---- PHASE 1 (40 → 140s) - Uniform animations
    master
      .call(() => {
        console.log('Entering Phase 1 - text fade out begins');
      }, [], 20)
      
      .to(helloRef.current, {
        y: -250,
        opacity: 0,
        ease: "power2.inOut",
        duration: 30
      }, 45)
      
      .to(nameRef.current, {
        y: -280,
        opacity: 0,
        ease: "power2.inOut",
        duration: 100
      }, 45)
      
      .call(() => {
        // Stop typewriter effect when title starts to fade out
        isTypewriterActive = false;
        typewriterIntervals.forEach(id => {
          clearTimeout(id);
          clearInterval(id);
        });
        typewriterIntervals = [];
      }, [], 45)
      .to(titleRef.current, {
        y: -300,
        opacity: 0,
        ease: "power3.inOut",
        duration: 100
      }, 45)
      
      .to(descriptionRef.current, {
        y: -220,
        opacity: 0,
        ease: "power3.inOut",
        duration: 100
      }, 45)
      
      .to(buttonsRef.current, {
        y: -200,
        opacity: 0,
        ease: "power3.inOut",
        duration: 100
      }, 45)
      
      .to(connectRef.current, {
        x: -400,
        opacity: 0,
        ease: "power2.inOut",
        duration: 100
      }, 45)
      
      .to(personGroupRef.current, {
        x: 500,
        opacity: 0,
        ease: "power2.inOut",
        duration: 100
      }, 45)
      
      .to(leftRectanglesRef.current, {
        y: 300,
        opacity: 0,
        ease: "power2.inOut",
        duration: 100
      }, 45);

    // ---- PHASE 2 (140 → 340s) - Rectangle width expansion
    master.addLabel("phase2", 140)
      .call(() => console.log('Entering Phase 2 - rectangle expansion'), [], 140)
      .to(rectangleRef.current, {
        width: "100vw",
        borderTopRightRadius: 55,
        ease: "power2.inOut",
        duration: 200
      }, 140);

    // ---- PHASE 3 (340 → 540s) - Rectangle height expansion
    master.addLabel("phase3", 340)
      .call(() => console.log('Entering Phase 3 - full rectangle + content'), [], 340)
      .set([pullUpContentRef.current], { visibility: 'visible' }, 340)
      .to(rectangleRef.current, {
        height: "100vh",
        ease: "power2.inOut",
        duration: 150
      }, 200)
      .fromTo(rectangleRef.current.querySelectorAll('h3, div, span'), {
        scale: 1
      }, {
        scale: 1.05,

        duration: 90,
        stagger: 0.5
      }, 400)
      .to(pullUpContentRef.current, {
        y: -250,
        opacity: 1,


      }, 600);

    // ---- PHASE 4 (540 → 740s) - Content positioning
    master.addLabel("phase4", 540)
      .call(() => console.log('Entering Phase 4 - content positioning'), [], 540)
      .to([rectangleRef.current, pullUpContentRef.current], {
        y: "-81vh",

        duration: 200
      }, 600)
      .to(rectangleRef.current, {
        borderTopLeftRadius: 500,
        borderTopRightRadius: 500,

        duration: 200
      }, 600)
      .to(pullUpContentRef.current, {
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,

        duration: 200,
      }, 600);

    // ---- PHASE 5 (740 → 940s) - Final exit & reveal Section 2
    master.addLabel("phase5", 740)
      
      // Move rectangle completely out of view upward
      .to(rectangleRef.current, {
        y: "-200vh",
        ease: "power2.in",
        duration: 80
      }, 780)
      
      // Move pull-up container out upward
      .to(pullUpContentRef.current, {
        y: "-200vh",
        ease: "power2.in",
        borderBottomLeftRadius: 1000,
        borderBottomRightRadius: 1000,
        duration: 80,
      }, 780)
      
     
      
      // Fade out content during movement
      .to(rectangleRef.current.querySelectorAll('*'), {
        opacity: 0,
        ease: "power2.in",
        duration: 40,
        stagger: 0.1
      }, 810)
      .to(pullUpContentRef.current.querySelectorAll('*'), {
        opacity: 0,
        ease: "power2.inOut",
        duration: 40,
        stagger: 0.1
      }, 810)
      

      .set([pullUpContentRef.current, pullUpContentRef.current.querySelectorAll('*')], { 
        visibility: 'hidden' 
      }, 850) 

      // (Overlay opacity no longer driven here)
    // (Section 2 is revealed during the exit tween above)
    

    // --- SECTION 2: pinned "Take A Look" (simple example) ---
    // First, fade out section 1 content
   // --- SECTION 2: pinned "Take A Look" ---
master.addLabel("section1Exit", 862)  // Moved earlier: 860 (end of phase 5 content) + 2
  // Fade out Section 1
  .to([homeSectionRef.current, parallaxLightsRef.current], { 
    autoAlpha: 0, 
    duration: 40
  }, "section1Exit")
 
  // Section 2 reveal handled at t=780; keep this block free to avoid conflicts
 
  // Optional: debug log
  .call(() => console.log('Entering new Section 2 - Take A Look'), [], "section1Exit+=20")
  // (Section 2 ScrollTrigger is created outside master; here we only reveal)
  .call(() => {
    if (nextSectionRef.current) {
      gsap.set(nextSectionRef.current, { autoAlpha: 1 });
    }
  }, [], "section1Exit+=0") // just after the fade in starts

// === SECTION 2: pinned "Take A Look" animation ===
gsap.delayedCall(0, () => {
  if (section2Ref.current) {
    // Mobile detection for performance optimization
    const isMobileSection2 = window.innerWidth < 768;
    const section2ScrollDistance = isMobileSection2 ? "+=300%" : "+=1000%";
    const section2ScrubValue = isMobileSection2 ? true : true; // Both instant for smooth scrolling
    
    console.log(`Section 2: ${isMobileSection2 ? 'Mobile' : 'Desktop'} mode - Scroll distance: ${section2ScrollDistance}, Scrub: instant`);
    
    // Make section visible initially
    gsap.set(section2Ref.current, { autoAlpha: 1 });
    
    const titleEl = section2Ref.current.querySelector('.title');
    if (titleEl) {
      // Initial state - title starts visible immediately
      gsap.set(titleEl, { autoAlpha: 1, y: 0, color: '#000000' });

      // Timeline for title color change (title is already visible)
      gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top top",
          end: section2ScrollDistance, // Mobile: 300%, Desktop: 1000%
          scrub: section2ScrubValue, // Instant response
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => console.log('✅ Section 2 PINNED'),
          markers: false, // Set to true for debugging
        },
      })
      .to(titleEl, { color: '#ffffff', duration: 2, ease: 'power2.inOut' }, 0); // Change to white immediately
    }

    // Animate background circles with morphing and parallax - smooth scroll effect
    const circles = gsap.utils.toArray(section2Ref.current.querySelectorAll('.circle-morph'));
    circles.forEach((circle) => {
      const speed = parseFloat(circle.dataset.speed) || 1;
      const isLanguageCircle = circle.classList.contains('circle-language');
      const direction = circle.dataset.direction || 'right';
      
      if (isLanguageCircle) {
        // Language circles: Start as small circles, expand to pill shapes
        const horizontalDistance = direction === 'right' ? 150 : -150;
        const bounceDirection = circle.dataset.bounceDirection || 'left';
        
        // Get text content to determine target width
        const textElement = circle.querySelector('span');
        const textWidth = textElement ? textElement.offsetWidth : 100;
        const targetWidth = Math.max(textWidth + 40, 120); // Add padding, minimum 120px
        
        // Determine bounce-out direction (different for each pill)
        let bounceX, bounceY;
        if (bounceDirection === 'left') {
          bounceX = -2000;
          bounceY = Math.random() * 500 - 250;
        } else if (bounceDirection === 'right') {
          bounceX = 2000;
          bounceY = Math.random() * 500 - 250;
        } else if (bounceDirection === 'up') {          bounceX = Math.random() * 500 - 250;
          bounceY = -2000;
        } else {
          bounceX = Math.random() * 500 - 250;
          bounceY = 2000;
        }
        
        // Set initial state (invisible)
        gsap.set(circle, { opacity: 0 });
        
        gsap.timeline({
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "top top",
            end: section2ScrollDistance, // Mobile: 300%, Desktop: 1000%
            scrub: 1.5,
          },
        })
       
        // Expand from circle to pill shape (width increases)
        .to(circle, {
          width: targetWidth + "px",
          duration: 3,
          ease: "power2.out",
        }, 0)
         // Fade in at the start
        .to(circle, {

          duration: 1.5,
          ease: "power2.out",
        }, 0)
        // Maintain pill shape by adjusting border radius
        .to(circle, {
          borderRadius: "25px",
          duration: 3,
          ease: "power2.out",
        }, 0)
        // Horizontal movement (left or right)
        .to(circle, {
          x: horizontalDistance * (speed / 3),
          ease: "none",
          opacity: 1,
          duration: 10,
          
          force3D: true,
        }, 0)
        // Subtle scale pulse
        .to(circle, {
          scale: 1.05,
          duration: 4,
          ease: "sine.inOut",
        }, 2)
        .to(circle, {
          scale: 1,
          duration: 4,
          ease: "sine.inOut",
        }, 6)
        // Fade out before bounce-out
        .to(circle, {
          opacity: 0.5,
          duration: 1,
          ease: "power2.in",
        }, 7.5)
        // Bounce-out exit effect at the end
        .to(circle, {
          x: bounceX,
          y: bounceY,
          rotation: Math.random() * 720 - 360,
          scale: 0.3,
          opacity: 0,
          duration: 2,
          ease: "back.in(2)",
        }, 8);
      } else {
        // Rain pill animation: small pills falling down like rain
        const isRainPill = circle.classList.contains('circle-rain-pill');
        
        if (isRainPill) {
          const initialWidth = parseInt(circle.style.width);
          const targetHeight = initialWidth * 8; // Make them long vertical pills
          const rainDelay = parseFloat(circle.dataset.rainDelay) || 0;
          const pillDirection = circle.dataset.direction || 'down';
          const pillSpeed = parseFloat(circle.dataset.speed) || 5.0;
          
          // Calculate movement based on direction and speed
          const movementDistance = window.innerHeight * 1.5 * (pillSpeed / 4);
          const yMovement = pillDirection === 'up' ? -movementDistance : movementDistance;
          
          gsap.timeline({
            scrollTrigger: {
              trigger: section2Ref.current,
              start: "top top",
              end: section2ScrollDistance, // Mobile: 300%, Desktop: 1000%
              scrub: 1.5,
            },
          })
          // Stretch to vertical pill shape
          .to(circle, {
            height: targetHeight + "px",
            duration: 2,
            ease: "power2.out",
          }, rainDelay)
          // Move (rain effect) - use individual speed
          .to(circle, {
            y: yMovement,
            ease: "none",
            duration: 6,
            force3D: true,
          }, rainDelay)
          // Fade out before section ends (at 80% of animation)
          .to(circle, {
            opacity: 0,
            duration: 2,
            ease: "power2.in",
          }, rainDelay + 6);
        } else {
          // Regular circles: old behavior (if any remain)
          const growSpeed = circle.dataset.grow || 'medium';
          const growMultipliers = {
            'slow': 1.5,
            'medium-slow': 2,
            'medium': 2.5,
            'medium-fast': 3,
            'fast': 4,
            'very-fast': 5,
          };
          const multiplier = growMultipliers[growSpeed] || 2.5;
          const initialWidth = parseInt(circle.style.width);
          const targetHeight = initialWidth * multiplier;
          
          gsap.timeline({
            scrollTrigger: {
              trigger: section2Ref.current,
              start: "top top",
              end: section2ScrollDistance, // Mobile: 300%, Desktop: 1000%
              scrub: 1.5,
            },
          })
          // Parallax movement using translate3d for performance
          .to(circle, {
            y: () => -(100 * speed),
            x: () => Math.sin(speed) * 30,
            ease: "none",
            duration: 10,
            force3D: true,
          }, 0)
          // Grow upward - height increases while width stays constant
          .to(circle, {
            height: targetHeight + "px",
            duration: 6,
            ease: "power2.out",
          }, 0)
          // Morph shape - change border radius to create organic shapes
          .to(circle, {
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            duration: 3,
            ease: "sine.inOut",
          }, 1)
          .to(circle, {
            borderRadius: "70% 30% 30% 70% / 70% 70% 30% 30%",
            duration: 3,
            ease: "sine.inOut",
          }, 4)
          .to(circle, {
            borderRadius: "50% 50% 50% 50% / 50% 50% 50% 50%",
            duration: 3,
            ease: "sine.inOut",
          }, 7)
          // Scale animation (slight)
          .to(circle, {
            scale: 1.2,
            duration: 5,
            ease: "sine.inOut",
          }, 0)
          .to(circle, {
            scale: 0.9,
            duration: 5,
            ease: "sine.inOut",
          }, 5)
          // Opacity animation
          .to(circle, {
            opacity: 0.4,
            duration: 5,
            ease: "sine.inOut",
          }, 0)
          .to(circle, {
            opacity: 0.95,
            duration: 5,
            ease: "sine.inOut",
          }, 5);
        }
      }
    });

    // Windmill rotation animation
    const windmillSvg = document.getElementById('pin-windmill-svg');
    const pinWindmill = document.getElementById('pin-windmill');
    const pinWindmillWrap = document.getElementById('pin-windmill-wrap');
    
    if (windmillSvg && pinWindmill && pinWindmillWrap) {
      const tl = gsap.timeline({
        scrollTrigger: {
          scrub: 1,
          pin: true,
          trigger: "#pin-windmill",
          start: "50% 50%",
          endTrigger: "#pin-windmill-wrap",
          end: "bottom 50%",
        },
      });

      tl.to("#pin-windmill-svg", {
        rotateZ: 900,
      });
    }
    
    // Force ScrollTrigger refresh after Section 2 is set up
    gsap.delayedCall(0.1, () => {
      ScrollTrigger.refresh();
      console.log('ScrollTrigger refreshed after Section 2 setup');
    });
  }
});

    // Section 3: horizontal panels with snap
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

gsap.delayedCall(0, () => {
  // Skip GSAP initialization on mobile (< 768px) - mobile uses separate Swiper carousel
  if (window.innerWidth < 768) {
    console.log('📱 Mobile detected: Skipping Section 3 GSAP initialization (using mobile carousel instead)');
    return;
  }

  const sectionEl = section3Ref.current;
  const wrapEl = wrapperRef.current;

  if (sectionEl && wrapEl) {
    const panels = gsap.utils.toArray(wrapEl.querySelectorAll('.panel'));

    if (panels.length > 0) {
      // Layout setup - ensure proper sizing
      wrapEl.style.width = `${panels.length * 100}vw`;
      wrapEl.style.display = 'flex';
      wrapEl.style.height = '100vh';
      wrapEl.style.willChange = 'transform';
      
      // Ensure each panel is exactly 100vw
      panels.forEach((panel) => {
        if (panel) {
          panel.style.width = '100vw';
          panel.style.minWidth = '100vw';
          panel.style.maxWidth = '100vw';
          panel.style.flex = '0 0 100vw';
          panel.style.willChange = 'transform, opacity';
        }
      });

      // Calculate total scroll distance based on actual wrapper width
      const totalWidth = panels.length * window.innerWidth;

      // GSAP horizontal scroll - animate the wrapper, not the panels
      gsap.to(wrapEl, {
        x: () => -(totalWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: 0.3,
            ease: "power2.inOut",
            directional: true
          },
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Debug: log progress to ensure snapping to correct positions
            const panelIndex = Math.round(self.progress * (panels.length - 1));
            console.log(`Scroll progress: ${(self.progress * 100).toFixed(1)}%, Panel: ${panelIndex + 1}/${panels.length}`);
          }
        }
      });

      console.log(`✅ Section 3 initialized: ${panels.length} panels, ${totalWidth}px total width`);
    }
  }
});
    
    ScrollTrigger.refresh();

    const resizeHandler = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      // Kill master timeline
      if (master && master.scrollTrigger) {
        master.scrollTrigger.kill();
      }
      if (master) {
        master.kill();
      }
      
      // Clean up all ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Return refs
  return {
    connectRef,
    helloRef,
    nameRef,
    rectangleRef,
    titleRef,
    descriptionRef,
    buttonsRef,
    personGroupRef,
    leftRectanglesRef,
    pullUpContentRef,
    homeSectionRef,
    nextSectionRef,
    parallaxLightsRef,
    panelRefs,
    section2Ref,
    section3Ref,
    wrapperRef,
  }
}