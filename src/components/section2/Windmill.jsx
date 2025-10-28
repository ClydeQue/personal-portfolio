import React from 'react';

/**
 * Windmill Component
 * Rotating windmill with gradient blades for Section 2
 */
export default function Windmill() {
  return (
    <div
      id="pin-windmill"
      className="hidden md:block"
      style={{
        position: "absolute",
        top: "50%",
        right: "0%",
        transform: "translateY(-50%)",
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
        <svg
          id="pin-windmill-svg"
          width="500"
          height="800"
          viewBox="0 0 250 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"

        >
          <defs>
            {/* Linear Gradient 1 - Blue Ocean */}
            <linearGradient id="paint0_linear_blade1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#51B2EC", stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: "#3A9FD9", stopOpacity: 0.95 }} />
              <stop offset="100%" style={{ stopColor: "#2A8BC7", stopOpacity: 0.9 }} />
            </linearGradient>
            
            {/* Linear Gradient 2 - Warm Sunset */}
            <linearGradient id="paint0_linear_blade2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#F6AA10", stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: "#E89A0D", stopOpacity: 0.95 }} />
              <stop offset="100%" style={{ stopColor: "#D98B0A", stopOpacity: 0.9 }} />
            </linearGradient>
            
            {/* Linear Gradient 3 - Deep Navy */}
            <linearGradient id="paint0_linear_blade3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#143E5B", stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: "#0F3248", stopOpacity: 0.95 }} />
              <stop offset="100%" style={{ stopColor: "#0A2635", stopOpacity: 0.9 }} />
            </linearGradient>
            
            {/* Linear Gradient 4 - Sky Blue */}
            <linearGradient id="paint0_linear_blade4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#7BB3D3", stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: "#5FA4C9", stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: "#4395BF", stopOpacity: 0.85 }} />
            </linearGradient>
            
            {/* Hub Gradient */}
            <radialGradient id="paint_radial_hub">
              <stop offset="0%" style={{ stopColor: "#F6AA10", stopOpacity: 1 }} />
              <stop offset="70%" style={{ stopColor: "#D98B0A", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#1B374B", stopOpacity: 1 }} />
            </radialGradient>
          </defs>
          
          <g transform="translate(125, 125)">
            {/* Blade 1 - Top (0 degrees) */}
            <g transform="rotate(0) translate(-30, -30)">
              <path
                d="M37.583 30.536h23.266c.198 0 .36.162.36.36v29.867c0 .2-.164.363-.364.362-16.599-.193-30.019-13.606-30.226-30.194v29.907c0 .198-.162.36-.36.36H.367c-.2 0-.364-.164-.362-.364C.2 44.09 13.817 30.602 30.604 30.6H.36c-.199 0-.36-.162-.36-.36V.367C0 .164.164 0 .364.002c16.599.193 30.019 13.606 30.226 30.194V.36c0-.198.162-.36.36-.36h29.867c.2 0 .364.164.362.364-.167 14.366-10.234 26.354-23.702 29.447-.416.095-.345.709.083.709h-.002Z"
                fill="url(#paint0_linear_blade1)"
                stroke="#1B374B"
                strokeWidth="0.5"
              />
            </g>
            
            {/* Blade 2 - Right (90 degrees) */}
            <g transform="rotate(90) translate(-30, -30)">
              <path
                d="M37.583 30.536h23.266c.198 0 .36.162.36.36v29.867c0 .2-.164.363-.364.362-16.599-.193-30.019-13.606-30.226-30.194v29.907c0 .198-.162.36-.36.36H.367c-.2 0-.364-.164-.362-.364C.2 44.09 13.817 30.602 30.604 30.6H.36c-.199 0-.36-.162-.36-.36V.367C0 .164.164 0 .364.002c16.599.193 30.019 13.606 30.226 30.194V.36c0-.198.162-.36.36-.36h29.867c.2 0 .364.164.362.364-.167 14.366-10.234 26.354-23.702 29.447-.416.095-.345.709.083.709h-.002Z"
                fill="url(#paint0_linear_blade2)"
                stroke="#1B374B"
                strokeWidth="0.5"
              />
            </g>
            
            {/* Blade 3 - Bottom (180 degrees) */}
            <g transform="rotate(180) translate(-30, -30)">
              <path
                d="M37.583 30.536h23.266c.198 0 .36.162.36.36v29.867c0 .2-.164.363-.364.362-16.599-.193-30.019-13.606-30.226-30.194v29.907c0 .198-.162.36-.36.36H.367c-.2 0-.364-.164-.362-.364C.2 44.09 13.817 30.602 30.604 30.6H.36c-.199 0-.36-.162-.36-.36V.367C0 .164.164 0 .364.002c16.599.193 30.019 13.606 30.226 30.194V.36c0-.198.162-.36.36-.36h29.867c.2 0 .364.164.362.364-.167 14.366-10.234 26.354-23.702 29.447-.416.095-.345.709.083.709h-.002Z"
                fill="url(#paint0_linear_blade3)"
                stroke="#1B374B"
                strokeWidth="0.5"
              />
            </g>
            
            {/* Blade 4 - Left (270 degrees) */}
            <g transform="rotate(270) translate(-30, -30)">
              <path
                d="M37.583 30.536h23.266c.198 0 .36.162.36.36v29.867c0 .2-.164.363-.364.362-16.599-.193-30.019-13.606-30.226-30.194v29.907c0 .198-.162.36-.36.36H.367c-.2 0-.364-.164-.362-.364C.2 44.09 13.817 30.602 30.604 30.6H.36c-.199 0-.36-.162-.36-.36V.367C0 .164.164 0 .364.002c16.599.193 30.019 13.606 30.226 30.194V.36c0-.198.162-.36.36-.36h29.867c.2 0 .364.164.362.364-.167 14.366-10.234 26.354-23.702 29.447-.416.095-.345.709.083.709h-.002Z"
                fill="url(#paint0_linear_blade4)"
                stroke="#1B374B"
                strokeWidth="0.5"
              />
            </g>
            
            {/* Center hub with gradient */}
            <circle cx="0" cy="0" r="12" fill="#1B374B" />
            <circle cx="0" cy="0" r="8" fill="url(#paint_radial_hub)" />
          </g>
        </svg>
      </div>
  );
}
