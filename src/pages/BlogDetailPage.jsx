import { navigate } from '../app/router.js'
import { postBySlug } from '../data/selectors.js'

function MissingArticle() {
  return (
    <section className="blog-detail__missing portfolio-frame" aria-labelledby="missing-writing-title">
      <p className="page-kicker">Writing</p>
      <h1 id="missing-writing-title">That case-study note is not in this archive.</h1>
      <p>The link does not match one of Clyde’s local writing entries. Return to the Writing index to continue exploring the published portfolio context.</p>
      <button type="button" onClick={() => navigate('/blog')}>Return to writing <span aria-hidden="true">↗</span></button>
    </section>
  )
}

function BlogDetailPage({ slug }) {
  const post = postBySlug(slug)

  if (!post) return <MissingArticle />

  return (
    <article className="blog-detail-page portfolio-frame">
      <button className="blog-detail-page__back" type="button" onClick={() => navigate('/blog')}>← Back to writing</button>
      <header>
        <p className="blog-detail-page__meta">{post.category}</p>
        <h1>{post.title}</h1>
        <p className="blog-detail-page__dek">{post.dek}</p>
      </header>
      <div className="blog-detail-page__body">
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
      <footer className="blog-detail-page__context">
        <p className="page-kicker">Continue in the portfolio</p>
        <button type="button" onClick={() => navigate(post.context.path)}>{post.context.label} <span aria-hidden="true">↗</span></button>
      </footer>
    </article>
  )
}

export default BlogDetailPage
