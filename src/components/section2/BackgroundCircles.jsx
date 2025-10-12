

/**
 * Background Circles Component
 * Animated morphing circles for Section 2 background
 * Some circles start super small and grow upward (height increases while width stays constant)
 * Responsive: Circles are scaled to 50% on mobile devices using CSS transform
 */
export default function BackgroundCircles() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none circles-container" 
      style={{ 
        zIndex: 0,
        // Scale all circles to 50% on mobile using CSS transform
        transform: typeof window !== 'undefined' && window.innerWidth < 768 ? 'scale(0.5)' : 'scale(1)',
        transformOrigin: 'center center',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Circle 1 - With JavaScript text - Pill shaped */}
      <div
        className="circle-morph circle-language"
        data-speed="3.331439"
        data-direction="right"
        data-bounce-direction="left"
        style={{
          position: "absolute",
          top: "8.719693vh",
          left: "14.843075vw",
          width: "50px",
          height: "50px",
          translate: "none",
          rotate: "none",
          scale: "none",
          transform: "translate3d(0px, 0px, 0px)",
          borderRadius: "25px",
          background: "linear-gradient(135deg, rgba(81, 178, 236, 0.75) 0%, rgba(81, 178, 236, 0.35) 100%)",
          border: "2px solid rgba(81, 178, 236, 0.6)",
          boxShadow: "0 4px 20px rgba(81, 178, 236, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          backdropFilter: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "blur(8px)",
        }}
      >
        <span style={{
          color: "rgba(255, 255, 255, 0.95)",
          fontWeight: "bold",
          fontSize: "14px",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}>
          JavaScript
        </span>
      </div>
      
      {/* Circle 2 - With React text - Pill shaped */}
      <div
        className="circle-morph circle-language"
        data-speed="5.861841"
        data-direction="left"
        data-bounce-direction="right"
        style={{
          position: "absolute",
          top: "92.456321vh",
          left: "73.284916vw",
          width: "50px",
          height: "50px",
          translate: "none",
          rotate: "none",
          scale: "none",
          transform: "translate3d(0px, 0px, 0px)",
          borderRadius: "25px",
          background: "linear-gradient(135deg, rgba(246, 170, 16, 0.7) 0%, rgba(246, 170, 16, 0.32) 100%)",
          border: "2px solid rgba(246, 170, 16, 0.55)",
          boxShadow: "0 4px 20px rgba(246, 170, 16, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          backdropFilter: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "blur(8px)",
        }}
      >
        <span style={{
          color: "rgba(255, 255, 255, 0.95)",
          fontWeight: "bold",
          fontSize: "14px",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}>
          React
        </span>
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
          background: "linear-gradient(180deg, rgba(81, 178, 236, 0.8) 0%, rgba(81, 178, 236, 0.6) 100%)",
          opacity: 0.3, 
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
          background: "linear-gradient(180deg, rgba(246, 170, 16, 0.8) 0%, rgba(246, 170, 16, 0.6) 100%)",
          opacity: 0.35,
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
          background: "linear-gradient(180deg, rgba(20, 62, 91, 0.8) 0%, rgba(20, 62, 91, 0.6) 100%)",
          opacity: 0.25,
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
          background: "linear-gradient(180deg, rgba(81, 178, 236, 0.8) 0%, rgba(81, 178, 236, 0.6) 100%)",
          opacity: 0.4,
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
          background: "linear-gradient(180deg, rgba(246, 170, 16, 0.8) 0%, rgba(246, 170, 16, 0.6) 100%)",
          opacity: 0.3,
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
          background: "linear-gradient(180deg, rgba(20, 62, 91, 0.8) 0%, rgba(20, 62, 91, 0.6) 100%)",
          opacity: 0.35,
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
          background: "linear-gradient(180deg, rgba(81, 178, 236, 0.8) 0%, rgba(81, 178, 236, 0.6) 100%)",
          opacity: 0.28,
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
          background: "linear-gradient(180deg, rgba(246, 170, 16, 0.8) 0%, rgba(246, 170, 16, 0.6) 100%)",
          opacity: 0.32,
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
          background: "linear-gradient(180deg, rgba(20, 62, 91, 0.8) 0%, rgba(20, 62, 91, 0.6) 100%)",
          opacity: 0.3,
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
          background: "linear-gradient(180deg, rgba(81, 178, 236, 0.8) 0%, rgba(81, 178, 236, 0.6) 100%)",
          opacity: 0.35,
        }}
      />
      
      {/* Circle 4 - With TypeScript text - Pill shaped */}
      <div
        className="circle-morph circle-language"
        data-speed="6.421857"
        data-direction="right"
        data-bounce-direction="up"
        style={{
          position: "absolute",
          top: "143.892156vh",
          left: "22.637491vw",
          width: "50px",
          height: "50px",
          borderRadius: "25px",
          background: "linear-gradient(135deg, rgba(81, 178, 236, 0.73) 0%, rgba(81, 178, 236, 0.34) 100%)",
          border: "2px solid rgba(81, 178, 236, 0.58)",
          boxShadow: "0 4px 20px rgba(81, 178, 236, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "blur(8px)",
        }}
      >
        <span style={{
          color: "rgba(255, 255, 255, 0.95)",
          fontWeight: "bold",
          fontSize: "14px",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}>
          TypeScript
        </span>
      </div>
      
      {/* Circle 5 - With Node.js text - Pill shaped */}
      <div
        className="circle-morph circle-language"
        data-speed="5.194732"
        data-direction="left"
        data-bounce-direction="down"
        style={{
          position: "absolute",
          top: "56.218764vh",
          left: "48.726351vw",
          width: "50px",
          height: "50px",
          borderRadius: "25px",
          background: "linear-gradient(135deg, rgba(246, 170, 16, 0.75) 0%, rgba(246, 170, 16, 0.35) 100%)",
          border: "2px solid rgba(246, 170, 16, 0.6)",
          boxShadow: "0 4px 20px rgba(246, 170, 16, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "blur(8px)",
        }}
      >
        <span style={{
          color: "rgba(255, 255, 255, 0.95)",
          fontWeight: "bold",
          fontSize: "14px",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}>
          Node.js
        </span>
      </div>

      {/* C++ - Pill shaped */}
      <div
        className="circle-morph circle-language"
        data-speed="4.8"
        data-direction="right"
        data-bounce-direction="left"
        style={{
          position: "absolute",
          top: "75.5vh",
          left: "28.3vw",
          width: "45px",
          height: "45px",
          borderRadius: "22.5px",
          background: "linear-gradient(135deg, rgba(20, 62, 91, 0.8) 0%, rgba(20, 62, 91, 0.4) 100%)",
          border: "2px solid rgba(20, 62, 91, 0.65)",
          boxShadow: "0 4px 20px rgba(20, 62, 91, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "blur(8px)",
        }}
      >
        <span style={{
          color: "rgba(255, 255, 255, 0.95)",
          fontWeight: "bold",
          fontSize: "13px",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}>
          C++
        </span>
      </div>

      {/* HTML - Pill shaped */}
      <div
        className="circle-morph circle-language"
        data-speed="6.1"
        data-direction="left"
        data-bounce-direction="right"
        style={{
          position: "absolute",
          top: "105.8vh",
          left: "62.5vw",
          width: "55px",
          height: "55px",
          borderRadius: "27.5px",
          background: "linear-gradient(135deg, rgba(81, 178, 236, 0.77) 0%, rgba(81, 178, 236, 0.36) 100%)",
          border: "2px solid rgba(81, 178, 236, 0.62)",
          boxShadow: "0 4px 20px rgba(81, 178, 236, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "blur(8px)",
        }}
      >
        <span style={{
          color: "rgba(255, 255, 255, 0.95)",
          fontWeight: "bold",
          fontSize: "14px",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}>
          HTML
        </span>
      </div>

      {/* CSS - Pill shaped */}
      <div
        className="circle-morph circle-language"
        data-speed="5.5"
        data-direction="right"
        data-bounce-direction="up"
        style={{
          position: "absolute",
          top: "118.2vh",
          left: "38.9vw",
          width: "48px",
          height: "48px",
          borderRadius: "24px",
          background: "linear-gradient(135deg, rgba(246, 170, 16, 0.71) 0%, rgba(246, 170, 16, 0.33) 100%)",
          border: "2px solid rgba(246, 170, 16, 0.56)",
          boxShadow: "0 4px 20px rgba(246, 170, 16, 0.36), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "blur(8px)",
        }}
      >
        <span style={{
          color: "rgba(255, 255, 255, 0.95)",
          fontWeight: "bold",
          fontSize: "13px",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}>
          CSS
        </span>
      </div>

      {/* Tailwind CSS - Pill shaped */}
      <div
        className="circle-morph circle-language"
        data-speed="4.3"
        data-direction="left"
        data-bounce-direction="down"
        style={{
          position: "absolute",
          top: "68.4vh",
          left: "81.2vw",
          width: "70px",
          height: "70px",
          borderRadius: "35px",
          background: "linear-gradient(135deg, rgba(81, 178, 236, 0.73) 0%, rgba(81, 178, 236, 0.34) 100%)",
          border: "2px solid rgba(81, 178, 236, 0.58)",
          boxShadow: "0 4px 20px rgba(81, 178, 236, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "blur(8px)",
        }}
      >
        <span style={{
          color: "rgba(255, 255, 255, 0.95)",
          fontWeight: "bold",
          fontSize: "11px",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}>
          TailwindCSS
        </span>
      </div>

      {/* Next.js - Pill shaped */}
      <div
        className="circle-morph circle-language"
        data-speed="5.9"
        data-direction="right"
        data-bounce-direction="left"
        style={{
          position: "absolute",
          top: "48.7vh",
          left: "12.4vw",
          width: "52px",
          height: "52px",
          borderRadius: "26px",
          background: "linear-gradient(135deg, rgba(20, 62, 91, 0.75) 0%, rgba(20, 62, 91, 0.35) 100%)",
          border: "2px solid rgba(20, 62, 91, 0.6)",
          boxShadow: "0 4px 20px rgba(20, 62, 91, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "blur(8px)",
        }}
      >
        <span style={{
          color: "rgba(255, 255, 255, 0.95)",
          fontWeight: "bold",
          fontSize: "13px",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}>
          Next.js
        </span>
      </div>

      {/* SQL - Pill shaped */}
      <div
        className="circle-morph circle-language"
        data-speed="6.4"
        data-direction="left"
        data-bounce-direction="right"
        style={{
          position: "absolute",
          top: "132.5vh",
          left: "55.8vw",
          width: "46px",
          height: "46px",
          borderRadius: "23px",
          background: "linear-gradient(135deg, rgba(246, 170, 16, 0.75) 0%, rgba(246, 170, 16, 0.35) 100%)",
          border: "2px solid rgba(246, 170, 16, 0.6)",
          boxShadow: "0 4px 20px rgba(246, 170, 16, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "blur(8px)",
        }}
      >
        <span style={{
          color: "rgba(255, 255, 255, 0.95)",
          fontWeight: "bold",
          fontSize: "13px",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}>
          SQL
        </span>
      </div>

      {/* PostgreSQL - Pill shaped */}
      <div
        className="circle-morph circle-language"
        data-speed="20.6"
        data-direction="right"
        data-bounce-direction="up"
        style={{
          position: "absolute",
          top: "20.3vh",
          left: "68.7vw",
          width: "58px",
          height: "58px",
          borderRadius: "29px",
          background: "linear-gradient(135deg, rgba(81, 178, 236, 0.75) 0%, rgba(81, 178, 236, 0.36) 100%)",
          border: "2px solid rgba(81, 178, 236, 0.6)",
          boxShadow: "0 4px 20px rgba(81, 178, 236, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "blur(8px)",
        }}
      >
        <span style={{
          color: "rgba(255, 255, 255, 0.95)",
          fontWeight: "bold",
          fontSize: "12px",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}>
          Postgres
        </span>
      </div>

      {/* Python - Pill shaped */}
      <div
        className="circle-morph circle-language"
        data-speed="12.3"
        data-direction="left"
        data-bounce-direction="down"
        style={{
          position: "absolute",
          top: "26.8vh",
          left: "44.2vw",
          width: "54px",
          height: "54px",
          borderRadius: "27px",
          background: "linear-gradient(135deg, rgba(20, 62, 91, 0.78) 0%, rgba(20, 62, 91, 0.37) 100%)",
          border: "2px solid rgba(20, 62, 91, 0.63)",
          boxShadow: "0 4px 20px rgba(20, 62, 91, 0.43), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "blur(8px)",
        }}
      >
        <span style={{
          color: "rgba(255, 255, 255, 0.95)",
          fontWeight: "bold",
          fontSize: "13px",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}>
          Python
        </span>
      </div>

      {/* Git - Pill shaped */}
      <div
        className="circle-morph circle-language"
        data-speed="5.7"
        data-direction="right"
        data-bounce-direction="left"
        style={{
          position: "absolute",
          top: "66.3vh",
          left: "22.8vw",
          width: "48px",
          height: "48px",
          borderRadius: "24px",
          background: "linear-gradient(135deg, rgba(246, 170, 16, 0.73) 0%, rgba(246, 170, 16, 0.33) 100%)",
          border: "2px solid rgba(246, 170, 16, 0.58)",
          boxShadow: "0 4px 20px rgba(246, 170, 16, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "blur(8px)",
        }}
      >
        <span style={{
          color: "rgba(255, 255, 255, 0.95)",
          fontWeight: "bold",
          fontSize: "13px",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}>
          Git
        </span>
      </div>

      {/* Docker - Pill shaped */}
      <div
        className="circle-morph circle-language"
        data-speed="4.8"
        data-direction="left"
        data-bounce-direction="right"
        style={{
          position: "absolute",
          top: "78.6vh",
          left: "58.4vw",
          width: "52px",
          height: "52px",
          borderRadius: "26px",
          background: "linear-gradient(135deg, rgba(81, 178, 236, 0.76) 0%, rgba(81, 178, 236, 0.35) 100%)",
          border: "2px solid rgba(81, 178, 236, 0.61)",
          boxShadow: "0 4px 20px rgba(81, 178, 236, 0.41), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "blur(8px)",
        }}
      >
        <span style={{
          color: "rgba(255, 255, 255, 0.95)",
          fontWeight: "bold",
          fontSize: "13px",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}>
          Docker
        </span>
      </div>

      {/* MongoDB - Pill shaped */}
      <div
        className="circle-morph circle-language"
        data-speed="6.2"
        data-direction="right"
        data-bounce-direction="up"
        style={{
          position: "absolute",
          top: "142.1vh",
          left: "76.5vw",
          width: "56px",
          height: "56px",
          borderRadius: "28px",
          background: "linear-gradient(135deg, rgba(20, 62, 91, 0.77) 0%, rgba(20, 62, 91, 0.36) 100%)",
          border: "2px solid rgba(20, 62, 91, 0.62)",
          boxShadow: "0 4px 20px rgba(20, 62, 91, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "blur(8px)",
        }}
      >
        <span style={{
          color: "rgba(255, 255, 255, 0.95)",
          fontWeight: "bold",
          fontSize: "12px",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}>
          MongoDB
        </span>
      </div>

      {/* Express - Pill shaped */}
      <div
        className="circle-morph circle-language"
        data-speed="5.4"
        data-direction="left"
        data-bounce-direction="down"
        style={{
          position: "absolute",
          top: "35.7vh",
          left: "31.2vw",
          width: "52px",
          height: "52px",
          borderRadius: "26px",
          background: "linear-gradient(135deg, rgba(246, 170, 16, 0.74) 0%, rgba(246, 170, 16, 0.34) 100%)",
          border: "2px solid rgba(246, 170, 16, 0.59)",
          boxShadow: "0 4px 20px rgba(246, 170, 16, 0.39), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "blur(8px)",
        }}
      >
        <span style={{
          color: "rgba(255, 255, 255, 0.95)",
          fontWeight: "bold",
          fontSize: "13px",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}>
          Express
        </span>
      </div>

      {/* GraphQL - Pill shaped */}
      <div
        className="circle-morph circle-language"
        data-speed="4.9"
        data-direction="right"
        data-bounce-direction="left"
        style={{
          position: "absolute",
          top: "150.4vh",
          left: "28.9vw",
          width: "54px",
          height: "54px",
          borderRadius: "27px",
          background: "linear-gradient(135deg, rgba(81, 178, 236, 0.75) 0%, rgba(81, 178, 236, 0.35) 100%)",
          border: "2px solid rgba(81, 178, 236, 0.6)",
          boxShadow: "0 4px 20px rgba(81, 178, 236, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "blur(8px)",
        }}
      >
        <span style={{
          color: "rgba(255, 255, 255, 0.95)",
          fontWeight: "bold",
          fontSize: "12px",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}>
          GraphQL
        </span>
      </div>

      {/* REST API - Pill shaped */}
      <div
        className="circle-morph circle-language"
        data-speed="5.6"
        data-direction="left"
        data-bounce-direction="right"
        style={{
          position: "absolute",
          top: "62.8vh",
          left: "8.3vw",
          width: "54px",
          height: "54px",
          borderRadius: "27px",
          background: "linear-gradient(135deg, rgba(20, 62, 91, 0.76) 0%, rgba(20, 62, 91, 0.36) 100%)",
          border: "2px solid rgba(20, 62, 91, 0.61)",
          boxShadow: "0 4px 20px rgba(20, 62, 91, 0.41), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "blur(8px)",
        }}
      >
        <span style={{
          color: "rgba(255, 255, 255, 0.95)",
          fontWeight: "bold",
          fontSize: "12px",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}>
          REST API
        </span>
      </div>

      {/* AWS - Pill shaped */}
      <div
        className="circle-morph circle-language"
        data-speed="6.0"
        data-direction="right"
        data-bounce-direction="up"
        style={{
          position: "absolute",
          top: "122.9vh",
          left: "83.7vw",
          width: "50px",
          height: "50px",
          borderRadius: "25px",
          background: "linear-gradient(135deg, rgba(246, 170, 16, 0.76) 0%, rgba(246, 170, 16, 0.36) 100%)",
          border: "2px solid rgba(246, 170, 16, 0.61)",
          boxShadow: "0 4px 20px rgba(246, 170, 16, 0.41), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "blur(8px)",
        }}
      >
        <span style={{
          color: "rgba(255, 255, 255, 0.95)",
          fontWeight: "bold",
          fontSize: "13px",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}>
          AWS
        </span>
      </div>

    </div>
  );
}
