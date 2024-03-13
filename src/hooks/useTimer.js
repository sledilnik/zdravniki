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

  const intervalIdRef = useRef(null);
  const isTimeLeftValid = timeLeft >= 0;

  useEffect(() => {
    let intervalId = intervalIdRef.current;
    const handleTimer = () => {
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1000);
    };

    intervalId = isTimeLeftValid ? setInterval(handleTimer, 1000) : null;

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalIdRef.current = null;
      }
    };
  }, [isTimeLeftValid]);

  const resetValue = initialTime - Math.floor(initialTime / 1000) * 1000;

  if (initialTimeRef.current !== initialTime && timeLeft <= resetValue) {
    initialTimeRef.current = initialTime;
    setTimeLeft(initialTime);
    return timeLeft;
  }

  return timeLeft;
}
