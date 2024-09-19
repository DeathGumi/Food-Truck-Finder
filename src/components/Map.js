import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import FoodTruckMarker from './FoodTruckMarker';
import { useGeolocation } from '../hooks/useGeolocation';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Map() {
  const [foodTrucks, setFoodTrucks] = useState([]);
  const { location } = useGeolocation();
  const [mapCenter, setMapCenter] = useState([33.7701, -118.1937]); // Default to Long Beach center

  useEffect(() => {
    fetch('/api/trucks')
      .then(res => res.json())
      .then(data => setFoodTrucks(data))
      .catch(error => console.error('Error fetching food trucks:', error));
  }, []);

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
          <FoodTruckMarker key={truck.id} truck={truck} />
        ))}
      </MapContainer>
    </div>
  );
}