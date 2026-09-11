import { useMemo, useState } from 'react'
import { activityYear } from '../../app/interaction.js'
import { portfolio } from '../../data/portfolio.js'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const keyFor = (date) => date.toISOString().slice(0, 10)

const buildYearGrid = (year, contributionsByDate) => {
  const contributions = new Map(contributionsByDate.map(({ date, contributions: count }) => [date, count]))
  const start = new Date(Date.UTC(year, 0, 1))
  const end = new Date(Date.UTC(year, 11, 31))
  const firstMonday = new Date(start)
  firstMonday.setUTCDate(start.getUTCDate() - ((start.getUTCDay() + 6) % 7))
  const totalWeeks = Math.ceil(((end - firstMonday) / 86_400_000 + 1) / 7)
  const monthLabels = []
  let previousMonth = -1

  const cells = Array.from({ length: totalWeeks * 7 }, (_, index) => {
    const date = new Date(firstMonday)
    date.setUTCDate(firstMonday.getUTCDate() + index)
    const dateKey = keyFor(date)
    const inYear = date.getUTCFullYear() === year
    const count = inYear ? contributions.get(dateKey) ?? 0 : 0
    const week = Math.floor(index / 7) + 1
    const weekdayIndex = (date.getUTCDay() + 6) % 7

    if (inYear && date.getUTCDate() === 1 && date.getUTCMonth() !== previousMonth) {
      previousMonth = date.getUTCMonth()
      monthLabels.push({ month: months[previousMonth], column: week })
    }

    return {
      dateKey,
      count,
      week,
      weekdayIndex,
      inYear,
      level: Math.min(count, 4),
      label: count ? `${dateKey}: ${count} ${count === 1 ? 'contribution' : 'contributions'}` : `${dateKey}: no contributions`,
    }
  })

  return { cells, monthLabels, weeks: totalWeeks }
}

function ActivityHeatmap() {
  const { activity } = portfolio
  const [requestedYear, setRequestedYear] = useState(() => activityYear(activity.years, null)?.year ?? null)
  const selectedEntry = activityYear(activity.years, requestedYear)
  const year = selectedEntry?.year ?? null
  const yearData = selectedEntry?.value ?? null
  const { cells, monthLabels, weeks } = useMemo(
    () => buildYearGrid(year, yearData?.contributionsByDate ?? []),
    [year, yearData],
  )

  if (!year || !yearData) return null

  return (
    <section className="activity-heatmap" aria-labelledby="activity-title">
      <h2 className="activity-heatmap__section-title">Activity</h2>
      <div className="activity-heatmap__heading">
        <div>
          <h3 id="activity-title">GitHub contribution activity</h3>
          <p className="page-kicker">Generated snapshot</p>
        </div>
        <p>{activity.label} · {activity.snapshotDate}</p>
      </div>
      <p className="activity-heatmap__summary">{portfolio.identity.shortName}&apos;s GitHub contribution activity for {year}. {yearData.totalContributions} contributions tracked.</p>
      <div className="activity-heatmap__stats" aria-label={`${year} GitHub contribution activity summary`}>
        <span><small>Total contributions</small><strong>{yearData.totalContributions}</strong></span>
        <span><small>Active days</small><strong>{yearData.activeDays}</strong></span>
        <span><small>Current streak</small><strong>{yearData.currentStreak} {yearData.currentStreak === 1 ? 'day' : 'days'}</strong></span>
        <span><small>Longest streak</small><strong>{yearData.longestStreak} {yearData.longestStreak === 1 ? 'day' : 'days'}</strong></span>
      </div>
      <div className="activity-heatmap__body">
        <div className="activity-heatmap__rail">
          <div className="activity-heatmap__scroll" role="group" aria-label={`${year} contribution grid. Scroll horizontally on small screens.`} tabIndex={0}>
            <div className="activity-heatmap__year">
              <div className="activity-heatmap__days" aria-hidden="true">
                {weekdays.map((day, index) => <span key={day}>{index % 2 === 0 ? day : ''}</span>)}
              </div>
              <div className="activity-heatmap__grid">
                <div className="activity-heatmap__months">
                  {monthLabels.map(({ month, column }) => <span key={`${month}-${column}`} style={{ gridColumn: column }}>{month}</span>)}
                </div>
                <div className="activity-heatmap__cells" style={{ gridTemplateColumns: `repeat(${weeks}, minmax(10px, 1fr))` }}>
                  {cells.map(({ dateKey, week, weekdayIndex, level, inYear, label }) => (
                    <i
                      key={dateKey}
                      className={`activity-heatmap__cell level-${level}${inYear ? '' : ' is-outside-year'}`}
                      style={{ gridColumn: week, gridRow: weekdayIndex + 1 }}
                      title={label}
                      aria-label={label}
                    />
                  ))}
                </div>
                <div className="activity-heatmap__legend" aria-label="Contribution level legend">
                  <span>Less</span>
                  <i className="activity-heatmap__cell level-0" aria-hidden="true" />
                  <i className="activity-heatmap__cell level-1" aria-hidden="true" />
                  <i className="activity-heatmap__cell level-2" aria-hidden="true" />
                  <i className="activity-heatmap__cell level-4" aria-hidden="true" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="activity-heatmap__years" aria-label="Select activity year">
          {activity.years.map(({ year: candidateYear }) => (
            <button
              type="button"
              key={candidateYear}
              aria-pressed={candidateYear === year}
              onClick={() => setRequestedYear(candidateYear)}
            >
              {candidateYear}
            </button>
          ))}
        </div>
      </div>
      <p className="activity-heatmap__note">{activity.description}</p>
    </section>
  )
}

export default ActivityHeatmap
