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
    slug: 'ims', title: 'Inventory Management System', period: '2026–Present', category: 'Business application',
    company: 'Mi Cosas Suntastic, Zamboanga City', companyUrl: 'https://www.facebook.com/p/Suntastic-Zambo-100063914957141/', logo: '/images/suntastic-logo.webp',
    summary: 'An inventory system for Mi Cosas Suntastic that tracks solar sales, product items, receipt batches, and supplier and customer repayments in one centralized database shared by Admin and Clerk.',
    role: 'Full-stack developer',
    responsibilities: [
      'I built the solar sales, product item, and receipt batch tracking, from receiving stock to recording each sale.',
      'I built the ledgers for supplier repayments and customer collections, so every balance shows how it changed.',
      'I set up one centralized database that Admin and Clerk both work from, with the API enforcing what each role can see and do.',
      'I work on the cloud infrastructure, private media, automated checks, and deployment workflows.',
    ],
    technologies: ['C#', 'ASP.NET Core', 'EF Core', 'Next.js', 'React', 'TypeScript', 'TanStack Query', 'PostgreSQL', 'CockroachDB', 'Cloud Run', 'Cloudflare Workers', 'Cloudflare R2', 'Docker', 'GitHub Actions'],
    bodySections: [
      { heading: 'The problem', points: [
        'Mi Cosas Suntastic sells solar sets, panels, inverters, and batteries in Zamboanga City.',
        'Sales, stock, and balances lived in separate records, so nobody had one true count.',
        'Goal: one system that shows where every item moved and how every balance changed.',
      ] },
      { heading: 'Who uses it', points: [
        'Admin: products, supplier receipts, customer and installer projects, company-wide reports.',
        'Clerk: fixed-price solar part sales from dedicated sales screens.',
        'Both roles share one centralized database. The API decides what each role sees.',
      ] },
      { heading: 'Batches and ledgers', points: [
        'Each supplier receipt is a batch with its own quantity and unit cost.',
        'Profit stays correct even when a later delivery costs more.',
        'Supplier repayments and customer collections run on separate append-only ledgers.',
        'Operation IDs make retries safe, so a payment is never recorded twice.',
      ] },
      { heading: 'Architecture', points: [
        'Modular ASP.NET Core API with EF Core. The API is the only database writer.',
        'Next.js dashboard behind a same-origin backend-for-frontend.',
        'Dashboard on Cloudflare Workers, API on Google Cloud Run, media on Cloudflare R2.',
        'Bounded queries, cursor pagination, and TanStack Query keep screens fast without polling.',
      ] },
    ],
    cover: '/images/ims1.webp', gallery: ['/images/ims1.webp', '/images/ims2.webp', '/images/ims3.webp'],
    externalLabel: 'Visit Suntastic Zambo', relatedSlugs: ['court-avenue', 'casadelentes'],
  },
  {
    slug: 'court-avenue', title: 'Court Avenue ZC', period: 'Sep 2026', category: 'Client booking platform',
    company: 'Court Avenue, Zamboanga City',
    summary: 'A pickleball court booking site for a three-court venue in Zamboanga City, with live open times, GCash receipt uploads, and owner approval.',
    role: 'Freelance full-stack developer and interface designer',
    responsibilities: [
      'I designed and built the booking flow: pick a court and your hours, sign in to hold them, pay with GCash, then get confirmed.',
      'I built the owner side, where the venue reviews uploaded receipts and approves or declines each booking.',
      'I set up email sign-in and booking emails, so players never need a password.',
    ],
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Hono', 'Cloudflare Workers', 'Cloudflare D1', 'Resend'],
    bodySections: [
      { heading: 'The problem', points: [
        'Court Avenue runs three pickleball courts in Zamboanga City.',
        'Bookings went through chat, so double bookings and missed messages were common.',
        'Goal: players see open hours and book one-hour slots on their own.',
      ] },
      { heading: 'How a booking works', points: [
        'Pick a court, a day, and back-to-back hours.',
        'Sign in to hold the slots while paying, so nobody else takes them.',
        'Pay through the venue\'s GCash QR and upload the receipt.',
        'The owner approves, and the player gets a confirmation email.',
      ] },
      { heading: 'Decisions', points: [
        'Email one-time codes instead of Google sign-in.',
        'Why: most players open the link inside Messenger or Instagram, where Google sign-in is refused.',
        'Slots are held before the QR is shown, so payment never races another player.',
      ] },
      { heading: 'Architecture', points: [
        'One Cloudflare Worker serves the React app and the Hono API.',
        'Cloudflare D1 stores courts, slots, and bookings.',
        'Resend sends sign-in codes and booking emails from the venue\'s own domain.',
      ] },
    ],
    cover: '/images/courtavenue1.webp', gallery: ['/images/courtavenue1.webp', '/images/courtavenue2.webp', '/images/courtavenue3.webp', '/images/courtavenue4.webp'],
    externalUrl: 'https://courtavenuezc.com', relatedSlugs: ['casadelentes', 'ims'],
  },
  {
    slug: 'casadelentes', title: 'Casadelentes ZC', period: 'Sep 2026', category: 'Client booking platform',
    company: 'Casadelentes ZC, Zamboanga City',
    summary: 'A camera rental site for a Zamboanga City shop, with a catalog of four cameras, date requests, and an owner dashboard.',
    role: 'Freelance full-stack developer and interface designer',
    responsibilities: [
      'I designed and built the catalog, the camera comparison, and the rental request flow.',
      'I built the owner dashboard, where the shop edits cameras, rates, and copy without a code change.',
      'I prepared the product photos and video and serve them from a Cloudflare R2 CDN.',
    ],
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Hono', 'Cloudflare Workers', 'Cloudflare D1', 'Cloudflare R2'],
    bodySections: [
      { heading: 'The problem', points: [
        'Casadelentes rents cameras by the day in Zamboanga City.',
        'Fleet: Canon G7X Mark III, DJI Osmo Pocket 3, Fujifilm Instax Mini Evo, DJI Osmo Action 5.',
        'Renters asked the same questions in chat: which camera, which dates, how much.',
      ] },
      { heading: 'How renting works', points: [
        'Browse the catalog, or answer "which one is for me?" to get a match.',
        'Check the dates and send a request.',
        'The owner calls to arrange pickup. Rates are per rental day, with 24 hours notice.',
      ] },
      { heading: 'Owner tools', points: [
        'The catalog lives in the database, not in code.',
        'The owner edits cameras, wording, and rates from the dashboard.',
        'Every owner route is checked on the server.',
      ] },
      { heading: 'Architecture', points: [
        'One Cloudflare Worker serves the React app and the Hono API.',
        'Cloudflare D1 stores the catalog and requests.',
        'Product photos and video are served from R2 through the shop\'s own CDN domain.',
      ] },
    ],
    cover: '/images/casadelentes1.webp', gallery: ['/images/casadelentes1.webp', '/images/casadelentes2.webp', '/images/casadelentes3.webp', '/images/casadelentes4.webp'],
    externalUrl: 'https://casadelenteszc.com', relatedSlugs: ['court-avenue', 'ims'],
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
    technologies: ['React', 'Vite', 'MUI', 'TanStack Query', 'Axios', 'React PDF', 'Express', 'Supabase', 'PostgreSQL', 'JWT'],
    bodySections: [
      { heading: 'The problem', points: [
        'Six university offices reported projects to the Social Development Unit separately.',
        'The Unit Director had no single view of progress.',
      ] },
      { heading: 'System', points: [
        'Each office submits projects and reports in its own view.',
        'The Unit Director sees every update in one dashboard.',
        'Projects are tagged by SDG alignment, and reports export to PDF.',
      ] },
      { heading: 'My role', points: [
        'Full-stack developer and project manager, Sept to Dec 2025.',
        'Built the office workflows, reporting views, and the Express services behind them.',
      ] },
    ],
    cover: '/images/sdu1.webp', gallery: ['/images/sdu1.webp', '/images/sdu2.webp'],
    externalUrl: 'https://ateneo-sdu.vercel.app', relatedSlugs: ['orsem-family-feud', 'ims'],
  },
  {
    slug: 'leo-rent-a-car', title: 'LeoRentACar', period: 'Jul–Aug 2025', category: 'Client website',
    notice: 'Client production site under maintenance. The link below opens the preview build.',
    summary: 'A responsive fleet and services website with email-based booking inquiries.',
    role: 'Freelance web developer and interface designer',
    responsibilities: [
      'I designed the fleet and services pages in Figma before building them.',
      'I built the responsive site with lazy-loaded images and scroll interactions.',
      'I connected booking inquiries to email. The site does not take online payments.',
    ],
    technologies: ['Figma', 'Tailwind CSS', 'React', 'Vite', 'React Router', 'Resend'],
    bodySections: [
      { heading: 'Customer journey', points: [
        'Browse the fleet and services, including airport transfers and corporate travel.',
        'Send a booking inquiry. No online payment.',
      ] },
      { heading: 'Design and performance', points: [
        'Designed in Figma first, then built the responsive pages.',
        'Lazy-loaded images and IntersectionObserver for scroll interactions.',
      ] },
      { heading: 'Inquiry flow', points: [
        'Inquiries go to the owner by email through Resend.',
        'Porkbun handles the domain and email setup.',
      ] },
    ],
    cover: '/images/leo1.webp', gallery: ['/images/leo1.webp', '/images/leo2.webp'],
    externalUrl: 'https://leorentacar-git-main-clydefois-projects.vercel.app', relatedSlugs: ['court-avenue', 'mujer-lgbtq'],
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
      { heading: 'Purpose', points: [
        'Informational site for Mujer-LGBT Organization Inc., a Zamboanga City nonprofit.',
      ] },
      { heading: 'Content', points: [
        'The organization’s history, advocates, and goals.',
        'LGBTQIA+ rights, HIV/AIDS awareness, and community resources.',
      ] },
      { heading: 'My role', points: [
        'Team contributor on the pages and how the content was presented.',
      ] },
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
      { heading: 'Event', points: [
        'Family Feud-style game for OrSem 2025 at Ateneo de Zamboanga University.',
      ] },
      { heading: 'Synchronized views', points: [
        'Audience display shows the board, answers, and scores.',
        'Host controller runs questions, reveals, and scoring from a second screen.',
      ] },
      { heading: 'My role', points: [
        'Assisted the Computer Science senior who led development.',
        'Worked on the display and controller interactions.',
      ] },
    ],
    cover: '/images/feud.png', gallery: ['/images/feud.png'], relatedSlugs: ['social-development-unit', 'mujer-lgbtq'],
  },
]

