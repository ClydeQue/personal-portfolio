import { useState } from 'react'
import { navigate } from '../app/router.js'
import { projectBySlug, relatedProjects } from '../data/selectors.js'
import { shareProject } from '../app/share.js'
import Icon from '../components/ui/Icon.jsx'
import ImageWithFallback from '../components/ui/ImageWithFallback.jsx'
import ProjectCard from '../components/ui/ProjectCard.jsx'
import ProjectPlaceholder from '../components/ui/ProjectPlaceholder.jsx'

function MissingProject() {
  return (
    <section className="project-detail__missing portfolio-frame" aria-labelledby="missing-project-title">
      <p className="page-kicker">Project note</p>
      <h1 id="missing-project-title">That project is not in this archive.</h1>
      <p>I couldn’t find a project at this link. You can head back to my projects to see the work I’ve shared.</p>
      <button type="button" onClick={() => navigate('/projects')}>Return to projects <span aria-hidden="true">↗</span></button>
    </section>
  )
}

function ProjectDetailPage({ slug }) {
  const project = projectBySlug(slug)
  const [shareState, setShareState] = useState('')

  if (!project) return <MissingProject />

  const handleShare = async () => {
    const url = window.location.href
    setShareState(await shareProject({ title: project.title, text: project.summary, url }))
  }

  return (
    <div className="project-detail-page">
      <div className="project-detail-page__breadcrumb portfolio-frame" aria-label="Breadcrumb">
        <button type="button" onClick={() => navigate('/')}>Home</button><span>/</span><button type="button" onClick={() => navigate('/projects')}>Projects</button><span>/</span><strong>{project.title}</strong>
      </div>
      <article className="project-detail-page__frame">
        {project.placeholder ? <ProjectPlaceholder project={project} className="project-detail-page__cover" /> : <ImageWithFallback sources={[project.cover, ...project.gallery]} alt={`${project.title} project cover`} className="project-detail-page__cover" />}
        <header className="project-detail-page__heading">
          <p className="page-kicker"><i aria-hidden="true" />{project.category} · {project.period}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <div className="project-detail-page__actions">
            {project.externalUrl && <a href={project.externalUrl} target="_blank" rel="noreferrer"><Icon name="arrow" size={16} />Visit project</a>}
            {project.companyUrl && <a href={project.companyUrl} target="_blank" rel="noreferrer"><Icon name="arrow" size={16} />{project.externalLabel ?? 'Visit company'}</a>}
            <a href="mailto:kennethque101@gmail.com?subject=Project%20discussion"><Icon name="calendar" size={16} />Schedule a call</a>
            <button type="button" onClick={handleShare}><Icon name="share" size={16} />Share project</button>
          </div>
          {shareState && <p className="project-detail-page__share" role="status">{shareState}</p>}
        </header>

        <dl className="project-detail-page__metadata" aria-label={`${project.title} metadata`}>
          <div><dt className="page-kicker">Role</dt><dd>{project.role}</dd></div>
          <div><dt className="page-kicker">Client</dt><dd className="project-detail-page__client">{project.logo && <img className="project-detail-page__company-logo" src={project.logo} alt="" />}<span>{project.company ?? 'Personal / school project'}</span></dd></div>
          <div><dt className="page-kicker">Timeline</dt><dd>{project.period}</dd></div>
          <div><dt className="page-kicker">Links</dt><dd className="project-detail-page__links">{project.externalUrl && <a href={project.externalUrl} target="_blank" rel="noreferrer">Live site ↗</a>}{project.companyUrl && <a href={project.companyUrl} target="_blank" rel="noreferrer">Facebook page ↗</a>}{!project.externalUrl && !project.companyUrl && <span>Private system</span>}</dd></div>
        </dl>

        <section className="project-detail-page__delivery" aria-label={`${project.title} contribution and stack`}>
          <div><p className="page-kicker">What I built</p><ul className="project-detail-page__points">{project.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</ul></div>
          <div><p className="page-kicker">Stack</p><ul className="project-detail-page__tags">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div>
        </section>

        <section className="project-detail-page__editorial" aria-label={`${project.title} case study and related projects`}>
          <div className="project-detail-page__description">
            <header><p className="page-kicker">Case study</p><h2>How it works</h2></header>
            {project.bodySections.map((section) => <section key={section.heading}><h3>{section.heading}</h3><ul className="project-detail-page__points">{section.points.map((point) => <li key={point}>{point}</li>)}</ul></section>)}
            {project.placeholder ? <section className="project-detail-page__gallery"><h3>Project visuals</h3><p>Application screenshots are coming soon.</p></section> : <section className="project-detail-page__gallery" aria-labelledby="project-gallery-title">
              <div><p className="page-kicker">Screenshots</p><h3 id="project-gallery-title">Inside the work</h3></div>
              <div>{project.gallery.map((image, index) => <ImageWithFallback sources={[image, project.cover]} alt={`${project.title} screenshot ${index + 1}`} key={image} loading="lazy" />)}</div>
            </section>}
          </div>
          <aside className="project-detail-page__related" aria-labelledby="related-projects-title">
            <header><p className="page-kicker">Continue exploring</p><h2 id="related-projects-title">Other projects</h2></header>
            <div>{relatedProjects(project.slug, 2).map((related) => <ProjectCard project={related} variant="related" key={related.slug} />)}</div>
            <button type="button" onClick={() => navigate('/projects')}>See more</button>
          </aside>
        </section>
      </article>
    </div>
  )
}

export default ProjectDetailPage
