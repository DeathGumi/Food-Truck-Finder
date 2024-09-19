import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useGeolocation } from '../hooks/useGeolocation';
import foodTruckIconImage from '../assets/images/food-truck-icon.png';

const foodTruckIcon = new L.Icon({
  iconUrl: foodTruckIconImage,
  iconSize: [32, 32], 
  iconAnchor: [16, 32], 
  popupAnchor: [0, -32] 
});

export default function Map({ foodTrucks }) {
  const { location } = useGeolocation();
  const [mapCenter, setMapCenter] = useState([33.7701, -118.1937]); 

  useEffect(() => {
    if (location) {
      setMapCenter([location.latitude, location.longitude]);
    }
  }, [location]);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {foodTrucks.map(truck => (
          <Marker 
            key={truck.id} 
            position={[truck.location.lat, truck.location.lng]}
            icon={foodTruckIcon}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{truck.name}</h3>
                <p>{truck.cuisine}</p>
                <p>Rating: {truck.rating.toFixed(1)}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}