import { useState, useEffect } from 'react';

/**
 * Debounces a fast-changing value (e.g. search input) so consumers only
 * react after the user has paused typing for `delay` ms.
 */
const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
