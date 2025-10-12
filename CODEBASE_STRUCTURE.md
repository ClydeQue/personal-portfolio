# Portfolio Codebase Structure & Documentation

## 📁 Project Organization

```
src/
├── App.jsx                     # Main app component
├── main.jsx                    # React entry point
├── App.css                     # Global styles
├── index.css                   # Base CSS & Tailwind
│
├── components/
│   ├── global/
│   │   └── NavBar.jsx          # Top navigation bar
│   │
│   ├── animations/
│   │   ├── HomeScrollAnimations.jsx  # ⭐ MAIN ANIMATION HOOK
│   │   ├── ExpandingSquare.jsx
│   │   ├── PinnedShape.jsx
│   │   └── index.js            # Animation exports
│   │
│   ├── section2/
│   │   ├── BackgroundCircles.jsx    # Animated circles for skills section
│   │   ├── Windmill.jsx             # Windmill animation
│   │   └── index.js
│   │
│   ├── panels/
│   │   ├── Project1.jsx        # First project panel
│   │   ├── Project2.jsx        # Second project panel
│   │   └── Project3.jsx        # Third project panel (reused 4x)
│   │
│   ├── ParallaxLights.jsx      # Background parallax lights
│   ├── Parallax.jsx
│   ├── ContentOverlay.jsx
│   └── ContinuousBackground.jsx
│
└── hooks/
    ├── useLenis.js             # Smooth scrolling library hook
    ├── useScrollTrigger.js
    └── index.js
```

---

## 🎯 Main Sections

### **Section 1: Home** (`#home`)

- **Container**: `homeSectionRef`
- **Purpose**: Vertical cinematic intro with animated text and expanding stats card
- **Key Elements**:
  - Hero text (Hello, Name, Title with typewriter effect)
  - Social media links
  - Action buttons (Projects/Skills)
  - Person image with decorative shapes
  - Stats card (bottom right) that expands
  - "Who am I" pull-up content

**Animation Flow**:

1. Initial text display
2. Text elements fade out upward
3. Stats card expands to full width
4. Card expands to full height
5. "Who am I" content slides up
6. Everything exits, revealing Section 2

---

### **Section 2: Skills** (`#skills`)

- **Container**: `section2Ref`
- **Purpose**: Showcase skills with animated windmill and background circles
- **Key Elements**:
  - Windmill SVG animation
  - Background circles morphing
  - "Take A Look!" title
  - Parallax effects on scroll

**Animation Features**:

- Windmill rotates and scales
- Circles pulse and morph
- Title fades in with dramatic effect

---

### **Section 3: Projects** (`#projects`)

- **Container**: `section3Ref` (pinned)
- **Wrapper**: `wrapperRef` (horizontal scroll container)
- **Panels**: `panelRefs.current[0-5]` (6 project panels)

**Purpose**: Horizontal scrolling project showcase

**Animation Behavior**:

- Section pins to viewport
- Wrapper slides left as user scrolls down
- Panels snap to position
- Active panel fades to full opacity
- Adjacent panels semi-visible (0.5 opacity)
- Far panels dim (0.3 opacity)

**Current Panel Setup**:

- Panel 0: `<Project1 />`
- Panel 1: `<Project2 />`
- Panels 2-5: `<Project3 />` (repeated - should be unique)

---

## 🔗 Ref Naming Convention

### Current Naming:

```javascript
// Section 1
homeSectionRef      → Home section container
helloRef            → "Hello!" text
nameRef             → Name text
titleRef            → Animated title (typewriter)
descriptionRef      → Description paragraph
connectRef          → Social media section
buttonsRef          → Action buttons
personGroupRef      → Person image group
leftRectanglesRef   → Decorative shapes
rectangleRef        → Stats card (bottom right)
pullUpContentRef    → "Who am I" content

// Section 2
section2Ref         → Skills section

// Section 3
section3Ref         → Projects section (pinned)
wrapperRef          → Horizontal wrapper
panelRefs           → Project panels array [0-5]
```

---

## 🎨 Animation Hook Usage

### In App.jsx:

```javascript
import useScrollAnimations from "./components/animations/HomeScrollAnimations";

function App() {
  const animationRefs = useScrollAnimations();

  return (
    <div>
      <section ref={animationRefs.homeSectionRef}>
        <h1 ref={animationRefs.helloRef}>Hello!</h1>
        {/* ... */}
      </section>

      <section ref={animationRefs.section2Ref}>{/* Skills content */}</section>

      <section ref={animationRefs.section3Ref}>
        <div ref={animationRefs.wrapperRef}>
          <article ref={(el) => (animationRefs.panelRefs.current[0] = el)}>
            <Project1 />
          </article>
          {/* ... more panels */}
        </div>
      </section>
    </div>
  );
}
```

---

## 📱 Mobile Optimizations

### Responsive Behavior:

- **< 768px**: Mobile mode
  - Typewriter effect runs slower
  - Reduced animation distances
  - Panels visible by default
  - Simplified transitions

### Mobile-Specific Adjustments:

```javascript
const isMobile = window.innerWidth < 768;
const isPerformanceMode = isMobile || prefersReducedMotion;

// Animation speeds
const typeSpeed = isPerformanceMode ? 70 : 50; // ms per character
const deleteSpeed = isPerformanceMode ? 40 : 30; // ms per character
const blinkSpeed = isPerformanceMode ? 600 : 500; // ms per blink
```

---

## 🔧 Key Technologies

### Core:

- **React 18** - Component library
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first styling

### Animations:

- **GSAP 3** - Professional animation library
- **ScrollTrigger** - Scroll-based animations
- **Lenis** - Smooth scrolling (desktop only)

---

## ⚠️ Known Issues & Improvements Needed

### Issues:

1. ❌ Panels 2-5 all use `<Project3 />` - should have unique content
2. ⚠️ Mobile view animations may be too complex
3. ⚠️ Large scroll height (4000vh) can be confusing

### Recommended Improvements:

#### 1. Create Unique Project Components

```bash
# Create new project panels
src/components/panels/Project4.jsx
src/components/panels/Project5.jsx
src/components/panels/Project6.jsx
```

#### 2. Simplify Mobile Experience

- Consider disabling complex animations below 768px
- Use native scrolling on mobile
- Reduce scroll distances

#### 3. Better File Organization

```
components/
├── layout/          # NavBar, Header, Footer
├── sections/        # HomeSection, SkillsSection, ProjectsSection
├── animations/      # Animation utilities only
└── ui/              # Reusable UI components
```

---

## 🎯 Summary: Is Your Setup Good?

### ✅ **Strengths**:

- Clean separation of animation logic
- Proper use of refs for GSAP animations
- Good mobile detection
- Performance considerations in place
- Smooth horizontal scroll implementation

### ⚠️ **Areas for Improvement**:

1. **Naming**: Current ref names are functional but could be more descriptive
2. **File Structure**: Mix of unused files (`sections/` folder not used)
3. **Duplicate Content**: Panels 2-5 showing same project
4. **Mobile UX**: Could be simplified further
5. **Documentation**: Add inline comments for complex animations

### 🌟 **Overall Rating**: **7.5/10**

Your setup is solid and functional. The main improvements would be:

- Better organization of unused components
- Unique content for all panels
- More consistent naming conventions
- Enhanced mobile experience

---

## 📚 Next Steps

1. **Immediate**: Create unique project panels for all 6 slots
2. **Short-term**: Simplify mobile animations
3. **Long-term**: Refactor into cleaner section components
4. **Documentation**: Add JSDoc comments to complex functions

---

_Last Updated: October 12, 2025_
