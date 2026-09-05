export default function ProjectPlaceholder({ project, className = '' }) {
  return <div className={`project-placeholder ${className}`} role="img" aria-label={`${project.title}: placeholder artwork; application screenshots coming soon`}>
    <span className="project-placeholder__eyebrow">{project.company} · Infrastructure</span>
    <strong>IMS</strong>
    <p>Solar inventory, sales<br />and customer collections.</p>
    <small>Placeholder · Screenshots coming soon</small>
  </div>
}
