import { useState, useCallback } from 'react';

export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getCurrentLocation = useCallback((callback) => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      if (callback) callback(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        if (callback) callback(true);
      },
      () => {
        setError('Unable to retrieve your location');
        if (callback) callback(false);
      }
    );
  }, []);

  return { location, error, getCurrentLocation };
}