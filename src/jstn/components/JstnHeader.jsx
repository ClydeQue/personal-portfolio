const navigation = [
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Experience', to: '/experience' },
  { label: 'Collection', to: '/collection' },
]

function JstnHeader({ path, onNavigate }) {
  const isActive = (to) => path === to || (to === '/projects' && path.startsWith('/projects/'))

  return (
    <header className="jstn-header">
      <button
        className="jstn-wordmark"
        type="button"
        onClick={() => onNavigate('/')}
        aria-label="Go to Clyde Que JSTN portfolio home"
      >
        <span aria-hidden="true">CQ</span>
        <span>Clyde Que</span>
      </button>

      <nav className="jstn-header__nav" aria-label="JSTN portfolio navigation">
        {navigation.map((item) => (
          <button
            className={isActive(item.to) ? 'is-active' : ''}
            key={item.to}
            type="button"
            onClick={() => onNavigate(item.to)}
            aria-current={isActive(item.to) ? 'page' : undefined}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default JstnHeader
