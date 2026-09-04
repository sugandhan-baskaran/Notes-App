import { useState, useEffect } from 'react';

/**
 * Behaves like useState, but keeps its value mirrored to localStorage
 * under `key` so it survives a page refresh.
 *
 * The read happens once on mount (lazy initializer), and every
 * subsequent update is written back to localStorage automatically.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      // Corrupt or inaccessible storage shouldn't crash the app —
      // fall back to the caller's default instead.
      console.error(`Could not read localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Could not write localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
