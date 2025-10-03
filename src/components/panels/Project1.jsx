import React from 'react'

const Project1 = () => {
  return (
    <>

            {/* Project Image */}
             <div className="w-2/5 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-2.5 border border-[#F6AA10]/30 rounded-lg"></div>
                  <div className="absolute -inset-1.5 border border-[#F6AA10]/50 rounded-lg"></div>
                  <img 
                    src="/images/pos.png" 
                    alt="POS System Dashboard" 
                    className="relative w-[500px] h-[300px] object-cover rounded-lg shadow-2xl"
                  />
                </div>
              </div>


             <div className="w-3/5 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-6xl font-[gotham] font-bold text-white">Offline Point of Sale System</h2>
                  <div className="flex gap-3">
                    <span className="text-sm px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">Java</span>
                    <span className="text-sm px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">JavaFX</span>
                    <span className="text-sm px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">SceneBuilder</span>
                    <span className="text-sm px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">SQLite</span>
                    <span className="text-sm px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">Figma</span>
                    <span className="text-sm px-3 py-1 rounded-full bg-blue-900/30 text-blue-400">CSS</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-gray-400">May 2025 - August 2025</div>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed">
                  I built a custom offline POS system in Java for my client, a local mini grocery store in Zamboanga City. Their main challenge was keeping track of stock levels and sales transactions without relying on an internet connection. I designed and delivered a solution tailored to their daily operations, enabling them to easily manage inventory, monitor product movement, and streamline checkout.
                </p>

                <div className="flex gap-4">
                  <a href="#" className="px-6 py-3 bg-[#F6AA10] text-black font-bold rounded-xl hover:bg-[#F6AA10]/90 transition-colors">
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

export default Project1