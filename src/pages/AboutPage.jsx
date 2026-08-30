import { portfolio } from '../data/portfolio.js'
import { navigate } from '../app/router.js'
import ImageWithFallback from '../components/ui/ImageWithFallback.jsx'

function AboutPage() {
  const writing = portfolio.posts.slice(0, 3)

  return (
    <div className="about-page portfolio-frame">
      <aside className="about-page__aside" aria-label="About page metadata and writing">
        <div>
          <p className="page-kicker">Builder note</p>
          <p>Based in {portfolio.identity.location}.</p>
          <p className="about-page__aside-note">A working map of how I learn, build, and move through technical work.</p>
        </div>
        <div className="about-page__writing">
          <p className="page-kicker">Writing</p>
          {writing.map((post) => <button type="button" key={post.slug} onClick={() => navigate(`/blog/${post.slug}`)}>{post.title}</button>)}
          <button className="about-page__writing-link" type="button" onClick={() => navigate('/blog')}>Read writing <span aria-hidden="true">↗</span></button>
        </div>
      </aside>

      <article className="about-page__content">
        <header className="about-page__intro">
          <p className="page-kicker">About</p>
          <h1>About the Builder</h1>
          <p className="about-page__dek">Behind the code: a practical engineer, designer, and systems-minded builder.</p>
          <h2>Systems, clear execution, and long-term thinking.</h2>
          <h3>I build tools that reduce friction between ideas and execution.</h3>
          <blockquote>I work across full-stack engineering, interface design, and practical AI-assisted execution. The goal is to turn rough ideas into useful systems, verify the important details, and keep improving what real people use.</blockquote>
          <ImageWithFallback sources={[portfolio.identity.portrait]} alt="Kenneth Clyde Que" className="about-page__portrait" />
        </header>

        <section className="about-page__split" aria-label="Process and principles">
          <div>
            <h2>How I actually work</h2>
            <blockquote>I move quickly, but not carelessly. I look for the workflow, the gap, or the part of a system that is harder to use than it should be, then turn that into a first version people can react to.</blockquote>
            <p>I start with the workflow: who needs to do what, what information they need, and where the current process creates friction. From there, I can make the design and technical choices easier to explain.</p>
            <p>I use prototypes and AI assistance to move quickly, then verify behavior, content, and edge cases before treating work as done.</p>
          </div>
          <div>
            <h2>Principles, not poses</h2>
            <blockquote>I care about structure more than surface polish alone. If a system looks finished but hides unclear ownership, missing validation, or fragile handoffs, it still needs work.</blockquote>
            <p>A system should be understandable to the next person who maintains it, and a product claim should match the evidence behind it.</p>
            <p>That is why I keep scope practical, distinguish team work from individual contribution, and favor foundations that can grow deliberately.</p>
          </div>
        </section>

        <section className="about-page__columns" aria-label="Working perspective">
          <div><p className="page-kicker">Learning</p><h2>Build, document, repeat.</h2><p>Institutional platforms, internships, local client products, and hackathon work keep expanding the kinds of systems I can reason about.</p></div>
          <div><p className="page-kicker">Under the hood</p><h2>Full-stack with product context.</h2><p>I work across React, TypeScript, backend services, PostgreSQL, Supabase, cloud delivery, and Figma without treating them as separate conversations.</p></div>
          <div><p className="page-kicker">North star</p><h2>Useful systems for real teams.</h2><p>I want each project to make a process clearer for the people relying on it, whether the scale is a university office, a client, or a local business.</p></div>
        </section>
      </article>
    </div>
  )
}

export default AboutPage
