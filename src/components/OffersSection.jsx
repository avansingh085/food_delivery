import React from "react";

const OffersSection = () => {
  const data = [
    { offer: "50% off on all pizzas", image: "/pizzalogo.jpg" },
    { offer: "Buy 1 Get 1 Free", image: "/pizzalogo.jpg" },
    { offer: "Free Delivery on orders above $20", image: "/pizzalogo.jpg" },
    { offer: "20% off on first order", image: "/pizzalogo.jpg" },
    { offer: "50% off on all pizzas", image: "/pizzalogo.jpg" },
    { offer: "Buy 1 Get 1 Free", image: "/pizzalogo.jpg" },
    { offer: "Free Delivery on orders above $20", image: "/pizzalogo.jpg" },
    { offer: "20% off on first order", image: "/pizzalogo.jpg" },
  ];

  // Premium gradient combinations
  const colorCombinations = [
    "bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700",
    "bg-gradient-to-br from-red-500 via-red-600 to-red-700",
    "bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700",
    "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700",
    "bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700",
    "bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700",
    "bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700",
    "bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700",
  ];

  return (
    <div className="relative w-full mt-8 mb-12 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-transparent via-gray-100/30 to-transparent"></div>
      </div>
      
      <div className="w-full">
        <div className="flex items-center justify-between mb-6 px-6">
          <h2 className="text-3xl font-bold text-gray-900">Exclusive Offers</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Scroll to explore</span>
            <svg className="w-5 h-5 text-amber-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <div className="relative w-full">
          {/* Cards container - full width with no side padding */}
          <div className="flex w-full overflow-x-auto gap-6 scroll-smooth snap-x snap-mandatory hide-scrollbar pb-8 pl-6">
            {data.map((item, index) => {
              const colorClass = colorCombinations[index % colorCombinations.length];
              
              return (
                <div
                  key={index}
                  className={`relative flex h-44 w-80 flex-shrink-0 rounded-2xl overflow-hidden snap-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${colorClass}`}
                >
                  {/* Pattern overlay */}
                  <div className={`absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzYgMzRINmEyIDIgMCAwMS0yLTJWNmEyIDIgMCAwMTItMmgzMGEyIDIgMCAwMTIgMnYyNnptMCAySDZhMiAyIDAgMDAtMiAydjI2YTIgMiAwIDAwMiAyaDMwYTIgMiAwIDAwMi0yVjM2eiIvPjwvZz48L2c+PC9zdmc+')]`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-between p-6 w-full h-full">
                    <div>
                      <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-white bg-black/20 rounded-full backdrop-blur-sm">
                        LIMITED TIME
                      </span>
                      <h3 className="text-xl font-bold text-white leading-tight">
                        {item.offer}
                      </h3>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <img 
                        src={item.image} 
                        alt={item.offer} 
                        className="h-14 w-14 rounded-full object-cover border-2 border-white/80 shadow-lg" 
                        loading="lazy" 
                      />
                      <button className="px-5 py-2 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-full text-sm shadow-lg transition-all duration-200 hover:scale-105">
                        Claim Offer →
                      </button>
                    </div>
                  </div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 rotate-45 bg-white/10 origin-bottom-left"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersSection;