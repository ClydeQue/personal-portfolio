function JstnFooter({ onNavigate }) {
  return (
    <footer className="jstn-footer">
      <div>
        <p className="jstn-eyebrow">Built as an open portfolio study</p>
        <p>© 2026 Clyde Que. The JSTN mode uses Clyde’s content and local assets.</p>
      </div>
      <div className="jstn-footer__links">
        <button type="button" onClick={() => onNavigate('/projects')}>
          View work
        </button>
        <a href="https://github.com/JustineDevs/Portfolio" target="_blank" rel="noreferrer">
          GPL source ↗
        </a>
      </div>
      <p className="jstn-footer__notice">
        Adapted public-layout work from JustineDevs/Portfolio under GPL-3.0. See NOTICE.md for the modification boundary.
      </p>
    </footer>
  )
}

export default JstnFooter
