import { useState, useEffect } from "react";

export default function useLocalStorageState(initialValue, key) {
  const [value, setValue] = useState(() => {
    const storedMovies = localStorage.getItem(key);
    return storedMovies ? JSON.parse(storedMovies) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
