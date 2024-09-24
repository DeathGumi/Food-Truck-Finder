'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SearchBar from '../components/SearchBar';
import ListView from '../components/ListView';
import { getAllFoodTrucks, searchFoodTrucks } from '../lib/foodTruckData';
import { useGeolocation } from '../hooks/useGeolocation';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  const [foodTrucks, setFoodTrucks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const { location, error, getCurrentLocation } = useGeolocation();
  const [mapCenter, setMapCenter] = useState([33.7701, -118.1937]);
  const [mapZoom, setMapZoom] = useState(13);
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    const fetchFoodTrucks = async () => {
      const trucks = await getAllFoodTrucks();
      setFoodTrucks(trucks);
      setSearchResults(trucks);
    };
    fetchFoodTrucks();
  }, []);

  useEffect(() => {
    if (location) {
      setMapCenter([location.latitude, location.longitude]);
      setMapZoom(15);
      setUserLocation(location);
    }
  }, [location]);

  const handleSearch = async (term) => {
    if (term.trim() === '') {
      setSearchResults(foodTrucks);
    } else {
      const results = await searchFoodTrucks(term);
      setSearchResults(results);
    }
  };

  const handleLocateMe = () => {
    setIsLocating(true);
    getCurrentLocation((success) => {
      setIsLocating(false);
      if (!success) {
        alert("Unable to retrieve your location. Please try again.");
      }
    });
  };

  const handleLocationChange = (newLocation) => {
    setUserLocation({
      latitude: newLocation.lat,
      longitude: newLocation.lng
    });
    setMapCenter([newLocation.lat, newLocation.lng]);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black">Food Truck Finder</h1>
          <div className="flex-grow mx-4">
            <SearchBar onSearch={handleSearch} />
          </div>
          <button
            onClick={handleLocateMe}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded whitespace-nowrap"
            disabled={isLocating}
          >
            {isLocating ? "Locating..." : "Locate Me"}
          </button>
        </div>
      </header>
      <main className="flex flex-1 overflow-hidden">
        <section className="w-1/3 overflow-y-auto p-4 bg-white">
          <ListView foodTrucks={searchResults} currentLocation={userLocation} />
        </section>
        <section className="w-2/3">
          <Map 
            foodTrucks={searchResults} 
            center={mapCenter} 
            zoom={mapZoom} 
            currentLocation={userLocation}
            onLocationChange={handleLocationChange}
          />
        </section>
      </main>
    </div>
  );
}