import { FaTimes, FaMobile, FaKey, FaArrowRight, FaRedo, FaUserClock } from "react-icons/fa";
import { useEffect, useRef } from "react";

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
  const otpInputRefs = useRef([]);

  // Auto focus the first input when OTP is sent
  useEffect(() => {
    if (otpSent && otpInputRefs.current[0]) {
      otpInputRefs.current[0].focus();
    }
  }, [otpSent]);

  // Handle OTP input change with auto-focus shifting
  const handleOtpInputChange = (value, index) => {
    handleOtpChange(value, index);
    
    // Move to next input if current input is filled
    if (value && index < otp.length - 1) {
      otpInputRefs.current[index + 1].focus();
    }
    
    // Auto verify if all inputs are filled
    if (otp.every((digit, i) => (i === index ? value : digit))) {
      verifyOtp();
    }
  };

  // Handle backspace to move to previous input
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full md:w-96 bg-white p-6 rounded-t-2xl md:rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button 
          onClick={handleSkipLogin}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-green-600 flex items-center justify-center gap-2">
            <img src="/logo.png" alt="Beks Pizza" className="h-8" /> Beks Pizza
          </h2>
          <h3 className="text-xl font-semibold text-gray-800 mt-2">
            {otpSent ? "OTP Verification" : "Login/Signup"}
          </h3>
        </div>

        {!otpSent ? (
          <div className="space-y-4">
            <div className="relative">
              <FaMobile className="absolute left-3 top-3 text-gray-400" />
              <input
                type="tel"
                maxLength="13"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter mobile number"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={sendOtp}
              disabled={!mobileNumber}
              className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-white font-medium transition-all ${
                mobileNumber ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Get OTP <FaArrowRight />
            </button>

            <button
              onClick={handleSkipLogin}
              className="w-full py-2 px-4 text-gray-600 hover:text-gray-800 font-medium"
            >
              Continue as Guest
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                OTP sent to <span className="font-semibold">+91{mobileNumber}</span>
              </p>
              <div className="flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpInputChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 border-2 border-gray-200 rounded-lg text-center text-xl font-bold focus:border-green-500 focus:ring-1 focus:ring-green-200 transition-all"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={verifyOtp}
                disabled={otp.some(d => !d)}
                className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-white font-medium ${
                  otp.every(d => d) ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Verify <FaKey />
              </button>

              {resendTimer === 0 ? (
                <button
                  onClick={sendOtp}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Resend OTP <FaRedo />
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 text-gray-500">
                  <FaUserClock /> Resend in {resendTimer}s
                </div>
              )}

              <button
                onClick={handleSkipLogin}
                className="w-full py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        )}

        {/* Status Message */}
        {message && (
          <p className={`mt-4 text-center text-sm ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;