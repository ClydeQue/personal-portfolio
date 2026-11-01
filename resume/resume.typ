#let name = "Kenneth Clyde A. Que"
#let location = "Zamboanga City, Philippines"
#let email = "kennethque101@gmail.com"
#let github = "github.com/ClydeQue"
#let linkedin = "linkedin.com/in/kenneth-que"
#let phone = "+63 906 036 4511"
#let personal-site = "kcque.dev"

#set document(author: name, title: "Kenneth Clyde Que - Resume")
#set page(paper: "us-letter", margin: (x: 0.5in, y: 0.45in))
#set text(font: "Arial", size: 9.4pt, lang: "en", ligatures: false)
#set par(leading: 0.45em, spacing: 0.55em)
#set list(indent: 10pt, body-indent: 3pt, spacing: 0.25em)
#show link: set text(fill: rgb("#26428b"))
#show heading.where(level: 2): it => block(above: 0.8em, below: 0.5em)[
  #text(size: 11pt, weight: "bold", fill: rgb("#26428b"))[#it.body]
  #v(-5pt)
  #line(length: 100%, stroke: 0.5pt + rgb("#c3ccdc"))
]

#let work(title: "", company: "", dates: "", location: "") = block(above: 0.65em, below: 0.25em)[
  #grid(
    columns: (1fr, auto),
    column-gutter: 12pt,
    row-gutter: 3pt,
    text(weight: "bold", title), align(right, dates),
    company, align(right, text(style: "italic", location)),
  )
]
#let edu(institution: "", location: "", dates: "", degree: "") = work(title: institution, company: degree, dates: dates, location: location)
#let project(name: "", role: "", dates: "", url: "") = work(title: name, company: role, dates: dates, location: if url == "" { "" } else { link("https://" + url)[#url] })

#text(size: 21pt, weight: "bold")[#name]
#linebreak()
#text(size: 8.5pt)[#phone | #location | #link("mailto:" + email)[#email]]
#linebreak()
#text(size: 8.5pt)[#link("https://" + github)[GitHub] | #link("https://" + linkedin)[LinkedIn] | #link("https://www." + personal-site)[#personal-site]]

== Education

#edu(
  institution: "Ateneo de Zamboanga University",
  location: "Zamboanga City, Philippines",
  dates: "Aug 2022 - Present",
  degree: "Bachelor of Science in Computer Science",
)
- Concentrations: Software Engineering, Web Development, Cloud Computing, and Systems Architecture
- Coursework: Software Engineering, OOP, Data Structures and Algorithms, Machine Learning, Database Systems

== Work Experience

#work(
  title: "Software Engineer | Next.js, TypeScript, GraphQL, QA",
  location: "Wyoming, USA",
  company: "Ngnair Payments",
  dates: "Jul 2026 - Present",
)
- Worked closely with the lead software engineer on frontend development and QA for a payment startup, contributing Next.js/TypeScript interfaces and GraphQL integrations across microservices and microfrontends.
- Tested merchant onboarding, role-based navigation, and review workflows across Partner and Location applications; reproduced issues and verified fixes through regression testing.
- Traced UI behavior through GraphQL and NestJS/Fastify service contracts; checked role access and integration behavior in Docker and Cloudflare/CapRover staging environments, and documented results in Linear.

#work(
  title: "Solutions Developer Intern | C#, ASP.NET Core, Python, SQLite",
  location: "Zamboanga City, Philippines",
  company: "Capytech E-Learning Solutions",
  dates: "Jun 2026 - Jul 2026",
)
- Built a Photino.NET SCORM QA sandbox with C\#/ASP.NET Core APIs for package inspection, playback simulation, and SQLite telemetry, supporting repeatable local content checks.
- Developed an offline Python/FastAPI retrieval service and customized Moodle interfaces with JavaScript and CSS for corporate e-learning clients.

#work(
  title: "Full Stack Developer (Remote)",
  location: "United Arab Emirates",
  company: "JP Consulting & Services LLC",
  dates: "June 6, 2025 - July 12, 2026 (1 year 1 month)",
)
- Built and maintained full-stack JavaScript, TypeScript, and Node.js applications for Australian clients under senior developer guidance.
- Contributed responsive interfaces, REST API integrations, database work, debugging, and testing while working remotely for the UAE-based company.

== Projects

#project(
  name: "Suntastic Solar IMS",
  role: "Next.js, ASP.NET Core, EF Core, CockroachDB",
  dates: "Jun 2026 - Present",
)
- Built Next.js/React Admin and Clerk dashboards for Suntastic ZC, bringing solar inventory, sales, supplier receipts, quotations, and customer collections into one ASP.NET Core/EF Core system.
- Implemented branch-scoped access, transactional stock movements, idempotent commands, version checks, and append-only financial ledgers to preserve audit history.
- Added cursor pagination, TanStack Query invalidation, and QuestPDF reports; integrated CockroachDB, Cloud Run, a Cloudflare Workers BFF, and private R2 media with GitHub Actions delivery.

#project(
  name: "Easy Queue",
  role: "Next.js, NestJS, Prisma, PostgreSQL, Redis, BullMQ",
  dates: "In development",
)
- Built a mobile-first Next.js interface for office selection, live tickets, staff queue controls, assisted registration, and public displays, integrated with a NestJS/Prisma API.
- Implemented PostgreSQL priority/FIFO transactions and ticket deadlines; used a transactional outbox, Redis/BullMQ workers, and authenticated SSE for post-commit updates.

#project(
  name: "Social Development Unit",
  role: "React, MUI, TanStack Query, Express, Supabase",
  dates: "Sep 2025 - Dec 2025",
)
- Built a React/MUI reporting platform supporting six offices, with office-specific workflows and a consolidated Unit Director dashboard backed by Express and Supabase PostgreSQL.
- Added Axios JWT refresh-and-retry handling, TanStack Query caching, and structured activity forms; generated monthly PDFs with \@react-pdf/renderer for budgets, SDGs, and strategic-goal reporting.

#project(
  name: "Leo Rent A Car",
  role: "React, Vite, Tailwind CSS, Resend, Vercel",
  dates: "Jul 2025 - Aug 2025",
)
- Built a responsive React/Vite/Tailwind CSS fleet and services website with route metadata and lazy-loaded images; integrated Resend through a Vercel function for inquiries and customer acknowledgments.

== Technical Skills
- Languages & Databases: TypeScript, JavaScript, C\#, Java, Python, PHP, SQL, HTML/CSS, PostgreSQL, MySQL, CockroachDB, SQLite, Redis
- Frameworks & Libraries: React, Next.js, Tailwind CSS, MUI, TanStack Query, Node.js, NestJS, Fastify, Express, ASP.NET Core, EF Core, Prisma, FastAPI, GraphQL, BullMQ
- Tools & Platforms: Docker, Git/GitHub Actions, GCP (Cloud Run, Cloud Build, Storage), AWS (EC2, S3), Cloudflare Workers/R2, Supabase, Neon, Vercel, Postman, Figma, Neovim/LazyVim, LazyGit, Claude Code CLI, Codex CLI
