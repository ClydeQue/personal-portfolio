import { portfolio } from '../data/portfolio.js'

const freeze = (value) => Object.freeze(value)

export const projects = freeze(portfolio.projects.map((project) => freeze({
  ...project,
  image: project.cover,
  tags: project.technologies,
  detail: project.bodySections.map(({ body }) => body),
  externalLabel: project.externalUrl ? 'View project' : undefined,
})))

export const projectBySlug = (slug) => projects.find((project) => project.slug === slug)

export const experience = freeze(portfolio.experiencePhases.map((phase) => freeze({
  company: phase.organization,
  role: phase.role,
  period: phase.period,
  summary: phase.summary,
})))

export const techStack = freeze([
  ...new Set(portfolio.projects.flatMap((project) => project.technologies)),
].slice(0, 8))

export const proof = portfolio.recognition
