import EditorialPanel from '../components/EditorialPanel'
import { experience, projects, proof, techStack } from '../data'

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function HomePage({ onNavigate }) {
  const featuredProjects = projects.slice(0, 4)

  return (
    <div className="jstn-home">
      <section className="jstn-hero jstn-reveal" aria-labelledby="jstn-home-title">
        <div className="jstn-hero__portrait" aria-hidden="true">
          <div className="jstn-hero__dots" />
          <img src="/images/me.webp" alt="" />
          <p>Based in Zamboanga City, PH</p>
        </div>
        <div className="jstn-hero__copy">
          <p className="jstn-eyebrow">Independent builder / software engineer</p>
          <h1 id="jstn-home-title">Clyde<br />Que<span>.</span></h1>
          <p className="jstn-hero__statement">
            I shape practical software, from product interfaces to full-stack workflows, with a bias for clear systems and real local use cases.
          </p>
          <button className="jstn-text-link" type="button" onClick={() => onNavigate('/projects')}>
            Explore selected work <Arrow />
          </button>
        </div>
      </section>

      <section className="jstn-associations jstn-reveal" aria-label="Current work and focus">
        <p className="jstn-eyebrow">Currently building with</p>
        <div>
          <span>Ngnair Payments</span>
          <span>Web products</span>
          <span>Local business systems</span>
          <span>Thoughtful interfaces</span>
        </div>
      </section>

      <section className="jstn-home__split">
        <EditorialPanel className="jstn-reveal" label="01 / Toolkit" title="Tech Stack">
          <ul className="jstn-stack" aria-label="Technology stack">
            {techStack.map((tech) => <li key={tech}>{tech}</li>)}
          </ul>
        </EditorialPanel>
        <EditorialPanel className="jstn-reveal jstn-description" label="02 / Working approach" title="Description">
          <p>
            I work across design and engineering, using prototypes and deliberate UI decisions to make a product understandable before it becomes complicated.
          </p>
          <p>
            The work here ranges from institutional reporting and client websites to an offline retail tool, each tied to a particular person, team, or operational problem.
          </p>
          <button className="jstn-text-link" type="button" onClick={() => onNavigate('/about')}>
            Read the builder note <Arrow />
          </button>
        </EditorialPanel>
      </section>

      <section className="jstn-section-heading jstn-reveal">
        <div>
          <p className="jstn-eyebrow">03 / Selected archive</p>
          <h2>Featured Projects</h2>
        </div>
        <button className="jstn-text-link" type="button" onClick={() => onNavigate('/projects')}>
          All projects <Arrow />
        </button>
      </section>

      <section className="jstn-project-grid" aria-label="Featured projects">
        {featuredProjects.map((project) => (
          <article className="jstn-project-card jstn-reveal" key={project.slug}>
            <button
              className="jstn-project-card__image"
              type="button"
              onClick={() => onNavigate(`/projects/${project.slug}`)}
              aria-label={`View ${project.title} project`}
            >
              <img src={project.image} alt="" loading="eager" />
              <span>{project.category}</span>
            </button>
            <div className="jstn-project-card__body">
              <p>{project.period}</p>
              <h3>{project.title}</h3>
              <button className="jstn-text-link" type="button" onClick={() => onNavigate(`/projects/${project.slug}`)}>
                Project note <Arrow />
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="jstn-proof-grid" aria-label="Career and proof of work">
        <EditorialPanel className="jstn-reveal" label="04 / Career trace" title="Recent work">
          <ol className="jstn-timeline">
            {experience.map((item) => (
              <li key={item.company}>
                <p>{item.period}</p>
                <div>
                  <h3>{item.company}</h3>
                  <span>{item.role}</span>
                </div>
              </li>
            ))}
          </ol>
          <button className="jstn-text-link" type="button" onClick={() => onNavigate('/experience')}>
            Full timeline <Arrow />
          </button>
        </EditorialPanel>
        <EditorialPanel className="jstn-reveal" label="05 / Proof of work" title="Activity">
          <ul className="jstn-proof-list">
            {proof.map((item) => (
              <li key={item.title}>
                <span>{item.label}</span>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </li>
            ))}
          </ul>
          <button className="jstn-text-link" type="button" onClick={() => onNavigate('/collection')}>
            Browse the collection <Arrow />
          </button>
        </EditorialPanel>
      </section>
    </div>
  )
}

export default HomePage
