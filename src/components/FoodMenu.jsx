import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../redux/globSlice";
import axiosInstance from "../utils/axiosInstance";
import FoodDetailPage from "../pages/ItemExplo";

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
  const { User,cart } = useSelector((state) => state.Data);
  const { deliveryLocation } = useSelector((state) => state.Data);
  const [itemId,setItemId]=useState();
  const dispatch = useDispatch();

  const [customization, setCustomization] = useState({
    sugar: 0,
    size: "Medium",
    crust: "Classic",
    extraCheese: false,
  });

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
    <div className="bg-gray-50 min-h-screen p-2">
      <h1 className="text-xl font-bold text-gray-900 text-center mb-3 px-2">
        Explore Our Menu
      </h1>

      {error && (
        <div className="mx-2 mb-2 p-2 bg-red-50 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <div className="mx-2" loading="lazy">
        {categories.map((category) => (
          <section key={category.name} className="mt-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {category.name}
            </h2>
            <div className="grid md:grid-cols-3 gap-2 ">
              {category.items.map((item,id) => (
                <div
                  key={""+id+item._id}
                  className="bg-white rounded-lg  overflow-hidden  mt-4 shadow-2xl "
                >
                 
                    {item.imageUrls?.[0] ? (
                     
                      <div className="relative h-full w-full">
   <Link
                    to={`/food/${item._id}`}
                    className="block relative aspect-square overflow-hidden z-0"
                    
                  >
  <img
    src="https://assets.box8.co.in/rectangle-19x10/xhdpi/product/8074"
    // src={item.imageUrls[0]}
    alt={item.name}
    className="w-full h-full object-cover"
    loading="lazy"
  />
</Link>
  <div className="absolute bottom-0 left-0 z-20  text-white text-lg p-1 w-full bg-gradient-to-t from-gray-950 to-transparent">
      <button className={"float-right mb-20  w-50 px-2 bg-slate-700 rounded-s-lg border-[1.5px] z-50 "} onClick={()=>{setSelectedItem(item)}}>Customise {'>'}</button>
      <div className="flex">
      <div className="mt-3 ml-2 mr-2 w-5 h-5 border-2 border-green-600 bg-white flex items-center justify-center rounded-sm">
  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
</div>

    <div className="font-bold  text-white  text-2xl p-1" >{item.name}</div>
</div>
    <div >{item.description}</div>

    <div className="w-full h-20 grid grid-cols-2 border-t-2 items-center">
  <div className="text-3xl m-4 font-semibold">{item.price}Rs</div>

  <div className="flex justify-end pr-4">
   
    <button
      className={`h-16 w-fit font-extrabold ${ itemIdsInCart?.includes(item._id) ?'bg-white text-black':'bg-red-600 text-white' }  text-3xl px-4 rounded-lg`}
      onClick={(e) => handleAddToCart(item, e)}
    >
      Add +
    </button>
  </div>
</div>

  
  </div>
</div>

                    
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No image</span>
                      </div>
                    )}
                    {item.offer && (
                      <div className="absolute top-1 right-1 bg-red-600 text-white text-[8px] px-1 py-0.5 rounded">
                        {item.offer}% Off
                      </div>
                    )}
                 

                  
                </div>
              ))}
            </div>
          </section>
        ))}

        { (
          <div className="flex justify-center mb-20">
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={isLoading}
              className="px-4 h-28 font-extrabold text-4xl w-60 py-1.5 mt-5 bg-black text-white  rounded-lg disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
{
  itemId&&<FoodDetailPage itemId={itemId} setItemId={setItemId}/>
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