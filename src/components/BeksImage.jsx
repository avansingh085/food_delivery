import React, { useState, useEffect } from 'react';
import { FaPizzaSlice, FaArrowRight } from 'react-icons/fa';

const BeksPizza = () => {
  // Sample pizza images (replace with your actual image paths)
  const pizzaImages = [
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1571066811602-716837d681de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === pizzaImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [pizzaImages.length]);

  return (
    <div className="relative w-full h-[400px] md:h-[550px] overflow-hidden">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        {pizzaImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Pizza ${index + 1}`}
            className={`absolute w-full h-full object-cover object-center transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
      
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Content container */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-24">
        {/* Tagline */}
        <span className="text-white text-sm md:text-lg font-semibold mb-2 flex items-center">
          <FaPizzaSlice className="mr-2 text-yellow-400" />
          Authentic Italian Taste
        </span>
        
        {/* Main heading */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Crafted With <span className="text-yellow-400">Passion</span>
        </h1>
        
        {/* Subheading */}
        <p className="text-white text-sm md:text-lg max-w-md mb-6">
          Hand-tossed dough, fresh ingredients, and traditional recipes since 1995
        </p>
        
        {/* CTA Button */}
        <button className="flex items-center justify-center w-fit bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
          Order Now <FaArrowRight className="ml-2" />
        </button>
        
        {/* Special offer badge */}
        <div className="absolute bottom-6 right-6 bg-white text-red-600 px-4 py-2 rounded-full shadow-lg font-bold animate-bounce">
          20% OFF First Order
        </div>
      </div>
    </div>
  );
};

export default BeksPizza;