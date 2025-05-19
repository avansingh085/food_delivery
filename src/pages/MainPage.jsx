import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../App.css';
import Home from './Home';
import FoodDetailPage from './ItemExplo';
import CartPage from '../components/cart';
import OrderTracker from '../components/OrderTracker';
import { useDispatch, useSelector } from 'react-redux';
import Location from '../components/location';
import Admin from './Admin';
import AddNewFood from '../components/AddNewFood';
import DeliveryDashboard from './DeliveryDashboard';
import Settings from './setting';
import { fetchFoodData } from '../redux/menuSlice';
import { fetchUser, setCart } from '../redux/userSlice';
import LoadingSpinner from '../components/Loader';

function Main_Page() {
  const dispatch = useDispatch();
  const {loading,user}=useSelector((state)=>state.user);
  const {menu}=useSelector((state)=>state.menu);
  useEffect(()=>{
    try{
    dispatch(fetchUser());
    dispatch(fetchFoodData());
    }catch(err)
    {
      console.log(err)
    }

  },[dispatch])
  useEffect(()=>{
    if(menu?.length&&user?.cart)
    {
      
      let cartData=user?.cart?.map((item)=>{
           let f=menu?.filter((data)=>String(data._id)===String(item.id));
        
           return {...item,...f[0]};
      })
     
      dispatch(setCart(cartData));
    }
  },[menu,user]);

  if (loading) {
    return (
      <LoadingSpinner/>
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
