
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
  <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black bg-opacity-30">
  <div className="w-full md:w-1/3  p-4 md:p-6 shadow-lg border-t-2 border-gray-300 rounded-t-2xl md:rounded-2xl 
                  max-h-[90vh] overflow-y-auto">
    <h2 className="text-center font-bold text-green-600 text-3xl md:text-4xl mb-2">Beks Pizza</h2>
    <h2 className="text-center text-2xl md:text-4xl font-bold text-black mb-4">Otp verification</h2>

    {!otpSent ? (
      <div className="flex flex-col items-center  p-4 rounded-lg">
        <button
          onClick={sendOtp}
          className="w-full md:w-40 bg-green-500 mb-3 text-white py-2 rounded hover:bg-green-600"
        >
          Generate Otp
        </button>
        <input
          type="tel"
          maxLength="13"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Enter your mobile number"
          className="w-full border rounded px-3 py-2 mb-4 text-black"
        />
        <button
          onClick={handleSkipLogin}
          className="w-full md:w-40 text-white py-2 rounded bg-blue-400 hover:bg-blue-500"
        >
          Skip Login
        </button>
      </div>
    ) : (
      <div className="flex flex-col">
        <label className="block text-sm font-medium text-white mb-2">Enter OTP</label>
        <div className="flex justify-center space-x-2 mb-4">
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
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4">
          <button
            onClick={verifyOtp}
            className="w-full md:w-40 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Login
          </button>
          {resendTimer === 0 ? (
            <button
              onClick={sendOtp}
              className="w-full md:w-40 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-center text-white">Resend OTP in {resendTimer}s</p>
          )}
          <button
            onClick={handleSkipLogin}
            className="w-full md:w-40 text-white py-2 rounded bg-blue-400 hover:bg-blue-500"
          >
            Skip Login
          </button>
        </div>
      </div>
    )}
  </div>
</div>


  );
};
export default LoginPopup;