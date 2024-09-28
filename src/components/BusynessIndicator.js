import React from 'react';

const BusynessIndicator = ({ level }) => {
  const getColor = () => {
    switch (level) {
      case 'busy':
        return 'bg-red-100 text-red-800';
      case 'regular':
        return 'bg-yellow-100 text-yellow-800';
      case 'slow':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getText = () => {
    switch (level) {
      case 'busy':
        return 'Busy';
      case 'regular':
        return 'Regular';
      case 'slow':
        return 'Not Busy';
      default:
        return 'Unknown';
    }
  };

  return (
    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getColor()}`}>
      {getText()}
    </span>
  );
};

export default BusynessIndicator;