const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

// Finite split-flap sequence: roughly 0.7s of scrambling, then 0.28s per letter.
// Time-derived characters keep retries reproducible without per-letter timers.
export function nameFlapFrame(name, elapsed, reducedMotion = false) {
  const letters = [...name]
  const done = reducedMotion || !letters.length || elapsed >= 700 + (letters.length - 1) * 280
  return {
    text: done ? name : letters.map((letter, index) => {
      if (letter === ' ' || elapsed >= 700 + index * 280) return letter
      return alphabet[(Math.floor(Math.max(0, elapsed) / 80) * 13 + index * 17 + 3) % alphabet.length]
    }).join(''),
    done,
  }
}
