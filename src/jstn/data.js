const freezeRecords = (records) => Object.freeze(records.map((record) => Object.freeze({
  ...record,
  tags: record.tags ? Object.freeze([...record.tags]) : undefined,
})))

export const projects = freezeRecords([
  {
    slug: 'waiveright',
    title: 'WaiveRight',
    image: '/images/waiveright1.webp',
    period: '2025',
    category: 'Web system',
    summary: 'A digital waiver-submission workflow created for an accountancy student research project.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    slug: 'social-development-unit',
    title: 'Social Development Unit',
    image: '/images/sdu1.webp',
    period: '2025',
    category: 'Full-stack platform',
    summary: 'A centralized project-monitoring platform for Ateneo de Zamboanga University’s Social Development Unit.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    slug: 'leo-rent-a-car',
    title: 'LeoRentACar',
    image: '/images/leo1.webp',
    period: '2025',
    category: 'Client website',
    summary: 'A deliberately designed web presence for a private car-rental business in Zamboanga City.',
    tags: ['Figma', 'React', 'Vite'],
  },
  {
    slug: 'offline-pos',
    title: 'Offline POS',
    image: '/images/pos.webp',
    period: '2025',
    category: 'Desktop system',
    summary: 'A custom offline point-of-sale and inventory system for a local mini grocery store.',
    tags: ['Java', 'JavaFX', 'SQLite'],
  },
  {
    slug: 'mujer-lgbtq',
    title: 'Mujer LGBTQ+',
    image: '/images/lgbt1.webp',
    period: '2024',
    category: 'Informational website',
    summary: 'A team-built informational site for a Zamboanga City nonprofit human-rights organization.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    slug: 'orsem-family-feud',
    title: 'OrSem 2025 Family Feud',
    image: '/images/feud.png',
    period: '2025',
    category: 'Event experience',
    summary: 'An orientation-week game experience where Clyde assisted the implementation of synchronized display and controller views.',
    tags: ['TypeScript', 'Next.js', 'PostgreSQL'],
  },
])

export const experience = freezeRecords([
  {
    company: 'Ngnair Payments',
    role: 'Software Engineer Intern',
    period: 'Jul 2026–Present',
    summary: 'Contributing to payment-product engineering as an intern.',
  },
  {
    company: 'Capytech E-Learning Solutions',
    role: 'AI / .NET Intern',
    period: 'Jun 2026–Jul 2026',
    summary: 'Worked across AI-assisted and .NET development during an internship.',
  },
  {
    company: 'JP Consulting and Services',
    role: 'Software Development Intern',
    period: 'Apr 2026–May 2026',
    summary: 'Contributed to software-development work in an internship setting.',
  },
])

export const techStack = Object.freeze([
  'React',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'ASP.NET Core',
  'PostgreSQL',
  'Docker',
  'Figma',
])

export const proof = Object.freeze([
  Object.freeze({
    title: 'Weaveable',
    label: 'Build with AI Hackathon 2026',
    detail: '1st Runner-Up',
  }),
  Object.freeze({
    title: 'Anyam',
    label: 'Tourism Startup Challenge 2025',
    detail: 'Region IX Winner',
  }),
  Object.freeze({
    title: 'Six local product stories',
    label: 'Portfolio archive',
    detail: 'Web, desktop, and event work',
  }),
])
