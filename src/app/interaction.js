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
