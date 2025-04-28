
import React,{useState}from 'react'
const pizzaItems = [
    "Margherita",
    "Farmhouse",
    "Paneer Tikka",
    "Veggie Supreme",
    "Pepperoni Feast",
    "BBQ Chicken",
    "Mexican Green Wave",
    "Deluxe Veggie",
    "Cheese Burst",
    "Peri Peri Chicken",
    "Tandoori Paneer",
    "Mushroom Magic",
    "Chicken Dominator",
    "Golden Corn Delight",
    "Double Cheese Margherita",
    "Spicy Triple Tango",
    "Veg Extravaganza",
    "Chicken Fiesta",
    "Indi Tandoori Paneer",
    "Veggie Paradise",
  ];
  
  const BeksPizzaMenu = () => {
    const [isShowMenu,setShowMenu]=useState(false);
    return (
        <div className="w-full text-center">
            <button className="bg-orange-400 hover:bg-white hover:text-black border-2 h-16 w-52 rounded-lg self-center font-semibold text-2xl text-white" onClick={()=>setShowMenu((pre)=>!pre)}>Show Menu </button>
    {
        isShowMenu&&
      <div className="w-11/12 max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 py-10">
        {pizzaItems.map((item, idx) => (
          <button 
            key={idx}
            className=" bg-lime-500 hover:bg-lime-700 text-white font-bold text-lg sm:text-xl py-4 px-6 rounded-xl shadow-lg transition-all duration-300" 
          onClick={()=>setShowMenu((pre)=>!pre)}>
            {item}
          </button>
        ))}
      </div>
  }
      </div>
    );
  };
  
  export default BeksPizzaMenu;
  