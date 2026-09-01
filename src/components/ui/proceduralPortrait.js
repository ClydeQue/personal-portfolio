const TAU = Math.PI * 2

function seededRandom(seed) {
  let state = seed >>> 0
  return () => {
    state += 0x6D2B79F5
    let value = state
    value = Math.imul(value ^ value >>> 15, value | 1)
    value ^= value + Math.imul(value ^ value >>> 7, value | 61)
    return ((value ^ value >>> 14) >>> 0) / 4294967296
  }
}

function ellipsoidPoint(random, center, radius) {
  const azimuth = random() * TAU
  const vertical = random() * 2 - 1
  const ring = Math.sqrt(1 - vertical * vertical)
  const surfaceNoise = .94 + random() * .12
  return [
    center[0] + Math.cos(azimuth) * ring * radius[0] * surfaceNoise,
    center[1] + vertical * radius[1] * surfaceNoise,
    center[2] + Math.sin(azimuth) * ring * radius[2] * surfaceNoise,
  ]
}

function torsoPoint(random) {
  const height = random()
  const y = .42 - height * 2.28
  const shoulderFalloff = Math.pow(height, .55)
  const halfWidth = 1.52 - shoulderFalloff * .47
  const angle = random() * TAU
  const radial = Math.sqrt(random())
  return [
    Math.cos(angle) * halfWidth * radial,
    y,
    Math.sin(angle) * (.6 - height * .08) * radial,
  ]
}

function shoulderPoint(random, side) {
  const t = random()
  const center = [side * (.62 + t * .78), .18 - t * .3, 0]
  return ellipsoidPoint(random, center, [.46, .36, .5])
}

function armPoint(random, side) {
  const t = random()
  const center = [side * (1.2 + t * .25), -.2 - t * 1.45, -.02]
  return ellipsoidPoint(random, center, [.28, .36, .33])
}

export function createProceduralPortrait({ pointBudget = 18000, seed = 2026 } = {}) {
  const budget = Math.max(1, Math.floor(pointBudget))
  const positions = new Float32Array(budget * 3)
  const randomness = new Float32Array(budget)
  const random = seededRandom(seed)

  for (let index = 0; index < budget; index += 1) {
    const region = random()
    let point

    if (region < .3) point = ellipsoidPoint(random, [0, 1.12, 0], [.55, .72, .48])
    else if (region < .35) point = ellipsoidPoint(random, [0, .48, 0], [.22, .38, .24])
    else if (region < .76) point = torsoPoint(random)
    else if (region < .88) point = shoulderPoint(random, region < .82 ? -1 : 1)
    else point = armPoint(random, region < .94 ? -1 : 1)

    const offset = index * 3
    positions[offset] = point[0]
    positions[offset + 1] = point[1]
    positions[offset + 2] = point[2]
    randomness[index] = random()
  }

  return { positions, randomness }
}

export function portraitPose({ time = 0, pointer = { active: false, x: 0, y: 0 }, reducedMotion = false } = {}) {
  if (reducedMotion) return { yaw: 0, pitch: 0, pulse: 0 }

  if (pointer.active) {
    return {
      yaw: Math.max(-.52, Math.min(.52, pointer.x * .46)),
      pitch: Math.max(-.34, Math.min(.34, pointer.y * .27)),
      pulse: .6,
    }
  }

  return {
    yaw: Math.sin(time * .00072) * .075,
    pitch: Math.sin(time * .00049 + .8) * .045,
    pulse: (Math.sin(time * .0011) + 1) * .12,
  }
}

export function portraitFrameEnabled({ reducedMotion, hidden, inViewport, failed }) {
  return !reducedMotion && !hidden && inViewport && !failed
}
