/**
 * Example: Responsive Animation Implementation
 * This shows how to use gsap.matchMedia() for responsive animations
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

export default function useResponsiveAnimations() {
  const homeSectionRef = useRef(null)
  const helloRef = useRef(null)
  const section2Ref = useRef(null)
  const windmillRef = useRef(null)

  useLayoutEffect(() => {
    if (!homeSectionRef.current) return;

    // ====== RESPONSIVE SETUP ======
    const mm = gsap.matchMedia();

    // ====== MOBILE: Short & Fast ======
    mm.add("(max-width: 767px)", () => {
      console.log('📱 Mobile animations active');

      // Section 1: Shorter scroll
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: homeSectionRef.current,
          start: "top top",
          end: "+=3000vh",  // SHORT scroll
          scrub: 0.5,       // FAST scrub
          pin: true,
        }
      });

      timeline.to(helloRef.current, {
        y: -250,
        opacity: 0,
        duration: 50  // Faster duration
      });

      // Section 2: Windmill DISABLED
      if (windmillRef.current) {
        gsap.set(windmillRef.current, { rotation: 0 });
      }

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    });

    // ====== TABLET: Medium ======
    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      console.log('📱 Tablet animations active');

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: homeSectionRef.current,
          start: "top top",
          end: "+=5000vh",  // MEDIUM scroll
          scrub: 1.0,       // MEDIUM scrub
          pin: true,
        }
      });

      timeline.to(helloRef.current, {
        y: -250,
        opacity: 0,
        duration: 75
      });

      // Windmill with reduced animation
      if (windmillRef.current) {
        gsap.to(windmillRef.current, {
          rotation: 180,
          scrollTrigger: {
            trigger: section2Ref.current,
            scrub: 1,
          }
        });
      }

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    });

    // ====== DESKTOP: Full Cinematic ======
    mm.add("(min-width: 1024px)", () => {
      console.log('💻 Desktop animations active');

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: homeSectionRef.current,
          start: "top top",
          end: "+=10000vh", // LONG scroll
          scrub: 1.5,       // SLOW scrub
          pin: true,
        }
      });

      timeline.to(helloRef.current, {
        y: -250,
        opacity: 0,
        duration: 100  // Slow, cinematic
      });

      // Full windmill animation
      if (windmillRef.current) {
        gsap.to(windmillRef.current, {
          rotation: 360 * 3,
          scrollTrigger: {
            trigger: section2Ref.current,
            scrub: 2,
          }
        });
      }

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    });

    // ====== CLEANUP ======
    return () => {
      mm.revert(); // Kills all matchMedia contexts
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return {
    homeSectionRef,
    helloRef,
    section2Ref,
    windmillRef,
  };
}
