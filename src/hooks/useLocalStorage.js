import { useState } from 'react';

/**
 * Custom hook to store and retrieve values in local storage.
 *
 * @param {string} key - The key to use for storing the value in local storage.
 * @param {*} initialValue - The initial value to use if no value is found in local storage.
 * @returns {Array} - An array containing the current value and a function to update the value.
 */
function useLocalStorage(key, initialValue) {
  // Get stored value from local storage or use initial value
  const storedValue = JSON.parse(localStorage.getItem(key)) || initialValue;

  // State to hold the current value
  const [value, setValue] = useState(storedValue);

  // Update local storage and state when the value changes
  const updateValue = newValue => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, updateValue];
}

export default useLocalStorage;
