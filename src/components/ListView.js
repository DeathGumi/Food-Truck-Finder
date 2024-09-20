import React from 'react';
import { calculateDistanceInMiles } from '../utils/distanceCalculator';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-gray-600 text-sm">{rating.toFixed(1)}</span>
    </div>
  );
};

export default function ListView({ foodTrucks, currentLocation }) {
  return (
    <div className="grid grid-cols-1 gap-6 bg-white p-6">
      {foodTrucks.map(truck => {
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