import React, { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix leaflet marker icons
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const icon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Custom component to handle map clicks
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => onMapClick(e),
  });
  return null;
};

// Geocoding function with error handling
const reverseGeocode = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&email=your@email.com` // Replace with your email
    );
    if (!response.ok) throw new Error('Geocoding failed');
    const data = await response.json();
    return data.address || data.display_name || 'Address not found';
  } catch (error) {
    console.error('Reverse geocode error:', error);
    return 'Address unavailable';
  }
};

// Distance calculation function
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const MapApp = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [pinnedLocation, setPinnedLocation] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [addresses, setAddresses] = useState({
    user: 'Fetching your location...',
    pinned: 'Click map to pin location'
  });

  // Get user location
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        const { latitude, longitude } = position.coords;
        const userAddress = await reverseGeocode(latitude, longitude);
        
        setUserLocation([latitude, longitude]);
        setAddresses(prev => ({
          ...prev,
          user: userAddress?.road ? 
            `${userAddress.road}, ${userAddress.city}` : 
            'Your current location'
        }));
      } catch (error) {
        console.error('Location error:', error);
        setAddresses(prev => ({ ...prev, user: 'Location access denied' }));
      }
    };

    fetchUserLocation();
  }, []);

  // Map click handler
  const handleMapClick = useCallback(async (e) => {
    try {
      const { lat, lng } = e.latlng;
      const address = await reverseGeocode(lat, lng);
      
      setPinnedLocation([lat, lng]);
      setAddresses(prev => ({
        ...prev,
        pinned: address?.road ? 
          `${address.road}, ${address.city}` : 
          'Unknown location'
      }));

      if (userLocation) {
        const distance = calculateDistance(userLocation[0], userLocation[1], lat, lng);
        setRouteInfo({
          distance: distance.toFixed(2),
          duration: Math.ceil((distance / 50) * 60)
        });
      }
    } catch (error) {
      console.error('Map click error:', error);
      setAddresses(prev => ({ ...prev, pinned: 'Failed to pin location' }));
    }
  }, [userLocation]);

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-center font-bold text-2xl p-4 bg-blue-100">
        Interactive Location Map
      </h1>

      <div className="flex-1 relative">
        {userLocation ? (
          <MapContainer
            center={userLocation}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />

            <MapClickHandler onMapClick={handleMapClick} />

            <Marker position={userLocation} icon={icon}>
              <Popup className="min-w-[200px]">
                <div className="space-y-1">
                  <h3 className="font-bold text-blue-600">Your Location</h3>
                  <p className="text-sm">{addresses.user}</p>
                  <p className="text-xs text-gray-500">
                    {userLocation[0].toFixed(4)}, {userLocation[1].toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>

            {pinnedLocation && (
              <>
                <Marker position={pinnedLocation} icon={icon}>
                  <Popup className="min-w-[200px]">
                    <div className="space-y-1">
                      <h3 className="font-bold text-red-600">Pinned Location</h3>
                      <p className="text-sm">{addresses.pinned}</p>
                      <p className="text-xs text-gray-500">
                        {pinnedLocation[0].toFixed(4)}, {pinnedLocation[1].toFixed(4)}
                      </p>
                    </div>
                  </Popup>
                </Marker>
                
                <Polyline 
                  positions={[userLocation, pinnedLocation]} 
                  color="#3b82f6" 
                  weight={4}
                  opacity={0.7}
                />
              </>
            )}
          </MapContainer>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-lg text-gray-600">Loading map...</p>
          </div>
        )}

        {/* Information Panel */}
        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg z-[1000] min-w-[250px]">
          <h3 className="font-bold text-lg mb-2">Route Details</h3>
          {routeInfo ? (
            <>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span>Distance:</span>
                  <span className="font-semibold">{routeInfo.distance} km</span>
                </p>
                <p className="flex justify-between">
                  <span>Estimated Time:</span>
                  <span className="font-semibold">{routeInfo.duration} mins</span>
                </p>
              </div>
              <hr className="my-3" />
            </>
          ) : (
            <p className="text-gray-500">No route calculated</p>
          )}
          <p className="text-sm">
            <span className="font-semibold">Pinned Location:</span><br />
            {addresses.pinned}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapApp;