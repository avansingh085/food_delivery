import React, { useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
     import { motion } from 'framer-motion';

const pizzaItems = [
  { name: "Margherita", image: "https://images.unsplash.com/photo-1571066811602-716837d681de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { name: "Pepperoni", image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { name: "BBQ Chicken", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { name: "Veggie", image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { name: "Hawaiian", image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { name: "Meat Lovers", image: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { name: "Buffalo", image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { name: "Truffle", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
];

const BeksPizzaMenu = () => {
  const [visibleItems, setVisibleItems] = useState(4); // Default to 4 items
  const containerRef = useRef(null);
  const itemRef = useRef(null);

  // Calculate visible items based on container width
  const updateVisibleItems = () => {
    if (containerRef.current && itemRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const itemWidth = itemRef.current.offsetWidth;
      const newVisibleItems = Math.floor(containerWidth / (itemWidth + 32)); // 32px for gap
      setVisibleItems(Math.min(Math.max(newVisibleItems, 1), 5)); // Clamp between 1-5
    }
  };

  // Initialize and handle resize
  React.useEffect(() => {
    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -containerRef.current.offsetWidth : containerRef.current.offsetWidth;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-screen mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Our Pizza Selection</h2>
      
      <div className="relative">
        {/* Left Arrow - Only show if there's more to scroll */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition -ml-4"
        >
          <FaChevronLeft className="text-gray-700 text-xl" />
        </button>

        {/* Carousel Container */}
        <div 
          ref={containerRef}
          className="flex w-screen hide-scrollbar overflow-x-auto scrollbar-hide space-x-8 py-4 px-2"
          style={{ scrollSnapType: 'x mandatory' }}
        >
    

{pizzaItems.map((item, index) => (
  <motion.div 
    key={index}
    ref={index === 0 ? itemRef : null}
    className="flex-shrink-0 w-64"
    style={{ scrollSnapAlign: 'start' }}
    whileHover={{ 
      y: -12,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 10 
      } 
    }}
  >
    <div className="flex flex-col items-center">
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-lg"
        />
      </motion.div>
      <motion.p 
        className="mt-4 text-lg font-semibold text-gray-800 text-center"
        whileHover={{ color: "#1f2937" }} // Slightly darker on hover
      >
        {item.name}
      </motion.p>
    </div>
  </motion.div>
))}
        </div>

        {/* Right Arrow - Only show if there's more to scroll */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition  mr-5"
        >
          <FaChevronRight className="text-gray-700 text-xl" />
        </button>
      </div>
    </div>
  );
};

export default BeksPizzaMenu;