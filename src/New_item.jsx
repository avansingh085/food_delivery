import React, { useRef } from 'react';

const items = [
    { id: 4, name: "Pizza BBQ Chicken", image: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg" },
    { id: 5, name: "Pizza Hawaiian", image: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg" },
    { id: 6, name: "Pizza Cheese",  image: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg" },
    { id: 7, name: "Pizza Seafood", image: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg" },
    { id: 8, name: "Pizza Supreme", image: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg"},
  
    { id: 4, name: "Pizza BBQ Chicken", image: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg" },
    { id: 5, name: "Pizza Hawaiian", image: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg" },
    { id: 6, name: "Pizza Cheese", image: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg" },
    { id: 7, name: "Pizza Seafood", image: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg" },
    { id: 8, name: "Pizza Supreme", image: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg"},
   { id: 4, name: "Pizza BBQ Chicken", image: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg" },
  { id: 5, name: "Pizza Hawaiian", image: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg" },
  { id: 6, name: "Pizza Cheese", image: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg" },
  { id: 7, name: "Pizza Seafood", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 8, name: "Pizza Supreme", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg"},
{ id: 4, name: "Pizza BBQ Chicken", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 5, name: "Pizza Hawaiian", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 6, name: "Pizza Cheese", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 7, name: "Pizza Seafood", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 8, name: "Pizza Supreme", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg"},
  { id: 4, name: "Pizza BBQ Chicken", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 5, name: "Pizza Hawaiian", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 6, name: "Pizza Cheese", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 7, name: "Pizza Seafood", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 8, name: "Pizza Supreme", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg"},
];


const FullWidthSlider = () => {
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
    <div className="relative w-full bg-gray-50 py-8">
      <h2 className="text-center text-3xl font-serif mb-6 text-gray-800">
        What's New
      </h2>
      
      <div className="relative group">
        {/* Navigation Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 hover:bg-white rounded-full shadow-md hidden md:flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 hover:bg-white rounded-full shadow-md hidden md:flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory space-x-4 px-4 pb-4
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-64 md:w-72 lg:w-80 bg-white rounded-xl shadow-sm
                transition-all duration-300 hover:shadow-lg hover:-translate-y-1 snap-center
                border border-gray-100 overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover transition-all duration-300 hover:scale-105"
              />
              <div className="p-4 text-center">
                <span className="font-medium text-gray-800 text-lg">{item.name}</span>
                {item.price && (
                  <p className="text-gray-600 mt-2 font-medium">${item.price}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullWidthSlider;