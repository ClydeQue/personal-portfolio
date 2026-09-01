import { useEffect, useRef, useState } from 'react'
import { nameFlapFrame } from './nameFlap.js'

export default function SplitFlapName({ name }) {
  const rootRef = useRef(null)
  const replayRef = useRef(() => {})
  const [display, setDisplay] = useState(name)
  const [running, setRunning] = useState(false)
  const [run, setRun] = useState(0)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = null
    let startTime = null
    let visible = true
    const stop = () => {
      if (frame !== null) cancelAnimationFrame(frame)
      frame = null
      setDisplay(name)
      setRunning(false)
    }
    const tick = (time) => {
      if (startTime === null) startTime = time
      const next = nameFlapFrame(name, time - startTime, motion.matches)
      setDisplay(next.text)
      if (next.done) { frame = null; setRunning(false) }
      else frame = requestAnimationFrame(tick)
    }
    const replay = () => {
      if (motion.matches || document.hidden || !visible || frame !== null) return
      startTime = null
      setRunning(true)
      setRun(value => value + 1)
      frame = requestAnimationFrame(tick)
    }
    const onVisibility = () => { if (document.hidden) stop() }
    const onPreference = () => { if (motion.matches) stop() }
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!visible) stop()
    })
    if (rootRef.current) observer?.observe(rootRef.current)
    replayRef.current = replay
    replay()
    document.addEventListener('visibilitychange', onVisibility)
    motion.addEventListener('change', onPreference)
    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      observer?.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      motion.removeEventListener('change', onPreference)
      replayRef.current = () => {}
    }
  }, [name])

  return <b ref={rootRef} className={`split-flap-name${running ? ' is-flipping' : ''}`} aria-label={name} onPointerEnter={() => replayRef.current()}>
    {[...display].map((letter, index) => <i key={index} aria-hidden="true" style={{ '--flap-delay': `${index * 100}ms` }}>
      <span className="split-flap-name__top"><span>{letter}</span></span>
      <span className="split-flap-name__bottom"><span>{letter}</span></span>
      <span key={run} className="split-flap-name__flap"><span>{letter}</span></span>
    </i>)}
  </b>
}
