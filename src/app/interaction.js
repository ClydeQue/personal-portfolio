export function getExperienceKeyboardIndex(key, currentIndex, count) {
  if (!Number.isInteger(currentIndex) || !Number.isInteger(count) || count < 1) return null
  if (key === 'ArrowDown') return (currentIndex + 1) % count
  if (key === 'ArrowUp') return (currentIndex - 1 + count) % count
  if (key === 'Home') return 0
  if (key === 'End') return count - 1
  return null
}

const normalizedSources = (sources) => (Array.isArray(sources) ? sources.filter((source) => typeof source === 'string' && source.trim()) : [])

const normalizedYearValue = (candidate) => {
  const value = typeof candidate === 'object' && candidate !== null ? candidate.year : candidate
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) ? parsed : null
}

export function nextImageSource(sources, failedIndex) {
  const availableSources = normalizedSources(sources)
  if (availableSources.length === 0) return null
  if (!Number.isInteger(failedIndex) || failedIndex < 0) return availableSources[0]
  return availableSources[failedIndex + 1] ?? null
}

export function activityYear(years, requested) {
  const normalizedYears = (Array.isArray(years) ? years : [])
    .map((entry) => ({ value: entry, year: normalizedYearValue(entry) }))
    .filter(({ year }) => year !== null)

  if (normalizedYears.length === 0) return null

  const requestedYear = normalizedYearValue(requested)
  return normalizedYears.find(({ year }) => year === requestedYear)
    ?? normalizedYears.reduce((latest, current) => (current.year > latest.year ? current : latest))
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

export function particlePointerOffset(pointer, bounds) {
  if (!pointer?.active || !bounds?.width || !bounds?.height) return { x: 0, y: 0 }

  const normalizedX = clamp((pointer.x - bounds.width / 2) / (bounds.width / 2), -1, 1)
  const normalizedY = clamp((pointer.y - bounds.height / 2) / (bounds.height / 2), -1, 1)

  return {
    x: Math.round(normalizedX * 18),
    y: Math.round(normalizedY * 14),
  }
}
