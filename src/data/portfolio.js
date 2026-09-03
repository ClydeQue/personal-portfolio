import { githubActivity } from './githubActivity.js'
import { personalTechGroups, professionalTechGroups } from './techStack.js'

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
      'I built separate portals for students submitting waivers and administrators reviewing them.',
      'I implemented role-based authentication and session handling.',
      'I used Supabase RPC functions and Row-Level Security to control access to the data.',
    ],
    technologies: ['Next.js 16', 'Supabase', 'TanStack Query', 'TypeScript'],
    bodySections: [
      { heading: 'Workflow', body: 'I built WaiveRight with two portals. Students submit their academic waivers in one, and administrators review them in the other. So each person sees the tools they need for their part of the process.' },
      { heading: 'Access model', body: 'I used Supabase RPC functions, Row-Level Security, pgcrypto, and session management for the custom authentication flow. The access rules control what each role can read and change.' },
      { heading: 'My contribution', body: 'This was a freelance project where I worked on the flow, interface, and backend. I handled the full-stack implementation from student submission through administrator review.' },
    ],
    cover: '/images/waiveright1.webp', gallery: ['/images/waiveright1.webp', '/images/waiveright2.webp'],
    externalUrl: 'https://waiveright.vercel.app', relatedSlugs: ['social-development-unit', 'offline-pos'],
  },
  {
    slug: 'social-development-unit', title: 'Social Development Unit', period: 'Sept–Dec 2025', category: 'Full-stack platform',
    summary: 'A centralized project-monitoring and reporting platform for six university offices.',
    role: 'Full-stack developer and project manager',
    responsibilities: [
      'I brought project and report submissions from six offices into one platform.',
      'I built separate views for each office and the Unit Director.',
      'I added SDG-alignment tracking to the reporting workflow.',
    ],
    technologies: ['React', 'Vite', 'MUI', 'TanStack Query', 'Express', 'Supabase', 'PostgreSQL', 'JWT'],
    bodySections: [
      { heading: 'Problem', body: 'The Social Development Unit needed one place to keep track of projects and reports from six offices. Basically, the goal was to bring those updates together so they were easier to manage.' },
      { heading: 'System', body: 'Each office can submit its reports in the system. The Unit Director has a separate view to see the updates in one place, including how the projects align with the SDGs.' },
      { heading: 'My contribution', body: 'I worked as a full-stack developer and project manager from September to December 2025. My work covered the office workflows, reporting views, and the services behind them.' },
    ],
    cover: '/images/sdu1.webp', gallery: ['/images/sdu1.webp', '/images/sdu2.webp'],
    externalUrl: 'https://ateneo-sdu.vercel.app', relatedSlugs: ['waiveright', 'orsem-family-feud'],
  },
  {
    slug: 'leo-rent-a-car', title: 'LeoRentACar', period: 'Jul–Aug 2025', category: 'Client website',
    summary: 'A responsive fleet and services website with email-based booking inquiries.',
    role: 'Freelance web developer and interface designer',
    responsibilities: [
      'I designed the fleet and services pages in Figma before building them.',
      'I built the responsive site with lazy-loaded images and scroll interactions.',
      'I connected booking inquiries to email. The site does not take online payments.',
    ],
    technologies: ['Figma', 'Tailwind CSS', 'React', 'Vite', 'Resend'],
    bodySections: [
      { heading: 'Customer journey', body: 'I built this site so visitors can browse the cars and services, then send a booking inquiry. That includes trips like airport transfers and corporate travel.' },
      { heading: 'Design and performance', body: 'I started with the design in Figma, then built the responsive pages. I used lazy-loaded images and IntersectionObserver for the scroll interactions.' },
      { heading: 'Inquiry flow', body: 'I connected inquiries through Resend, with Porkbun supporting the domain and email setup. Visitors send an inquiry rather than pay through the website.' },
    ],
    cover: '/images/leo1.webp', gallery: ['/images/leo1.webp', '/images/leo2.webp'],
    externalUrl: 'https://www.leorentacarph.com', relatedSlugs: ['waiveright', 'mujer-lgbtq'],
  },
  {
    slug: 'offline-pos', title: 'Offline POS', period: '2025', category: 'Desktop system',
    summary: 'A Java desktop point-of-sale and inventory system for a local mini grocery store.', role: 'Developer',
    responsibilities: [
      'I built checkout, inventory, and product-movement workflows for a mini grocery store.',
      'I used SQLite to store data locally so daily work could continue without internet.',
      'I built the desktop application with Java and JavaFX.',
    ],
    technologies: ['Java', 'JavaFX', 'SQLite'],
    bodySections: [
      { heading: 'Local-first workflow', body: 'I built this desktop system for a local mini grocery store. It handles stock and checkout using a local database, so the store does not need an internet connection for those tasks.' },
      { heading: 'How it was built', body: 'I used Java, JavaFX, and SQLite for this project. It is separate from my later IMS web application, which uses ASP.NET Core and Next.js.' },
      { heading: 'What I learned', body: 'This project helped me understand how a small store handles checkout, inventory, and product movements. I carried those lessons into later work, even when the technology and setup were different.' },
    ],
    cover: '/images/pos.webp', gallery: ['/images/pos.webp', '/images/pos1.webp'], relatedSlugs: ['waiveright', 'social-development-unit'],
  },
  {
    slug: 'mujer-lgbtq', title: 'Mujer LGBTQ+', period: '2024', category: 'Informational website',
    summary: 'A team-built informational website for a Zamboanga City nonprofit human-rights organization.', role: 'Team contributor',
    responsibilities: [
      'I contributed to the website as part of the team.',
      'We presented the organization’s history, advocates, and goals.',
      'We shared information about LGBTQIA+ rights, HIV/AIDS awareness, and community empowerment.',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    bodySections: [
      { heading: 'Purpose', body: 'Our team worked on an informational website for Mujer-LGBT Organization Inc., a nonprofit human-rights organization.' },
      { heading: 'Content', body: 'We brought together the organization’s history, advocates, and goals, along with information about LGBTQIA+ rights and community awareness.' },
      { heading: 'My contribution', body: 'I contributed as part of the team. We worked together on the website and how the organization’s information was presented.' },
    ],
    cover: '/images/lgbt1.webp', gallery: ['/images/lgbt1.webp', '/images/lgbt2.webp'],
    externalUrl: 'https://mujer-lgbt-zc.vercel.app', relatedSlugs: ['leo-rent-a-car', 'orsem-family-feud'],
  },
  {
    slug: 'orsem-family-feud', title: 'OrSem 2025 Family Feud', period: '2025', category: 'Event experience',
    summary: 'An orientation-week game experience with synchronized display and controller views.', role: 'Implementation contributor',
    responsibilities: [
      'I assisted a Computer Science senior who led the OrSem 2025 game implementation.',
      'I helped with the synchronized game display and controller views.',
      'I contributed to question, answer, and score management.',
    ],
    technologies: ['TypeScript', 'Next.js', 'PostgreSQL'],
    bodySections: [
      { heading: 'Event experience', body: 'I helped build a Family Feud-style web app for OrSem 2025 at Ateneo de Zamboanga University.' },
      { heading: 'Synchronized views', body: 'The game has a display for the audience and a controller for managing questions, answers, and scores. So the activity can be controlled from one view while the audience follows along on the other.' },
      { heading: 'My contribution', body: 'A Computer Science senior led development, and I assisted with the implementation. My contribution included the display and controller interactions.' },
    ],
    cover: '/images/feud.png', gallery: ['/images/feud.png'], relatedSlugs: ['social-development-unit', 'mujer-lgbtq'],
  },
]

