# Quick Reference Guide

## 🚀 Common Tasks

### Adding a New Project Panel

1. **Create the component**:

```bash
touch src/components/panels/Project4.jsx
```

2. **Add basic structure**:

```jsx
export default function Project4() {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-8">
      {/* Your project content */}
      <div className="lg:w-1/2">
        <img src="/images/project4.png" alt="Project 4" />
      </div>
      <div className="lg:w-1/2">
        <h3>Project Title</h3>
        <p>Description...</p>
      </div>
    </div>
  );
}
```

3. **Import in App.jsx**:

```jsx
import Project4 from "./components/panels/Project4";
```

4. **Update the panel**:

```jsx
<article ref={(el) => (animationRefs.panelRefs.current[3] = el)}>
  <Project4 />
</article>
```

---

### Adjusting Animation Speed

**Location**: `src/components/animations/HomeScrollAnimations.jsx`

#### Vertical Scroll Speed (Section 1):

```javascript
// Line ~180
scrollTrigger: {
  scrub: 1.5,  // Lower = faster, Higher = slower
  end: "+=10000vh", // Scroll distance
}
```

#### Horizontal Scroll Speed (Section 3):

```javascript
// Line ~700
scrollTrigger: {
  scrub: 1,  // Lower = faster, Higher = slower
  end: () => "+=" + wrapEl.offsetWidth + ` +=${delayAmount}vh`,
}
```

#### Typewriter Speed:

```javascript
// Line ~100
const typeSpeed = isPerformanceMode ? 70 : 50; // ms per character
const deleteSpeed = isPerformanceMode ? 40 : 30; // ms per deletion
```

---

### Changing Mobile Breakpoint

**Global breakpoint**: Currently at `768px`

**Where to change**:

1. `src/components/animations/HomeScrollAnimations.jsx` (line ~33)

```javascript
const isMobile = window.innerWidth < 768; // Change this value
```

2. `src/App.jsx` (line ~40)

```javascript
height: typeof window !== 'undefined' && window.innerWidth < 768 ? '500vh' : '4000vh',
```

3. `src/hooks/useLenis.js` (smooth scrolling)

```javascript
// Add mobile detection if needed
```

---

### Disabling Animations on Mobile

**Option 1**: Early return in useLayoutEffect

```javascript
// In HomeScrollAnimations.jsx, line ~40
if (isMobile) {
  // Set everything visible
  gsap.set(panelRefs.current, { opacity: 1, x: 0, scale: 1 });
  return; // Skip all animations
}
```

**Option 2**: Conditional animation creation

```javascript
if (!isMobile) {
  // Create GSAP timeline
  const master = gsap.timeline({...});
}
```

---

### Changing Section Heights

**Section 1 (Home)**:

```jsx
// App.jsx line ~98
<section className="h-screen min-h-[600px]">
```

**Section 2 (Skills)**:

```jsx
// App.jsx line ~468
style={{ height: "100vh", minHeight: "600px" }}
```

**Section 3 (Projects)**:

```jsx
// App.jsx line ~499
style={{ height: "100vh", minHeight: "600px" }}
```

---

### Debugging Animations

#### Enable GSAP Markers:

```javascript
// HomeScrollAnimations.jsx
scrollTrigger: {
  markers: true,  // Shows start/end trigger points
}
```

#### Console Logging:

```javascript
// Already added in key locations
console.log("Section 3 Horizontal Scroll Setup:", {
  panels: panels.length,
  isMobile,
});
```

#### Check Refs:

```javascript
// In useLayoutEffect
console.log("Refs:", {
  homeSection: homeSectionRef.current,
  section2: section2Ref.current,
  section3: section3Ref.current,
  panels: panelRefs.current.length,
});
```

---

### Common Fixes

#### "Section not showing":

1. Check ref is attached: `ref={animationRefs.section2Ref}`
2. Check z-index hierarchy
3. Check opacity isn't set to 0
4. Verify section is in DOM: `console.log(sectionRef.current)`

#### "Horizontal scroll not working":

1. Verify panels have `.panel` class
2. Check `wrapperRef` is attached
3. Ensure panels are being found: `console.log(panels.length)`
4. Check scroll height is sufficient

#### "Typewriter not animating":

1. Check `titleRef` is attached
2. Verify typewriter intervals are clearing on cleanup
3. Check `isTypewriterActive` flag

#### "Mobile view broken":

1. Check `isMobile` detection
2. Verify conditional rendering
3. Test with responsive design mode
4. Check viewport meta tag in index.html

---

## 🔍 File Locations

### Main Files:

- **App Component**: `src/App.jsx`
- **Main Animations**: `src/components/animations/HomeScrollAnimations.jsx`
- **Global Styles**: `src/App.css`
- **Smooth Scroll**: `src/hooks/useLenis.js`

### Components:

- **NavBar**: `src/components/global/NavBar.jsx`
- **Skills Animations**: `src/components/section2/`
- **Project Panels**: `src/components/panels/`
- **Parallax**: `src/components/ParallaxLights.jsx`

---

## 📞 Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Check for unused exports
npx ts-prune
```

---

_Last Updated: October 12, 2025_
