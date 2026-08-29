import EditorialPanel from '../components/EditorialPanel'
import { experience, proof } from '../data'

function ExperiencePage({ onNavigate }) {
  return (
    <div className="jstn-page jstn-experience-page">
      <section className="jstn-experience-page__intro jstn-reveal" aria-labelledby="jstn-experience-title">
        <p className="jstn-eyebrow">Work trace / 2026</p>
        <h1 id="jstn-experience-title">Career Path<br />&amp; Milestones<span>.</span></h1>
        <p>
          An early-career timeline centered on internships and the practical work that shaped how I approach software.
        </p>
      </section>

      <section className="jstn-experience-page__timeline jstn-reveal" aria-label="Employment timeline">
        {experience.map((item, index) => (
          <article key={item.company}>
            <p>{String(index + 1).padStart(2, '0')} / {item.period}</p>
            <div>
              <h2>{item.company}</h2>
              <h3>{item.role}</h3>
              <p>{item.summary}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="jstn-experience-page__proof" aria-label="Proof of work">
        <div className="jstn-section-heading jstn-reveal">
          <div>
            <p className="jstn-eyebrow">Proof, not employment</p>
            <h2>Work recognized<br />in context.</h2>
          </div>
          <button className="jstn-text-link" type="button" onClick={() => onNavigate('/collection')}>
            Browse archive <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div className="jstn-proof-grid jstn-experience-page__proof-grid">
          {proof.slice(0, 2).map((item) => (
            <EditorialPanel className="jstn-reveal" key={item.title} label={item.label} title={item.title}>
              <p className="jstn-proof-card__detail">{item.detail}</p>
            </EditorialPanel>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ExperiencePage
