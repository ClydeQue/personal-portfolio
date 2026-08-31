import { useEffect, useMemo, useState } from 'react'
import { nextImageSource } from '../../app/interaction.js'

function ImageWithFallback({ sources, alt, className = '', ...props }) {
  const availableSources = useMemo(
    () => (Array.isArray(sources) ? sources.filter((source) => typeof source === 'string' && source.trim()) : []),
    [sources],
  )
  const [currentSource, setCurrentSource] = useState(() => nextImageSource(availableSources, -1))

  useEffect(() => {
    setCurrentSource(nextImageSource(availableSources, -1))
  }, [availableSources])

  if (!currentSource) {
    return (
      <span className={`image-fallback ${className}`.trim()} role="img" aria-label={alt}>
        <span className="image-fallback__label">{alt}</span>
        <small>Media unavailable</small>
      </span>
    )
  }

  return (
    <img
      {...props}
      className={className}
      src={currentSource}
      alt={alt}
      onError={() => {
        const failedIndex = availableSources.indexOf(currentSource)
        setCurrentSource(nextImageSource(availableSources, failedIndex))
      }}
    />
  )
}

export default ImageWithFallback
