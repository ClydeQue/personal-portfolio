import { useReducer, useRef } from 'react'
import { getExperienceKeyboardIndex } from '../app/interaction.js'
import { uiReducer, initialUiState } from '../app/uiState.js'
import { navigate } from '../app/router.js'
import ActivityHeatmap from '../components/ui/ActivityHeatmap.jsx'
import { portfolio } from '../data/portfolio.js'
import TechIcon from '../components/ui/TechIcon.jsx'
import EducationEntry from '../components/ui/EducationEntry.jsx'
import EmploymentCertificate from '../components/ui/EmploymentCertificate.jsx'

function Skill({ skill }) {
  return <span className="experience-skill">
    <TechIcon name={skill.label} focusable={false} />
    <small>{skill.label}</small>
  </span>
}

function ExperiencePage() {
  const [state, dispatch] = useReducer(uiReducer, initialUiState)
  const phaseButtons = useRef([])
  const phases = portfolio.experiencePhases
  const activeIndex = state.experienceIndex
  const activePhase = phases[activeIndex]
  const panelId = 'experience-phase-panel'
  const certificate = phases.find((phase) => phase.certificate)?.certificate

  const selectPhase = (index) => dispatch({ type: 'experience/select', index })
  const onPhaseKeyDown = (event, index) => {
    const nextIndex = getExperienceKeyboardIndex(event.key, index, phases.length)
    if (nextIndex === null) return
    event.preventDefault()
    selectPhase(nextIndex)
    phaseButtons.current[nextIndex]?.focus()
  }

  return <div className="experience-page portfolio-frame">
    <section className="experience-hero" aria-labelledby="experience-title">
      <div>
        <h1 id="experience-title">Work &amp; experience.</h1>
        <p>I build, test, and maintain web applications with teams and clients.</p>
      </div>
      <a className="resume-link" href="/portfolio/KennethClydeQue_Resume.pdf" target="_blank" rel="noopener noreferrer">View Resume <span aria-hidden="true">↗</span></a>
    </section>

    <section className="experience-phase" aria-labelledby="experience-phase-title">
      <div className="experience-phase__selector">
        <h2 id="experience-phase-title" className="sr-only">Career Path phases</h2>
        <div role="tablist" aria-label="Career Path phases" aria-orientation="vertical">
          {phases.map((phase, index) => <button
            key={phase.organization}
            ref={(node) => { phaseButtons.current[index] = node }}
            type="button"
            role="tab"
            id={`experience-phase-${index}`}
            className={index === activeIndex ? 'is-active' : ''}
            tabIndex={index === activeIndex ? 0 : -1}
            aria-selected={index === activeIndex}
            aria-controls={panelId}
            onClick={() => selectPhase(index)}
            onKeyDown={(event) => onPhaseKeyDown(event, index)}
          ><i aria-hidden="true" /><span><strong>{phase.role}</strong><small>{phase.organization}</small><small>{phase.period}</small></span><b aria-hidden="true">›</b></button>)}
        </div>
        <p className="experience-phase__hint">Select a role to see my work and the tools I used.</p>
      </div>

      <article className="experience-phase__detail" id={panelId} role="tabpanel" tabIndex={0} aria-labelledby={`experience-phase-${activeIndex}`}>
        <header>
          <h2>{activePhase.role}</h2>
        </header>
        <div className="experience-phase__summary">
          <div className="experience-phase__metadata">
            <strong>{activePhase.organization}</strong>
            <p>{activePhase.period}{activePhase.duration && <span className="experience-phase__duration">{activePhase.duration}</span>}</p>
            {activePhase.location && <p>{activePhase.location}</p>}
          </div>
          <p>{activePhase.summary}</p>
          <div className="experience-phase__skills" aria-label={`${activePhase.role} skills`}>{activePhase.skills.map((skill) => <Skill key={skill.label} skill={skill} />)}</div>
          {activePhase.certificate && <a className="experience-phase__certificate-link" href="#employment-certificate">View my employment certificate <span aria-hidden="true">↓</span></a>}
        </div>
      </article>
    </section>

    {certificate && <section className="experience-credentials" id="employment-certificate" aria-labelledby="employment-certificate-title">
      <div><h2 id="employment-certificate-title">Employment certificate</h2><p>My full stack role at JP Consulting &amp; Services, documented.</p></div>
      <EmploymentCertificate certificate={certificate} />
    </section>}

    <ActivityHeatmap />

    <section className="experience-evidence" aria-label="Experience evidence">
      <section>
        <p className="page-kicker">Selected systems</p>
        <h2>Proof of work</h2>
        <div>{portfolio.projects.slice(0, 3).map((project) => <button type="button" key={project.slug} onClick={() => navigate(`/projects/${project.slug}`)}><strong>{project.title}</strong><span>{project.category} <i aria-hidden="true">↗</i></span></button>)}</div>
      </section>
      <section>
        <p className="page-kicker">Portfolio case-study notes</p>
        <h2>Writing</h2>
        <div>{portfolio.posts.map((post) => <button type="button" key={post.slug} onClick={() => navigate(`/blog/${post.slug}`)}><strong>{post.title}</strong><span>{post.category} <i aria-hidden="true">↗</i></span></button>)}</div>
      </section>
      <section>
        <p className="page-kicker">Community &amp; recognition</p>
        <h2>Recognition</h2>
        <div>{portfolio.recognition.map((item) => <article key={item.title}><strong>{item.title}</strong><p>{item.label}</p><span>{item.detail}</span></article>)}</div>
      </section>
      <section>
        <p className="page-kicker">Education &amp; certificates</p>
        <h2>Education</h2>
        <EducationEntry />
      </section>
    </section>
  </div>
}

export default ExperiencePage
