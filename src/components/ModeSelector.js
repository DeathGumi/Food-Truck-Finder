import React, { useState } from 'react';
import { MoreVertical, User, Briefcase } from 'lucide-react';

const ModeSelector = ({ currentMode, onModeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleModeChange = (mode) => {
    onModeChange(mode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      >
        <MoreVertical size={24} />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" style={{ zIndex: 200000 }}>
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={() => handleModeChange('user')}
              className={`${
                currentMode === 'user' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } flex items-center px-4 py-2 text-sm w-full text-left`}
              role="menuitem"
            >
              <User className="mr-3 h-5 w-5" aria-hidden="true" />
              User Mode
            </button>
            <button
              onClick={() => handleModeChange('owner')}
              className={`${
                currentMode === 'owner' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } flex items-center px-4 py-2 text-sm w-full text-left`}
              role="menuitem"
            >
              <Briefcase className="mr-3 h-5 w-5" aria-hidden="true" />
              Owner Mode
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModeSelector;