import { useState, useEffect } from 'react';

export default function useGeolocation(options) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState({});

  useEffect(() => {
    const successHandler = e => {
      setIsLoading(false);
      setError(null);
      setData(e.coords);
    };
    const errorHandler = e => {
      setError(e);
      setIsLoading(false);
    };
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
    const id = navigator.geolocation.watchPosition(successHandler, errorHandler, options);
    return () => navigator.geolocation.clearWatch(id);
  }, [options]);

  return { isLoading, error, data };
}
