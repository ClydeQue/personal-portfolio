const techIconMap = {
  React: 'react', 'Next.js': 'nextdotjs', TypeScript: 'typescript', JavaScript: 'javascript',
  Python: 'python', HTML: 'html', CSS: 'css', 'Tailwind CSS': 'tailwind', MUI: 'mui',
  'TanStack Query': 'tanstack', 'C#': 'csharp', 'ASP.NET Core': 'dotnet', 'Node.js': 'nodejs', Express: 'express',
  PostgreSQL: 'postgre', CockroachDB: 'cockroachlabs', Supabase: 'supabase', Neon: 'neon', SQLite: 'sqlite', 'EF Core': 'dotnet',
  JWT: 'jsonwebtokens', GCP: 'googlecloud', 'Cloud Run': 'googlecloud', 'Cloud Build': 'googlecloud',
  'Cloud Storage': 'googlecloudstorage', 'Compute Engine': 'googlecloud', 'Secret Manager': 'googlecloud',
  AWS: 'aws', EC2: 'aws', S3: 'aws', 'Cloudflare Workers': 'cloudflareworkers', 'Cloudflare R2': 'cloudflare',
  'Cloudflare WAF': 'cloudflare', Turnstile: 'cloudflare', Docker: 'docker', 'GitHub Actions': 'githubactions', Vercel: 'vercel',
  'Codex CLI': 'openai', 'Claude Code CLI': 'claude', 'OpenAI API': 'openai', Neovim: 'neovim',
  'lazy.nvim': 'lua', 'Custom Lua modules': 'lua', LazyGit: 'git', Git: 'git', Figma: 'figma', Vite: 'vite',
}

// Single-color marks can be normalized safely. Multicolor badges need their
// internal light/dark detail, so flattening every SVG would hide their lettering.
const monochromeIcons = new Set([
  'react', 'nextdotjs', 'mui', 'tanstack', 'dotnet', 'express', 'cockroachlabs',
  'neon', 'sqlite', 'jsonwebtokens', 'googlecloud', 'googlecloudstorage',
  'cloudflareworkers', 'githubactions', 'vercel', 'claude', 'neovim', 'lua', 'vite',
])

// Architecture and practices have semantic pictograms, not invented company marks.
const practicePaths = {
  SQL: 'M4 6c0-4 16-4 16 0s-16 4-16 0v12c0 4 16 4 16 0V6M4 12c0 4 16 4 16 0',
  Shell: 'M3 4h18v16H3zM7 9l3 3-3 3m6 0h4',
  'GitHub CLI': 'M3 4h18v16H3zM7 9l3 3-3 3m6 0h4',
  'REST APIs': 'M8 5l-6 7 6 7m8-14 6 7-6 7M14 3l-4 18',
  Microservices: 'M9 2h6v6H9zM2 16h6v6H2zM16 16h6v6h-6zM12 8v4M5 16v-4h14v4',
  Microfrontends: 'M2 3h20v18H2zM2 8h20M9 8v13M9 14h13',
  SCORM: 'M3 3h7l2 2 2-2h7v16h-7l-2 2-2-2H3zM12 5v16',
  'Row-Level Security': 'M12 2l8 3v6c0 5-4 9-8 11-4-2-8-6-8-11V5zM8 12l3 3 5-6',
  'AI-assisted QA': 'M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5zM18 17l2 2 3-4',
  'Context engineering': 'M3 4h12v12H3zM8 8h12v12H8M6 8h5M6 12h5',
  'Prompt engineering': 'M3 3h18v14H8l-5 4zM7 7l3 3-3 3m6 0h4',
}

export default function TechIcon({ name }) {
  const icon = techIconMap[name]
  return <span className={`tech-list__icon${monochromeIcons.has(icon) ? ' tech-list__icon--mono' : ''}`} role="img" aria-label={name} title={name} data-label={name} tabIndex={0}>
    {icon
      ? <img src={`/techstack/${icon}.svg`} alt="" loading="lazy" />
      : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={practicePaths[name] ?? practicePaths['REST APIs']} /></svg>}
  </span>
}
