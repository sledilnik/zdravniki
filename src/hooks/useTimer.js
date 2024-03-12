import { useEffect, useState } from 'react';

/**
 * Custom hook for creating a timer countdown.
 *
 * @param {number} initialTime - The initial time in milliseconds.
 * @returns {number} - The time left in milliseconds.
 * @throws {Error} - If the initial time is less than 1000.
 */
export default function useTimer(initialTime) {
  if (initialTime < 1000) throw new Error('Initial time must be greater than 0');

  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const handleTimer = () => {
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1000);
    };

    const intervalId = setInterval(handleTimer, 1000);

    if (timeLeft <= 0) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return timeLeft;
}
