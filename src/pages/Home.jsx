import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Detect_location from "../detect_location";
import Craving_food from "../components/Craving_food";
import New_item from "../New_item";
import FoodCategories from "../components/FoodMenu";
import SearchComponent from "../components/search_item";
import Bottom_NaveBar from "../components/bottom_navbar";
import { setLogin, setUser } from "../redux/globSlice";
import axios, { Axios } from "axios";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";

const LoginPopup = ({
  mobileNumber,
  setMobileNumber,
  otp,
  handleOtpChange,
  sendOtp,
  verifyOtp,
  otpSent,
  resendTimer,
  handleSkipLogin,
  message,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-96 bg-white shadow-lg p-6 border-t-2 border-gray-300 z-50 
                    md:w-1/3 md:h-auto md:rounded-md md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Login</h2>
      {!otpSent ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Mobile Number
          </label>
          <input
            type="tel"
            maxLength="13"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter your mobile number"
            className="w-full border rounded px-3 py-2 mb-4"
          />
          <button
            onClick={sendOtp}
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
                autoFocus={index === 0}
              />
            ))}
          </div>
          <button
            onClick={verifyOtp}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Login
          </button>
          {resendTimer === 0 ? (
            <button
              onClick={sendOtp}
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
      {/* {message && (
        <p
          className={`mt-4 text-center ${
             ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )} */}
    </div>
  );
};

const Home = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { User, isLogin } = useSelector((state) => state.Data);
  console.log(User)
  const sendOtp = async () => {
    try {
      if (!/^\+?\d{10,13}$/.test(mobileNumber)) {
        setMessage("Please enter a valid mobile number.");
        return;
      }
      const response = await axiosInstance.post(`/send-otp`, { phone: mobileNumber });
      setMessage(response.data.message);
      setOtpSent(true);
      setResendTimer(30);
    } catch (error) {
      setMessage(error || "Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const enteredOtp = otp.join("");
      const response = await axiosInstance.post(`/verify-otp`, { phone: mobileNumber, otp: enteredOtp });
    
      if (response.data.success) {
        const res = await axiosInstance.post(`/login`, { mobile: mobileNumber });
        dispatch(setLogin(true));
        dispatch(setUser(res.data.user));
        localStorage.setItem("BeksToken", res.data.token);
        setMessage(response.data.message);
        setShowLoginPopup(false);
      } else {
        console.log("not verify otp");
        setMessage(response.data.message || "Invalid OTP");
      }
    } catch (error) {
     
      setMessage(error || "Invalid OTP");
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    } else if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSkipLogin = () => {
    setShowLoginPopup(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowLoginPopup(!isLogin), 10000);
    return () => clearTimeout(timer);
  }, [isLogin]);

  useEffect(() => {
    let interval;
    if (otpSent && resendTimer > 0) {
      interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, resendTimer]);

  return (
    <div className="  flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50 bg-white">
        <Header />
      </div>

      <div className="flex-1 pt-24">
        <SearchComponent />
        <Craving_food />
        <New_item />
        <FoodCategories />
       
      </div>

      {showLoginPopup && (
        <LoginPopup
          {...{
            mobileNumber,
            setMobileNumber,
            otp,
            handleOtpChange,
            sendOtp,
            verifyOtp,
            otpSent,
            resendTimer,
            handleSkipLogin,
            message,
          }}
        />
      )}

      <Bottom_NaveBar />
    </div>
  );
};

export default Home;
