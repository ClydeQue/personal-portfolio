import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import ImageWithFallback from './ImageWithFallback.jsx'
import { createProceduralPortrait, portraitFrameEnabled, portraitPose } from './proceduralPortrait.js'

const PORTRAIT_SOURCES = ['/images/profme.webp', '/images/profme.png']

const vertexShader = `
  attribute float aRandom;
  uniform float uTime;
  uniform float uActive;
  uniform float uPixelRatio;
  uniform vec2 uPointer;
  varying float vGlow;

  void main() {
    vec3 transformed = position;
    float shimmer = sin(uTime * 0.0014 + aRandom * 18.0) * 0.012;
    transformed.z += shimmer;

    float distanceToPointer = distance(transformed.xy, uPointer);
    float influence = smoothstep(0.82, 0.0, distanceToPointer) * uActive;
    vec2 direction = normalize(transformed.xy - uPointer + vec2(0.001));
    transformed.xy += direction * influence * (0.08 + aRandom * 0.1);
    transformed.z += influence * (0.14 + aRandom * 0.18);

    vec4 viewPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = (1.25 + aRandom * 1.45 + influence * 1.1) * uPixelRatio * (5.2 / -viewPosition.z);
    vGlow = 0.56 + aRandom * 0.44 + influence * 0.38;
  }
`

const fragmentShader = `
  varying float vGlow;

  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    if (distanceToCenter > 0.5) discard;
    float edge = smoothstep(0.5, 0.08, distanceToCenter);
    vec3 blue = mix(vec3(0.36, 0.58, 1.0), vec3(0.86, 0.93, 1.0), vGlow);
    gl_FragColor = vec4(blue, edge * min(vGlow, 1.0));
  }
`

function ParticlePortrait({ alt = 'Kenneth Clyde Que', className = '' }) {
  const canvasRef = useRef(null)
  const frameRef = useRef(null)
  const pointerRef = useRef({ active: false, x: 0, y: 0 })
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 20)
    const group = new THREE.Group()
    const { positions, randomness } = createProceduralPortrait({ pointBudget: 22000 })
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randomness, 1))
    geometry.computeBoundingSphere()

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uActive: { value: 0 },
        uPixelRatio: { value: 1 },
        uPointer: { value: new THREE.Vector2(0, 0) },
      },
    })
    const points = new THREE.Points(geometry, material)
    group.add(points)
    scene.add(group)
    camera.position.set(0, -.08, 5.25)

    let renderer
    let failed = false
    let inViewport = true
    let disposed = false
    let bounds = canvas.getBoundingClientRect()
    let currentYaw = 0
    let currentPitch = 0
    let lastPaint = 0
    let ready = false
    const pointerTarget = new THREE.Vector2()

    const enabled = () => portraitFrameEnabled({
      reducedMotion: reducedMotion.matches,
      hidden: document.hidden,
      inViewport,
      failed,
    })

    const resize = () => {
      bounds = canvas.getBoundingClientRect()
      if (!renderer || !bounds.width || !bounds.height) return
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      renderer.setPixelRatio(pixelRatio)
      renderer.setSize(bounds.width, bounds.height, false)
      camera.aspect = bounds.width / bounds.height
      camera.updateProjectionMatrix()
      material.uniforms.uPixelRatio.value = pixelRatio
    }

    const stop = () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }

    const render = (time) => {
      frameRef.current = null
      if (!enabled() || !renderer || disposed) return

      const interactive = pointerRef.current.active
      if (!interactive && time - lastPaint < 32) {
        frameRef.current = requestAnimationFrame(render)
        return
      }
      lastPaint = time

      const target = portraitPose({ time, pointer: pointerRef.current })
      currentYaw += (target.yaw - currentYaw) * .075
      currentPitch += (target.pitch - currentPitch) * .075
      group.rotation.y = currentYaw
      group.rotation.x = currentPitch
      group.position.y = -.05 + Math.sin(time * .0008) * .015
      material.uniforms.uTime.value = time
      material.uniforms.uActive.value += ((interactive ? 1 : 0) - material.uniforms.uActive.value) * .11
      pointerTarget.set(pointerRef.current.x * 1.48, -pointerRef.current.y * 1.88 - .05)
      material.uniforms.uPointer.value.lerp(pointerTarget, .14)
      renderer.render(scene, camera)
      if (!ready) {
        ready = true
        setIsReady(true)
      }
      frameRef.current = requestAnimationFrame(render)
    }

    const start = () => {
      if (frameRef.current === null && enabled() && renderer && !disposed) {
        frameRef.current = requestAnimationFrame(render)
      }
    }

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
      renderer.setClearColor(0x27323b, 1)
      resize()
      start()
    } catch {
      failed = true
    }

    const onPointerMove = (event) => {
      if (reducedMotion.matches) return
      const rect = canvas.getBoundingClientRect()
      pointerRef.current = {
        active: true,
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((event.clientY - rect.top) / rect.height) * 2 - 1,
      }
      start()
    }
    const onPointerLeave = () => {
      pointerRef.current = { active: false, x: 0, y: 0 }
      start()
    }
    const onVisibility = () => document.hidden ? stop() : start()
    const onMotionChange = () => {
      pointerRef.current = { active: false, x: 0, y: 0 }
      if (reducedMotion.matches) {
        stop()
        ready = false
        setIsReady(false)
      } else start()
    }

    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting
      if (inViewport) start()
      else stop()
    })

    resizeObserver.observe(canvas)
    intersectionObserver?.observe(canvas)
    document.addEventListener('visibilitychange', onVisibility)
    reducedMotion.addEventListener('change', onMotionChange)
    canvas.addEventListener('pointermove', onPointerMove, { passive: true })
    canvas.addEventListener('pointerleave', onPointerLeave)
    canvas.addEventListener('pointercancel', onPointerLeave)

    return () => {
      disposed = true
      stop()
      resizeObserver.disconnect()
      intersectionObserver?.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      reducedMotion.removeEventListener('change', onMotionChange)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      canvas.removeEventListener('pointercancel', onPointerLeave)
      geometry.dispose()
      material.dispose()
      renderer?.dispose()
    }
  }, [])

  return <div className={`particle-portrait ${isReady ? 'is-ready' : ''} ${className}`.trim()}>
    <ImageWithFallback className="particle-portrait__fallback" sources={PORTRAIT_SOURCES} alt={alt} />
    <canvas className="particle-portrait__canvas" ref={canvasRef} aria-hidden="true" />
  </div>
}

export default ParticlePortrait
