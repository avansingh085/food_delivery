import React, { useState, useEffect } from "react";

const OffersSection = () => {
     const data=[
        {offer:"50% off on all pizzas", image:"/pizzalogo.jpg"},
        {offer:"Buy 1 Get 1 Free", image:"/pizzalogo.jpg"},
        {offer:"Free Delivery on orders above $20", image:"/pizzalogo.jpg"},
        {offer:"20% off on first order", image:"/pizzalogo.jpg"},
    ]

    return(
        <div className=" px-6 bg-white max-w-screen-sm mt-2 h-28 flex overflow-x-scroll gap-4 scroll-smooth snap-x snap-mandatory hide-scrollbar">
            {
                data.map((item, index) => (
                    <div key={index} className=" items-center justify-center rounded-xl flex h-20 w-80 sm:w-56 md:w-72 flex-shrink-0 bg-pink-600 overflow-hidden mt-4 snap-center">
                        <img src={item.image} alt={item.offer} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                        <div className="p-4">
                            <h3 className="text-base font-medium text-gray-800">{item.offer}</h3>
                        </div>
                    </div>
                ))
            }
        </div>
    )


}
export default OffersSection;