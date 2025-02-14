import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import FoodDetailPage from './item_explo';
import CartPage from './cart';
import OrderTracker from './OrderTracker';
import Setting from './setting';
import { setLogin, setUser,setCart } from './globSlice';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from './axiosInstance';
import Location from './location'
import Admin from './Admin'
import AddNewFood from './AddNewFood';
import DeliveryDashboard  from './DeliveryDashboard';
const url1 ="https://fooddeliverybackend-7a1h.onrender.com";
const url="http://localhost:5000"
function Main_Page() {
  const dispatch = useDispatch();
  const { isLogin, User } = useSelector((state) => state.Data);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`${url}/profile`);
        const cartData=await axiosInstance.get(`${url}/getCart`);

        console.log(res, 'Fetched Profile');
        if (res.data.success&&cartData.data.success) {
          dispatch(setLogin(true));
          dispatch(setCart(cartData.data.cart))
          dispatch(setUser(res.data.User));
        } else {
          dispatch(setLogin(false));
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        dispatch(setLogin(false));
      }
    };

    fetchProfile();
  }, [dispatch]);

  return (
    <div className="overflow-x-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={< Admin/>} />
          <Route path="/Admin" element={<Admin/>}/>
          <Route path="/Location" element={<Location/>}/>
          <Route path="/DeliveryDashboard" element={<DeliveryDashboard/>}/>
          <Route path="/Location" element={<Location />} />
          <Route path="/food/:id" element={<FoodDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/MyOrder" element={<OrderTracker />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/AddNewFood" element={<AddNewFood/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Main_Page;
