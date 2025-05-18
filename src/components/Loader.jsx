import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-16 h-16 animate-spin-slow">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-blue-500 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${(360 / 6) * i}deg) translate(20px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
