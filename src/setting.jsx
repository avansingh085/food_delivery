import React, { useState } from "react";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    location: "New York, USA",
    mobile: "1234567890",
    address: "123 Main Street, Apartment 4B",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    alert("Settings Saved Successfully!");
 
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-12">
   
      <div className="bg-white shadow-md rounded-md p-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          Settings
        </h1>
        <p className="text-gray-600 mt-1">Manage your account information</p>
      </div>

      <div className="mt-6 bg-white shadow-md rounded-md p-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Account Information
        </h2>
        <form className="space-y-6">
        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter your location"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              maxLength="10"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter your mobile number"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              rows={4}
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <div className="mt-6 bg-white shadow-md rounded-md p-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          More Settings
        </h2>
        <ul className="space-y-4">
          <li>
            <button className="text-blue-600 hover:underline">
              Manage Notifications
            </button>
          </li>
          <li>
            <button className="text-blue-600 hover:underline">
              Privacy Settings
            </button>
          </li>
          <li>
            <button className="text-blue-600 hover:underline">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
