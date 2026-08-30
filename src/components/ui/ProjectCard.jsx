import { navigate } from '../../app/router.js'
import ImageWithFallback from './ImageWithFallback.jsx'

function ProjectCard({ project, variant = 'feature' }) {
  const imageSources = [project.cover, ...project.gallery.filter((image) => image !== project.cover)]

  return (
    <article className={`project-card project-card--${variant}`}>
      <button className="project-card__media" type="button" onClick={() => navigate(`/projects/${project.slug}`)} aria-label={`View ${project.title}`}>
        <ImageWithFallback sources={imageSources} alt="" loading="lazy" />
        {variant === 'home' ? <span className="project-card__view">&lt; View</span> : <span>{project.category}</span>}
      </button>
      {variant !== 'home' && <div className="project-card__body">
        <p>{project.period}</p>
        <h3>{project.title}</h3>
        <p className="project-card__summary">{project.summary}</p>
        <button className="project-card__link" type="button" onClick={() => navigate(`/projects/${project.slug}`)}>View project <span aria-hidden="true">↗</span></button>
      </div>}
    </article>
  )
}

export default ProjectCard
