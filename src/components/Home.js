'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SearchBar from './SearchBar';
import ListView from './ListView';
import { getAllFoodTrucks, searchFoodTrucks } from '../lib/foodTruckData';

const Map = dynamic(() => import('./Map'), { ssr: false });

export default function Home() {
  const [foodTrucks, setFoodTrucks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

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

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold mb-4">Food Truck Finder</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      <main className="flex flex-1 overflow-hidden">
        <section className="w-1/3 overflow-y-auto p-4 border-r">
          <ListView foodTrucks={searchResults} />
        </section>
        <section className="w-2/3">
          <Map foodTrucks={searchResults} />
        </section>
      </main>
    </div>
  );
}