import { useEffect, useState } from 'react'

function ImageWithFallback({ sources, alt, className = '', ...props }) {
  const availableSources = Array.isArray(sources) ? sources.filter(Boolean) : []
  const [sourceIndex, setSourceIndex] = useState(0)

  useEffect(() => setSourceIndex(0), [sources])

  if (availableSources.length === 0 || sourceIndex >= availableSources.length) {
    return <span className={`image-fallback ${className}`} role="img" aria-label={alt} />
  }

  return (
    <img
      {...props}
      className={className}
      src={availableSources[sourceIndex]}
      alt={alt}
      onError={() => setSourceIndex((index) => index + 1)}
    />
  )
}

export default ImageWithFallback
