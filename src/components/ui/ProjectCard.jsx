import { navigate } from '../../app/router.js'
import ImageWithFallback from './ImageWithFallback.jsx'
import ProjectPlaceholder from './ProjectPlaceholder.jsx'

function ProjectCard({ project, variant = 'feature' }) {
  const imageSources = [project.cover, ...project.gallery.filter((image) => image !== project.cover)]
  const detailPath = `/projects/${project.slug}`

  if (variant === 'index') {
    return (
      <article className="project-card project-card--index">
        <button className="project-card__media" type="button" onClick={() => navigate(detailPath)} aria-label={`View ${project.title}`}>
          {project.placeholder ? <ProjectPlaceholder project={project} /> : <ImageWithFallback sources={imageSources} alt="" loading="lazy" />}
          <span className="project-card__index-copy"><strong>{project.title}</strong><em>{project.summary}</em><b>{project.technologies.slice(0, 3).join(' · ')}</b></span>
          <span className="project-card__view">View</span>
        </button>
      </article>
    )
  }

  return (
    <article className={`project-card project-card--${variant}`}>
      <button className="project-card__media" type="button" onClick={() => navigate(detailPath)} aria-label={`View ${project.title}`}>
        {project.placeholder ? <ProjectPlaceholder project={project} /> : <ImageWithFallback sources={imageSources} alt="" loading="lazy" />}
        {variant === 'home' ? <span className="project-card__view">&lt; View</span> : <span>{project.category}</span>}
      </button>
      {variant !== 'home' && <div className="project-card__body">
        <p>{project.period}</p>
        <h3>{project.title}</h3>
        <p className="project-card__summary">{project.summary}</p>
        <button className="project-card__link" type="button" onClick={() => navigate(detailPath)}>View project <span aria-hidden="true">↗</span></button>
      </div>}
    </article>
  )
}

export default ProjectCard
