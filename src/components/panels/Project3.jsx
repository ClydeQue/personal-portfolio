import React from 'react'

const Project3 = () => {
  return (
    <>

            {/* Project Image */}
             <div className="w-full md:w-2/5 flex items-center justify-center">
                <div className="relative w-full">
                  <div className="absolute -inset-2.5 border border-[#F6AA10]/30 rounded-lg hidden md:block"></div>
                  <div className="absolute -inset-1.5 border border-[#F6AA10]/50 rounded-lg hidden md:block"></div>
                  <img 
                    src="/images/feud.png" 
                    alt="OrSem 2025 Family Feud Game" 
                    className="relative w-full md:w-[500px] h-[200px] md:h-[300px] object-cover rounded-lg shadow-2xl"
                  />
                </div>
              </div>


             <div className="w-full md:w-3/5 space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-[gotham] font-bold text-white">OrSem 2025 Family Feud Game</h2>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">TypeScript</span>
                    <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">JavaScript</span>
                    <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">Next.js</span>
                    <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">PostgreSQL</span>
                    <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">TailwindCSS</span>
                    <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">Figma</span>
                    <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">Vercel</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-gray-400 text-sm md:text-base">2025</div>
                </div>

                <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
                  For the Orientation Seminar (OrSem) 2025, my senior in Computer Science led the development of a Family Feud–style web application, and I assisted in its implementation. The project began with layouts and prototypes in Figma, which guided the overall design before we moved into development. Using Next.js and a PostgreSQL database, we built a system with two synchronized interfaces: a main game window for participants and the audience, and a controller view for the game master to manage questions, reveal answers, and update scores in real time. My contributions focused on the frontend and integration work, helping transform the initial designs into a functional and engaging platform that brought excitement to the OrSem 2025 program at Ateneo de Zamboanga University.
                </p>

                <div className="flex gap-3 md:gap-4">
                  <a href="#" className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-[#F6AA10] text-black font-bold rounded-xl hover:bg-[#F6AA10]/90 transition-colors">
                    View Project
                  </a>
                  <a href="#" className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
                    View Github
                  </a>
                </div>
              </div>

              
    </>
  )
}

export default Project3