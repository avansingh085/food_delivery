import React, { useState, useEffect } from "react";
import Header from "./Header";
import Detect_location from "./detect_location";
import Craving_food from "./Craving_food";
import New_item from "./New_item";
import FoodCategories from "./food_item";
import Upload from "./upload_image";

const Home = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  // Show the login popup 10 seconds after the page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoginPopup(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  // Timer for resend OTP
  useEffect(() => {
    let interval;
    if (otpSent && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, resendTimer]);

  const handleSendOtp = () => {
    if (mobileNumber.length === 10) {
      setOtpSent(true);
      setResendTimer(30); // Reset timer
      alert(`OTP sent to ${mobileNumber}`); // Simulate OTP send
    } else {
      alert("Please enter a valid 10-digit mobile number.");
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Restrict to a single digit
    setOtp(newOtp);

    // Automatically move to the next input if a digit is entered
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleLogin = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === "123456") {
      alert("Login successful!");
      setShowLoginPopup(false); // Close the popup after successful login
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleSkipLogin = () => {
    alert("You have skipped the login.");
    setShowLoginPopup(false);
  };

  return (
    <div className="w-screen h-auto grid bg-gray-200">
      <Header />
      <Detect_location />
      <Craving_food />
      <New_item />
      <FoodCategories />
      <Upload />

      {showLoginPopup && (
        <div className="fixed bottom-0 place-self-center h-96 w-96 md:w-2/6 md:h-96 bg-white shadow-lg p-6 border-t-2 border-gray-300 z-50">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Login</h2>
          {!otpSent ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Mobile Number
              </label>
              <input
                type="tel"
                maxLength="10"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter your mobile number"
                className="w-full border rounded px-3 py-2 mb-4"
              />
              <button
                onClick={handleSendOtp}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Send OTP
              </button>
              <button
                onClick={handleSkipLogin}
                className="mt-4 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                Skip Login
              </button>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <div className="flex justify-between space-x-2 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    className="w-10 h-10 border rounded text-center text-lg font-bold text-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>
              <button
                onClick={handleLogin}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Login
              </button>
              {resendTimer === 0 ? (
                <button
                  onClick={handleSendOtp}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="mt-4 text-center text-gray-500">
                  Resend OTP in {resendTimer}s
                </p>
              )}
              <button
                onClick={handleSkipLogin}
                className="mt-4 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                Skip Login
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
