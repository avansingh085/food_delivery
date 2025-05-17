
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
const Bottom_NavBar = () => {
  const [cartCount, setCartCount] = useState(0);
   const {cart}=useSelector((state)=>state.user);
   const {menu}=useSelector((state)=>state.menu);
  
   useEffect(()=>{
    setCartCount(cart?.length);
   },[cart])
  return (
    <div className="flex flex-col min-h-fit bg-gray-100 z-50">
     

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <div className="flex justify-around items-center py-3">
        
         <Link to="/Cart">
          <button className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.2 5M17 13l1.2 5M9 21h6M9 17h6"
              />
            </svg>
           <span className="text-sm text-gray-600">Cart</span>
          </button>
           </Link>
         
          <div className="text-center">
            <span className="text-lg  font-bold text-gray-800">{cartCount}</span>
            <p className="text-sm text-gray-600">Items</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bottom_NavBar;
