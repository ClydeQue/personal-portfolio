import { useReducer, useRef } from 'react'
import { getExperienceKeyboardIndex } from '../app/interaction.js'
import { uiReducer, initialUiState } from '../app/uiState.js'
import { navigate } from '../app/router.js'
import ActivityHeatmap from '../components/ui/ActivityHeatmap.jsx'
import { portfolio } from '../data/portfolio.js'

const journeyValues = ['Build', 'Verify', 'Learn', 'Contribute']
const activityYears = [...new Set(portfolio.activity.commitsByDate.map(({ date }) => date.slice(0, 4)))]

function Skill({ skill, className = '', style }) {
  return <span className={className} style={style} title={skill.label} aria-label={skill.label}>
    {skill.icon ? <img src={`/techstack/${skill.icon}.svg`} alt="" /> : <b>{skill.label}</b>}
    {className.includes('experience-orbit') ? <small>{skill.label}</small> : null}
    {className.includes('experience-phase__skill') ? <small>{skill.label}</small> : null}
  </span>
}

function ExperiencePage() {
  const [state, dispatch] = useReducer(uiReducer, initialUiState)
  const phaseButtons = useRef([])
  const phases = portfolio.experiencePhases
  const activeIndex = state.experienceIndex
  const activePhase = phases[activeIndex]
  const panelId = 'experience-phase-panel'

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
      <h1 id="experience-title">The<br />Journey</h1>
      <div className="experience-hero__path">
        <h2>Career Path &amp;<br />Milestones</h2>
        <div className="experience-hero__values" aria-label="Working values">
          {journeyValues.map((value, index) => <span key={value}>{value}<i>{`{0${index + 1}}`}</i></span>)}
        </div>
      </div>
    </section>

    <section className="experience-phase" aria-labelledby="experience-phase-title">
      <div className="experience-phase__selector">
        <h2 id="experience-phase-title" className="sr-only">Career Path phases</h2>
        <div role="tablist" aria-label="Career Path phases">
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
          ><i aria-hidden="true" /><span><strong>{phase.role}</strong><small>{phase.organization}</small></span><em>{`{0${index + 1}}`}</em><b aria-hidden="true">›</b></button>)}
        </div>
        <div className="experience-phase__learning">
          <p className="page-kicker">Learning path</p>
          <div>{activePhase.skills.map((skill) => <Skill key={skill.label} skill={skill} />)}</div>
        </div>
      </div>

      <article className="experience-phase__detail" id={panelId} role="tabpanel" aria-labelledby={`experience-phase-${activeIndex}`}>
        <div className="experience-orbit" aria-hidden="true" style={{ '--tech-count': activePhase.skills.length }}>
          <i className="experience-orbit__ring experience-orbit__ring--outer" />
          <i className="experience-orbit__ring experience-orbit__ring--inner" />
          <b className="experience-orbit__core" />
          {activePhase.skills.map((skill, index) => <Skill key={skill.label} skill={skill} className="experience-orbit__tech" style={{ '--tech-index': index }} />)}
        </div>
        <header>
          <h2>{activePhase.role}</h2>
        </header>
        <div className="experience-phase__summary">
          <div className="experience-phase__metadata">
            <p className="page-kicker">Current focus</p>
            <p><strong>{activePhase.organization}</strong> <span>·</span> {activePhase.period}</p>
          </div>
          <p>{activePhase.summary}</p>
          <div aria-label={`${activePhase.role} skills`}>{activePhase.skills.map((skill) => <Skill key={skill.label} skill={skill} className="experience-phase__skill" />)}</div>
        </div>
      </article>
    </section>

    <ActivityHeatmap years={activityYears} />

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
        <div className="experience-evidence__education"><strong>BS Computer Science</strong><p>Ateneo de Zamboanga University · 2023–Present</p><span>Current foundation in web development, cloud computing, and systems architecture.</span></div>
      </section>
    </section>
  </div>
}

export default ExperiencePage
