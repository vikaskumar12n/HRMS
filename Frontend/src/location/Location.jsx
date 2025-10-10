import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLocation } from 'react-router-dom';

// 📍 Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// 📍 Marker that updates position
const SmoothMarker = ({ position }) => {
  const markerRef = useRef();

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng(position); // smooth update
    }
  }, [position]);

  return (
    <Marker ref={markerRef} position={position} icon={customIcon}>
      <Popup>
        📍 Aapka current location
        <br />
        Lat: {position[0].toFixed(6)}, Lng: {position[1].toFixed(6)}
      </Popup>
    </Marker>
  );
};

// 📍 Recenter map to current location
const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom(), {
      animate: true,
      duration: 0.5,
    });
  }, [position, map]);
  return null;
};

const Location = ({lat, lng}) => {
  const [position, setPosition] = useState(null);

  const location = useLocation();
  const {state} = location;
  
  console.log("syaye is", state);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported.');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log('📡 Updated Position:', latitude, longitude); // ✅ Debug
        setPosition([latitude, longitude]);
      },
      (err) => {
        console.error('❌ Location error:', err);
        alert('Failed to get your live location.');
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // 🔥 State se lat lng use kar rahe hain
  const stateLat = state?.lat || 26.914133;
  const stateLng = state?.lng || 80.9289865;

  return (
    <div>
      {position ? (
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: '100vh', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/contributors">OpenStreetMap</a> contributors'
          />
          <SmoothMarker position={position} />
          <RecenterMap position={position} />
        </MapContainer>
      ) : (
        <div>📡 Locating you...</div>
      )}
      
      {/* Display state lat lng values */}
      {/* <div style={{ position: 'absolute', top: 10, left: 10, background: 'white', padding: '10px', borderRadius: '5px', zIndex: 1000 }}>
        <strong>State Location:</strong><br />
        Lat: {stateLat}<br />
        Lng: {stateLng}
      </div> */}
    </div>
  );
};

export default Location;