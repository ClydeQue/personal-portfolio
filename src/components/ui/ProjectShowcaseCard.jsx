import { navigate } from '../../app/router.js'

const featurePhrases = {
  ims: ['Shared Admin and Clerk inventory workflows', 'Solar sales, batches, and stock movements', 'Supplier and customer payment ledgers'],
  'court-avenue': ['Court and time-slot booking', 'GCash receipts with owner approval', 'Passwordless email sign-in'],
  casadelentes: ['Camera catalog and rental requests', 'Owner dashboard for rates and copy', 'Product media served from an R2 CDN'],
  'social-development-unit': ['Submissions from six offices in one platform', 'Office and Unit Director views', 'SDG alignment in reports'],
  'leo-rent-a-car': ['Fleet and service pages designed in Figma', 'Responsive site with optimized images', 'Email-based booking inquiries'],
  'mujer-lgbtq': ['Team-built organization website', 'History, advocates, and goals', 'LGBTQIA+ rights and HIV awareness'],
  'orsem-family-feud': ['Assisted the lead student developer', 'Synchronized display and controller views', 'Questions, answers, and scores'],
}

function ProjectShowcaseCard({ project, compact = false }) {
  const mark = (project.category || 'Project')
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  const features = featurePhrases[project.slug] || project.responsibilities
  const visibleFeatures = compact ? features.slice(0, 2) : features
  const destination = project.externalUrl || project.companyUrl

  return <article className={`project-showcase-card${compact ? ' project-showcase-card--compact' : ''}`}>
    <header className="project-showcase-card__top">
      <span className="project-showcase-card__mark" aria-hidden="true">
        {project.logo ? <img src={project.logo} alt="" loading="lazy" /> : <span>{mark}</span>}
      </span>
      {destination
        ? <a href={destination} target="_blank" rel="noreferrer noopener" title={project.externalLabel || `Open ${project.title}`}>
          {project.companyUrl && !project.externalUrl ? 'Client page' : project.notice ? 'Preview site' : 'Live site'} <span aria-hidden="true">↗</span>
        </a>
        : <button type="button" onClick={() => navigate('/projects/' + project.slug)}>
          Project details <span aria-hidden="true">↗</span>
        </button>}
    </header>

    <p className="project-showcase-card__eyebrow">{project.company || `Project · ${project.period}`}</p>
    <h2>{project.title}</h2>
    <p className="project-showcase-card__subtitle">{project.category} · {project.period}</p>

    {project.cover && <img className="project-showcase-card__cover" src={project.cover} alt={`${project.title} project preview`} loading="lazy" />}

    <ul className="project-showcase-card__tags" aria-label="Technologies">
      {project.technologies.slice(0, 4).map((technology) => <li key={technology}>{technology}</li>)}
    </ul>

    <p className="project-showcase-card__summary">{project.summary}</p>

    <section className="project-showcase-card__features" aria-label="Delivered solutions and features">
      <h3>Delivered solutions &amp; features</h3>
      <ul>
        {visibleFeatures.map((feature) => <li key={feature}>
          <span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4.5 4.5L19 7" /></svg></span>
          <p>{feature}</p>
        </li>)}
      </ul>
    </section>

    {project.notice && <p className="project-notice project-notice--compact"><i aria-hidden="true" />{project.notice}</p>}

    <footer className="project-showcase-card__footer">
      <div><span>My role</span><strong>{project.role}</strong></div>
      <button type="button" onClick={() => navigate('/projects/' + project.slug)}>
        Read project details <span aria-hidden="true">↗</span>
      </button>
    </footer>
  </article>
}

export default ProjectShowcaseCard
