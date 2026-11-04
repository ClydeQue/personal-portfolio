#import "@preview/basic-resume:0.2.9": *

#let name = "Kenneth Clyde A. Que"
#let location = "Zamboanga City, Philippines"
#let email = "kennethque101@gmail.com"
#let github = "github.com/ClydeQue"
#let linkedin = "linkedin.com/in/kenneth-que"
#let phone = "+63 906 036 4511"
#let personal-site = "www.kcque.dev"

#show: resume.with(
  author: name,
  location: location,
  email: email,
  github: github,
  linkedin: linkedin,
  phone: phone,
  personal-site: personal-site,
  accent-color: "#000000",
  font: "Montserrat",
  paper: "us-letter",
  author-position: center,
  personal-info-position: center,
  author-font-size: 18pt,
  font-size: 10pt,
)

#set par(leading: 0.38em)
#set list(indent: 1.5em, body-indent: 0.45em, spacing: 0.36em)
#show list: set block(below: 0.65em)
#show heading.where(level: 2): it => block(
  width: 100%,
  above: 6pt,
  below: 4pt,
  inset: (bottom: 2pt),
  stroke: (bottom: 0.6pt),
)[#text(size: 11pt, weight: "bold")[#smallcaps(it.body)]]

== Education

#edu(
  institution: "Ateneo de Zamboanga University",
  location: "Zamboanga City, Philippines",
  dates: dates-helper(start-date: "Aug 2022", end-date: "Present"),
  degree: "Bachelor of Science in Computer Science",
)
- Concentrations: Software Engineering, Web Development, Cloud Computing, and Systems Architecture
- Coursework: Software Engineering, OOP, Data Structures and Algorithms, Machine Learning, Database Systems

== Experience

#generic-two-by-two(
  top-left: [*Software Engineer* | #emph[Next.js, TypeScript, GraphQL, QA]],
  top-right: dates-helper(start-date: "Jul 2026", end-date: "Present"),
  bottom-left: emph("Ngnair Payments"),
  bottom-right: emph("Wyoming, USA"),
)
- Worked closely with the *lead software engineer* on frontend development and QA for a payment startup, contributing *Next.js/TypeScript* interfaces and *GraphQL* integrations across *microservices and microfrontends*.
- Tested *merchant onboarding, role-based navigation, and review workflows* across Partner and Location applications; reproduced issues and verified fixes through regression testing.
- Traced UI behavior through *GraphQL and NestJS/Fastify service contracts*; checked role access and integration behavior in *Docker and Cloudflare/CapRover* staging environments, and documented results in *Linear*.

#generic-two-by-two(
  top-left: [*Solutions Developer Intern* | #emph[C\#, ASP.NET Core, Python, SQLite]],
  top-right: dates-helper(start-date: "Jun 2026", end-date: "Jul 2026"),
  bottom-left: emph("Capytech E-Learning Solutions"),
  bottom-right: emph("Zamboanga City, Philippines"),
)
- Built a *Photino.NET SCORM QA sandbox* with *C\#/ASP.NET Core* APIs for package inspection, playback simulation, and *SQLite telemetry*, supporting repeatable local content checks.
- Developed an offline *Python/FastAPI retrieval service* and customized *Moodle* interfaces with JavaScript and CSS for corporate e-learning clients.

#generic-two-by-two(
  top-left: [*Full Stack Developer* | #emph[JavaScript, TypeScript, REST APIs]],
  top-right: dates-helper(start-date: "Jun 6, 2025", end-date: "Jul 12, 2026"),
  bottom-left: emph("JP Consulting & Services LLC"),
  bottom-right: emph("Remote, UAE | 1 year 1 month"),
)
- Built and maintained full-stack JavaScript, TypeScript, and Node.js applications for Australian clients under senior developer guidance.
- Contributed responsive interfaces, *REST API integrations*, database work, debugging, and testing while working remotely for the UAE-based company.

== Projects

#generic-one-by-two(
  left: [*Suntastic Solar IMS* | #emph[Next.js, ASP.NET Core, EF Core, CockroachDB]],
  right: dates-helper(start-date: "Jun 2026", end-date: "Present"),
)
- Built *Next.js/React Admin and Clerk dashboards for Suntastic ZC*, bringing solar inventory, sales, supplier receipts, quotations, and customer collections into one *ASP.NET Core/EF Core* system.
- Implemented *branch-scoped access, transactional stock movements, idempotent commands*, version checks, and append-only financial ledgers to preserve audit history.
- Added cursor pagination, *TanStack Query* invalidation, and *QuestPDF* reports; integrated *CockroachDB, Cloud Run, a Cloudflare Workers BFF, and private R2 media* with GitHub Actions delivery.

#generic-one-by-two(
  left: [*Easy Queue* | #emph[Next.js, NestJS, Prisma, PostgreSQL, Redis, BullMQ]],
  right: "In development",
)
- Built a mobile-first *Next.js* interface for office selection, live tickets, staff queue controls, assisted registration, and public displays, integrated with a *NestJS/Prisma API*.
- Implemented *PostgreSQL priority/FIFO transactions* and ticket deadlines; used a transactional outbox, *Redis/BullMQ* workers, and authenticated SSE for post-commit updates.

#generic-one-by-two(
  left: [*Social Development Unit* | #emph[React, MUI, TanStack Query, Express, Supabase]],
  right: dates-helper(start-date: "Sep 2025", end-date: "Dec 2025"),
)
- Built a *React/MUI reporting platform supporting six offices*, with office-specific workflows and a consolidated Unit Director dashboard backed by *Express and Supabase PostgreSQL*.
- Added *Axios JWT refresh-and-retry handling*, *TanStack Query* caching, and structured activity forms; generated monthly PDFs with *\@react-pdf/renderer* for budgets, SDGs, and strategic-goal reporting.

#generic-one-by-two(
  left: [*Leo Rent A Car* | #emph[React, Vite, Tailwind CSS, Resend, Vercel]],
  right: dates-helper(start-date: "Jul 2025", end-date: "Aug 2025"),
)
- Built a responsive *React/Vite/Tailwind CSS* fleet and services website with route metadata and lazy-loaded images; integrated *Resend through a Vercel function* for inquiries and customer acknowledgments.

== Technical Skills

#block[
  *Languages & Databases:* TypeScript, JavaScript, C\#, Java, Python, PHP, SQL, HTML/CSS, PostgreSQL, MySQL, CockroachDB, SQLite, Redis \
  *Frameworks & Libraries:* React, Next.js, Tailwind CSS, MUI, TanStack Query, Node.js, NestJS, Fastify, Express, ASP.NET Core, EF Core, Prisma, FastAPI, GraphQL, BullMQ \
  *Tools & Platforms:* Docker, Git/GitHub Actions, GCP (Cloud Run, Cloud Build, Storage), AWS (EC2, S3), Cloudflare Workers/R2, Supabase, Neon, Vercel, Postman, Figma, Neovim/LazyVim, LazyGit, Claude Code CLI, Codex CLI
]
