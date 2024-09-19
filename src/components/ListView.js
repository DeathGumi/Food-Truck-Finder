import React from 'react';

export default function ListView({ foodTrucks }) {
  return (
    <div className="grid grid-cols-1 gap-6 bg-white p-6">
      {foodTrucks.map(truck => (
        <div 
          key={truck.id} 
          className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
        >
          <h3 className="text-2xl font-bold mb-2 text-black">{truck.name}</h3>
          <p className="text-lg text-gray-700 mb-2">{truck.cuisine}</p>
          <p className="text-base text-gray-500">{truck.description}</p>
        </div>
      ))}
    </div>
  );
}