import { projectBySlug, projects } from '../data'

function ProjectDetailFallback({ onNavigate }) {
  return (
    <section className="jstn-detail-fallback jstn-reveal" aria-labelledby="jstn-project-fallback-title">
      <p className="jstn-eyebrow">Project note</p>
      <h1 id="jstn-project-fallback-title">That project note<br />is not in this archive<span>.</span></h1>
      <p>
        The link does not match one of Clyde’s published project slugs. You can return to the full collection of current work.
      </p>
      <button className="jstn-text-link" type="button" onClick={() => onNavigate('/projects')}>
        Return to projects <span aria-hidden="true">↗</span>
      </button>
    </section>
  )
}

function ProjectDetailPage({ slug, onNavigate }) {
  const project = projectBySlug(slug)

  if (!project) return <ProjectDetailFallback onNavigate={onNavigate} />

  const currentIndex = projects.findIndex((item) => item.slug === project.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]
  const otherProject = projects[(currentIndex + 2) % projects.length]

  return (
    <div className="jstn-page jstn-project-detail">
      <section className="jstn-project-detail__hero jstn-reveal" aria-labelledby="jstn-project-detail-title">
        <div className="jstn-project-detail__media">
          <img src={project.image} alt={`${project.title} project preview`} />
          <p>{project.category}</p>
        </div>
        <div className="jstn-project-detail__heading">
          <p className="jstn-eyebrow">Project note / {project.period}</p>
          <h1 id="jstn-project-detail-title">{project.title}<span>.</span></h1>
          <p className="jstn-project-detail__summary">{project.summary}</p>
          <ul className="jstn-tags" aria-label={`${project.title} technologies`}>
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          {project.externalUrl && (
            <a className="jstn-text-link" href={project.externalUrl} target="_blank" rel="noreferrer">
              {project.externalLabel} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </section>

      <section className="jstn-project-detail__body jstn-reveal" aria-label={`${project.title} context`}>
        <div>
          <p className="jstn-eyebrow">Context</p>
          {project.detail.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="jstn-project-detail__gallery" aria-label={`${project.title} local project images`}>
          {project.gallery.map((image, index) => (
            <img key={image} src={image} alt={`${project.title} screenshot ${index + 1}`} loading="lazy" />
          ))}
        </div>
      </section>

      <nav className="jstn-project-detail__next jstn-reveal" aria-label="More portfolio work">
        <button type="button" onClick={() => onNavigate('/projects')}>
          <span>Archive</span>
          <strong>All projects</strong>
        </button>
        <button type="button" onClick={() => onNavigate(`/projects/${nextProject.slug}`)}>
          <span>Next note</span>
          <strong>{nextProject.title}</strong>
        </button>
        <button type="button" onClick={() => onNavigate(`/projects/${otherProject.slug}`)}>
          <span>Other work</span>
          <strong>{otherProject.title}</strong>
        </button>
      </nav>
    </div>
  )
}

export default ProjectDetailPage
