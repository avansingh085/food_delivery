import React from "react";

const pizzaItems = [
  { name: "Single Topping" },
  { name: "Our Favorite Pizza" },
  { name: "Beks Burger" },
  { name: "Combo (Cheat Meal)" },
];

const BeksPizzaMenu = () => {
  return (
    <div className="w-full  bg-white grid md:grid-cols-4 grid-cols-2  text-bold text-2xl text-center items-center justify-center ">
    
        {pizzaItems.map((item, index) => (
          <div
            key={index}
            className="w-full grid items-center justify-center h-full mt-4 mb-4"
          >
            <img
              src="/pizzalogo.jpg"
              alt="Pizza"
              className="w-44 h-44 rounded-full "
            />
            <p className="text-lg mt-3 font-semibold text-gray-800">
              {item.name}
            </p>
          </div>
        ))}
      
    </div>
  );
};

export default BeksPizzaMenu;
