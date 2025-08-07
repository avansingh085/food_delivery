import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../redux/userSlice";
import axiosInstance from "../utils/axiosInstance";
import FoodDetailPage from "../pages/ItemExplo";
import BeksPizzaMenu from "./FoodCateg";
import OffersSection from "./OffersSection";
import { setFoodData } from "../redux/menuSlice";

const ITEMS_PER_PAGE = 20;

const FoodMenu = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { user, cart, deliveryLocation } = useSelector((state) => state.user);
  const { menu } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  const [customization, setCustomization] = useState({
    sugar: 50,
    size: "Medium",
    crust: "Classic",
    extraCheese: false,
  });

  const itemIdsInCart = useMemo(() => {
    return cart?.map((c) => c.id._id);
  }, [cart]);

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

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
        !isLoading
      ) {
        setCurrentPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  useEffect(() => {
    const fetchMenuData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/getMenu`, {
          params: { page: currentPage, limit: ITEMS_PER_PAGE },
        });

        if (response.data.success) {
          dispatch(setFoodData([...menu, ...response.data.items]));
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

  const categories = useMemo(() => {
    return menu.reduce((acc, item) => {
      const category = acc.find(cat => cat.name === item.category);
      if (category) {
        category.items.push(item);
      } else {
        acc.push({ name: item.category, items: [item] });
      }
      return acc;
    }, []);
  }, [menu]);

  const handleAddToCart = async (selectedItem) => {
    if (!selectedItem || isAddingToCart) return;

    setIsAddingToCart(true);
    try {
      await axiosInstance.post(`/addCart`, {
        mobile: user?.mobile,
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
        sugar: 50,
        size: "Medium",
        crust: "Classic",
        extraCheese: false,
      });
    }
  };

  const FoodItemCard = ({ item }) => {
    if (!item) return (
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-80 w-72 flex-shrink-0 rounded-3xl overflow-hidden shadow-2xl animate-pulse border border-gray-200">
        <div className="bg-gray-200 h-48 w-full"></div>
        <div className="p-5">
          <div className="bg-gray-300 h-5 w-3/4 rounded mb-2"></div>
          <div className="bg-gray-200 h-4 w-full rounded mb-1"></div>
          <div className="bg-gray-300 h-4 w-2/3 rounded mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="bg-gray-200 h-7 w-20 rounded"></div>
            <div className="bg-gray-300 h-9 w-24 rounded-full"></div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-80 w-72 flex-shrink-0 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl hover:scale-105 border border-gray-200 transition-all duration-300 snap-center mx-3 relative group animate-fadeIn">
        {item.imageUrls?.[0] ? (
          <div className="relative h-full w-full flex flex-col">
            <div
              className="relative overflow-hidden h-48 w-full"
              aria-label={`View details for ${item.name}`}
            >
              <img
                src={item.imageUrls[0] || 'https://assets.box8.co.in/rectangle-19x10/xhdpi/product/8074'}
                alt={item.name || 'Food item'}
                className="w-full h-full object-cover rounded-t-3xl"
                loading="lazy"
                onError={(e) => (e.target.src = '/fallback-image.jpg')}
              />
              {item.offer && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-yellow-400 text-white text-xs px-3 py-1 rounded-full shadow-lg border border-white/30 z-10 animate-bounce">
                  <span className="font-bold">{item.offer}% OFF</span>
                </div>
              )}
            </div>
            <div className="relative flex-1 flex flex-col justify-between px-4 pt-2 pb-3 backdrop-blur-lg bg-white/40 rounded-b-3xl shadow-lg border-t border-gray-200">
              <div className="flex flex-col items-center text-center">
                <h3 className="font-bold text-base text-gray-900 mb-1 tracking-wide drop-shadow-sm">{item.name}</h3>
                <p className="text-xs text-gray-700 line-clamp-2 mb-1 font-medium">{item.description}</p>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-base font-bold text-gray-800 drop-shadow-sm">
                  ₹{item.price}
                </span>
                <button
                  className={`px-4 py-1.5 text-xs rounded-full font-semibold shadow transition-all duration-200 ${itemIdsInCart?.includes(item._id)
                    ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                    : 'bg-gradient-to-r from-yellow-400 to-red-400 text-white hover:from-red-500 hover:to-yellow-500'
                    } animate-bounce`}
                  onClick={(e) => handleAddToCart(item, e)}
                  aria-label={`Add ${item.name} to cart`}
                >
                  {itemIdsInCart?.includes(item._id) ? 'Added ✓' : 'Add to Cart'}
                </button>
              </div>
              <button
                className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 text-xs font-semibold rounded-full shadow-md hover:scale-105 hover:from-gray-300 hover:to-gray-200 transition-all duration-200"
                onClick={() => setSelectedItem(item)}
                aria-label={`Customize ${item.name}`}
              >
                <span className="material-icons align-middle mr-1" style={{ fontSize: '16px' }}>tune</span> Customize
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image Available</span>
          </div>
        )}
      </div>
    );
  };

  const FoodCategorySection = ({ category }) => {
    const scrollContainerRef = React.useRef(null);

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
        className="mt-8 bg-gradient-to-r from-pink-50 to-yellow-50 rounded-2xl shadow-lg border border-pink-100 animate-fadeIn"
        role="region"
        aria-label={`Category: ${category.name}`}
      >
        <div className="px-6 py-4 border-b border-pink-100 flex items-center gap-2 animate-bounceIn">
          <span className="inline-block w-3 h-3 rounded-full bg-pink-400 animate-pulse"></span>
          <h2 className="text-2xl font-extrabold text-pink-700 tracking-wide drop-shadow-lg">
            {category.name}
          </h2>
        </div>
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 scroll-smooth snap-x snap-mandatory hide-scrollbar pb-6 pl-6"
            tabIndex={0}
            role="group"
            aria-label={`Scrollable items for ${category.name}`}
            onKeyDown={handleKeyDown}
          >
            {category.items.map((item) => (
              <FoodItemCard key={item._id} item={item} />
            ))}
            {isLoading && [...Array(3)].map((_, i) => (
              <FoodItemCard key={`skeleton-${i}`} />
            ))}
          </div>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-400 to-yellow-400 text-white p-3 rounded-full shadow-lg opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-200 hidden sm:block animate-bounce"
            onClick={() => scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })}
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-pink-400 text-white p-3 rounded-full shadow-lg opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-200 hidden sm:block animate-bounce"
            onClick={() => scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })}
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </section>
    );
  };

  const CustomizationModal = () => {
    if (!selectedItem) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <div className="bg-white rounded-xl w-full max-w-sm max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h3 className="text-lg font-medium">Customize {selectedItem.name}</h3>
            <button
              onClick={() => setSelectedItem(null)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-4 space-y-4">
            {selectedItem.category === 'Beverages' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Sugar Level</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={customization.sugar}
                  onChange={(e) => setCustomization(prev => ({
                    ...prev,
                    sugar: parseInt(e.target.value)
                  }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
                <div className="text-center text-sm font-medium">
                  Selected: {customization.sugar}% Sugar
                </div>
              </div>
            )}

            {selectedItem.category === 'Pizza' && (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Crust Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Classic', 'Thin Crust', 'Stuffed Crust'].map(option => (
                      <button
                        key={option}
                        onClick={() => setCustomization(prev => ({
                          ...prev,
                          crust: option
                        }))}
                        className={`p-2 text-sm rounded-lg border transition-colors ${customization.crust === option
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-gray-300 hover:bg-gray-50'
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="extraCheese"
                    checked={customization.extraCheese}
                    onChange={(e) => setCustomization(prev => ({
                      ...prev,
                      extraCheese: e.target.checked
                    }))}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="extraCheese" className="text-sm text-gray-700">
                    Extra Cheese (+₹50)
                  </label>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Size</label>
              <div className="grid grid-cols-3 gap-2">
                {['Small', 'Medium', 'Large'].map(size => (
                  <button
                    key={size}
                    onClick={() => setCustomization(prev => ({ ...prev, size }))}
                    className={`p-2 text-sm rounded-lg border transition-colors ${customization.size === size
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleAddToCart(selectedItem)}
              disabled={isAddingToCart}
              className="w-full bg-indigo-600 text-white text-sm p-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingToCart ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </span>
              ) : (
                `Add to Cart - ₹${selectedItem.price}`
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-yellow-50 min-h-screen pb-20 w-full animate-fadeIn">
      <BeksPizzaMenu />
      <OffersSection />

      {error && (
        <div className="mx-4 mt-4 p-4 bg-gradient-to-r from-pink-200 to-yellow-200 text-pink-900 rounded-xl text-base font-bold shadow-lg animate-bounce">
          {error}
        </div>
      )}

      <div className="space-y-8 mt-8 w-full">
        {isLoading && menu.length === 0 ? (
          <div className="flex overflow-x-auto gap-6 pl-6">
            {[...Array(6)].map((_, i) => (
              <FoodItemCard key={i} />
            ))}
          </div>
        ) : (
          categories.map((category) => (
            <FoodCategorySection key={category.name} category={category} />
          ))
        )}
      </div>

      {isLoading && menu.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="animate-pulse bg-gradient-to-r from-pink-200 to-yellow-200 h-10 w-40 rounded-xl shadow-lg"></div>
        </div>
      )}

      {!isLoading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={isLoading}
            className="px-8 py-3 bg-gradient-to-r from-pink-600 to-yellow-600 text-white rounded-full font-extrabold shadow-lg hover:scale-105 hover:from-yellow-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 animate-bounce"
          >
            {isLoading ? 'Loading...' : 'Load More 🍕'}
          </button>
        </div>
      )}

      <CustomizationModal />
    </div>
  );
};

export default FoodMenu;