const experiencePhases = [
  {
    organization: 'Ngnair Brice Holding', role: 'Software Engineer Intern', period: 'Jul 2026–Present',
    summary: 'I work with the team on payment products, contributing to frontend development and QA. I test workflows, document issues, and check fixes with the developers.',
    skills: [{ label: 'React', icon: 'experience-react' }, { label: 'TypeScript', icon: 'experience-typescript' }, { label: 'Figma', icon: 'experience-figma' }, { label: 'Product QA' }],
  },
  {
    organization: 'Capytech E-Learning Solutions', role: 'Solutions Developer Intern', period: 'Jun 2026',
    summary: 'I built a native SCORM QA sandbox and contributed to e-learning work. The sandbox helped with testing and debugging course packages locally.',
    skills: [{ label: 'C#' }, { label: 'ASP.NET Core' }, { label: 'SQLite' }, { label: 'SCORM' }],
  },
  {
    organization: 'JP Consulting and Services', role: 'Web Development Intern', period: 'Apr–May 2026',
    summary: 'I worked on full-stack JavaScript and TypeScript projects for Australian clients, with guidance from a senior developer.',
    skills: [{ label: 'JavaScript', icon: 'experience-javascript' }, { label: 'TypeScript', icon: 'experience-typescript' }, { label: 'Web development' }],
  },
  {
    organization: 'Ateneo de Zamboanga University', role: 'BS Computer Science foundation', period: '2023–Present',
    summary: 'I’m studying Computer Science and building my skills in web development, cloud computing, and systems architecture through coursework and projects.',
    skills: [{ label: 'Web development' }, { label: 'Cloud computing' }, { label: 'Systems architecture' }],
  },
]

