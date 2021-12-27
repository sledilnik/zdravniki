import { useState, useEffect } from 'react';

const useFetchTs = function useFetchTs(url) {
  // todo save to local || session storage
  const [ts, setTs] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const myHeaders = new Headers();
    // myHeaders.append('pragma', 'no-cache');
    // myHeaders.append('cache-control', 'no-cache');

    const myInit = {
      method: 'GET',
      headers: myHeaders,
    };
    const fetchTs = async () => {
      setIsFetching(true);
      // if (error) {
      //   setError(false);
      // }
      try {
        const response = await fetch(url, myInit);
        const result = await response.json();
        setTs(result);
      } catch (err) {
        setError(true);
      } finally {
        setIsFetching(false);
      }
    };

    fetchTs();
  }, [error, url]);

  return { ts, isFetching, error };
};

export default useFetchTs;
