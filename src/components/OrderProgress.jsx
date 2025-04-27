import React, { useEffect, useState } from "react";

const statusSteps = ["ACCEPTED", "PICKED", "DELIVERED"];

const OrdersProgress = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Automatically move through steps (fake animation)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep < statusSteps.length - 1 ? prevStep + 1 : prevStep));
    }, 2000); // Change status every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-20 w-5/6 bg-white rounded-lg shadow-sm">
      <div className="flex w-fit  text-center">
         <div className="">
         <div className="h-4 w-4 rounded-full m-2 bg-green-500">

</div>
         <div className="">accept</div>
        
          </div>
         
          ------------
          <div className="">
          <div className="h-4 w-4 rounded-full m-2  bg-green-500 ">

</div>
         <span className="">accept</span>
        
          </div>
          ------------
          <div className="">
          <div className="h-4 w-4 rounded-full m-2 bg-green-500">

</div>
         <div className="">accept</div>
          
          </div>
          ------------
          <div className="h-4 w-4 rounded-full m-2 bg-green-500">

</div>

      </div>
    </div>
  );
};

export default OrdersProgress;