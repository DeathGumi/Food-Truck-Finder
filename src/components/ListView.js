import React, { useMemo, useState } from 'react';
import { calculateDistanceInMiles } from '../utils/distanceCalculator';
import StarRating from './StarRating';
import FoodTruckModal from './FoodTruckModal';

function getCuisineClass(cuisine) {
  return `cuisine-${cuisine.toLowerCase().replace(/[\s&]+/g, '-')}`;
}

export default function ListView({ foodTrucks, currentLocation, onUpdateRating }) {
  const [selectedTruck, setSelectedTruck] = useState(null);

  const sortedFoodTrucks = useMemo(() => {
    if (!currentLocation) return foodTrucks;

    return [...foodTrucks].sort((a, b) => {
      const distanceA = calculateDistanceInMiles(
        currentLocation.latitude,
        currentLocation.longitude,
        a.location.lat,
        a.location.lng
      );
      const distanceB = calculateDistanceInMiles(
        currentLocation.latitude,
        currentLocation.longitude,
        b.location.lat,
        b.location.lng
      );
      return distanceA - distanceB;
    });
  }, [foodTrucks, currentLocation]);

  const openModal = (truck) => {
    setSelectedTruck(truck);
  };

  const closeModal = () => {
    setSelectedTruck(null);
  };

  return (
    <div className="grid grid-cols-1 gap-6 bg-white p-6 relative">
      {currentLocation && (
        <div className="text-sm text-gray-600 mb-4">
          Sorted by distance from your location
        </div>
      )}
      {sortedFoodTrucks.map(truck => {
        const distance = currentLocation
          ? calculateDistanceInMiles(
              currentLocation.latitude,
              currentLocation.longitude,
              truck.location.lat,
              truck.location.lng
            ).toFixed(1)
          : null;

        return (
          <div 
            key={truck.id} 
            className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
            onClick={() => openModal(truck)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-bold text-black">{truck.name}</h3>
              <span className="text-sm font-semibold text-green-600">{truck.priceRange}</span>
            </div>
            <span className={`cuisine-tag ${getCuisineClass(truck.cuisine)} mb-2 inline-block`}>
              {truck.cuisine}
            </span>
            <div className="flex items-center mb-2">
              <StarRating rating={truck.rating} />
              <span className="ml-2 text-sm text-gray-500">({truck.reviews} reviews)</span>
            </div>
            <p className="text-base text-gray-500 mb-2">{truck.description}</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{truck.hours}</span>
              {distance && (
                <span className="text-blue-600 font-semibold">
                  {distance} miles away
                </span>
              )}
            </div>
          </div>
        );
      })}

      {selectedTruck && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100000,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <FoodTruckModal
            truck={selectedTruck}
            isOpen={!!selectedTruck}
            onClose={closeModal}
            onUpdateRating={onUpdateRating}
          />
        </div>
      )}
    </div>
  );
}