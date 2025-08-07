import React, { useRef } from 'react';
import FoodItemCard from './FoodItemCard';
import { Link } from 'react-router-dom';

const FoodCategorySection = ({ category, itemIdsInCart, handleAddToCart, setSelectedItem }) => {
  const scrollContainerRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    } else if (e.key === 'ArrowRight') {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <section
      key={category.name}
      className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden"
      role="region"
      aria-label={`Category: ${category.name}`}
    >
      <div className="px-4 py-3 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">
          {category.name}
        </h2>
      </div>
      <div className="relative px-0 py-3">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 scroll-smooth snap-x snap-mandatory hide-scrollbar pb-4 pl-4"
          tabIndex={0}
          role="group"
          aria-label={`Scrollable items for ${category.name}`}
          onKeyDown={handleKeyDown}
        >
          {category.items.map((item) => (
            <FoodItemCard
              key={item._id}
              item={item}
              itemIdsInCart={itemIdsInCart}
              handleAddToCart={handleAddToCart}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </div>
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-md opacity-90 hover:opacity-100 hidden sm:block"
          onClick={() => scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })}
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-md opacity-90 hover:opacity-100 hidden sm:block"
          onClick={() => scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })}
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default FoodCategorySection;