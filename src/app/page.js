'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import SearchBar from '../components/SearchBar';
import ListView from '../components/ListView';
import { getAllFoodTrucks, searchFoodTrucks, addFoodTruck } from '../lib/foodTruckData';
import { useGeolocation } from '../hooks/useGeolocation';
import AddFoodTruckForm from '../components/AddFoodTruckForm';
import FoodTruckModal from '../components/FoodTruckModal';
import ModeSelector from '../components/ModeSelector';
import { onDeleteFoodTruck } from '../utils/onDeleteFoodTruck';

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
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [mode, setMode] = useState('user');

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

  const handleDeleteFoodTruck = useCallback((truckId) => {
    onDeleteFoodTruck(truckId, setFoodTrucks, setSearchResults, setSelectedTruck);
  }, []);

  const handleTruckClick = (truck) => {
    setSelectedTruck(truck);
  };

  const handleModeChange = (newMode) => {
    console.log('Mode changed to:', newMode);
    setMode(newMode);
    if (newMode === 'user') {
      setShowAddForm(false);
    }
  };

  const handleUpdateTruck = useCallback((updatedTruck) => {
    setFoodTrucks(prevTrucks => 
      prevTrucks.map(truck => truck.id === updatedTruck.id ? updatedTruck : truck)
    );
    setSearchResults(prevResults => 
      prevResults.map(truck => truck.id === updatedTruck.id ? updatedTruck : truck)
    );
  }, []);

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
          {mode === 'owner' && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded whitespace-nowrap mr-2"
            >
              {showAddForm ? "Hide Form" : "Add Food Truck"}
            </button>
          )}
          <ModeSelector currentMode={mode} onModeChange={handleModeChange} />
        </div>
      </header>

      <div className="h-px bg-gray-200 w-full"></div>

      <main className="flex flex-1 overflow-hidden">
        <section className="w-1/3 overflow-y-auto p-4 bg-white">
          {showAddForm ? (
            <AddFoodTruckForm onAddFoodTruck={handleAddFoodTruck} />
          ) : (
            <ListView 
              foodTrucks={searchResults} 
              currentLocation={userLocation} 
              onTruckClick={handleTruckClick}
            />
          )}
        </section>
        <section className="w-2/3">
          <Map 
            foodTrucks={searchResults} 
            center={mapCenter} 
            zoom={mapZoom} 
            currentLocation={userLocation}
            onLocationChange={handleLocationChange}
            onTruckClick={handleTruckClick}
          />
        </section>
      </main>

      {selectedTruck && (
        <FoodTruckModal
          key={selectedTruck.id}
          truck={selectedTruck}
          isOpen={!!selectedTruck}
          onClose={() => setSelectedTruck(null)}
          onDeleteFoodTruck={handleDeleteFoodTruck}
          onUpdateTruck={handleUpdateTruck}
          currentMode={mode}
        />
      )}
    </div>
  );
}