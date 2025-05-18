import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import FoodCategories from "../components/FoodMenu";
import Bottom_NaveBar from "../components/BottomNavbar";
import { setLogin, setUser } from "../redux/globSlice";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import BeksPizza from "../components/BeksImage";
import LoginPopup from "../components/LoginPopup";
const Home = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { user, login } = useSelector((state) => state.user);

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
    const timer = setTimeout(() => setShowLoginPopup(!login), 10000);
    return () => clearTimeout(timer);
  }, [login]);

  useEffect(() => {
    let interval;
    if (otpSent && resendTimer > 0) {
      interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, resendTimer]);

  return (
    <div className="  flex flex-col">

      <Header />


      <div className="flex-1 ">
        {/* <SearchComponent /> */}
        {/* <Craving_food />
        <New_item /> */}

        <BeksPizza />
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
