import React, { useMemo } from 'react';
import { calculateDistanceInMiles } from '../utils/distanceCalculator';
import StarRating from './StarRating';

export default function ListView({ foodTrucks, currentLocation }) {
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

  return (
    <div className="grid grid-cols-1 gap-6 bg-white p-6">
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
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-bold text-black">{truck.name}</h3>
              <span className="text-sm font-semibold text-green-600">{truck.priceRange}</span>
            </div>
            <p className="text-lg text-gray-700 mb-2">{truck.cuisine}</p>
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
    </div>
  );
}