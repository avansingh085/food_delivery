import React, { useState } from "react";
import axios from "axios";
let url="http://localhost:5000";
let url1="https://fooddeliverybackend-7a1h.onrender.com"
const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      setUploading(true);
      const response = await axios.post(`${url}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Assuming the backend returns the image URL
      setImageUrl(response.data.imageUrl);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading the image:", error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container p-4">
      <h2 className="text-2xl font-bold mb-4">Upload Your Image</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {imageUrl && (
        <div className="mt-4">
          <h3 className="text-xl">Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" className="mt-2 w-48 h-48 object-cover" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
