import React from 'react';
import { Circle } from 'lucide-react';

const BusynessIndicator = ({ level }) => {
  const getColor = () => {
    switch (level) {
      case 'busy':
        return 'text-red-500';
      case 'regular':
        return 'text-yellow-500';
      case 'slow':
        return 'text-green-500';
      default:
        return 'text-gray-500';
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
    <div className="flex items-center space-x-1">
      <Circle className={`w-4 h-4 ${getColor()} animate-pulse`} />
      <span className="text-sm font-medium">{getText()}</span>
    </div>
  );
};

export default BusynessIndicator;