const collection = {
  allCategory: { id: 'all', name: 'All resources', description: 'Browse the complete local collection.' },
  categories: [
    { id: 'ai-development', name: 'AI & Development', description: 'QA sandbox and access-control reference notes.' },
    { id: 'learning-references', name: 'Learning & References', description: 'Local-first and multi-office architecture notes.' },
    { id: 'tools-libraries', name: 'Tools & Libraries', description: 'React server-state and interface documentation.' },
  ],
  resources: [
    { id: 'scorm-package-testing', name: 'SCORM package testing', description: 'A local QA sandbox approach for testing SCORM packages exported from Articulate 360.', categoryId: 'ai-development', source: 'Portfolio case-study note', destination: '/blog/capytech-scorm-qa-sandbox', actionLabel: 'Open case study', tags: ['SCORM', 'C#', 'ASP.NET Core', 'SQLite'] },
    { id: 'role-based-data-access', name: 'Role-based data access', description: 'A reference pattern for custom authentication with Supabase RPC, Row-Level Security, and pgcrypto.', categoryId: 'ai-development', source: 'Portfolio case-study note', destination: '/blog/waiveright-role-based-workflow', actionLabel: 'Open case study', tags: ['Supabase', 'RLS', 'pgcrypto', 'authentication'] },
    { id: 'local-first-business-workflows', name: 'Local-first business workflows', description: 'Notes from designing offline point-of-sale and inventory workflows for a local mini grocery store.', categoryId: 'learning-references', source: 'Portfolio case-study note', destination: '/blog/offline-first-pos-ims', actionLabel: 'Open case study', tags: ['JavaFX', 'SQLite', 'inventory', 'POS'] },
    { id: 'multi-office-reporting', name: 'Multi-office reporting', description: 'Patterns for consolidating submissions and visibility across six offices with role-specific views.', categoryId: 'learning-references', source: 'Portfolio case-study note', destination: '/blog/sdu-multi-office-dashboard', actionLabel: 'Open case study', tags: ['reporting', 'roles', 'SDG alignment', 'dashboard'] },
    { id: 'tanstack-query', name: 'TanStack Query', description: 'A client-side data-fetching library used in portfolio projects for server-state workflows.', categoryId: 'tools-libraries', source: 'Official documentation', destination: 'https://tanstack.com/query/latest', actionLabel: 'Open documentation', tags: ['React', 'Next.js', 'data fetching'] },
    { id: 'figma-first-interface-work', name: 'Figma-first interface work', description: 'A design-to-implementation workflow used for the LeoRentACar client website.', categoryId: 'tools-libraries', source: 'Official documentation', destination: 'https://help.figma.com/hc/en-us', actionLabel: 'Open documentation', tags: ['Figma', 'Tailwind CSS', 'responsive design'] },
  ],
}

