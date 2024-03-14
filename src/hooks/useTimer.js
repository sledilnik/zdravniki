import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for a timer.
 *
 * @param {number} initialTime - The initial time for the timer in milliseconds.
 * @returns {number} - The time left in milliseconds.
 */
export default function useTimer(initialTime) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

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

  if (timeLeft < 0) {
    clearInterval(intervalIdRef.current);
  }

  return [timeLeft, setTimeLeft];
}
