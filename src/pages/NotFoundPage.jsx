import { navigate } from '../app/router.js'

function NotFoundPage({ path }) {
  return (
    <section className="not-found-page portfolio-frame" aria-labelledby="not-found-title">
      <p className="page-kicker">404</p>
      <h1 id="not-found-title">That path was not found.</h1>
      <p><code>{path}</code> is not part of this portfolio’s public route map.</p>
      <div>
        <button type="button" onClick={() => navigate('/')}>Home</button>
        <button type="button" onClick={() => navigate('/projects')}>Projects</button>
      </div>
    </section>
  )
}

export default NotFoundPage
