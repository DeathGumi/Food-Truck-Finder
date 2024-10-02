import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { calculateDistanceInMiles } from '../utils/distanceCalculator';
import StarRating from './StarRating';
import FoodTruckModal from './FoodTruckModal';
import { isFoodTruckOpen } from '../utils/isFoodTruckOpen';
import FilterBar from './FilterBar';
import BusynessIndicator from './BusynessIndicator';
import { BusynessProvider, useBusyness } from './BusynessManager';
import { getAllFoodTrucks, addReviewToTruck, updateFoodTruck } from '../lib/foodTruckData';
import { calculateAverageRating, getReviewsFromLocalStorage, updateTruckWithNewReview, saveReviewToLocalStorage, initializeReviewsIfNeeded } from '../utils/ratingUtils';
import dummyReviews from '../lib/dummyReviews';

function getCuisineClass(cuisine) {
  return `cuisine-${cuisine.toLowerCase().replace(/[\s&]+/g, '-')}`;
}

function ListViewContent({ currentLocation, onUpdateRating }) {
  const [foodTrucks, setFoodTrucks] = useState([]);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [filters, setFilters] = useState({
    price: '',
    cuisine: '',
    rating: 0,
    time: '',
  });
  const { busynessLevels, initializeBusynessLevels } = useBusyness();

  const refreshFoodTrucks = useCallback(() => {
    const trucks = getAllFoodTrucks();
    const trucksWithUpdatedRatings = trucks.map(truck => {
      const reviews = initializeReviewsIfNeeded(truck, dummyReviews);
      const averageRating = calculateAverageRating(reviews);
      return { ...truck, rating: averageRating, reviews: reviews.length };
    });
    setFoodTrucks(trucksWithUpdatedRatings);
  }, []);

  useEffect(() => {
    refreshFoodTrucks();
  }, [refreshFoodTrucks]);

  useEffect(() => {
    if (foodTrucks.length > 0) {
      initializeBusynessLevels(foodTrucks);
    }
  }, [foodTrucks, initializeBusynessLevels]);

  const handleAddReview = useCallback((truckId, review) => {
    const truck = foodTrucks.find(t => t.id === truckId);
    if (truck) {
      const updatedTruck = updateTruckWithNewReview(truck, review);
      saveReviewToLocalStorage(truckId, updatedTruck.reviewsData);
      updateFoodTruck(updatedTruck);
      refreshFoodTrucks();
      if (onUpdateRating) {
        onUpdateRating();
      }
    }
  }, [foodTrucks, refreshFoodTrucks, onUpdateRating]);

  const filteredFoodTrucks = useMemo(() => {
    return foodTrucks.filter(truck => {
      if (filters.price && truck.priceRange !== filters.price) return false;
      if (filters.cuisine && !truck.cuisine.toLowerCase().includes(filters.cuisine.toLowerCase())) return false;
      if (filters.rating && truck.rating < filters.rating) return false;
      if (filters.time === 'open' && !isFoodTruckOpen(truck.hours)) return false;
      return true;
    });
  }, [foodTrucks, filters]);

  const sortedFoodTrucks = useMemo(() => {
    if (!currentLocation) return filteredFoodTrucks;

    return [...filteredFoodTrucks].sort((a, b) => {
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
  }, [filteredFoodTrucks, currentLocation]);

  const openModal = useCallback((truck) => {
    setSelectedTruck(truck);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedTruck(null);
    refreshFoodTrucks();
  }, [refreshFoodTrucks]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const openFoodTrucks = useMemo(() => sortedFoodTrucks.filter(truck => isFoodTruckOpen(truck.hours)), [sortedFoodTrucks]);
  const closedFoodTrucks = useMemo(() => sortedFoodTrucks.filter(truck => !isFoodTruckOpen(truck.hours)), [sortedFoodTrucks]);

  return (
    <div className="grid grid-cols-1 gap-6 bg-white p-6 relative">
      <FilterBar onFilterChange={handleFilterChange} />
      
      {currentLocation && (
        <div className="text-sm text-gray-600 mb-4">
          Sorted by distance from your location
        </div>
      )}
      
      {openFoodTrucks.map(truck => {
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
            <div className="flex items-center space-x-2 mb-2">
              <span className={`cuisine-tag ${getCuisineClass(truck.cuisine)} inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800`}>
                {truck.cuisine}
              </span>
              <BusynessIndicator level={busynessLevels[truck.id] || 'unknown'} />
            </div>
            <div className="flex items-center mb-2">
              <StarRating rating={truck.rating} />
              <span className="ml-2 text-sm text-gray-500">({truck.reviews} reviews)</span>
            </div>
            <p className="text-base text-gray-500 mb-2">{truck.description}</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-green-600 font-semibold">Open • {truck.hours}</span>
              {distance && (
                <span className="text-blue-600 font-semibold">
                  {distance} miles away
                </span>
              )}
            </div>
          </div>
        );
      })}

      {closedFoodTrucks.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Closed Food Trucks</h3>
          {closedFoodTrucks.map(truck => {
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
                className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer opacity-50"
                onClick={() => openModal(truck)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-black">{truck.name}</h3>
                  <span className="text-sm font-semibold text-green-600">{truck.priceRange}</span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`cuisine-tag ${getCuisineClass(truck.cuisine)} inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800`}>
                    {truck.cuisine}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <StarRating rating={truck.rating} />
                  <span className="ml-2 text-sm text-gray-500">({truck.reviews} reviews)</span>
                </div>
                <p className="text-base text-gray-500 mb-2">{truck.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-red-600 font-semibold">Closed • {truck.hours}</span>
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
      )}

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
            onAddReview={handleAddReview}
          />
        </div>
      )}
    </div>
  );
}

export default function ListView(props) {
  return (
    <BusynessProvider>
      <ListViewContent {...props} />
    </BusynessProvider>
  );
}