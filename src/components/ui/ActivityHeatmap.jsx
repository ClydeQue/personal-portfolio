import { useState } from 'react'
import { portfolio } from '../../data/portfolio.js'

const keyFor = (date) => date.toISOString().slice(0, 10)
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function ActivityHeatmap({ years }) {
  const { activity } = portfolio
  const commits = new Map(activity.commitsByDate.map(({ date, commits: count }) => [date, count]))
  const selectedYears = years?.length ? years : [...new Set(activity.commitsByDate.map(({ date }) => date.slice(0, 4)))]
  const [activeYear, setActiveYear] = useState(selectedYears.at(-1))
  const year = selectedYears.includes(activeYear) ? activeYear : selectedYears.at(-1)
  const start = new Date(`${year}-01-01T00:00:00Z`)
  const firstMonday = new Date(start)
  firstMonday.setUTCDate(start.getUTCDate() - ((start.getUTCDay() + 6) % 7))
  const cells = Array.from({ length: 53 * 7 }, (_, index) => {
    const date = new Date(firstMonday)
    date.setUTCDate(firstMonday.getUTCDate() + index)
    const dateKey = keyFor(date)
    const count = date.getUTCFullYear() === Number(year) ? commits.get(dateKey) ?? 0 : 0
    return <i key={dateKey} className={`activity-heatmap__cell level-${Math.min(count, 4)}`} title={count ? `${dateKey}: ${count} commits` : dateKey} />
  })

  return (
    <section className="activity-heatmap" aria-labelledby="activity-title">
      <h2 className="activity-heatmap__section-title">Activity</h2>
      <div className="activity-heatmap__heading">
        <div>
          <h3 id="activity-title">Heatmap</h3>
          <p className="page-kicker">Repository snapshot</p>
        </div>
        <p>{activity.label} · {activity.snapshotDate}</p>
      </div>
      <div className="activity-heatmap__stats" aria-label="Repository activity summary">
        <span><strong>{activity.totalCommits}</strong><small>commits</small></span>
        <span><strong>{activity.activeDays}</strong><small>active days</small></span>
        <span><strong>{activity.currentStreak}</strong><small>current streak</small></span>
        <span><strong>{activity.longestStreak}</strong><small>longest streak</small></span>
      </div>
      <div className="activity-heatmap__body">
        <div className="activity-heatmap__year" aria-label={`${year} contribution grid`}><span className="activity-heatmap__days">Mon<br />Wed<br />Fri</span><div><div className="activity-heatmap__months">{months.map((month) => <span key={month}>{month}</span>)}</div><div className="activity-heatmap__cells">{cells}</div></div></div>
        <div className="activity-heatmap__years" aria-label="Select activity year">{selectedYears.map((candidate) => <button type="button" key={candidate} aria-pressed={candidate === year} onClick={() => setActiveYear(candidate)}>{candidate}</button>)}</div>
      </div>
      <p className="activity-heatmap__note">{activity.description}</p>
    </section>
  )
}

export default ActivityHeatmap
