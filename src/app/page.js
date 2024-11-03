'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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

  const debugRef = useRef({});

  useEffect(() => {
    const trucks = getAllFoodTrucks();
    setFoodTrucks(trucks);
    setSearchResults(trucks);
    console.log('Initial trucks loaded:', trucks);
  }, []);

  useEffect(() => {
    if (location) {
      setMapCenter([location.latitude, location.longitude]);
      setMapZoom(15);
      setUserLocation(location);
      console.log('User location updated:', location);
    }
  }, [location]);

  const handleSearch = useCallback((term) => {
    console.log('Search term:', term);
    let results;  // Define results in the outer scope
    
    if (term.trim() === '') {
      results = foodTrucks;
    } else {
      results = searchFoodTrucks(term);
    }
    
    setSearchResults(results);
    console.log('Search results:', results);  // Now this will work
  }, [foodTrucks]);

  const handleLocateMe = useCallback(() => {
    setIsLocating(true);
    getCurrentLocation((success) => {
      setIsLocating(false);
      if (!success) {
        console.error("Unable to retrieve user location");
        alert("Unable to retrieve your location. Please try again.");
      }
    });
  }, [getCurrentLocation]);

  const handleLocationChange = useCallback((newLocation) => {
    console.log('Location changed:', newLocation);
    setUserLocation({
      latitude: newLocation.lat,
      longitude: newLocation.lng
    });
    setMapCenter([newLocation.lat, newLocation.lng]);
  }, []);

  const handleAddFoodTruck = useCallback((newTruck) => {
    console.log('Adding new food truck:', newTruck);
    const addedTruck = addFoodTruck(newTruck);
    setFoodTrucks(prevTrucks => {
      const updatedTrucks = [...prevTrucks, addedTruck];
      console.log('Updated food trucks:', updatedTrucks);
      return updatedTrucks;
    });
    setSearchResults(prevResults => {
      const updatedResults = [...prevResults, addedTruck];
      console.log('Updated search results:', updatedResults);
      return updatedResults;
    });
    setShowAddForm(false);
  }, []);

  const handleDeleteFoodTruck = useCallback((truckId) => {
    console.log('handleDeleteFoodTruck called with:', truckId);
    if (typeof onDeleteFoodTruck !== 'function') {
      console.error('onDeleteFoodTruck is not a function:', onDeleteFoodTruck);
      return;
    }
    onDeleteFoodTruck(truckId, setFoodTrucks, setSearchResults, setSelectedTruck);
  }, []);

  const handleTruckClick = useCallback((truck) => {
    console.log('Truck clicked:', truck);
    setSelectedTruck(truck);
  }, []);

  const handleModeChange = useCallback((newMode) => {
    console.log('Mode changed to:', newMode);
    setMode(newMode);
    if (newMode === 'user') {
      setShowAddForm(false);
    }
  }, []);

  const handleUpdateTruck = useCallback((updatedTruck) => {
    console.log('Updating truck:', updatedTruck);
    setFoodTrucks(prevTrucks => {
      const updatedTrucks = prevTrucks.map(truck => truck.id === updatedTruck.id ? updatedTruck : truck);
      console.log('Updated food trucks:', updatedTrucks);
      return updatedTrucks;
    });
    setSearchResults(prevResults => {
      const updatedResults = prevResults.map(truck => truck.id === updatedTruck.id ? updatedTruck : truck);
      console.log('Updated search results:', updatedResults);
      return updatedResults;
    });
  }, []);

  useEffect(() => {
    debugRef.current.handleDeleteFoodTruck = handleDeleteFoodTruck;
    console.log('handleDeleteFoodTruck updated:', handleDeleteFoodTruck);
  }, [handleDeleteFoodTruck]);

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
          mode={mode}
        />
      )}
    </div>
  );
}