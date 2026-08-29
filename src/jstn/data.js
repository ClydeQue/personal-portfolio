const freezeRecords = (records) => Object.freeze(records.map((record) => Object.freeze({
  ...record,
  tags: record.tags ? Object.freeze([...record.tags]) : undefined,
  detail: record.detail ? Object.freeze([...record.detail]) : undefined,
  gallery: record.gallery ? Object.freeze([...record.gallery]) : undefined,
})))

export const projects = freezeRecords([
  {
    slug: 'waiveright',
    title: 'WaiveRight',
    image: '/images/waiveright1.webp',
    period: '2025',
    category: 'Web system',
    summary: 'A digital waiver-submission workflow created for an accountancy student research project.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    gallery: ['/images/waiveright1.webp', '/images/waiveright2.webp'],
    detail: [
      'A client-based web system developed for an Accountancy student research study to modernize waiver submission at an academic organization.',
      'Students can upload and scan signed waivers for on-campus and off-campus activities, while the Office of Student Affairs reviews submissions virtually.',
    ],
    externalUrl: 'https://waiveright.vercel.app',
    externalLabel: 'Live website',
  },
  {
    slug: 'social-development-unit',
    title: 'Social Development Unit',
    image: '/images/sdu1.webp',
    period: '2025',
    category: 'Full-stack platform',
    summary: 'A centralized project-monitoring platform for Ateneo de Zamboanga University’s Social Development Unit.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    gallery: ['/images/sdu1.webp', '/images/sdu2.webp'],
    detail: [
      'A full-stack platform for the Social Development Unit of Ateneo de Zamboanga University, which coordinates programs, projects, and community initiatives across six offices.',
      'The platform replaced fragmented reporting workflows with centralized submissions, project monitoring, consolidated reports, and SDG-alignment tracking.',
    ],
    externalUrl: 'https://ateneo-sdu.vercel.app',
    externalLabel: 'Live website',
  },
  {
    slug: 'leo-rent-a-car',
    title: 'LeoRentACar',
    image: '/images/leo1.webp',
    period: '2025',
    category: 'Client website',
    summary: 'A deliberately designed web presence for a private car-rental business in Zamboanga City.',
    tags: ['Figma', 'React', 'Vite'],
    gallery: ['/images/leo1.webp', '/images/leo2.webp'],
    detail: [
      'A real client website for a private car-rental business in Zamboanga City, designed in Figma before implementation.',
      'The responsive site lets customers browse vehicles and services, including airport transfers and corporate travel, then send booking inquiries.',
    ],
    externalUrl: 'https://www.leorentacarph.com',
    externalLabel: 'View project',
  },
  {
    slug: 'offline-pos',
    title: 'Offline POS',
    image: '/images/pos.webp',
    period: '2025',
    category: 'Desktop system',
    summary: 'A custom offline point-of-sale and inventory system for a local mini grocery store.',
    tags: ['Java', 'JavaFX', 'SQLite'],
    gallery: ['/images/pos.webp', '/images/pos1.webp'],
    detail: [
      'A custom offline point-of-sale and inventory system built in Java for a local mini grocery store in Zamboanga City.',
      'It was tailored to daily operations so the store could track stock, manage product movement, and complete checkout without relying on an internet connection.',
    ],
  },
  {
    slug: 'mujer-lgbtq',
    title: 'Mujer LGBTQ+',
    image: '/images/lgbt1.webp',
    period: '2024',
    category: 'Informational website',
    summary: 'A team-built informational site for a Zamboanga City nonprofit human-rights organization.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    gallery: ['/images/lgbt1.webp', '/images/lgbt2.webp'],
    detail: [
      'A team-built informational website for Mujer-LGBT Organization Inc., a Zamboanga City nonprofit human-rights organization.',
      'The site documents the organization’s history, advocates, and goals around LGBTQIA+ rights, HIV/AIDS awareness, and community empowerment.',
    ],
    externalUrl: 'https://mujer-lgbt-zc.vercel.app',
    externalLabel: 'Live website',
  },
  {
    slug: 'orsem-family-feud',
    title: 'OrSem 2025 Family Feud',
    image: '/images/feud.png',
    period: '2025',
    category: 'Event experience',
    summary: 'An orientation-week game experience where Clyde assisted the implementation of synchronized display and controller views.',
    tags: ['TypeScript', 'Next.js', 'PostgreSQL'],
    gallery: ['/images/feud.png'],
    detail: [
      'A TypeScript-based Family Feud web app built for OrSem 2025 at Ateneo de Zamboanga University.',
      'A Computer Science senior led the development; Clyde assisted the implementation of synchronized game-display and controller views for question, answer, and score management.',
    ],
  },
])

export function projectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}

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
    period: 'Jun 2026',
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