const posts = [
  {
    slug: 'capytech-scorm-qa-sandbox', title: 'A local SCORM QA sandbox for instructional-design workflows',
    dek: 'How I built a desktop sandbox to test SCORM course packages locally during my Capytech internship.', published: null,
    category: 'Portfolio case-study note', cover: '/images/profme.webp', context: { label: 'View experience context', path: '/experience' },
    sections: [
      { heading: 'Why I built it', body: 'At Capytech, I worked on a sandbox for testing SCORM packages exported from Articulate 360. Basically, it gave us a way to run and debug those course packages locally.' },
      { heading: 'How it works', body: 'I built the desktop app with Photino.NET, C#, and ASP.NET Core. It reads the package manifest, simulates SCORM 1.2 and 2004 playback, and records telemetry in SQLite.' },
      { heading: 'What it covers', body: 'The sandbox focuses on local package testing. It brings manifest parsing, playback simulation, and telemetry together so the package’s behavior can be inspected during QA.' },
    ],
  },
  {
    slug: 'sdu-multi-office-dashboard', title: 'Centralizing visibility for six university offices',
    dek: 'How I worked on a reporting platform that brings updates from six university offices into one place.', published: null,
    category: 'Portfolio case-study note', cover: '/images/sdu1.webp', context: { label: 'View Social Development Unit project', path: '/projects/social-development-unit' },
    sections: [
      { heading: 'The need', body: 'The Social Development Unit needed to collect project updates and reports from six offices. I worked on bringing that process into one system.' },
      { heading: 'How it works', body: 'Each office submits its updates through its own view. The Unit Director can see the reports together, including SDG-alignment tracking. I used React, Express, and Supabase for the platform.' },
      { heading: 'My contribution', body: 'I worked as a full-stack developer and project manager from September to December 2025. The work connected office submissions, access rules, and the director’s reporting view.' },
    ],
  },
  {
    slug: 'waiveright-role-based-workflow', title: 'Role-based waiver handling with custom Supabase authentication',
    dek: 'How I connected student submissions, administrator reviews, and role-based access in WaiveRight.', published: null,
    category: 'Portfolio case-study note', cover: '/images/waiveright1.webp', context: { label: 'View WaiveRight project', path: '/projects/waiveright' },
    sections: [
      { heading: 'Two portals', body: 'I separated WaiveRight into a student portal and an administrator portal. Students submit their academic waivers, while administrators review those submissions.' },
      { heading: 'Authentication', body: 'I used Supabase RPC functions, Row-Level Security, pgcrypto, and session management for custom role-based access. So the permissions are part of the data access flow, not just what the interface shows.' },
      { heading: 'Putting it together', body: 'The two portals share the same workflow, but each role has a different job. I worked on both sides and the access rules that connect them.' },
    ],
  },
  {
    slug: 'offline-first-pos-ims', title: 'What an offline POS project taught me before a separate IMS web architecture',
    dek: 'What I learned from building a Java desktop POS, and how it differs from my later IMS web project.', published: null,
    category: 'Portfolio case-study note', cover: '/images/pos.webp', context: { label: 'View Offline POS project', path: '/projects/offline-pos' },
    sections: [
      { heading: 'Offline POS', body: 'I built the mini-grocery POS with Java, JavaFX, and SQLite. It handled checkout, inventory, and product movements locally, without needing an internet connection for those tasks.' },
      { heading: 'Separate systems', body: 'My later IMS project uses ASP.NET Core and Next.js as a web application. It is a different system, so the offline behavior of the Java project does not describe how IMS works.' },
      { heading: 'What I carried forward', body: 'Working on the POS helped me understand the day-to-day flow of a small store. I brought that understanding into later inventory work, even though the architecture changed.' },
    ],
  },
]

