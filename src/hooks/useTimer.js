import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for creating a timer countdown.
 *
 * @param {number} initialTime - The initial time in milliseconds.
 * @returns {number} - The time left in milliseconds.
 * @throws {Error} - If the initial time is less than 1000.
 */
export default function useTimer(initialTime) {
  const initialTimeRef = useRef(initialTime);
  const [timeLeft, setTimeLeft] = useState(initialTimeRef.current);

  const floored = Math.floor(initialTime / 1000);

  const intervalIdRef = useRef(null);
  const x = floored * 1000 - initialTime;
  const shouldNotSetInterval = timeLeft < x;

  useEffect(() => {
    let intervalId = intervalIdRef.current;
    const handleTimer = () => {
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1000);
    };

    intervalId = shouldNotSetInterval ? null : setInterval(handleTimer, 1000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalIdRef.current = null;
      }
    };
  }, [shouldNotSetInterval]);

  if (initialTimeRef.current !== initialTime && timeLeft < 0) {
    initialTimeRef.current = initialTime;
    setTimeLeft(initialTime);
    return timeLeft;
  }

  if (initialTimeRef.current === initialTime && timeLeft < x) {
    clearInterval(intervalIdRef.current);
    return 0;
  }

  return timeLeft;
}
