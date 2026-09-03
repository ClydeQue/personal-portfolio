import { portfolio } from '../../data/portfolio.js'

function StatusBar() {
  return (
    <div className="portfolio-status" aria-label="Portfolio status">
      <div className="portfolio-frame portfolio-status__content">
        <span className="portfolio-status__availability"><i aria-hidden="true" /> Portfolio status</span>
        <span>Building and learning along the way</span>
        <span>{portfolio.identity.role}</span>
      </div>
    </div>
  )
}

export default StatusBar
