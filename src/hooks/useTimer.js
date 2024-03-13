import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for a timer.
 *
 * @param {number} initialTime - The initial time for the timer in milliseconds.
 * @returns {number} - The time left in milliseconds.
 */
export default function useTimer(initialTime) {
  const initialTimeRef = useRef(initialTime);
  const [timeLeft, setTimeLeft] = useState(initialTimeRef.current);

  const intervalIdRef = useRef(null);
  const resetValue = initialTime - Math.floor(initialTime / 1000) * 1000;
  const isTimeLeftValid = timeLeft > -resetValue;

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

  if (initialTimeRef.current !== initialTime && timeLeft <= resetValue) {
    initialTimeRef.current = initialTime;
    setTimeLeft(initialTime);
    return timeLeft;
  }

  return timeLeft;
}
