import { portfolio } from '../data/portfolio.js'
import Icon from '../components/ui/Icon.jsx'
import ProjectCard from '../components/ui/ProjectCard.jsx'

function ProjectsPage() {
  return (
    <div className="projects-page portfolio-frame">
      <header className="projects-page__intro">
        <h1>Project Featured Showcase</h1>
        <p>Explore client, institutional, local-business, and event projects. Each note explains the work without overstating my contribution.</p>
        <div className="projects-page__socials" aria-label="Portfolio links">
          <a href={portfolio.socials.github} aria-label="GitHub"><Icon name="github" /></a>
          <a href={portfolio.socials.linkedin} aria-label="LinkedIn"><Icon name="linkedin" /></a>
          <a href={portfolio.socials.email} aria-label="Email"><Icon name="mail" /></a>
        </div>
      </header>
      <section className="projects-page__grid" aria-label="All portfolio projects">
        {portfolio.projects.map((project) => <ProjectCard project={project} variant="index" key={project.slug} />)}
      </section>
    </div>
  )
}

export default ProjectsPage
