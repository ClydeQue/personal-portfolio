import React from 'react'

const Project2 = () => {
  return (
    <>

            {/* Project Image */}
             <div className="w-2/5 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-2.5 border border-[#F6AA10]/30 rounded-lg"></div>
                  <div className="absolute -inset-1.5 border border-[#F6AA10]/50 rounded-lg"></div>
                  <img 
                    src="/images/leo.png" 
                    alt="Leo Rent A Car PH Website" 
                    className="relative w-[500px] h-[300px] object-cover rounded-lg shadow-2xl"
                  />
                </div>
              </div>


             <div className="w-3/5 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-6xl font-[gotham] font-bold text-white">LeoRentACar</h2>
                  <div className="flex gap-3">
                    <span className="text-sm px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">React</span>
                    <span className="text-sm px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">Vite</span>
                    <span className="text-sm px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">TailwindCSS</span>
                    <span className="text-sm px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">Vercel</span>
                    <span className="text-sm px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">Responsive Design</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-gray-400">June 2025 - July 2025</div>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed">
                  I designed, developed, and deployed www.leorentacarph.com, an informative website for a car rental business. Built with React and modern web tools, the site features a clean and responsive design, intuitive navigation, and clear service information to connect customers with the business easily. I deployed it on Vercel, ensuring fast performance and reliable hosting. This project allowed me to apply my frontend development skills, practice deployment workflows, and deliver a real-world solution for my client.
                </p>

                <div className="flex gap-4">
                  <a href="https://www.leorentacarph.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#F6AA10] text-black font-bold rounded-xl hover:bg-[#F6AA10]/90 transition-colors">
                    View Project
                  </a>
                  <a href="#" className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
                    View Github
                  </a>
                </div>
              </div>

              
    </>
  )
}

export default Project2