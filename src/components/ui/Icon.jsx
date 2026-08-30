const icons = Object.freeze({
  github: '/icons/github.svg',
  linkedin: '/icons/linkedin.svg',
  arrow: '/icons/arrowdiagonal.svg',
})

function Icon({ name, label, size = 18 }) {
  const source = icons[name]
  if (!source) return null

  return <img src={source} width={size} height={size} alt={label ?? ''} aria-hidden={label ? undefined : true} />
}

export default Icon
