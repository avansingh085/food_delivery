import React from 'react';
const BeksPizza = () => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 items-center justify-center h-[500px] bg-amber-600  w-full "
     
    >
      <div className="h-full w-full text-center px-6 md:px-12 ">
        <div className="w-full flex items-center justify-center mt-20">
          <div className="text-5xl font-extrabold text-white drop-shadow-lg">
            Beks Pizza
          </div>
          <img
            src="/../public/pizzalogo.jpg"
            alt="Beks Pizza Logo"
            className="w-24 h-24 rounded-full ml-10 border-4 border-white shadow-lg"
          />
        </div>

        <p className="text-white text-center  mt-6 text-lg md:text-2xl leading-relaxed drop-shadow-md">
          India's Highest Rated Pizza Delivery Chain. Known for Pizzas with 2X
          Toppings.
        </p>
      </div>
      <div className="hidden md:block h-full bg-gradient-to-r  opacity-60 rounded-lg"></div>
    </div>
  );
};

export default BeksPizza;
