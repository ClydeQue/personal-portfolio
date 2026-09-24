import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'
import { navigate } from '../../app/router.js'
import { portfolio } from '../../data/portfolio.js'

const currentYear = portfolio.activity.years.at(-1)
const building = portfolio.projects.filter(({ period }) => /Present|2026/.test(period)).slice(0, 3)
const stats = [
  { value: currentYear?.totalContributions ?? 0, label: `Contributions in ${currentYear?.year ?? ''}` },
  { value: portfolio.projects.filter(({ company }) => company).length, label: 'Client systems shipped' },
  { value: portfolio.projects.length, label: 'Projects in this archive' },
]

const list = { hidden: {}, visible: { transition: { staggerChildren: .08 } } }
const item = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: .4, ease: [.22, 1, .36, 1] } } }

function CountUp({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    if (!inView || reduceMotion || !ref.current) return undefined
    const controls = animate(0, value, { duration: 1.1, ease: [.22, 1, .36, 1], onUpdate: (latest) => { if (ref.current) ref.current.textContent = Math.round(latest).toLocaleString('en-US') } })
    return () => controls.stop()
  }, [inView, reduceMotion, value])
  return <b ref={ref}>{value.toLocaleString('en-US')}</b>
}

function NowPanel() {
  const reduceMotion = useReducedMotion()
  const motionProps = reduceMotion ? {} : { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: .2 } }
  return <section className="now-panel" aria-labelledby="now-panel-title">
    <h2 id="now-panel-title"><i aria-hidden="true" />Now</h2>
    <motion.ul className="now-panel__stats" variants={list} {...motionProps}>
      {stats.map(({ value, label }) => <motion.li key={label} variants={item}><CountUp value={value} /><span>{label}</span></motion.li>)}
    </motion.ul>
    <p className="page-kicker">Currently building</p>
    <motion.ul className="now-panel__building" variants={list} {...motionProps}>
      {building.map((project) => <motion.li key={project.slug} variants={item} whileHover={reduceMotion ? undefined : { x: 4 }}>
        <button type="button" onClick={() => navigate(`/projects/${project.slug}`)}>
          <strong>{project.title}</strong><span>{project.company ?? project.category}</span><i aria-hidden="true">↗</i>
        </button>
      </motion.li>)}
    </motion.ul>
  </section>
}

export default NowPanel
