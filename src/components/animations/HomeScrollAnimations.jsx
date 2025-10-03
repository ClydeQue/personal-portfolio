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



    
    panelRefs.current.forEach((panel, index) => {
      if (panel) {
        gsap.set(panel, {
          opacity: 0,
          x: 100,
          scale: 0.9
        });
        console.log(`Panel ${index + 1} initialized`);
      }
    });

    // ====== CONFIG ======
    // Timeline controls all animations
    
    // ====== HELPERS ======
    // Removed animateDescription function to let timeline control all animations
    
    // ====== H1 ANIMATION ======
    

    // Track current phase
    let currentPhase = 0;
    
    const restartAnimations = () => {
      // Timeline controls all animations, no manual restarts needed
    };

    const stopAnimations = () => {
      // Timeline controls all animations, no manual stops needed
    };

    // MASTER timeline - Vertical cinematic intro ONLY
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: homeSectionRef.current,
        start: "top top",
        end: "+=7000vh", // Long scroll distance for slower animations
        scrub: 1,
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
      }, 340)
      .fromTo(rectangleRef.current.querySelectorAll('h3, div, span'), {
        scale: 1
      }, {
        scale: 1.15,
        ease: "power2.out",
        duration: 90,
        stagger: 0.5
      }, 360)
      .to(pullUpContentRef.current, {
        y: -250,
        opacity: 1,
        ease: "power2.out",
        duration: 80
      }, 500);

    // ---- PHASE 4 (540 → 740s) - Content positioning
    master.addLabel("phase4", 540)
      .call(() => console.log('Entering Phase 4 - content positioning'), [], 540)
      .to([rectangleRef.current, pullUpContentRef.current], {
        y: "-80vh",
        ease: "power2.inOut",
        duration: 200
      }, 540)
      .to(rectangleRef.current, {
        borderTopLeftRadius: 500,
        borderTopRightRadius: 500,
        ease: "power2.inOut",
        duration: 200
      }, 540)
      .to(pullUpContentRef.current, {
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,
        ease: "power2.inOut",
        duration: 200,
      }, 540);

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
    const titleEl = section2Ref.current.querySelector('.title');
    if (titleEl) {
      // Initial state
      gsap.set(titleEl, { autoAlpha: 0, y: 80, color: '#000000' });

      // Timeline for title fade in and color change
      gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top top",
          end: "+=1000%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })
      .to(titleEl, { autoAlpha: 1, y: 0, duration: 2, ease: 'power2.out' }, 0)
      .to(titleEl, { color: '#ffffff', duration: 2, ease: 'power2.inOut' }, 1); // Change to white after initial fade in
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
        } else if (bounceDirection === 'up') {
          bounceX = Math.random() * 500 - 250;
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
            end: "+=1000%",
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
              end: "+=1000%",
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
              end: "+=1000%",
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
  }
});

    // Section 3: horizontal panels with snap
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

gsap.delayedCall(0, () => {
  const sectionEl = section3Ref.current;
  const wrapEl = wrapperRef.current;

  if (sectionEl && wrapEl) {
    const panels = gsap.utils.toArray(wrapEl.querySelectorAll('.panel'));

    if (panels.length > 0) {
      // Layout setup
      wrapEl.style.width = `${panels.length * 100}vw`;
      wrapEl.style.display = 'flex';
      wrapEl.style.height = '100vh';
      wrapEl.style.willChange = 'transform';
      panels.forEach((p) => (p && (p.style.willChange = 'transform, opacity')));

      const delayAmount = 100; // vh - extra scroll for delays

      // GSAP horizontal scroll for 6 panels
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionEl,
          pin: true,
          start: "top top",
          end: () => "+=" + wrapEl.offsetWidth + ` +=${delayAmount}vh`,
          scrub: 1,
          snap: {
            snapTo: panels.length > 1 ? 1 / (panels.length - 1) : 0,
            duration: { min: 0.2, max: 0.5 },
            ease: "power1.inOut",
            delay: 0.1,
            directional: false
          }
        }
      });
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