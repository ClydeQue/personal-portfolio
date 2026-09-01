import { useState } from 'react'
import { nextImageSource } from '../../app/interaction.js'

function ImageWithFallback({ sources, alt, className = '', ...props }) {
  const availableSources = Array.isArray(sources)
    ? sources.filter((source) => typeof source === 'string' && source.trim())
    : []
  const sourceKey = availableSources.join('\u0000')
  const [fallbackState, setFallbackState] = useState({ sourceKey: '', failedIndex: -1 })
  const failedIndex = fallbackState.sourceKey === sourceKey ? fallbackState.failedIndex : -1
  const currentSource = nextImageSource(availableSources, failedIndex)

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
        setFallbackState({ sourceKey, failedIndex })
      }}
    />
  )
}

export default ImageWithFallback
