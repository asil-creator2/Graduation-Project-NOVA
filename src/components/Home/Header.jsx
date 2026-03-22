
const Header = () => {
  return (
    <div>
        <section className="relative py-12 md:py-20 overflow-hidden bg-linear-to-br from-slate-50 via-white to-blue-50">
          <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-64 md:w-96 h-64 md:h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-sm mb-6 border border-gray-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-xs sm:text-sm font-medium text-gray-600">✨ Limited Edition Drop</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 md:mb-6 px-2">
                Discover <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Products</span><br />
                <span className="text-gray-900">That Define You</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
                Curated collection of premium products designed for the modern lifestyle. Quality meets innovation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <button className="group bg-linear-to-r from-blue-600 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                  Explore Collection
                  <svg className="inline-block ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button className="border-2 border-gray-300 hover:border-blue-400 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg text-sm sm:text-base">
                  Watch Demo
                </button>
              </div>
              
              {/* Stats - Responsive */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-200/50 px-4">
                {[
                  { value: '500+', label: 'Premium Products' },
                  { value: '50k+', label: 'Happy Customers' },
                  { value: '24/7', label: 'Support' },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Header
