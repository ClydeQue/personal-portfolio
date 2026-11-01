import { portfolio } from '../../data/portfolio.js'
import { navigateFromLink } from '../../app/router.js'
import Icon from '../ui/Icon.jsx'

function Header({ route, view, onViewChange, menuOpen, onMenuToggle, menuTriggerRef }) {
  const isActive = (path) => route.path === path || route.path.startsWith(`${path}/`)

  return (
    <header className="portfolio-header">
      <div className="portfolio-frame portfolio-header__row">
        <a className="portfolio-brand" href="/" onClick={navigateFromLink} aria-label={`Go to ${portfolio.identity.shortName} home`}>
          <img src={portfolio.identity.brandMark} alt="" aria-hidden="true" />
          <span>{portfolio.identity.shortName}</span>
        </a>

        <nav className="portfolio-header__nav" aria-label="Primary navigation">
          {portfolio.navigation.map(({ label, path }) => (
            <a className={isActive(path) ? 'is-active' : ''} key={path} href={path} onClick={navigateFromLink} aria-current={isActive(path) ? 'page' : undefined}>
              {label}
            </a>
          ))}
        </nav>

        <div className="portfolio-view-switch" aria-label="Portfolio view">
          <button type="button" aria-pressed={view === 'personal'} onClick={() => onViewChange('personal')}>Personal</button>
          <button type="button" aria-pressed={view === 'professional'} onClick={() => onViewChange('professional')}>Professional</button>
        </div>

        <a className="portfolio-header__message" href={portfolio.socials.email}><i aria-hidden="true" /> Email me</a>
        <a className="portfolio-header__schedule" href={`${portfolio.socials.email}?subject=Portfolio%20call%20request`}>
          Schedule a Call <Icon name="arrow" size={14} />
        </a>
        <button className="portfolio-header__menu" type="button" ref={menuTriggerRef} onClick={onMenuToggle} aria-expanded={menuOpen} aria-controls="portfolio-mobile-menu" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}

export default Header
