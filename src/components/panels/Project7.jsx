import React from 'react'

const Project7 = () => {
  return (
    <>
      {/* Project Placeholder - No Image */}
      <div className="w-full lg:w-2/5 flex flex-col items-center justify-center gap-4">
        <div className="relative w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[500px] mx-auto">
          <div className="absolute -inset-2.5 border border-[#7BB3D3]/30 rounded-lg hidden md:block"></div>
          <div className="absolute -inset-1.5 border border-[#7BB3D3]/50 rounded-lg hidden md:block"></div>
          
          <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-2xl bg-[#021019] border border-white/10 flex items-center justify-center">
            <div className="text-center p-6">
              <svg className="w-16 h-16 mx-auto mb-4 text-[#7BB3D3]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <p className="text-gray-500 font-[gotham] text-sm">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-3/5 space-y-4 md:space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-[gotham] font-bold text-white">Mujer LGBTQ+</h2>
          
          <div className="flex items-center gap-2">
            <img src="/icons/clock.svg" alt="Clock" className="w-4 h-4 md:w-5 md:h-5" />
            <div className="text-gray-400 text-sm md:text-base">September 2024 - November 2024</div>
          </div>
          
          <div className="flex flex-wrap gap-2 md:gap-3">
            <span className="tech-pill">React</span>
            <span className="tech-pill">TailwindCSS</span>
          </div>
        </div>

        <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
          Will code this soon.
        </p>

       <div className="flex gap-3 md:gap-4">
          <a href="https://mujer-lgbt-zc.vercel.app" target='_blank' className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-[#F6AA10] text-black font-bold rounded-xl hover:bg-[#F6AA10]/90 transition-colors cursor-pointer">
            Live Website
          </a>
          <a href="https://github.com/ClydeQue/MujerLGBT-ZC" target='_blank' className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2 cursor-pointer">
            View Github
            <img src="/icons/arrowdiagonal.svg" alt="External link" className="w-3 h-3 md:w-4 md:h-4" />
          </a>
        </div>
      </div>
    </>
  )
}

export default Project7
