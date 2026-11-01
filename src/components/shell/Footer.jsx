import { portfolio } from '../../data/portfolio.js'
import { navigateFromLink } from '../../app/router.js'
import Icon from '../ui/Icon.jsx'

function Footer() {
  return (
    <footer className="portfolio-footer">
      <div className="portfolio-frame portfolio-footer__panel">
        <a className="portfolio-footer__brand" href="/" onClick={navigateFromLink} aria-label={`Go to ${portfolio.identity.shortName} home`}>
          <img src={portfolio.identity.brandMark} alt="" aria-hidden="true" />
          <span>{portfolio.identity.shortName}</span>
        </a>
        <section aria-labelledby="footer-resources">
          <h2 id="footer-resources">Resources</h2>
          <a href="/collection" onClick={navigateFromLink}>Collection</a>
          <a href="/blog" onClick={navigateFromLink}>Writing</a>
        </section>
        <section aria-labelledby="footer-social">
          <h2 id="footer-social">Social</h2>
          <div className="portfolio-footer__socials">
            <a href={portfolio.socials.github} aria-label="GitHub"><Icon name="github" /></a>
            <a href={portfolio.socials.linkedin} aria-label="LinkedIn"><Icon name="linkedin" /></a>
            <a href={portfolio.socials.email} aria-label="Email"><Icon name="mail" /></a>
          </div>
        </section>
      </div>
      <div className="portfolio-frame portfolio-footer__legal">
        <span>© {new Date().getFullYear()} {portfolio.identity.shortName}</span>
      </div>
    </footer>
  )
}

export default Footer
