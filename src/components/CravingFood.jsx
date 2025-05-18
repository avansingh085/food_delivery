import React, { useRef } from "react";

const pizzaItems = [
  { id: 1, name: "Margherita", image: "https://www.recipetineats.com/tachyon/2023/05/Garlic-cheese-pizza_9.jpg" },
  { id: 2, name: "Pepperoni", image: "https://www.recipetineats.com/tachyon/2023/05/Garlic-cheese-pizza_9.jpg" },
  { id: 3, name: "Vegetarian", image: "https://www.recipetineats.com/tachyon/2023/05/Garlic-cheese-pizza_9.jpg" },
  { id: 4, name: "BBQ Chicken", image: "https://www.recipetineats.com/tachyon/2023/05/Garlic-cheese-pizza_9.jpg" },
  { id: 5, name: "Hawaiian", image: "https://www.recipetineats.com/tachyon/2023/05/Garlic-cheese-pizza_9.jpg" },
  { id: 6, name: "Cheese", image: "https://www.recipetineats.com/tachyon/2023/05/Garlic-cheese-pizza_9.jpg" },
  { id: 7, name: "Seafood", image: "https://www.recipetineats.com/tachyon/2023/05/Garlic-cheese-pizza_9.jpg" },
  { id: 8, name: "Supreme", image: "https://www.recipetineats.com/tachyon/2023/05/Garlic-cheese-pizza_9.jpg" },
  { id: 1, name: "Margherita", image: "https://www.recipetineats.com/tachyon/2023/05/Garlic-cheese-pizza_9.jpg" },
  { id: 2, name: "Pepperoni", image: "https://www.recipetineats.com/tachyon/2023/05/Garlic-cheese-pizza_9.jpg" },
  { id: 3, name: "Vegetarian", image: "https://www.recipetineats.com/tachyon/2023/05/Garlic-cheese-pizza_9.jpg" },
  { id: 4, name: "BBQ Chicken", image: "https://www.recipetineats.com/tachyon/2023/05/Garlic-cheese-pizza_9.jpg" },
  { id: 5, name: "Hawaiian", image: "https://www.recipetineats.com/tachyon/2023/05/Garlic-cheese-pizza_9.jpg" },
  { id: 6, name: "Cheese", image: "https://www.recipetineats.com/tachyon/2023/05/Garlic-cheese-pizza_9.jpg" },
  { id: 7, name: "Seafood",image: "https://www.recipetineats.com/tachyon/2023/05/Garlic-cheese-pizza_9.jpg" },
  { id: 8, name: "Supreme", image: "https://www.recipetineats.com/tachyon/2023/05/Garlic-cheese-pizza_9.jpg" },
];

function CravingFood() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 bg-white shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Craving Food
      </h2>
      
      <div className="relative group">
      
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-gray-50 rounded-full shadow-lg hidden md:flex items-center justify-center transition-all duration-300 border border-gray-200"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-gray-50 rounded-full shadow-lg hidden md:flex items-center justify-center transition-all duration-300 border border-gray-200"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory space-x-4
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            px-2 pb-4"
        >
          {pizzaItems.map((pizza, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center w-40 md:w-48 p-4 
                bg-white shadow-sm rounded-lg transform transition-all duration-200 
                hover:shadow-md hover:-translate-y-1 border border-gray-100 snap-center flex-shrink-0"
            >
              <div className="relative mb-3">
                <img
                  src={pizza.image}
                  alt={pizza.name}
                  className="w-24 md:w-28 h-24 md:h-28 rounded-lg object-cover 
                    shadow-sm transition-all duration-200 hover:rounded-xl"
                />
              </div>
              <span className="text-center text-sm font-medium text-gray-700">
                {pizza.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CravingFood;