const activity = githubActivity

const recognition = [
  { title: 'Weaveable', label: 'Build with AI Hackathon 2026', detail: '1st Runner-Up; frontend developer and project co-lead.' },
  { title: 'Anyam', label: 'CHED-DOT Tourism Startup Challenge 2025', detail: 'Region IX Winner and National Qualifier; project co-lead.' },
  { title: 'Capytech', label: 'Capytech E-Learning Solutions', detail: 'Best Intern award, 2026.' },
]

export const portfolio = deepFreeze({
  identity: {
    name: 'Kenneth Clyde Que', shortName: 'Clyde Que', initials: 'CQ',
    role: 'Software engineer, product builder, and interface designer', portrait: '/images/profme.webp', brandMark: '/images/brand/clyde-mark.png',
  },
  navigation: [
    { label: 'About', path: '/about' }, { label: 'Projects', path: '/projects' },
    { label: 'Experience', path: '/experience' }, { label: 'Collection', path: '/collection' },
  ],
  socials: {
    github: 'https://github.com/ClydeQue', linkedin: 'https://www.linkedin.com/in/kenneth-que/', email: 'mailto:kennethque101@gmail.com',
  },
  home: {
    personal: {
      eyebrow: 'Software engineer / product builder', title: 'Clyde Que', greeting: 'I’m', displayName: 'CLYDE',
      statement: 'I’m a software engineer. I build web applications, interfaces, and business systems that make everyday work easier.',
      associations: [
        { name: 'Ngnair Brice Holding', logo: '/images/associations/ngnair.svg', alt: 'Ngnair Brice Holding', href: 'https://ngnair.com/' },
        { name: 'Ateneo de Zamboanga University', logo: '/images/adzu_logo.png', alt: 'Ateneo de Zamboanga University', href: 'https://adzu.edu.ph/' },
        { name: 'Capytech E-Learning Solutions', logo: '/images/associations/capytech.png', alt: 'Capytech E-Learning Solutions', href: 'https://capytech.com/en/' },
      ],
      techGroups: personalTechGroups,
      description: [
        { segments: [
          { text: 'Basically, I like understanding how a process works, then building something that makes it easier for people to use. My work covers ' },
          { text: 'frontend and backend development', emphasis: true },
          { text: ', including ' },
          { text: 'microservices and microfrontends', emphasis: true },
          { text: ', QA, and cloud deployment. I’ve worked on university platforms, payment products, e-learning tools, and systems for local businesses.' },
        ] },
        { segments: [
          { text: 'I also use ' },
          { text: 'Claude Code, Codex, and my custom Neovim setup', emphasis: true },
          { text: ' in my workflow. These tools help me build and learn, but I still take time to understand and test what I’m working on.' },
        ] },
      ],
      recognitionLabel: 'Recognition from project work and hackathons',
    },
    professional: {
      title: 'Kenneth Clyde Que',
      techGroups: professionalTechGroups,
      about: [
        { segments: [
          { text: 'I’m Clyde, a software engineer. My work includes ' },
          { text: 'frontend design, full-stack systems, microservices, and microfrontends', emphasis: true },
          { text: ', along with QA and cloud deployment. I start by understanding what people need to do, then work on the design and code to support it.' },
        ] },
        { segments: [
          { text: 'I’m currently contributing to ' },
          { text: 'payment-product engineering with Ngnair Brice Holding', emphasis: true },
          { text: ' as a Software Engineer Intern. Before that, I worked on e-learning tools at Capytech. I’ve also built university reporting systems and freelance client projects. Each experience helps me learn more about building software and working with a team.' },
        ] },
        { segments: [
          { text: 'I use ' },
          { text: 'Claude Code, Codex, and Neovim', emphasis: true },
          { text: ' to support my work. So while AI helps me move faster, understanding the code and checking how it behaves are still part of my process.' },
        ] },
      ],
    },
  },
  projects, experiencePhases, collection, posts, activity, recognition,
})