const experiencePhases = [
  {
    organization: 'Ngnair Brice Holding', role: 'Software Engineer · AI Automation', period: 'Jul 2026–Present',
    summary: 'I worked closely with the lead software engineer on frontend development, QA, and AI-assisted automation for payment products. I tested merchant onboarding, role-based navigation, and review workflows across microservices and microfrontends, then reproduced issues and verified fixes through regression testing.',
    skills: [{ label: 'Next.js', icon: 'experience-react' }, { label: 'TypeScript', icon: 'experience-typescript' }, { label: 'GraphQL' }, { label: 'QA & regression' }, { label: 'AI automation' }, { label: 'Microfrontends' }],
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
]

const education = {
  school: 'Ateneo de Zamboanga University', degree: 'Bachelor of Science in Computer Science', period: '2023–Present',
  logo: '/images/adzu_logo.png', href: 'https://adzu.edu.ph/',
  summary: 'I’m studying Computer Science and building my skills in web development, cloud computing, and systems architecture through coursework and projects.',
}

const collection = {
  allCategory: { id: 'all', name: 'All resources', description: 'Browse the complete local collection.' },
  categories: [
    { id: 'ai-development', name: 'AI & Development', description: 'QA sandbox reference notes.' },
    { id: 'learning-references', name: 'Learning & References', description: 'Multi-office architecture notes.' },
    { id: 'tools-libraries', name: 'Tools & Libraries', description: 'React server-state and interface documentation.' },
  ],
  resources: [
    { id: 'scorm-package-testing', name: 'SCORM package testing', description: 'A local QA sandbox approach for testing SCORM packages exported from Articulate 360.', categoryId: 'ai-development', source: 'Portfolio case-study note', destination: '/blog/capytech-scorm-qa-sandbox', actionLabel: 'Open case study', tags: ['SCORM', 'C#', 'ASP.NET Core', 'SQLite'] },
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
          { text: ' as a Software Engineer focused on frontend development, QA, and AI-assisted automation, working closely with the lead software engineer across payment-product microservices and microfrontends. Before that, I worked on e-learning tools at Capytech. I’ve also built university reporting systems and freelance client projects. Each experience helps me learn more about building software and working with a team.' },
        ] },
        { segments: [
          { text: 'I use ' },
          { text: 'Claude Code, Codex, and Neovim', emphasis: true },
          { text: ' to support my work. So while AI helps me move faster, understanding the code and checking how it behaves are still part of my process.' },
        ] },
      ],
    },
  },
  projects, experiencePhases, education, collection, posts, activity, recognition,
})
