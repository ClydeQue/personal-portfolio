import React from 'react'

const Project5 = () => {
  return (
    <>
      {/* Project Image */}
      <div className="w-full lg:w-2/5 flex items-center justify-center">
        <div className="relative w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[500px] mx-auto">
          <div className="absolute -inset-2.5 border border-[#F6AA10]/30 rounded-lg hidden md:block"></div>
          <div className="absolute -inset-1.5 border border-[#F6AA10]/50 rounded-lg hidden md:block"></div>
          <img 
            src="/images/feud.png" 
            alt="OrSem 2025 Family Feud Game" 
            className="relative w-full aspect-video object-cover rounded-lg shadow-2xl"
          />
        </div>
      </div>

      <div className="w-full lg:w-3/5 space-y-4 md:space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-[gotham] font-bold text-white">OrSem 2025 Family Feud Game</h2>
          
          <div className="flex items-center gap-2">
            <img src="/icons/clock.svg" alt="Clock" className="w-4 h-4 md:w-5 md:h-5" />
            <div className="text-gray-400 text-sm md:text-base">2025</div>
          </div>
          
          <div className="flex flex-wrap gap-2 md:gap-3">
            <span className="tech-pill">TypeScript</span>
            <span className="tech-pill">JavaScript</span>
            <span className="tech-pill">Next.js</span>
            <span className="tech-pill">PostgreSQL</span>
            <span className="tech-pill">TailwindCSS</span>
            <span className="tech-pill">Figma</span>
            <span className="tech-pill">Vercel</span>
          </div>
        </div>

        <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
          A TypeScript-based Family Feud web app built for OrSem 2025 at Ateneo de Zamboanga University. My senior in Computer Science led the development and I assisted in its implementation. Built with Next.js and PostgreSQL, it features two synchronized interfaces: a main game display and a controller view that lets the game master manage questions, reveal answers, and update scores in real time.
        </p>
      </div>
    </>
  )
}

export default Project5
