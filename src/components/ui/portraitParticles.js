const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
const restPose = () => ({ x: 0, y: 0, active: 0 })
const noise = (x, y) => {
  const value = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return value - Math.floor(value)
}

// A single image supplies a shallow relief, not unseen sides of a 3D scan.
// Silhouette curvature supplies volume; image luminance supplies surface detail.
export function createPortraitParticles(pixels, width, height) {
  const particles = []
  const visible = (offset) => pixels[offset + 3] > 32 && pixels[offset] + pixels[offset + 1] + pixels[offset + 2] > 18
  for (let y = 0; y < height; y += 1) {
    let left = width
    let right = 0
    for (let x = 0; x < width; x += 1) {
      if (visible((y * width + x) * 4)) {
        left = Math.min(left, x)
        right = x
      }
    }
    for (let x = left; x <= right; x += 1) {
      const offset = (y * width + x) * 4
      if (!visible(offset)) continue
      const light = (pixels[offset] + pixels[offset + 1] + pixels[offset + 2]) / 765
      const tone = clamp(.24 + Math.pow(light, .46) * .84, 0, 1)
      const across = ((x - left + .5) / (right - left + 1) - .5) * 2
      particles.push({
        x: (x + .5 + (noise(x, y) - .5) * .8) / width,
        y: (y + .5 + (noise(y, x + 7) - .5) * .8) / height,
        depth: Math.sqrt(Math.max(0, 1 - across * across)) * .2 + light * .065,
        tone,
        size: .38 + tone * .48,
        color: `rgba(${Math.round(104 + tone * 151)}, ${Math.round(146 + tone * 109)}, 255, ${.55 + tone * .4})`,
      })
    }
  }
  return particles
}

export function smoothPortraitPose(current, target, elapsed, reducedMotion = false) {
  if (reducedMotion) return restPose()
  const amount = 1 - Math.exp(-clamp(elapsed, 0, 64) / 115)
  const next = {}
  for (const key of ['x', 'y', 'active']) {
    const destination = clamp(target[key], key === 'active' ? 0 : -1, 1)
    const value = current[key] + (destination - current[key]) * amount
    next[key] = Math.abs(destination - value) < .0001 ? destination : value
  }
  return next
}

// Cache trigonometry once per frame, not once per particle.
export function createPortraitProjection(pose, bounds, reducedMotion = false) {
  const x = reducedMotion ? 0 : clamp(pose.x, -1, 1)
  const y = reducedMotion ? 0 : clamp(pose.y, -1, 1)
  return {
    sinYaw: Math.sin(x * .58), cosYaw: Math.cos(x * .58),
    sinPitch: Math.sin(-y * .36), cosPitch: Math.cos(-y * .36),
    pointerX: (x + 1) * bounds.width / 2,
    pointerY: (y + 1) * bounds.height / 2,
    active: reducedMotion ? 0 : clamp(pose.active, 0, 1),
    radius: Math.min(bounds.width, bounds.height) * .23,
    maxDisplacement: Math.min(bounds.width, bounds.height) * .15,
  }
}

export function projectPortraitParticle(point, pose, bounds, reducedMotion = false, projection = createPortraitProjection(pose, bounds, reducedMotion)) {
  const baseX = point.x * bounds.width
  const baseY = point.y * bounds.height
  if (reducedMotion) return { x: baseX, y: baseY }
  const cx = baseX - bounds.width * .5
  const cy = baseY - bounds.height * .46
  const depth = point.depth * bounds.width
  const rx = cx * projection.cosYaw + depth * projection.sinYaw
  const rz = -cx * projection.sinYaw + depth * projection.cosYaw
  const ry = cy * projection.cosPitch - rz * projection.sinPitch
  const z = cy * projection.sinPitch + rz * projection.cosPitch
  const perspective = bounds.width * 2.4 / (bounds.width * 2.4 - (z - depth))
  let dx = rx * perspective - cx
  let dy = ry * perspective - cy

  const pointerDx = baseX - projection.pointerX
  const pointerDy = baseY - projection.pointerY
  const distance = Math.hypot(pointerDx, pointerDy)
  const influence = Math.max(0, 1 - distance / projection.radius) ** 2 * projection.active
  const push = influence * projection.radius * .25
  dx += (distance > .01 ? pointerDx / distance : 1) * push
  dy += (distance > .01 ? pointerDy / distance : 0) * push
  const displacement = Math.hypot(dx, dy)
  const limit = displacement > projection.maxDisplacement ? projection.maxDisplacement / displacement : 1
  // A one-pixel inset contains the core (the renderer caps its diameter at two).
  return {
    x: clamp(baseX + dx * limit, 1, bounds.width - 1),
    y: clamp(baseY + dy * limit, 1, bounds.height - 1),
  }
}
