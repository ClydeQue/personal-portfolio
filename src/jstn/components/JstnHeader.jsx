const navigation = [
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Experience', to: '/experience' },
  { label: 'Collection', to: '/collection' },
]

function JstnHeader({ path, onNavigate, onExit }) {
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
            className={path === item.to ? 'is-active' : ''}
            key={item.to}
            type="button"
            onClick={() => onNavigate(item.to)}
            aria-current={path === item.to ? 'page' : undefined}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <button className="jstn-header__exit" type="button" onClick={onExit}>
        <span aria-hidden="true">↗</span>
        Original mode
      </button>
    </header>
  )
}

export default JstnHeader
