import { lazy, Suspense, useState } from 'react'
import { portfolio } from '../data/portfolio.js'
import { navigate } from '../app/router.js'
import ActivityHeatmap from '../components/ui/ActivityHeatmap.jsx'
import ImageWithFallback from '../components/ui/ImageWithFallback.jsx'
import SplitFlapName from '../components/ui/SplitFlapName.jsx'
import ProjectCard from '../components/ui/ProjectCard.jsx'
import Icon from '../components/ui/Icon.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import TechIcon from '../components/ui/TechIcon.jsx'

const portraitSources = ['/images/profme.webp', '/images/profme.png']
const ParticlePortrait = lazy(() => import('../components/ui/ParticlePortrait.jsx'))

function RichText({ paragraph }) {
  return <>{paragraph.segments.map(({ text, emphasis }, index) => emphasis
    ? <strong key={`${text}-${index}`}>{text}</strong>
    : <span key={`${text}-${index}`}>{text}</span>)}</>
}

function TechList({ compact = false }) {
  const groups = compact ? portfolio.home.professional.techGroups : portfolio.home.personal.techGroups
  return (
    <div className={compact ? 'tech-list tech-list--compact' : 'tech-list'}>
      {groups.map((group) => <section key={group.title}>
        <h3>{group.title}</h3>
        <div>{group.items.map((item) => {
          if (compact) return <span key={item}>{item}</span>
          return <TechIcon key={item} name={item} />
        })}</div>
      </section>)}
    </div>
  )
}

function PersonalHome() {
  const [brandTone, setBrandTone] = useState('black')
  const featuredProjects = portfolio.projects.slice(0, 2)
  return <div className="home-page home-page--personal">
    <section className="home-hero" aria-labelledby="personal-home-title">
      <Suspense fallback={<div className="particle-portrait"><ImageWithFallback className="particle-portrait__fallback" sources={portraitSources} alt={portfolio.identity.name} /></div>}>
        <ParticlePortrait alt={portfolio.identity.name} />
      </Suspense>
      <div className="home-hero__copy">
        <h1 id="personal-home-title"><span>{portfolio.home.personal.greeting}</span><SplitFlapName name={portfolio.home.personal.displayName} /></h1>
        <p>{portfolio.home.personal.statement}</p>
      </div>
      <Reveal as="section" className="home-associations" aria-label="Associated organizations" delay={.08}>
        <h2>Associated</h2>
        <div>{portfolio.home.personal.associations.map((association) => <a key={association.name} href={association.href} target="_blank" rel="noopener noreferrer" title={`Visit ${association.name}`}><img src={association.logo} alt={association.alt} /></a>)}</div>
      </Reveal>
    </section>

    <section className="home-editorial-grid">
      <Reveal as="section" className="home-panel home-panel--stack" aria-labelledby="stack-title">
        <h2 id="stack-title">Tech Stack</h2>
        <TechList />
      </Reveal>
      <Reveal as="section" className="home-panel home-panel--description" aria-labelledby="description-title" delay={.06}>
        <h2 id="description-title">Description</h2>
        <div>
          {portfolio.home.personal.description.map((paragraph, index) => <p key={index}><RichText paragraph={paragraph} /></p>)}
          <button className="home-text-action" type="button" onClick={() => navigate('/about')}>If you want to read more. <span>Story</span></button>
        </div>
      </Reveal>
      <Reveal as="section" className="home-panel home-panel--brand" aria-labelledby="brand-title">
        <h2 id="brand-title">Brand Assets</h2>
        <div className="brand-assets" data-tone={brandTone}>
          <div className="brand-assets__tabs" role="tablist" aria-label="Brand mark treatment">{['black', 'white', 'iridescent'].map((tone) => <button key={tone} type="button" role="tab" aria-selected={brandTone === tone} onClick={() => setBrandTone(tone)}>/{tone[0].toUpperCase()}{tone.slice(1)}</button>)}</div>
          <div className="brand-assets__wide" data-tone={brandTone}><img src={portfolio.identity.brandMark} alt="" /><strong>{portfolio.identity.shortName}</strong></div>
          <div className="brand-assets__small"><div><img src={portfolio.identity.brandMark} alt="Clyde Que mark" /></div><strong>{portfolio.identity.shortName}</strong></div>
        </div>
      </Reveal>
      <Reveal as="section" className="home-panel home-panel--featured" aria-labelledby="featured-title" delay={.06}>
        <h2 id="featured-title">Featured Projects</h2>
        <div className="featured-project-list">{featuredProjects.map((project) => <ProjectCard project={project} variant="home" key={project.slug} />)}</div>
        <button className="featured-project-more" type="button" onClick={() => navigate('/projects')}>See more projects <span>↗</span></button>
      </Reveal>
      <Reveal as="section" className="home-panel home-panel--recognition" aria-labelledby="recognition-title">
        <div className="home-panel__row"><div><h2 id="recognition-title">Featured Badge</h2><p>{portfolio.home.personal.recognitionLabel}</p></div><button type="button" onClick={() => navigate('/experience')}>View all</button></div>
        <div className="recognition-list">{portfolio.recognition.map(({ title, label }) => <span key={title}><b>{title}</b>{label}</span>)}</div>
      </Reveal>
    </section>
    <ActivityHeatmap />
  </div>
}

