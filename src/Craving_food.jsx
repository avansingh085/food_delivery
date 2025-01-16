import React from 'react';

const pizzaItems = [
  { id: 1, name: "Margherita", image: "https://via.placeholder.com/200x200/FF5733/fff?text=Pizza+1" },
  { id: 2, name: "Pepperoni", image: "https://via.placeholder.com/200x200/33A1FF/fff?text=Pizza+2" },
  { id: 3, name: "Vegetarian", image: "https://via.placeholder.com/200x200/33FF57/fff?text=Pizza+3" },
  { id: 4, name: "BBQ Chicken", image: "https://via.placeholder.com/200x200/FFC300/fff?text=Pizza+4" },
  { id: 5, name: "Hawaiian", image: "https://via.placeholder.com/200x200/DAF7A6/fff?text=Pizza+5" },
  { id: 6, name: "Cheese", image: "https://via.placeholder.com/200x200/581845/fff?text=Pizza+6" },
  { id: 7, name: "Seafood", image: "https://via.placeholder.com/200x200/900C3F/fff?text=Pizza+7" },
  { id: 8, name: "Supreme", image: "https://via.placeholder.com/200x200/9C27B0/fff?text=Pizza+8" },
   { id: 1, name: "Margherita", image: "https://via.placeholder.com/200x200/FF5733/fff?text=Pizza+1" },
  { id: 2, name: "Pepperoni", image: "https://via.placeholder.com/200x200/33A1FF/fff?text=Pizza+2" },
  { id: 3, name: "Vegetarian", image: "https://via.placeholder.com/200x200/33FF57/fff?text=Pizza+3" },
  { id: 4, name: "BBQ Chicken", image: "https://via.placeholder.com/200x200/FFC300/fff?text=Pizza+4" },
  { id: 5, name: "Hawaiian", image: "https://via.placeholder.com/200x200/DAF7A6/fff?text=Pizza+5" },
  { id: 6, name: "Cheese", image: "https://via.placeholder.com/200x200/581845/fff?text=Pizza+6" },
  { id: 7, name: "Seafood", image: "https://via.placeholder.com/200x200/900C3F/fff?text=Pizza+7" },
  { id: 8, name: "Supreme", image: "https://via.placeholder.com/200x200/9C27B0/fff?text=Pizza+8" },
];

function Craving_food() {
  return (
    <div className="container mx-auto px-4 py-10 mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        What are you craving for?
      </h2>

      {/* Horizontal scrollable container */}
      <div className="relative">
        <div className="flex overflow-x-auto space-x-6 hide-scroll-bar">
          {pizzaItems.map((pizza) => (
            <div
              key={pizza.id}
              className="flex flex-col items-center justify-center min-w-[150px] p-4 bg-white shadow-md rounded-xl transform transition-transform hover:scale-105"
            >
              {/* Pizza Image */}
              <img
                src={pizza.image}
                alt={pizza.name}
                className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-gray-300 shadow-sm"
              />
              {/* Pizza Name */}
              <span className="text-center text-lg font-semibold text-gray-700">
                {pizza.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Craving_food;
