import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import foodTruckIconImage from '../lib/FoodTruckIcon';

const foodTruckIcon = new L.Icon({
  iconUrl: foodTruckIconImage,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const currentLocationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

function DraggableMarker({ position, onPositionChange }) {
  const map = useMapEvents({
    click() {
      map.locate();
    },
  });

  return position === null ? null : (
    <Marker
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const position = marker.getLatLng();
          onPositionChange(position);
        },
      }}
      position={position}
      icon={currentLocationIcon}
    >
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default function Map({ foodTrucks, center, zoom, currentLocation, onLocationChange }) {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <MapController center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {currentLocation && (
          <DraggableMarker
            position={[currentLocation.latitude, currentLocation.longitude]}
            onPositionChange={onLocationChange}
          />
        )}
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