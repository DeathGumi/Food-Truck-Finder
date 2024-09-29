import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import StarRating from './StarRating';
import FoodTruckModal from './FoodTruckModal';
import { isFoodTruckOpen } from '../utils/isFoodTruckOpen';

const foodTruckIcon = new L.Icon({
  iconUrl: 'https://png.pngtree.com/png-clipart/20221217/ourmid/pngtree-pizza-food-trucks-png-image_6527203.png',
  iconSize: [64, 64],
  iconAnchor: [32, 64],
  popupAnchor: [0, -64]
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

function FoodTruckMarker({ truck, onMarkerClick }) {
  const markerRef = useRef(null);

  const eventHandlers = {
    click: () => {
      onMarkerClick(truck);
    },
    mouseover: (event) => {
      event.target.openPopup();
    },
    mouseout: (event) => {
      event.target.closePopup();
    },
  };

  const isOpen = isFoodTruckOpen(truck.hours);

  if (!isOpen) {
    return null; 
  }

  return (
    <Marker 
      ref={markerRef}
      key={truck.id} 
      position={[truck.location.lat, truck.location.lng]}
      icon={foodTruckIcon}
      eventHandlers={eventHandlers}
    >
      <Popup>
        <div className="food-truck-popup">
          <h3 className="font-bold text-lg">{truck.name}</h3>
          <p className="text-sm text-gray-600">{truck.cuisine}</p>
          <div className="flex items-center mt-2">
            <StarRating rating={truck.rating} />
            <span className="ml-2 text-sm text-gray-600">({truck.reviews} reviews)</span>
          </div>
          <p className="mt-2 text-sm">{truck.description}</p>
          <div className="mt-2 flex items-center">
            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {isOpen ? 'Open' : 'Closed'}
            </span>
            <span className="ml-2 text-sm font-semibold">{truck.hours}</span>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default function Map({ foodTrucks, center, zoom, currentLocation, onLocationChange, onUpdateRating }) {
  const [selectedTruck, setSelectedTruck] = useState(null);
  const mapRef = useRef(null);

  const handleMarkerClick = (truck) => {
    setSelectedTruck(truck);
  };

  const handleCloseModal = () => {
    setSelectedTruck(null);
  };

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
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
          <FoodTruckMarker key={truck.id} truck={truck} onMarkerClick={handleMarkerClick} />
        ))}
      </MapContainer>
      {selectedTruck && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <FoodTruckModal
            truck={selectedTruck}
            isOpen={!!selectedTruck}
            onClose={handleCloseModal}
            onUpdateRating={onUpdateRating}
          />
        </div>
      )}
    </div>
  );
}