import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { StarIcon } from "@heroicons/react/24/solid";
import axiosInstance from "../utils/axiosInstance";

const url = "http://localhost:5000";

const ReviewModal = ({ productId,orderId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [capturedImages, setCapturedImages] = useState([]);
  const [useCamera, setUseCamera] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [cameraError, setCameraError] = useState("");
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: "environment",
  };

  const capturePhoto = () => {
    if (webcamRef.current) {
      const screenshot = webcamRef.current.getScreenshot();
      if (screenshot) {
        const file = dataURLtoFile(screenshot, `captured_${Date.now()}.jpg`);
        setCapturedImages(prev => [...prev, file]);
      } else {
        setCameraError("Failed to capture image. Please try again.");
      }
    }
  };

  const handleFileUpload = e => {
    const files = Array.from(e.target.files);
    if (files.length + capturedImages.length > 5) {
      setSubmitMessage("Maximum 5 photos allowed");
      return;
    }
    setCapturedImages(prev => [...prev, ...files]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitMessage("");
    
    if (rating === 0) {
      setSubmitMessage("Please select a rating");
      return;
    }
    

    setSubmitting(true);
    try {
      
      const formData = new FormData();
      formData.append("rating", rating);
      formData.append("comment", comment);
      formData.append("productId", productId);
      formData.append("orderId",orderId)
      capturedImages.forEach((image, index) => {
        formData.append("capturedImages", image); 
      });
      console.log(formData)
      const response = await axiosInstance.post(`/addReview`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    
      if (response.data.success) {
        setSubmitMessage("Review submitted successfully!");
        setTimeout(onClose, 1500);
      } else {
        console.log(response.data)
        setSubmitMessage("Submission failed. Please try again.");
      }
    } catch (err) {
      console.log("Review error:", err);
      setSubmitMessage("Error submitting review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-start justify-center p-4 z-50 overflow-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg my-8 relative">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white z-10 border-b">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Rate Your Order</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors text-2xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 md:p-6 max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Section */}
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                How would you rate this order?
              </label>
              <div className="flex gap-1 justify-center md:justify-start">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110"
                    aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                  >
                    <StarIcon
                      className={`w-8 h-8 md:w-10 md:h-10 ${
                        (hoverRating || rating) >= star 
                          ? "text-yellow-400" 
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Section */}
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                rows="4"
                placeholder="Share your experience..."
              />
            </div>

            {/* Photo Upload Section */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm md:text-base font-medium text-gray-700">
                  Add Photos ({capturedImages.length}/5)
                </span>
                <button
                  type="button"
                  onClick={() => setUseCamera(!useCamera)}
                  className="text-blue-600 hover:text-blue-800 text-sm md:text-base"
                >
                  {useCamera ? "Upload Files" : "Use Camera"}
                </button>
              </div>

              {useCamera ? (
                <div className="space-y-4">
                  {cameraError && (
                    <p className="text-red-500 text-sm">{cameraError}</p>
                  )}
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    onUserMediaError={() => setCameraError("Camera access denied. Please check permissions.")}
                    className="w-full rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
                  >
                    Capture Photo
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    aria-label="Upload photos"
                  />
                </div>
              )}

              {/* Image Previews */}
              {capturedImages.length > 0 && (
                <div className="mt-4">
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {capturedImages.map((image, index) => (
                      <div key={index} className="relative shrink-0">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => setCapturedImages(prev => prev.filter((_, i) => i !== index))}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                          aria-label="Remove photo"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Status Messages */}
            {submitMessage && (
              <p className={`text-center text-sm md:text-base ${
                submitMessage.includes("success") ? "text-green-600" : "text-red-500"
              }`}>
                {submitMessage}
              </p>
            )}
          </form>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm md:text-base"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
};

export default ReviewModal;