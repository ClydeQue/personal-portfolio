# Components

## Shell components

`PortfolioShell` composes `StatusBar`, `Header`, `MobileMenu`, page content, `Footer`, `BackToTop`, `AmbientCanvas`, and `CustomCursor`. `Header` owns navigation and the Personal/Professional switch.

## Home components

`HomePage` selects `PersonalHome` or `ProfessionalHome`. `ParticlePortrait` is a Canvas2D renderer with a real-image fallback. `SplitFlapName` animates the personal display name. `TechList`, `ProjectCard`, `ActivityHeatmap`, `Icon`, and `ImageWithFallback` are shared.

## Representative code

```jsx
function HomePage({ view }) {
  return view === 'professional' ? <ProfessionalHome /> : <PersonalHome />
}
```
