'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SearchBar from '../components/SearchBar';
import ListView from '../components/ListView';
import { getAllFoodTrucks, searchFoodTrucks, addFoodTruck } from '../lib/foodTruckData';
import { useGeolocation } from '../hooks/useGeolocation';
import AddFoodTruckForm from '../components/AddFoodTruckForm';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  const [foodTrucks, setFoodTrucks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const { location, error, getCurrentLocation } = useGeolocation();
  const [mapCenter, setMapCenter] = useState([33.7701, -118.1937]);
  const [mapZoom, setMapZoom] = useState(13);
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const trucks = getAllFoodTrucks();
    setFoodTrucks(trucks);
    setSearchResults(trucks);
  }, []);

  useEffect(() => {
    if (location) {
      setMapCenter([location.latitude, location.longitude]);
      setMapZoom(15);
      setUserLocation(location);
    }
  }, [location]);

  const handleSearch = (term) => {
    if (term.trim() === '') {
      setSearchResults(foodTrucks);
    } else {
      const results = searchFoodTrucks(term);
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

  const handleAddFoodTruck = (newTruck) => {
    const addedTruck = addFoodTruck(newTruck);
    setFoodTrucks(prevTrucks => [...prevTrucks, addedTruck]);
    setSearchResults(prevResults => [...prevResults, addedTruck]);
    setShowAddForm(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <h1 style={{ 
            fontFamily: '"Trebuchet MS", Helvetica, Arial, sans-serif',
            fontSize: '2.5rem'
          }}>
            Food Truck Finder
          </h1>
          <div className="flex-grow mx-4">
            <SearchBar onSearch={handleSearch} />
          </div>
          <button
            onClick={handleLocateMe}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded whitespace-nowrap mr-2"
            disabled={isLocating}
          >
            {isLocating ? "Locating..." : "Locate Me"}
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded whitespace-nowrap"
          >
            {showAddForm ? "Hide Form" : "Add Food Truck"}
          </button>
        </div>
      </header>

      <div className="h-px bg-gray-200 w-full"></div>

      <main className="flex flex-1 overflow-hidden">
        <section className="w-1/3 overflow-y-auto p-4 bg-white">
          {showAddForm ? (
            <AddFoodTruckForm onAddFoodTruck={handleAddFoodTruck} />
          ) : (
            <ListView foodTrucks={searchResults} currentLocation={userLocation} />
          )}
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