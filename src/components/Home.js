'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from './Header';
import ListView from './ListView';
import { getAllFoodTrucks, searchFoodTrucks } from '../lib/foodTruckData';
import { useGeolocation } from '../hooks/useGeolocation';

const Map = dynamic(() => import('./Map'), { ssr: false });

export default function Home() {
  const [foodTrucks, setFoodTrucks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const { location, getCurrentLocation } = useGeolocation();
  const [mapCenter, setMapCenter] = useState(null);
  const [mapZoom, setMapZoom] = useState(13);

  useEffect(() => {
    const fetchFoodTrucks = async () => {
      const trucks = await getAllFoodTrucks();
      setFoodTrucks(trucks);
      setSearchResults(trucks);
    };
    fetchFoodTrucks();
  }, []);

  const handleSearch = async (term) => {
    if (term.trim() === '') {
      setSearchResults(foodTrucks);
    } else {
      const results = await searchFoodTrucks(term);
      setSearchResults(results);
    }
  };

  const handleLocateMe = () => {
    getCurrentLocation();
    if (location) {
      setMapCenter([location.latitude, location.longitude]);
      setMapZoom(15);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header onSearch={handleSearch} onLocateMe={handleLocateMe} />
      <main className="flex flex-1 overflow-hidden bg-white">
        <section className="w-1/3 overflow-y-auto p-4 border-r bg-white">
          <ListView foodTrucks={searchResults} />
        </section>
        <section className="w-2/3 bg-white">
          <Map foodTrucks={searchResults} center={mapCenter} zoom={mapZoom} />
        </section>
      </main>
    </div>
  );
}