function ProfessionalHome() {
  return <div className="home-page home-page--professional">
    <section className="professional-grid" aria-labelledby="professional-home-title">
      <Reveal className="professional-profile">
        <div className="professional-profile__intro">
          <ImageWithFallback sources={portraitSources} alt={portfolio.identity.name} />
          <div className="professional-profile__identity"><h1 id="professional-home-title"><span>{portfolio.home.professional.title}</span><i aria-label="Verified local portfolio identity">✓</i></h1><strong>{portfolio.identity.role}</strong></div>
        </div>
        <div className="professional-profile__actions"><a href={portfolio.socials.github} aria-label="GitHub"><Icon name="github" /></a><a href={portfolio.socials.linkedin} aria-label="LinkedIn"><Icon name="linkedin" /></a><a href={portfolio.socials.email} aria-label="Email"><Icon name="mail" /></a></div>
        <div className="professional-profile__cta"><a href={`${portfolio.socials.email}?subject=Portfolio%20call%20request`}>Schedule a Call</a><button type="button" onClick={() => navigate('/experience')}>Experience</button></div>
        <section className="professional-profile__about" aria-labelledby="professional-about-title"><h2 id="professional-about-title"><Icon name="info" size={16} />About</h2>{portfolio.home.professional.about.map((paragraph, index) => <p key={index}><RichText paragraph={paragraph} /></p>)}</section>
        <section className="professional-profile__experience" aria-labelledby="professional-experience-title"><h2 id="professional-experience-title">Work experience</h2>{portfolio.experiencePhases.map((item) => <article key={item.organization}><p>{item.period}</p><h3>{item.role}</h3><strong>{item.organization}</strong><span>{item.summary}</span></article>)}</section>
      </Reveal>
      <Reveal as="section" className="professional-tech" aria-labelledby="professional-stack-title" delay={.04}><h2 id="professional-stack-title">Tech stack</h2><TechList compact /></Reveal>
      <Reveal as="section" className="professional-projects" aria-labelledby="professional-project-title" delay={.06}><div><h2 id="professional-project-title">Recent projects</h2><button type="button" onClick={() => navigate('/projects')}>All projects ↗</button></div><div>{portfolio.projects.slice(0, 2).map((project) => <ProjectCard project={project} variant="professional" key={project.slug} />)}</div></Reveal>
      <Reveal as="section" className="professional-education" aria-labelledby="education-title"><h2 id="education-title">Education & recognition</h2><p><b>BS Computer Science</b> · Ateneo de Zamboanga University</p><div>{portfolio.recognition.map((item) => <span key={item.title}><b>{item.title}</b>{item.detail}</span>)}</div></Reveal>
      <ActivityHeatmap />
    </section>
  </div>
}

function HomePage({ view, onViewChange }) {
  void onViewChange
  return <>
    <p className="sr-only" aria-live="polite">{view === 'professional' ? 'Professional view selected' : 'Personal view selected'}</p>
    {view === 'professional' ? <ProfessionalHome /> : <PersonalHome />}
  </>
}

export default HomePage
