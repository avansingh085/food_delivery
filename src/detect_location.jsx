import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [location, setLocation] = useState(null);
  const [detect_click,setDetectClcik]=useState(false);
  const [error, setError] = useState(null);
   const detect_loca=async ()=>{
    setDetectClcik(true);
    setLocation(null);
    navigator.geolocation.getCurrentPosition(
    
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      axios
        .get(
          `http://api.positionstack.com/v1/reverse?access_key=193d5510ce73769dfa24c1fcabb6a77e&query=${latitude},${longitude}&output=json`
        )
        .then((response) => {
          if (response.data && response.data.data) {
            setLocation(response.data.data[0]);
          }
        })
        .catch((error) => {
          setError("Unable to fetch location details.");
          console.error("Error:", error);
        });
    },
    (error) => {
      setError("Unable to access geolocation.");
      console.error("Geolocation error:", error);
    }
  );
   }
 

  return (
    <div className=" h-20 bg-slate-800 flex md:items-center md:justify-center mt-40">
    
       
        {error && (
          <div className="bg-red-200 text-red-800 p-4 mb-4 rounded-lg">
            {error}
          </div>
        )}
      <button className="h-16 w-fit text-slate-700 shadow-xl rounded-sm bg-white float-right" onClick={detect_loca}>  { detect_click ? (location ? (
          <div className="space-y-2 flex">
            <p className="text-lg font-medium text-gray-700">
              <strong>City: </strong> {location.city || "Not Available"}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <strong>Region: </strong> {location.region || "Not Available"}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <strong>Country: </strong> {location.country || "Not Available"}
            </p>
            {/* <p className="text-lg font-medium text-gray-700">
              <strong>Latitude: </strong> {location.latitude}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <strong>Longitude: </strong> {location.longitude}
            </p> */}
          </div>
        ) : (
          <p className="text-lg text-gray-500">Fetching your location...</p>
        )): <p className="text-lg text-gray-500">use your current location</p>}
        </button>
     
    </div>
  );
}

export default App;
