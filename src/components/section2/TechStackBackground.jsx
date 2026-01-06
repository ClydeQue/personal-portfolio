/**
 * Tech Stack Background Component
 * Displays animated floating tech stack SVG icons and decorative rain pills
 * for the skills section background
 * 
 * Features:
 * - 15 tech stack SVG icons (JavaScript, React, TypeScript, Node.js, Python, etc.)
 * - 10 decorative rain pills for visual interest
 * - Responsive: Icons scaled to 50% on mobile devices
 * - All animations handled via CSS (circle-morph, circle-language, circle-rain-pill)
 */
export default function TechStackBackground() {
  // Detect mobile for conditional rendering
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  console.log(`🎨 TechStackBackground: ${isMobile ? 'Mobile' : 'Desktop'} mode`);
  
  return (
    <div 
      className="absolute inset-0 pointer-events-none" 
      style={{ 
        zIndex: 0,
        // Scale all elements to 50% on mobile using CSS transform
        transform: isMobile ? 'scale(0.5)' : 'scale(1)',
        transformOrigin: 'center center',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Tech Stack Icons */}
      
      {/* JavaScript */}
      <div
        className="circle-morph circle-language"
        data-speed="3.331439"
        data-direction="right"
        data-bounce-direction="left"
        style={{
          position: "absolute",
          top: "8.719693vh",
          left: "14.843075vw",
          width: "80px",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <img 
          src="/techstack/javascript.svg" 
          alt="JavaScript" 
          style={{
            width: "80px",
            height: "80px",
            opacity: 0.7,
          }}
        />
      </div>
      
      {/* React */}
      <div
        className="circle-morph circle-language"
        data-speed="5.861841"
        data-direction="left"
        data-bounce-direction="right"
        style={{
          position: "absolute",
          top: "88vh",
          left: "73.284916vw",
          width: "80px",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <img 
          src="/techstack/react.svg" 
          alt="React" 
          style={{
            width: "80px",
            height: "80px",
            opacity: 0.7,
          }}
        />
      </div>
      
      {/* TypeScript */}
      <div
        className="circle-morph circle-language"
        data-speed="6.421857"
        data-direction="right"
        data-bounce-direction="up"
        style={{
          position: "absolute",
          top: "85vh",
          left: "22.637491vw",
          width: "80px",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <img 
          src="/techstack/typescript.svg" 
          alt="TypeScript" 
          style={{
            width: "80px",
            height: "80px",
            opacity: 0.7,
          }}
        />
      </div>
      
      {/* Node.js */}
      <div
        className="circle-morph circle-language"
        data-speed="5.194732"
        data-direction="left"
        data-bounce-direction="down"
        style={{
          position: "absolute",
          top: "56.218764vh",
          left: "48.726351vw",
          width: "80px",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <img 
          src="/techstack/nodejs.svg" 
          alt="Node.js" 
          style={{
            width: "80px",
            height: "80px",
            opacity: 0.7,
          }}
        />
      </div>

      {/* Python */}
      <div
        className="circle-morph circle-language"
        data-speed="12.3"
        data-direction="left"
        data-bounce-direction="down"
        style={{
          position: "absolute",
          top: "26.8vh",
          left: "44.2vw",
          width: "80px",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <img 
          src="/techstack/python.svg" 
          alt="Python" 
          style={{
            width: "80px",
            height: "80px",
            opacity: 0.7,
          }}
        />
      </div>

      {/* Java */}
      <div
        className="circle-morph circle-language"
        data-speed="5.3"
        data-direction="left"
        data-bounce-direction="down"
        style={{
          position: "absolute",
          top: "15vh",
          left: "55vw",
          width: "75px",
          height: "75px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <img 
          src="/techstack/java.svg" 
          alt="Java" 
          style={{
            width: "75px",
            height: "75px",
            opacity: 0.7,
          }}
        />
      </div>

      {/* C++ */}
      <div
        className="circle-morph circle-language"
        data-speed="4.8"
        data-direction="right"
        data-bounce-direction="left"
        style={{
          position: "absolute",
          top: "75.5vh",
          left: "28.3vw",
          width: "70px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <img 
          src="/techstack/c++.svg" 
          alt="C++" 
          style={{
            width: "70px",
            height: "70px",
            opacity: 0.7,
          }}
        />
      </div>

      {/* PHP */}
      <div
        className="circle-morph circle-language"
        data-speed="4.9"
        data-direction="right"
        data-bounce-direction="up"
        style={{
          position: "absolute",
          top: "72vh",
          left: "70vw",
          width: "70px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <img 
          src="/techstack/php.svg" 
          alt="PHP" 
          style={{
            width: "70px",
            height: "70px",
            opacity: 0.7,
          }}
        />
      </div>

      {/* HTML */}
      <div
        className="circle-morph circle-language"
        data-speed="6.1"
        data-direction="left"
        data-bounce-direction="right"
        style={{
          position: "absolute",
          top: "60vh",
          left: "62.5vw",
          width: "70px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <img 
          src="/techstack/html.svg" 
          alt="HTML" 
          style={{
            width: "70px",
            height: "70px",
            opacity: 0.7,
          }}
        />
      </div>

      {/* CSS */}
      <div
        className="circle-morph circle-language"
        data-speed="5.5"
        data-direction="right"
        data-bounce-direction="up"
        style={{
          position: "absolute",
          top: "35vh",
          left: "38.9vw",
          width: "70px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <img 
          src="/techstack/css.svg" 
          alt="CSS" 
          style={{
            width: "70px",
            height: "70px",
            opacity: 0.7,
          }}
        />
      </div>

      {/* Tailwind CSS */}
      <div
        className="circle-morph circle-language"
        data-speed="4.3"
        data-direction="left"
        data-bounce-direction="down"
        style={{
          position: "absolute",
          top: "50vh",
          left: "85vw",
          width: "85px",
          height: "85px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <img 
          src="/techstack/tailwind.svg" 
          alt="Tailwind CSS" 
          style={{
            width: "85px",
            height: "85px",
            opacity: 0.7,
          }}
        />
      </div>

      {/* PostgreSQL */}
      <div
        className="circle-morph circle-language"
        data-speed="20.6"
        data-direction="right"
        data-bounce-direction="up"
        style={{
          position: "absolute",
          top: "20.3vh",
          left: "68.7vw",
          width: "80px",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <img 
          src="/techstack/postgre.svg" 
          alt="PostgreSQL" 
          style={{
            width: "80px",
            height: "80px",
            opacity: 0.7,
          }}
        />
      </div>

      {/* MySQL */}
      <div
        className="circle-morph circle-language"
        data-speed="6.8"
        data-direction="left"
        data-bounce-direction="right"
        style={{
          position: "absolute",
          top: "45vh",
          left: "10vw",
          width: "75px",
          height: "75px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <img 
          src="/techstack/mysql.svg" 
          alt="MySQL" 
          style={{
            width: "75px",
            height: "75px",
            opacity: 0.7,
          }}
        />
      </div>

      {/* Git */}
      <div
        className="circle-morph circle-language"
        data-speed="5.7"
        data-direction="right"
        data-bounce-direction="left"
        style={{
          position: "absolute",
          top: "66.3vh",
          left: "22.8vw",
          width: "70px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <img 
          src="/techstack/git.svg" 
          alt="Git" 
          style={{
            width: "70px",
            height: "70px",
            opacity: 0.7,
          }}
        />
      </div>

      {/* Docker */}
      <div
        className="circle-morph circle-language"
        data-speed="4.8"
        data-direction="left"
        data-bounce-direction="right"
        style={{
          position: "absolute",
          top: "78.6vh",
          left: "58.4vw",
          width: "75px",
          height: "75px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <img 
          src="/techstack/docker.svg" 
          alt="Docker" 
          style={{
            width: "75px",
            height: "75px",
            opacity: 0.7,
          }}
        />
      </div>

      {/* Figma - UI/UX Design & Prototyping */}
      <div
        className="circle-morph circle-language"
        data-speed="5.5"
        data-direction="right"
        data-bounce-direction="up"
        style={{
          position: "absolute",
          top: "12vh",
          left: "82vw",
          width: "70px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <img 
          src="/techstack/figma.svg" 
          alt="Figma" 
          style={{
            width: "70px",
            height: "70px",
            opacity: 0.7,
          }}
        />
      </div>

      {/* Canva - Layouting & Design */}
      <div
        className="circle-morph circle-language"
        data-speed="6.2"
        data-direction="left"
        data-bounce-direction="down"
        style={{
          position: "absolute",
          top: "72vh",
          left: "8vw",
          width: "70px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <img 
          src="/techstack/canva.svg" 
          alt="Canva" 
          style={{
            width: "70px",
            height: "70px",
            opacity: 0.7,
          }}
        />
      </div>

 {/* Rain Pill 1 */}
      <div
        className="circle-morph circle-rain-pill"
        data-speed="5.2"
        data-rain-delay="0"
        data-direction="down"
        style={{
          position: "absolute",
          top: "-10vh",
          left: "15vw",
          width: "25px",
          height: "25px",
          borderRadius: "12.5px",
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          zIndex: 1,
        }}
      />

      {/* Rain Pill 2 */}
      <div
        className="circle-morph circle-rain-pill"
        data-speed="6.5"
        data-rain-delay="0.5"
        data-direction="up"
        style={{
          position: "absolute",
          top: "110vh",
          left: "35vw",
          width: "30px",
          height: "30px",
          borderRadius: "15px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      />

      {/* Rain Pill 3 */}
      <div
        className="circle-morph circle-rain-pill"
        data-speed="4.5"
        data-rain-delay="1"
        data-direction="down"
        style={{
          position: "absolute",
          top: "-15vh",
          left: "55vw",
          width: "20px",
          height: "20px",
          borderRadius: "10px",
          background: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      />

      {/* Rain Pill 4 */}
      <div
        className="circle-morph circle-rain-pill"
        data-speed="7.2"
        data-rain-delay="1.5"
        data-direction="down"
        style={{
          position: "absolute",
          top: "-25vh",
          left: "72vw",
          width: "28px",
          height: "28px",
          borderRadius: "14px",
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      />

      {/* Rain Pill 5 */}
      <div
        className="circle-morph circle-rain-pill"
        data-speed="5.8"
        data-rain-delay="2"
        data-direction="up"
        style={{
          position: "absolute",
          top: "110vh",
          left: "88vw",
          width: "22px",
          height: "22px",
          borderRadius: "11px",
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      />

      {/* Rain Pill 6 */}
      <div
        className="circle-morph circle-rain-pill"
        data-speed="4.2"
        data-rain-delay="0.3"
        data-direction="down"
        style={{
          position: "absolute",
          top: "-18vh",
          left: "8vw",
          width: "26px",
          height: "26px",
          borderRadius: "13px",
          background: "rgba(255, 255, 255, 0.09)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      />

      {/* Rain Pill 7 */}
      <div
        className="circle-morph circle-rain-pill"
        data-speed="6.8"
        data-rain-delay="1.2"
        data-direction="up"
        style={{
          position: "absolute",
          top: "110vh",
          left: "42vw",
          width: "24px",
          height: "24px",
          borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.07)",
          backdropFilter: "blur(7px)",
          WebkitBackdropFilter: "blur(7px)",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      />

      {/* Rain Pill 8 */}
      <div
        className="circle-morph circle-rain-pill"
        data-speed="5.5"
        data-rain-delay="1.8"
        data-direction="down"
        style={{
          position: "absolute",
          top: "-8vh",
          left: "65vw",
          width: "32px",
          height: "32px",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      />

      {/* Rain Pill 9 */}
      <div
        className="circle-morph circle-rain-pill"
        data-speed="6.2"
        data-rain-delay="0.8"
        data-direction="down"
        style={{
          position: "absolute",
          top: "-16vh",
          left: "25vw",
          width: "27px",
          height: "27px",
          borderRadius: "13.5px",
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      />

      {/* Rain Pill 10 */}
      <div
        className="circle-morph circle-rain-pill"
        data-speed="4.8"
        data-rain-delay="1.5"
        data-direction="up"
        style={{
          position: "absolute",
          top: "110vh",
          left: "78vw",
          width: "29px",
          height: "29px",
          borderRadius: "14.5px",
          background: "rgba(255, 255, 255, 0.09)",
          backdropFilter: "blur(9px)",
          WebkitBackdropFilter: "blur(9px)",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );
}
