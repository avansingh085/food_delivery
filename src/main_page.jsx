import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './Home';
import FoodDetailPage from './item_explo'
import CartPage from './cart'
import OrderTracker from './OrderTracker'
import Setting from './setting'
function Main_Page() {
  return (
     <div className="overflow-x-hidden">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/contact" element={<Home />} />
        <Route path="/food" element={<FoodDetailPage/>} />
        <Route path="/Cart" element={<CartPage/>}/>
        <Route path="/track-order" element={<OrderTracker/>}/>
        <Route path="/settings" element={<Setting/>}/>
      </Routes>
    </BrowserRouter>
    
    </div>
  )
}

export default Main_Page
