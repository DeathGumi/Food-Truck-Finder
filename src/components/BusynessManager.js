import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';

const BusynessContext = createContext();

export const useBusyness = () => useContext(BusynessContext);

export const BusynessProvider = ({ children }) => {
  const [busynessLevels, setBusynessLevels] = useState({});
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  const calculateBusyness = useCallback(() => {
    const now = new Date();
    const day = now.getDay(); 
    const hour = now.getHours();

    // Weekend logic (Busy on weekends)
    if (day === 0 || day === 5 || day === 6) {
      if (hour >= 11 && hour <= 21) {
        return Math.random() < 0.7 ? 'busy' : 'regular';
      }
    }

    // Weekday logic
    if (day >= 1 && day <= 4) {
      // Lunch rush (Usually busy on lunch rush)
      if (hour >= 11 && hour <= 14) {
        return Math.random() < 0.8 ? 'busy' : 'regular';
      }
      // Evening rush (Usually busy when people get out of work or late night)
      if (hour >= 17 && hour <= 20) {
        return Math.random() < 0.6 ? 'busy' : 'regular';
      }
    }

    // More likely to be regular or slow
    const rand = Math.random();
    if (rand < 0.6) return 'regular';
    if (rand < 0.9) return 'slow';
    return 'busy';
  }, []);

  const initializeBusynessLevels = useCallback((trucks) => {
    const levels = {};
    trucks.forEach(truck => {
      levels[truck.id] = calculateBusyness();
    });
    setBusynessLevels(levels);
  }, [calculateBusyness]);

  const updateBusynessLevels = useCallback(() => {
    const newHour = new Date().getHours();
    if (newHour !== currentHour) {
      setCurrentHour(newHour);
      setBusynessLevels(prevLevels => {
        const newLevels = { ...prevLevels };
        Object.keys(newLevels).forEach(id => {
          newLevels[id] = calculateBusyness();
        });
        return newLevels;
      });
    } else {
      setBusynessLevels(prevLevels => {
        const newLevels = { ...prevLevels };
        Object.keys(newLevels).forEach(id => {
          if (Math.random() < 0.1) { // 10% chance to change busyness level within the same hour (More likely to stay on the current level of busyness)
            newLevels[id] = calculateBusyness();
          }
        });
        return newLevels;
      });
    }
  }, [calculateBusyness, currentHour]);

  useEffect(() => {
    const interval = setInterval(updateBusynessLevels, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, [updateBusynessLevels]);

  return (
    <BusynessContext.Provider value={{ busynessLevels, initializeBusynessLevels }}>
      {children}
    </BusynessContext.Provider>
  );
};