const deepFreeze = (value) => {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value)
    Object.values(value).forEach(deepFreeze)
  }
  return value
}

const projects = [
  {
    slug: 'waiveright', title: 'WaiveRight', period: 'Nov–Dec 2025', category: 'Web system',
    summary: 'A dual-portal academic waiver workflow for students and administrators.',
    role: 'Freelance full-stack developer',
    responsibilities: [
      'Built separate student and administrator workflows for academic waiver submissions.',
      'Implemented custom role-based authentication and session handling.',
      'Designed data access rules around Supabase RPC functions and Row-Level Security.',
    ],
    technologies: ['Next.js 16', 'Supabase', 'TanStack Query', 'TypeScript'],
    bodySections: [
      { heading: 'Workflow', body: 'WaiveRight gives students and administrators separate paths for submitting and reviewing academic waivers.' },
      { heading: 'Access model', body: 'The implementation uses Supabase RPC functions, Row-Level Security, pgcrypto, and session management instead of an off-the-shelf authentication provider.' },
      { heading: 'Contribution', body: 'This freelance project covered the product workflow and its full-stack implementation.' },
    ],
    cover: '/images/waiveright1.webp', gallery: ['/images/waiveright1.webp', '/images/waiveright2.webp'],
    externalUrl: 'https://waiveright.vercel.app', relatedSlugs: ['social-development-unit', 'offline-pos'],
  },
  {
    slug: 'social-development-unit', title: 'Social Development Unit', period: 'Sept–Dec 2025', category: 'Full-stack platform',
    summary: 'A centralized project-monitoring and reporting platform for six university offices.',
    role: 'Full-stack developer and project manager',
    responsibilities: [
      'Centralized project and report submissions across six offices.',
      'Built office and Unit Director views for role-specific access and consolidated visibility.',
      'Supported SDG-alignment tracking in the reporting workflow.',
    ],
    technologies: ['React', 'Vite', 'MUI', 'TanStack Query', 'Express', 'Supabase', 'PostgreSQL', 'JWT'],
    bodySections: [
      { heading: 'Problem', body: 'The Social Development Unit needed one place to monitor programs and reports from six offices instead of relying on fragmented reporting workflows.' },
      { heading: 'System', body: 'The platform supports report submissions, consolidated visibility, and distinct office and Unit Director roles.' },
      { heading: 'Contribution', body: 'Clyde contributed as a full-stack developer and project manager during the Sept–Dec 2025 project period.' },
    ],
    cover: '/images/sdu1.webp', gallery: ['/images/sdu1.webp', '/images/sdu2.webp'],
    externalUrl: 'https://ateneo-sdu.vercel.app', relatedSlugs: ['waiveright', 'orsem-family-feud'],
  },
  {
    slug: 'leo-rent-a-car', title: 'LeoRentACar', period: 'Jul–Aug 2025', category: 'Client website',
    summary: 'A responsive fleet and services website with email-based booking inquiries.',
    role: 'Freelance web developer and interface designer',
    responsibilities: [
      'Designed the responsive fleet and services experience in Figma before implementation.',
      'Built the client site with lazy-loaded imagery and scroll interactions.',
      'Connected booking inquiries to an email flow without adding online payment.',
    ],
    technologies: ['Figma', 'Tailwind CSS', 'React', 'Vite', 'Resend'],
    bodySections: [
      { heading: 'Customer journey', body: 'Visitors can browse the fleet and services, then send an inquiry for bookings such as airport transfers and corporate travel.' },
      { heading: 'Design and performance', body: 'The responsive site began in Figma and uses IntersectionObserver-driven interactions with lazy-loaded images.' },
      { heading: 'Inquiry flow', body: 'Resend and Porkbun support the email inquiry flow; the website does not process online payments.' },
    ],
    cover: '/images/leo1.webp', gallery: ['/images/leo1.webp', '/images/leo2.webp'],
    externalUrl: 'https://www.leorentacarph.com', relatedSlugs: ['waiveright', 'mujer-lgbtq'],
  },
  {
    slug: 'offline-pos', title: 'Offline POS', period: '2025', category: 'Desktop system',
    summary: 'A Java desktop point-of-sale and inventory system for a local mini grocery store.', role: 'Developer',
    responsibilities: [
      'Built local checkout, inventory, and product-movement workflows.',
      'Used SQLite for local data storage so daily work could continue without an internet connection.',
      'Kept this Java/JavaFX mini-grocery project distinct from the later IMS web application.',
    ],
    technologies: ['Java', 'JavaFX', 'SQLite'],
    bodySections: [
      { heading: 'Local-first workflow', body: 'The desktop system was tailored for a local mini grocery store to manage stock and complete checkout without relying on an internet connection.' },
      { heading: 'Scope boundary', body: 'This is the Java/JavaFX/SQLite mini-grocery project, not the later ASP.NET Core and Next.js IMS web application.' },
      { heading: 'Learning carried forward', body: 'The project informed later thinking about small-business inventory and payment workflows without making an offline-first claim for the IMS web application.' },
    ],
    cover: '/images/pos.webp', gallery: ['/images/pos.webp', '/images/pos1.webp'], relatedSlugs: ['waiveright', 'social-development-unit'],
  },
  {
    slug: 'mujer-lgbtq', title: 'Mujer LGBTQ+', period: '2024', category: 'Informational website',
    summary: 'A team-built informational website for a Zamboanga City nonprofit human-rights organization.', role: 'Team contributor',
    responsibilities: [
      'Contributed to a team-built informational web presence.',
      'Presented the organization’s history, advocates, and goals.',
      'Supported public information about LGBTQIA+ rights, HIV/AIDS awareness, and community empowerment.',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    bodySections: [
      { heading: 'Purpose', body: 'The site presents information for Mujer-LGBT Organization Inc., a Zamboanga City nonprofit human-rights organization.' },
      { heading: 'Content', body: 'It documents the organization’s history, advocates, and community-focused goals.' },
      { heading: 'Contribution', body: 'This was a team-built project; Clyde’s contribution is represented as a team contributor rather than sole authorship.' },
    ],
    cover: '/images/lgbt1.webp', gallery: ['/images/lgbt1.webp', '/images/lgbt2.webp'],
    externalUrl: 'https://mujer-lgbt-zc.vercel.app', relatedSlugs: ['leo-rent-a-car', 'orsem-family-feud'],
  },
  {
    slug: 'orsem-family-feud', title: 'OrSem 2025 Family Feud', period: '2025', category: 'Event experience',
    summary: 'An orientation-week game experience with synchronized display and controller views.', role: 'Implementation contributor',
    responsibilities: [
      'Assisted a senior-led implementation for an OrSem 2025 game experience.',
      'Contributed to synchronized game-display and controller views.',
      'Supported question, answer, and score management interactions.',
    ],
    technologies: ['TypeScript', 'Next.js', 'PostgreSQL'],
    bodySections: [
      { heading: 'Event experience', body: 'The web app supported a Family Feud-style activity for OrSem 2025 at Ateneo de Zamboanga University.' },
      { heading: 'Synchronized views', body: 'Display and controller views supported question, answer, and score management during the activity.' },
      { heading: 'Contribution', body: 'A Computer Science senior led development; Clyde assisted the implementation and does not claim sole authorship.' },
    ],
    cover: '/images/feud.png', gallery: ['/images/feud.png'], relatedSlugs: ['social-development-unit', 'mujer-lgbtq'],
  },
]

const experiencePhases = [
  { organization: 'Ngnair Brice Holding', role: 'Software Engineer Intern', period: 'Jul 2026–Present', summary: 'Contributing to payment-product engineering through frontend and QA collaboration with documented verification.' },
  { organization: 'Capytech E-Learning Solutions', role: 'Solutions Developer Intern', period: 'Jun 2026', summary: 'Built a native SCORM QA sandbox and contributed to e-learning implementation work.' },
  { organization: 'JP Consulting and Services', role: 'Web Development Intern', period: 'Apr–May 2026', summary: 'Contributed to full-stack JavaScript and TypeScript work for Australian clients under a senior developer.' },
  { organization: 'Ateneo de Zamboanga University', role: 'BS Computer Science foundation', period: '2023–Present', summary: 'Building foundations in web development, cloud computing, and systems architecture.' },
]

const collection = {
  categories: [
    { id: 'ai-development', name: 'AI & Development' },
    { id: 'learning-references', name: 'Learning & References' },
    { id: 'tools-libraries', name: 'Tools & Libraries' },
  ],
  resources: [
    { name: 'SCORM package testing', description: 'A local QA sandbox approach for testing SCORM packages exported from Articulate 360.', categoryId: 'ai-development', tags: ['SCORM', 'C#', 'ASP.NET Core', 'SQLite'] },
    { name: 'Role-based data access', description: 'A reference pattern for custom authentication with Supabase RPC, Row-Level Security, and pgcrypto.', categoryId: 'ai-development', tags: ['Supabase', 'RLS', 'pgcrypto', 'authentication'] },
    { name: 'Local-first business workflows', description: 'Notes from designing offline point-of-sale and inventory workflows for a local mini grocery store.', categoryId: 'learning-references', tags: ['JavaFX', 'SQLite', 'inventory', 'POS'] },
    { name: 'Multi-office reporting', description: 'Patterns for consolidating submissions and visibility across six offices with role-specific views.', categoryId: 'learning-references', tags: ['reporting', 'roles', 'SDG alignment', 'dashboard'] },
    { name: 'TanStack Query', description: 'A client-side data-fetching library used in portfolio projects for server-state workflows.', categoryId: 'tools-libraries', tags: ['React', 'Next.js', 'data fetching'] },
    { name: 'Figma-first interface work', description: 'A design-to-implementation workflow used for the LeoRentACar client website.', categoryId: 'tools-libraries', tags: ['Figma', 'Tailwind CSS', 'responsive design'] },
  ],
}

const posts = [
  {
    slug: 'capytech-scorm-qa-sandbox', title: 'A local SCORM QA sandbox for instructional-design workflows',
    dek: 'Portfolio case-study note on a native desktop sandbox for testing SCORM packages locally.', published: null,
    readingTime: '4 min read', category: 'Portfolio case-study note', cover: '/images/me.webp',
    sections: [
      { heading: 'Context', body: 'At Capytech E-Learning Solutions, the sandbox supported local testing and debugging of SCORM packages exported from Articulate 360.' },
      { heading: 'Implementation', body: 'The native Photino.NET application used C# and ASP.NET Core for manifest parsing and SCORM 1.2/2004 playback simulation, with SQLite telemetry.' },
      { heading: 'Boundary', body: 'This is a portfolio case-study note, not a previously published article; it records the work without adding unsupported outcomes.' },
    ],
  },
  {
    slug: 'sdu-multi-office-dashboard', title: 'Centralizing visibility for six university offices',
    dek: 'Portfolio case-study note on a multi-office project-monitoring and reporting dashboard.', published: null,
    readingTime: '4 min read', category: 'Portfolio case-study note', cover: '/images/sdu1.webp',
    sections: [
      { heading: 'Need', body: 'The Social Development Unit needed a centralized way to collect project and report submissions across six offices.' },
      { heading: 'System', body: 'The React, Express, and Supabase platform provides office and Unit Director roles, consolidated visibility, and SDG-alignment tracking.' },
      { heading: 'Contribution', body: 'Clyde contributed as a full-stack developer and project manager during the Sept–Dec 2025 project period.' },
    ],
  },
  {
    slug: 'waiveright-role-based-workflow', title: 'Role-based waiver handling with custom Supabase authentication',
    dek: 'Portfolio case-study note on the student and administrator workflows behind WaiveRight.', published: null,
    readingTime: '3 min read', category: 'Portfolio case-study note', cover: '/images/waiveright1.webp',
    sections: [
      { heading: 'Two portals', body: 'WaiveRight separates student submission work from administrator review work for academic waivers.' },
      { heading: 'Authentication', body: 'The system uses Supabase RPC functions, Row-Level Security, pgcrypto, and session management for custom role-based access.' },
      { heading: 'Case-study scope', body: 'This portfolio case-study note describes the implementation approach rather than presenting it as a previously published article.' },
    ],
  },
  {
    slug: 'offline-first-pos-ims', title: 'What an offline POS project taught me before a separate IMS web architecture',
    dek: 'Portfolio case-study note distinguishing a Java desktop POS from later IMS web work.', published: null,
    readingTime: '3 min read', category: 'Portfolio case-study note', cover: '/images/pos.webp',
    sections: [
      { heading: 'Offline POS', body: 'The original mini-grocery system used Java, JavaFX, and SQLite for local checkout, inventory, and product-movement workflows.' },
      { heading: 'Separate systems', body: 'The later IMS application uses an ASP.NET Core and Next.js web architecture and is not represented here as offline-first.' },
      { heading: 'Learning carried forward', body: 'The earlier project informed practical thinking about local-business workflows while keeping the two systems’ claims separate.' },
    ],
  },
]

const activity = {
  label: 'Portfolio repository activity', snapshotDate: '2026-08-31',
  description: 'A deterministic snapshot of this local repository, not a complete GitHub contribution history.',
  totalCommits: 58, activeDays: 23, currentStreak: 2, longestStreak: 2,
  commitsByDate: [
    { date: '2025-09-23', commits: 1 }, { date: '2025-09-26', commits: 2 }, { date: '2025-10-04', commits: 1 }, { date: '2025-10-08', commits: 1 }, { date: '2025-10-12', commits: 2 }, { date: '2025-10-13', commits: 2 }, { date: '2025-10-28', commits: 1 },
    { date: '2026-01-04', commits: 2 }, { date: '2026-01-07', commits: 3 }, { date: '2026-01-08', commits: 1 }, { date: '2026-01-18', commits: 1 }, { date: '2026-01-20', commits: 3 }, { date: '2026-01-21', commits: 1 }, { date: '2026-01-23', commits: 1 }, { date: '2026-01-26', commits: 1 },
    { date: '2026-02-04', commits: 2 }, { date: '2026-02-25', commits: 7 }, { date: '2026-03-09', commits: 2 }, { date: '2026-04-12', commits: 1 }, { date: '2026-04-16', commits: 3 }, { date: '2026-05-24', commits: 1 }, { date: '2026-08-30', commits: 17 }, { date: '2026-08-31', commits: 2 },
  ],
}

const recognition = [
  { title: 'Weaveable', label: 'Build with AI Hackathon 2026', detail: '1st Runner-Up; frontend developer and project co-lead.' },
  { title: 'Anyam', label: 'CHED-DOT Tourism Startup Challenge 2025', detail: 'Region IX Winner and National Qualifier; project co-lead.' },
  { title: 'Capytech', label: 'Capytech E-Learning Solutions', detail: 'Best Intern award, 2026.' },
]

export const portfolio = deepFreeze({
  identity: {
    name: 'Kenneth Clyde Que', shortName: 'Clyde Que', initials: 'CQ', location: 'Zamboanga City, Philippines',
    role: 'Software engineer, product builder, and interface designer', portrait: '/images/me.webp', brandMark: '/images/brand/clyde-mark.png',
  },
  navigation: [
    { label: 'About', path: '/about' }, { label: 'Projects', path: '/projects' },
    { label: 'Experience', path: '/experience' }, { label: 'Collection', path: '/collection' },
  ],
  socials: {
    github: 'https://github.com/ClydeQue', linkedin: 'https://www.linkedin.com/in/kenneth-que/', email: 'mailto:kennethque101@gmail.com',
  },
  home: {
    personal: { eyebrow: 'Software engineer / product builder', title: 'Clyde Que' },
    professional: { title: 'Kenneth Clyde Que', location: 'Zamboanga City, Philippines' },
  },
  projects, experiencePhases, collection, posts, activity, recognition,
  license: { identifier: 'GPL-3.0-only', route: '/license', sourceUrl: 'https://github.com/ClydeQue/personal-portfolio' },
})
