# Layouts

The site uses a centered editorial canvas bounded by fine gray rules. Personal home begins with a two-column hero: particle portrait left, typographic statement right, and associations below the copy. Editorial content follows a two-column grid.

Professional home uses two equal desktop columns. Identity/about/experience occupy the left; tech, projects, education, and activity occupy the right. At 900px the grid becomes a deliberate single-column ordered flow.

```css
.professional-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
@media (max-width: 900px) { .professional-grid { display: flex; flex-direction: column; } }
```
