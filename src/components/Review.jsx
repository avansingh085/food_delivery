import { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";

const ReviewSection = ({ reviews }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="bg-white rounded-2xl p-8 shadow-sm mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Customer Reviews ({reviews?.length || 0})
      </h2>

      <div className="space-y-6">
        {reviews?.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="pb-6 border-b last:border-0">
              {/* Username */}
              <h4 className="font-semibold">
                {review.username || "Anonymous"}
              </h4>

              {/* Star Ratings */}
              <div className="flex items-center gap-1 text-orange-400">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="text-sm" />
                ))}
              </div>

              {/* Review Comment */}
              <p className="text-gray-600">{review.comment}</p>

              {/* Review Images Grid */}
              {review.photos?.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {review.photos.map((photo, i) => (
                    <img
                      key={i}
                      src={`http://localhost:5000/${photo}`}
                      alt={`Review ${index} - ${i}`}
                      className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setSelectedImage(`http://localhost:5000/${photo}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
        )}
      </div>

      {/* Image Popup */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white bg-black p-2 rounded-full"
            >
              <FaTimes size={24} />
            </button>
            <img
              src={selectedImage}
              className="max-h-[80vh] max-w-full rounded-lg shadow-lg"
              alt="Full View"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewSection;
