
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
                    md:w-1/3 md:h-auto rounded-2xl md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
      <h2 className="text-center font-bold text-green-600 text-4xl mb-4 ">Beks Pizza</h2>
        <h2 className=" text-center text-4xl font-bold text-black mb-4">Otp verification</h2>
      {!otpSent ? (
        <div>
         
          <button
            onClick={sendOtp}
            className="w-40 bg-green-500 mb-3 text-white py-2 rounded hover:bg-green-600"
          >
            Generate Otp
          </button>
          <input
            type="tel"
            maxLength="13"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter your mobile number"
            className="w-full border rounded px-3 py-2 mb-4"
          />
          
          <button
            onClick={handleSkipLogin}
            className="mt-4 w-40 text-gray-500  py-2 rounded bg-blue-300"
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
          <div className="flex flex-wrap gap-5 ">
          <button
            onClick={verifyOtp}
            className="w-40 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Login
          </button>
          {resendTimer === 0 ? (
            <button
              onClick={sendOtp}
              className=" w-40 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Resend OTP
            </button>
          ) : (
            <p className=" text-center text-gray-500">
              Resend OTP in {resendTimer}s
            </p>
          )}
          <button
            onClick={handleSkipLogin}
            className=" w-40  text-white py-2 rounded bg-blue-300"
          >
            Skip Login
          </button>
          </div>
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
export default LoginPopup;