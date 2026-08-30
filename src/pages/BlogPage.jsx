import { navigate } from '../app/router.js'
import { portfolio } from '../data/portfolio.js'

function BlogPage() {
  return (
    <div className="blog-page portfolio-frame">
      <header className="blog-page__intro">
        <p className="page-kicker">Writing &amp; signals</p>
        <h1>Notes, proof points, and implementation context behind the work.</h1>
        <p>A running index of case-study notes that explain how I approach product work, interface decisions, and technical systems in practice.</p>
        <div className="blog-page__intro-actions">
          <button type="button" onClick={() => navigate('/projects')}>Browse projects</button>
          <a href={portfolio.socials.github} target="_blank" rel="noreferrer">Open GitHub</a>
        </div>
      </header>

      <div className="blog-page__support">
        <p>Notes from the projects I build, the decisions behind them, and what I learn along the way. Open a case study for the full context.</p>
        <span>{portfolio.posts.length} entries</span>
      </div>

      <section className="blog-page__entries" aria-label="Portfolio case-study notes">
        {portfolio.posts.map((post) => (
          <article className="blog-entry" key={post.slug}>
            <div>
              <p className="blog-entry__meta">{post.category}</p>
              <h2>{post.title}</h2>
              <p>{post.dek}</p>
            </div>
            <div className="blog-entry__actions">
              <button type="button" onClick={() => navigate(`/blog/${post.slug}`)}>Read note</button>
              <button type="button" onClick={() => navigate(post.context.path)}>{post.context.label}</button>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export default BlogPage
