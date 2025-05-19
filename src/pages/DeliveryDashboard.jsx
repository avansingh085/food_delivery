import React, { useEffect, useState } from "react";
import apiClient from "../utils/axiosInstance";
import io from 'socket.io-client';
const DeliveryDashboard = () => {
 
  const [verifyOrderOtp,setVerifyOrderOtp]=useState(0);
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "John Doe",
      customerMobile: "9876543210",
      restaurantName: "Pizza Hut",
      deliveryAddress: "123 Main St, Springfield",
      total: 450,
    },
    {
      id: 2,
      customerName: "Jane Smith",
      customerMobile: "9876543211",
      restaurantName: "Burger King",
      deliveryAddress: "456 Elm St, Springfield",
      total: 300,
    },
    {
      id: 3,
      customerName: "Alice Johnson",
      customerMobile: "9876543212",
      restaurantName: "Subway",
      deliveryAddress: "789 Oak St, Springfield",
      total: 220,
    },
  ]);
  useEffect(()=>{
 
    const socket=io('');
    socket.on('incoming_order',({})=>{

    })
    return ()=>{
      socket.off('incoming_order');
    }

 
  },[])
  useEffect(()=>{
    const getIncomingOrder=async ()=>{
      try{
        let res=await apiClient.get("/getIncomingOrder");
        if(res.data.success)
        {

        }
        else
        {

        }

      }catch(err){
           console.log("error occur during fetch incoming order")
      }

    }
  
  },[])
  const updateOrderStatus=(order_id)=>{
    try{
         const response=apiClient.post(`/updateOrderStatus`,{order_id,verifyOrderOtp});
         if(response.data.success)
         {

         }
         else
         {

         }
    }catch(err){
        console.log(err,"error occur during update order status by admin ")
    }
  }
  const [acceptedOrders, setAcceptedOrders] = useState([]); 

  const handleAcceptOrder = (orderId) => {
    const acceptedOrder = orders.find((order) => order.id === orderId);
    setAcceptedOrders([...acceptedOrders, { ...acceptedOrder, status: "Pending" }]);
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  const handlePickedUp = (orderId) => {
    setAcceptedOrders(
      acceptedOrders.map((order) =>
        order.id === orderId ? { ...order, status: "Picked Up" } : order
      )
    );
  };
  const handleDelivered = (orderId) => {
    setAcceptedOrders(
      acceptedOrders.map((order) =>
        order.id === orderId ? { ...order, status: "Delivered" } : order
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Delivery Dashboard</h1>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Incoming Orders</h2>
        {orders.length === 0 ? (
          <div className="text-gray-600">No new orders at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-800">{order.customerName}</h3>
                <p className="text-gray-600">Order Total: ₹{order.total}</p>
                <p className="text-gray-600">Restaurant: {order.restaurantName}</p>
                <button
                  onClick={() => handleAcceptOrder(order.id)}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Accept Order
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Accepted Orders</h2>
        {acceptedOrders.length === 0 ? (
          <div className="text-gray-600">No orders have been accepted yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {acceptedOrders.map((order) => {
              
                 if(order.status==="Delivered")
                  return null;
              return(
              <div key={order.id} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-800">{order.customerName}</h3>
                <p className="text-gray-600">Mobile: {order.customerMobile}</p>
                <p className="text-gray-600">Restaurant: {order.restaurantName}</p>
                <p className="text-gray-600">Delivery Address: {order.deliveryAddress}</p>
                <p className="text-gray-600">Status: {order.status}</p>
                <div className="mt-4 flex gap-2">
                  {order.status === "Picked Up"&& (
                    <div>
                    
                    <input type="number" placeholder="enter otp" className=" border-2 outline-none  px-4 py-2 rounded-lg  m-2" onChange={(e)=>setVerifyOrderOtp(e.target.value)}/>
                   {
                    verifyOrderOtp>999&&verifyOrderOtp<10000&& <button className={`bg-blue-500 text-white px-4 py-2  rounded-lg hover:bg-blue-600 ${verifyOrderOtp>999&&verifyOrderOtp<10000 ? '' :''}`} onClick={() => handleDelivered(order.id)} >verify mark as Delivered</button>
                   }
                   
                    </div>
                  )} :
                  {order.status==="Pending" &&(
                    <button
                      onClick={() => handlePickedUp(order.id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                    >
                      Mark as Picked Up
                    </button>
                  )}
                </div>
              </div>
            )})}
          </div>
        )}
      </section>
      
    </div>
  );
};

export default DeliveryDashboard;
