import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for missing marker icon issue in Leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// Create a new Leaflet icon for markers
const icon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Haversine formula to calculate distance between two points (in km)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const MapApp = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [pinnedLocation, setPinnedLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const [routeInfo, setRouteInfo] = useState(null);

  // Fetch user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error fetching location: ", error);
          alert("Unable to fetch your location. Please allow location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  // Handle map click to set the pinned location
  const handleMapClick = (e) => {
    const clickedLatLng = e.latlng;
    setPinnedLocation([clickedLatLng.lat, clickedLatLng.lng]);
  };

  // Calculate the route and distance
  const calculateRoute = () => {
    if (userLocation && pinnedLocation) {
      const distance = calculateDistance(
        userLocation[0],
        userLocation[1],
        pinnedLocation[0],
        pinnedLocation[1]
      );

      // Calculate travel time assuming an average speed of 50 km/h
      const travelTime = (distance / 50) * 60; // Convert to minutes

      setRoute([userLocation, pinnedLocation]);
      setRouteInfo({
        distance: distance.toFixed(2), // km
        duration: Math.ceil(travelTime), // minutes
      });
    }
  };

  return (
    <div className="h-screen">
      <h1 className="text-center font-bold text-2xl mt-4">
        React Leaflet Map with Location Pinning
      </h1>

      {userLocation ? (
        <div>
          <MapContainer
            center={userLocation}
            zoom={13}
            style={{ height: "70vh", width: "100%" }}
            onClick={handleMapClick} // Attach click handler
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Marker for user's current location */}
            <Marker position={userLocation} icon={icon}>
              <Popup>Your current location</Popup>
            </Marker>

            {/* Marker for the pinned location */}
            {pinnedLocation && (
              <Marker position={pinnedLocation} icon={icon}>
                <Popup>
                  <p>Pinned Location:</p>
                  <p>
                    Latitude: {pinnedLocation[0].toFixed(4)}, Longitude:{" "}
                    {pinnedLocation[1].toFixed(4)}
                  </p>
                </Popup>
              </Marker>
            )}

            {/* Draw route between current and pinned location */}
            {route.length > 0 && <Polyline positions={route} color="blue" />}
          </MapContainer>

          {/* Display route info */}
          <div className="text-center mt-4">
            {routeInfo ? (
              <>
                <p className="text-lg">
                  Distance: <span className="font-bold">{routeInfo.distance} km</span>
                </p>
                <p className="text-lg">
                  Travel Time: <span className="font-bold">{routeInfo.duration} minutes</span>
                </p>
              </>
            ) : (
              <p>Click on the map to set a pinned location...</p>
            )}

            <button
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 mt-2"
              onClick={calculateRoute}
              disabled={!pinnedLocation} // Disable if no pinned location
            >
              {routeInfo ? "Recalculate Route" : "Calculate Route"}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center mt-4">Fetching your location...</p>
      )}
    </div>
  );
};

export default MapApp;
