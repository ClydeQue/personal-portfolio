import { projects } from '../data'

function ProjectCard({ project, onNavigate }) {
  const detailPath = `/projects/${project.slug}`

  return (
    <article className="jstn-project-card jstn-reveal">
      <button
        className="jstn-project-card__image"
        type="button"
        onClick={() => onNavigate(detailPath)}
        aria-label={`View ${project.title} project note`}
      >
        <img src={project.image} alt="" loading="lazy" />
        <span>{project.category}</span>
      </button>
      <div className="jstn-project-card__body">
        <p>{project.period}</p>
        <h2>{project.title}</h2>
        <p className="jstn-project-card__summary">{project.summary}</p>
        <button className="jstn-text-link" type="button" onClick={() => onNavigate(detailPath)}>
          Read project note <span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  )
}

function ProjectsPage({ onNavigate }) {
  return (
    <div className="jstn-page jstn-projects-page">
      <section className="jstn-projects-page__intro jstn-reveal" aria-labelledby="jstn-projects-title">
        <p className="jstn-eyebrow">Archive / 06 selected stories</p>
        <h1 id="jstn-projects-title">Projects<br />&amp; Systems<span>.</span></h1>
        <p>
          A collection of client, institutional, local-business, and event work. Each note records the context and contribution without claiming work that was not mine alone.
        </p>
      </section>

      <section className="jstn-project-grid jstn-projects-page__grid" aria-label="All portfolio projects">
        {projects.map((project) => <ProjectCard key={project.slug} project={project} onNavigate={onNavigate} />)}
      </section>
    </div>
  )
}

export default ProjectsPage
