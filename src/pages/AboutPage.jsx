import { portfolio } from '../data/portfolio.js'
import { navigate } from '../app/router.js'
import ImageWithFallback from '../components/ui/ImageWithFallback.jsx'
import RichText from '../components/ui/RichText.jsx'

function AboutPage() {
  const writing = portfolio.posts.slice(0, 3)

  return (
    <div className="about-page portfolio-frame">
      <aside className="about-page__aside" aria-label="About page metadata and writing">
        <div>
          <p className="page-kicker">A little about me</p>
          <p>I work on web applications, interfaces, and business systems.</p>
          <p className="about-page__aside-note">Here’s how I approach my work and what I’m learning along the way.</p>
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
          <h1>A little about me</h1>
          <p className="about-page__dek">Hi, I’m Clyde. I build software that makes everyday work easier.</p>
          <h2>From full-stack projects to engineering with a team.</h2>
          <div className="about-page__bio">
            {portfolio.home.personal.description.map((paragraph, index) => <p key={index}><RichText paragraph={paragraph} /></p>)}
          </div>
          <ImageWithFallback sources={[portfolio.identity.portrait]} alt="Kenneth Clyde Que" className="about-page__portrait" />
        </header>

        <section className="about-page__split" aria-label="Process and principles">
          <div>
            <h2>How I actually work</h2>
            <blockquote>I start by asking what the person using the system needs to do. What information do they need? Which steps are taking too much time? So before jumping into the code, I try to understand the process first.</blockquote>
            <p>From there, I work on a design or a first version, get feedback, and make adjustments. It helps me check whether I’m solving the right problem, not just adding more features.</p>
            <p>I use Claude Code, Codex, and a custom Neovim setup with lazy.nvim, LazyGit, and my own Lua modules. AI helps me explore ideas and work through code, but I still need to understand the changes and test them myself.</p>
          </div>
          <div>
            <h2>What matters to me</h2>
            <blockquote>A good-looking page is only one part of the work. I also care about what happens when someone submits the wrong information, loses their connection, or needs help using the system.</blockquote>
            <p>I try to keep the code understandable and explain my decisions clearly, especially when I’m working with other developers. There’s always something I can learn from their approach.</p>
            <p>I’m grateful for the teams and clients who have trusted me to contribute. Those experiences help me grow as a developer and as a teammate.</p>
          </div>
        </section>

        <section className="about-page__columns" aria-label="Working perspective">
          <div><p className="page-kicker">Learning</p><h2>Learning through building.</h2><p>My internships, university projects, freelance work, and hackathons give me different problems to work through. I learn from building, getting feedback, and trying again.</p></div>
          <div><p className="page-kicker">My tools</p><h2>From design to deployment.</h2><p>I work with Next.js, NestJS, ASP.NET Core, GraphQL and REST APIs. I also use AWS, Cloudflare, Docker, and GitHub Actions to get applications beyond my own machine.</p></div>
          <div><p className="page-kicker">What I aim for</p><h2>Make everyday work easier.</h2><p>Whether I’m building for a university office, a client, or a local business, I want the result to be something people can understand and use in their day-to-day work.</p></div>
        </section>
      </article>
    </div>
  )
}

export default AboutPage
