import { useEffect, useState } from "react";
const KEY = "9b8d44a4";

export default function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        const data = await res.json();
        if (data.Search) {
          const updatedMovies = data.Search.map((movie) => ({
            ...movie,
            id: Math.random() * 1000,
            watched: false,
          }));
          setMovies(updatedMovies);
        }
      } catch (e) {
        setError("An error occurred while fetching movies");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [query]);

  return {movies, setMovies, loading, error};
}
