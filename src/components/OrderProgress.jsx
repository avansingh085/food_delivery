import React, { useEffect, useState } from "react";

const statusSteps = ["ACCEPTED", "PICKED", "DELIVERED"];

const OrdersProgress = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep < statusSteps.length - 1 ? prevStep + 1 : prevStep));
    }, 2000); 

    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="flex items-center justify-center h-20 w-full bg-white rounded-lg shadow-sm">
      <label className="flex  justify-center w-full  text-center">
      <div class="w-full max-w-4xl mx-auto mt-10">
  <div class="flex justify-between items-center">
    
    <div class="flex flex-col items-center">
      <div class="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 text-white">
        1
      </div>
      <span class="text-sm mt-2">Booking</span>
    </div>

    <div class="flex-auto border-t-2 border-blue-500"></div>

    <div class="flex flex-col items-center">
      <div class="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 text-white">
        2
      </div>
      <span class="text-sm mt-2">Picked</span>
    </div>

    <div class="flex-auto border-t-2 border-gray-300"></div>

    <div class="flex flex-col items-center">
      <div class="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 text-gray-600">
        3
      </div>
      <span class="text-sm mt-2">Delivered</span>
    </div>

    <div class="flex-auto border-t-2 border-gray-300"></div>

    <div class="flex flex-col items-center">
      <div class="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 text-gray-600">
        4
      </div>
      <span class="text-sm mt-2">Completed</span>
    </div>

  </div>
</div>


      </label>
    </div>
  );
};

export default OrdersProgress;