import React from 'react'

/**
 * ContinuousBackground Component
 * Creates one long scrollable background without section breaks
 * 
 * CUSTOMIZATION AREAS:
 * 1. Height and scroll distance (line 13)
 * 2. Gradient colors and stops (lines 16-24)
 * 3. Background patterns/images (lines 26-35)
 * 4. Snap point positions (lines 38-45)
 */
const ContinuousBackground = () => {
  return (
    <div 
      className="w-full"
      style={{
        // 🎨 CUSTOMIZE: Total scroll height (determines scroll distance)
        height: '500vh', // 5x viewport height for long scroll
        background: `
          linear-gradient(
            to bottom,
            /* 🎨 CUSTOMIZE: Gradient color stops */
            #1e1b4b 0%,      /* Deep purple start */
            #312e81 20%,     /* Purple */
            #1e40af 40%,     /* Blue */
            #059669 60%,     /* Emerald */
            #dc2626 80%,     /* Red */
            #7c2d12 100%     /* Dark brown end */
          )
        `,
        // 🎨 CUSTOMIZE: Add background patterns or images
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 1px, transparent 1px),
          radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05) 1px, transparent 1px),
          radial-gradient(circle at 40% 80%, rgba(255,255,255,0.08) 2px, transparent 2px)
        `,
        backgroundSize: '100px 100px, 150px 150px, 200px 200px',
        backgroundPosition: '0 0, 50px 50px, 100px 100px',
      }}
    >
      {/* 🎨 CUSTOMIZE: Scroll markers/snap points (invisible guides) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Keyframe markers - these help define animation points */}
        <div id="keyframe-start" className="absolute top-0 left-0 w-full h-screen"></div>
        <div id="keyframe-quarter" className="absolute top-1/4 left-0 w-full h-screen"></div>
        <div id="keyframe-half" className="absolute top-1/2 left-0 w-full h-screen"></div>
        <div id="keyframe-three-quarter" className="absolute top-3/4 left-0 w-full h-screen"></div>
        <div id="keyframe-end" className="absolute bottom-0 left-0 w-full h-screen"></div>
      </div>

      {/* 🎨 CUSTOMIZE: Add floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs that move with scroll */}
        <div 
          className="absolute w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #60a5fa, transparent)',
            top: '10%',
            left: '10%',
            animation: 'float 20s ease-in-out infinite',
          }}
        ></div>
        <div 
          className="absolute w-96 h-96 rounded-full opacity-5 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #34d399, transparent)',
            top: '60%',
            right: '10%',
            animation: 'float 25s ease-in-out infinite reverse',
          }}
        ></div>
        <div 
          className="absolute w-48 h-48 rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #f59e0b, transparent)',
            bottom: '20%',
            left: '20%',
            animation: 'float 18s ease-in-out infinite',
          }}
        ></div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(10px) translateX(-5px); }
          75% { transform: translateY(-5px) translateX(15px); }
        }
      `}</style>
    </div>
  )
}

export default ContinuousBackground

/**
 * CUSTOMIZATION GUIDE:
 * 
 * 1. SCROLL DISTANCE:
 *    - Change height: '500vh' to adjust total scroll length
 *    - More height = longer scroll experience
 * 
 * 2. BACKGROUND COLORS:
 *    - Modify gradient stops and colors
 *    - Add more color stops for complex gradients
 *    - Replace with background images or patterns
 * 
 * 3. KEYFRAME POSITIONS:
 *    - Adjust top positions of keyframe markers
 *    - Add more keyframes for complex animations
 *    - These correspond to animation trigger points
 * 
 * 4. FLOATING ELEMENTS:
 *    - Add more floating orbs or shapes
 *    - Modify sizes, colors, and positions
 *    - Adjust animation duration and easing
 *  
 * 5. BACKGROUND PATTERNS:
 *    - Replace radial gradients with images
 *    - Add noise textures or geometric patterns
 *    - Modify backgroundSize and backgroundPosition
 */