import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import FoodDetailPage from './item_explo';
import CartPage from './cart';
import OrderTracker from './OrderTracker';
import Setting from './setting';
import { setLogin, setUser } from './globSlice';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from './axiosInstance';

const url = 'http://localhost:5000';

function Main_Page() {
  const dispatch = useDispatch();
  const { isLogin, User } = useSelector((state) => state.Data);

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`${url}/profile`);
        console.log(res, 'Fetched Profile');
        if (res.data.success) {
          dispatch(setLogin(true));
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
          <Route path="/about" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          <Route path="/food" element={<FoodDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/track-order" element={<OrderTracker />} />
          <Route path="/settings" element={<Setting />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Main_Page;
