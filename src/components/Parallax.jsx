import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Parallax() {
  useEffect(() => {
    const elements = gsap.utils.toArray("[data-speed]")

    elements.forEach((el) => {
      const speed = parseFloat(el.dataset.speed) || 1

      gsap.to(el, {
        y: () => -(ScrollTrigger.maxScroll(window) * (speed - 1)),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    })

    ScrollTrigger.refresh()
  }, [])

  return (
    <div style={{ height: "300vh", background: "#111" }}>
      <div
        data-speed="0.8"
        style={{
          position: "relative",
          top: "20vh",
          fontSize: "3rem",
          color: "white",
        }}
      >
        Slower (0.8)
      </div>
      <div
        data-speed="2.0"
        style={{
          position: "relative",
          top: "60vh",
          fontSize: "3rem",
          color: "gold",
        }}
      >
        Faster (2.0)
      </div>
      <div
        data-speed="1.2"
        style={{
          position: "relative",
          top: "100vh",
          fontSize: "3rem",
          color: "skyblue",
        }}
      >
        Slightly faster (1.2)
      </div>
    </div>
  )
}



