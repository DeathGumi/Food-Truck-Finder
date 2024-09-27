import React, { useState } from 'react';

const FilterBar = ({ onFilterChange }) => {
  const [priceFilter, setPriceFilter] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [timeFilter, setTimeFilter] = useState('');

  const handleFilterChange = () => {
    onFilterChange({
      price: priceFilter,
      cuisine: cuisineFilter,
      rating: ratingFilter,
      time: timeFilter,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2">Filters</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">All</option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cuisine</label>
          <input
            type="text"
            value={cuisineFilter}
            onChange={(e) => setCuisineFilter(e.target.value)}
            placeholder="Enter cuisine"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Minimum Rating</label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.5"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(parseFloat(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Open Now</label>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">All</option>
            <option value="open">Open Now</option>
          </select>
        </div>
      </div>
      <button
        onClick={handleFilterChange}
        className="mt-4 w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition duration-200"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterBar;