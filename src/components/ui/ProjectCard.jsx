import { navigate } from '../../app/router.js'
import ImageWithFallback from './ImageWithFallback.jsx'
import ProjectPlaceholder from './ProjectPlaceholder.jsx'

function ProjectCard({ project }) {
  const imageSources = [project.cover, ...project.gallery.filter((image) => image !== project.cover)]
  const detailPath = `/projects/${project.slug}`

  return (
    <article className="project-card project-card--related">
      <button className="project-card__media" type="button" onClick={() => navigate(detailPath)} aria-label={`View ${project.title}`}>
        {project.placeholder ? <ProjectPlaceholder project={project} /> : <ImageWithFallback sources={imageSources} alt="" loading="lazy" />}
        <span>{project.category}</span>
      </button>
      <div className="project-card__body">
        <p>{project.period}</p>
        <h3>{project.title}</h3>
        <p className="project-card__summary">{project.summary}</p>
        {project.notice && <p className="project-notice project-notice--compact"><i aria-hidden="true" />Under maintenance</p>}
        <button className="project-card__link" type="button" onClick={() => navigate(detailPath)}>View project <span aria-hidden="true">↗</span></button>
      </div>
    </article>
  )
}

export default ProjectCard
