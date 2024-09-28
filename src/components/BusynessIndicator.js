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
    <span className="relative inline-block">
      <span className={`relative z-10 inline-block px-2 py-1 text-xs font-semibold rounded-full ${getColor()}`}>
        {getText()}
      </span>
      <span className="absolute inset-0 rounded-full animate-rainbow-border"></span>
      <style jsx>{`
        @keyframes rainbow-border {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-rainbow-border {
          background: linear-gradient(45deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
          background-size: 200% 200%;
          animation: rainbow-border 3s linear infinite;
          filter: blur(3px);
          opacity: 0.7;
        }
      `}</style>
    </span>
  );
};

export default BusynessIndicator;