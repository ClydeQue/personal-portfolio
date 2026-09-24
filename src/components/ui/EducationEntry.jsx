import { portfolio } from '../../data/portfolio.js'

export default function EducationEntry() {
  const { school, degree, period, logo, href, summary } = portfolio.education
  return <div className="education-entry"><a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${school}`}><img src={logo} alt={school} /></a><strong>{degree}</strong><p>{school} · {period}</p><span>{summary}</span></div>
}
