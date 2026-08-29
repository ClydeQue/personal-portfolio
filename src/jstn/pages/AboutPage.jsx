import EditorialPanel from '../components/EditorialPanel'
import { techStack } from '../data'

function AboutPage({ onNavigate }) {
  return (
    <div className="jstn-page jstn-about">
      <section className="jstn-page-intro jstn-reveal" aria-labelledby="jstn-about-title">
        <aside className="jstn-page-intro__aside">
          <p className="jstn-eyebrow">Builder note / 01</p>
          <p>Based in Zamboanga City, Philippines.</p>
          <button className="jstn-text-link" type="button" onClick={() => onNavigate('/projects')}>
            View the archive <span aria-hidden="true">↗</span>
          </button>
        </aside>
        <div>
          <p className="jstn-eyebrow">About</p>
          <h1 id="jstn-about-title">About<br />the Builder<span>.</span></h1>
          <p className="jstn-page-intro__lede">
            I am Clyde Que, a software engineer who works between product thinking, interface design, and practical implementation.
          </p>
        </div>
      </section>

      <section className="jstn-about__story jstn-reveal" aria-label="Clyde's working story">
        <p>
          I am interested in software that helps a real person or team move through a job with less friction. That can be an institutional reporting workflow, a local retail tool, or a client website with a clear next step.
        </p>
        <p>
          My process begins by understanding the situation, then making the interface and technical choices easier to explain. I like prototypes, deliberate systems, and work that is useful before it is elaborate.
        </p>
      </section>

      <section className="jstn-about__grid" aria-label="Strengths and principles">
        <EditorialPanel className="jstn-reveal" label="02 / Strengths" title="How I contribute">
          <ul className="jstn-detail-list">
            <li><strong>Product surfaces</strong><span>Turning a workflow into a clear interface and working path.</span></li>
            <li><strong>Full-stack thinking</strong><span>Connecting the front end, data needs, and operational context.</span></li>
            <li><strong>Design translation</strong><span>Using Figma and implementation together instead of treating them as separate work.</span></li>
          </ul>
        </EditorialPanel>
        <EditorialPanel className="jstn-reveal jstn-description" label="03 / Principles" title="A practical bias">
          <ul className="jstn-principles">
            <li>Start with the people and the workflow.</li>
            <li>Keep the system understandable as it grows.</li>
            <li>Use technology because it supports the job, not because it is new.</li>
          </ul>
        </EditorialPanel>
      </section>

      <section className="jstn-about__toolkit jstn-reveal" aria-labelledby="jstn-toolkit-title">
        <div>
          <p className="jstn-eyebrow">04 / Toolkit</p>
          <h2 id="jstn-toolkit-title">Tools I reach for</h2>
        </div>
        <ul className="jstn-stack">
          {techStack.map((tool) => <li key={tool}>{tool}</li>)}
        </ul>
      </section>
    </div>
  )
}

export default AboutPage
