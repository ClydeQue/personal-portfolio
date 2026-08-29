import EditorialPanel from '../components/EditorialPanel'
import { projects } from '../data'

const categories = [
  {
    title: 'Institutional workflows',
    note: 'Systems connected to campus reporting, waivers, and orientation work.',
    slugs: ['waiveright', 'social-development-unit', 'orsem-family-feud'],
  },
  {
    title: 'Local business systems',
    note: 'Practical tools and public-facing surfaces for local operators.',
    slugs: ['leo-rent-a-car', 'offline-pos'],
  },
  {
    title: 'Community information',
    note: 'A team-built site that documents advocacy and organizational context.',
    slugs: ['mujer-lgbtq'],
  },
]

function CollectionPage({ onNavigate }) {
  return (
    <div className="jstn-page jstn-collection-page">
      <section className="jstn-collection-page__intro jstn-reveal" aria-labelledby="jstn-collection-title">
        <p className="jstn-eyebrow">Portfolio catalogue</p>
        <h1 id="jstn-collection-title">The Working<br />Collection<span>.</span></h1>
        <dl>
          <div><dt>06</dt><dd>Published project notes</dd></div>
          <div><dt>03</dt><dd>Working categories</dd></div>
          <div><dt>01</dt><dd>Local asset archive</dd></div>
        </dl>
      </section>

      <section className="jstn-collection-page__catalogue" aria-label="Portfolio catalogue categories">
        {categories.map((category, index) => {
          const items = category.slugs.map((slug) => projects.find((project) => project.slug === slug))
          return (
            <EditorialPanel className="jstn-reveal" key={category.title} label={`0${index + 1} / ${category.title}`} title={category.title}>
              <p className="jstn-collection-page__note">{category.note}</p>
              <ul className="jstn-collection-page__items">
                {items.map((project) => (
                  <li key={project.slug}>
                    <button type="button" onClick={() => onNavigate(`/projects/${project.slug}`)}>
                      <span>{project.period}</span>
                      <strong>{project.title}</strong>
                      <span aria-hidden="true">↗</span>
                    </button>
                  </li>
                ))}
              </ul>
            </EditorialPanel>
          )
        })}
      </section>
    </div>
  )
}

export default CollectionPage
