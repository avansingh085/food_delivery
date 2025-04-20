import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../App.css';
import Home from './Home';
import FoodDetailPage from './ItemExplo';
import CartPage from '../components/cart';
import OrderTracker from '../components/OrderTracker';
import { setLogin, setUser, setCart } from '../redux/globSlice';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import Location from '../components/location';
import Admin from './Admin';
import AddNewFood from '../components/AddNewFood';
import DeliveryDashboard from './DeliveryDashboard';
import Settings from './setting';
function Main_Page() {
  const dispatch = useDispatch();
  const { isLogin, User } = useSelector((state) => state.Data);
  
  const [loading, setLoading] = useState(true); // Loading state

  const fetchProfile = async () => {
  
    try {
     
      const res = await axiosInstance.get(`/profile`);
      const cartData = await axiosInstance.get(`/getCart`);

     // console.log("AVAN", res, cartData, 'Fetched Profile A');
      if (res.data.success && cartData.data.success) {
        dispatch(setLogin(true));
        dispatch(setCart(cartData.data.cart));
        dispatch(setUser(res.data.User));
       
        return 0;
        
      } else {
        
      }
    } catch (error) {
      //console.error('Error fetching profile:', error);
      dispatch(setLogin(false));
    } finally {
      setLoading(false);
    }
  
  };

  useEffect(() => {
    fetchProfile();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<Admin />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Location" element={<Location />} />
          <Route path="/DeliveryDashboard" element={<DeliveryDashboard />} />
          <Route path="/food/:id" element={<FoodDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/MyOrder" element={<OrderTracker />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/AddNewFood" element={<AddNewFood />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Main_Page;
