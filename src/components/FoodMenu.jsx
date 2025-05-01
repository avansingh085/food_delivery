import React, { useState, useEffect, useCallback, useMemo,useRef } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../redux/globSlice";
import axiosInstance from "../utils/axiosInstance";
import FoodDetailPage from "../pages/ItemExplo";
import axios from "axios";
import BeksPizzaMenu from "./BeksPizzaMenu";
import OffersSection from "./OffersSection";

const ITEMS_PER_PAGE = 20;
let val;
const FoodMenu = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuData, setMenuData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { User, cart } = useSelector((state) => state.Data);
  const { deliveryLocation } = useSelector((state) => state.Data);
  const [itemId, setItemId] = useState();
  const dispatch = useDispatch();

  const [customization, setCustomization] = useState({
    sugar: 0,
    size: "Medium",
    crust: "Classic",
    extraCheese: false,
  });
  const scrollContainerRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    } else if (e.key === 'ArrowRight') {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };
  const fetchCartData = async () => {
    try {
      const res = await axiosInstance.get(`/getCart`);
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (err) {
      console.error("Error fetching cart data:", err);
    }
  };


  const itemIdsInCart = useMemo(() => {
    return cart?.map((c) => c.id._id);
  }, [cart]);



  useEffect(() => {
    const fetchMenuData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/getMenu`, {
          params: { page: currentPage, limit: ITEMS_PER_PAGE },
        });

        if (response.data.success) {
          setMenuData(prev => [...prev, ...response.data.items]);
          setTotalPages(response.data.totalPages);
          setError(null);
        }
      } catch (err) {
        setError("Failed to load menu. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuData();
  }, [currentPage]);


  const categories = menuData.reduce((acc, item) => {
    const category = acc.find(cat => cat.name === item.category);
    if (category) {
      category.items.push(item);
    } else {
      acc.push({ name: item.category, items: [item] });
    }
    return acc;
  }, []);


  const handleAddToCart = async (selectedItem) => {
    if (!selectedItem || isAddingToCart) return;

    setIsAddingToCart(true);
    try {
      await axiosInstance.post(`/addCart`, {
        mobile: User?.mobile,
        item: {
          ...selectedItem,
          customizationOptions: customization,
          deliveryLocation
        }
      });
      await fetchCartData();
      setSelectedItem(null);
    } catch (err) {
      setError("Failed to add item to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
      setCustomization({
        sugar: 0,
        size: "Medium",
        crust: "Classic",
        extraCheese: false,
      });
    }
  };


  return (
    <div className="bg-slate-200 w-screen overflow-hidden min-h-screen p-2 grid items-start justify-center">
      {/* <h1 className="text-xl font-bold text-gray-900 text-center mb-3 px-2">
        Explore Our Menu
      </h1> */}

      {error && (
        <div className="mx-2 mb-2 p-2 bg-red-50 text-red-700 rounded text-sm">
          {error}
        </div>
      )}
        
      <BeksPizzaMenu />
      <OffersSection/>
      <div className="mx-2 w-screen min-h-screen bg-gray-200" loading="lazy" >
        {categories.map((category) => (
         <section
         key={category.name}
         className="  mt-2 bg-white "
         role="region"
         aria-label={`Category: ${category.name}`}
       >
         <h2 className="text-lg ml-3 sm:text-xl font-semibold text-gray-900 mb-4 px-4 sm:px-0">
           {category.name}
         </h2>
         <div className="relative">
           <div
             ref={scrollContainerRef}
             className="flex w-full overflow-x-scroll gap-4 scroll-smooth snap-x snap-mandatory hide-scrollbar"
             tabIndex={0}
             role="group"
             aria-label={`Scrollable items for ${category.name}`}
             onKeyDown={handleKeyDown}
           >
             {category.items.map((item) => (
               <div
                 key={item._id}
                 className="bg-white ml-3  mb-5 h-64 w-64  md:w-72 md:h-72 lg:w-80  lg:h-80 flex-shrink-0 rounded-lg overflow-hidden mt-4 shadow-xl snap-center"
               >
                 {item.imageUrls?.[0] ? (
                   <div className="relative h-full w-full">
                     <Link
                       to={`/food/${item._id}`}
                       className="block relative aspect-square overflow-hidden"
                       aria-label={`View details for ${item.name}`}
                     >
                       <img
                         src={item.imageUrls[0]}
                         alt={item.name || 'Food item'}
                         className="w-full h-full object-cover"
                         loading="lazy"
                         onError={(e) => (e.target.src = '/fallback-image.jpg')}
                       />
                     </Link>
                     <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-950/80 to-transparent p-4 text-white">
                       <button
                         className="absolute top-4 right-0  px-3 py-1 bg-slate-500  text-sm rounded-l-lg border border-slate-500 hover:bg-slate-600"
                         onClick={() => setSelectedItem(item)}
                         aria-label={`Customize ${item.name}`}
                       >
                         Customise &gt;
                       </button>
                       <div className="flex items-center gap-2 mt-12">
                         <div className="w-5 h-5 border-2 border-green-600 bg-white flex items-center justify-center rounded-sm">
                           <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                         </div>
                         <h3 className="font-bold text-lg sm:text-xl">{item.name}</h3>
                       </div>
                       <p className="text-sm line-clamp-2">{item.description}</p>
                       <div className="grid grid-cols-2 items-center mt-4 border-t border-gray-300 pt-2">
                         <span className="text-xl sm:text-2xl font-semibold">
                           ₹{item.price}
                         </span>
                         <div className="flex justify-end">
                           <button
                             className={`px-4 py-2 font-bold text-lg sm:text-xl rounded-lg ${
                               itemIdsInCart?.includes(item._id)
                                 ? 'bg-white text-black border border-gray-300'
                                 : 'bg-red-600 text-white hover:bg-red-700'
                             }`}
                             onClick={(e) => handleAddToCart(item, e)}
                             aria-label={`Add ${item.name} to cart`}
                           >
                             Add +
                           </button>
                         </div>
                       </div>
                     </div>
                   </div>
                 ) : (
                   <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                     <span className="text-gray-400 text-sm">No Image Available</span>
                   </div>
                 )}
                 {item.offer && (
                   <div className="absolute top-2 right-2 bg-red-600 text-white text-xs sm:text-sm px-2 py-1 rounded">
                     {item.offer}% OFF
                   </div>
                 )}
               </div>
             ))}
           </div>
           {/* Navigation Arrows */}
           <button
             className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100 hidden sm:block"
             onClick={() =>
               scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
             }
             aria-label="Scroll left"
           >
             ←
           </button>
           <button
             className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100 hidden sm:block"
             onClick={() =>
               scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
             }
             aria-label="Scroll right"
           >
             →
           </button>
         </div>
       </section>
        ))}

        {(
          <div className="flex justify-center mb-20">
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={isLoading}
              className="px-4 h-16 font-extrabold text-2xl w-60 py-1.5 mt-5 bg-black text-white  rounded-lg disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
      {
        itemId && <FoodDetailPage itemId={itemId} setItemId={setItemId} />
      }
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
          <div className="bg-white rounded-lg w-full max-w-xs max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-2 border-b">
              <h3 className="text-sm font-medium">Customize {selectedItem.name}</h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-500 text-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-2 space-y-3">
              {selectedItem.category === 'Beverages' && (
                <div className="space-y-1">
                  <label className="block text-xs font-medium">Sugar Level</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={customization.sugar}
                    onChange={(e) => setCustomization(prev => ({
                      ...prev,
                      sugar: parseInt(e.target.value)
                    }))}
                    className="w-full h-1"
                  />
                  <span className="text-xs text-gray-500 block">
                    {customization.sugar}% Sugar
                  </span>
                </div>
              )}

              {selectedItem.category === 'Pizza' && (
                <>
                  <div className="space-y-1">
                    <label className="block text-xs font-medium">Crust Type</label>
                    <select
                      value={customization.crust}
                      onChange={(e) => setCustomization(prev => ({
                        ...prev,
                        crust: e.target.value
                      }))}
                      className="w-full p-1 text-xs border rounded"
                    >
                      {['Classic', 'Thin Crust', 'Stuffed Crust'].map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      checked={customization.extraCheese}
                      onChange={(e) => setCustomization(prev => ({
                        ...prev,
                        extraCheese: e.target.checked
                      }))}
                      className="h-3 w-3"
                    />
                    <label className="text-xs">Extra Cheese (+₹50)</label>
                  </div>
                </>
              )}

              <div className="space-y-1">
                <label className="block text-xs font-medium">Size</label>
                <div className="grid grid-cols-3 gap-1">
                  {['Small', 'Medium', 'Large'].map(size => (
                    <button
                      key={size}
                      onClick={() => setCustomization(prev => ({ ...prev, size }))}
                      className={`p-1 text-xs rounded ${customization.size === size
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full bg-indigo-600 text-white text-xs p-2 rounded-md disabled:opacity-50"
              >
                {isAddingToCart ? 'Adding...' : `Add to Cart - ₹${selectedItem.price}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodMenu;