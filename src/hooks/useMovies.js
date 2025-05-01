  import { useEffect, useState } from "react";
  const KEY = "9b8d44a4";

  export default function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      const controller = new AbortController();
      const { signal } = controller;

      if (!query) return;
      setLoading(true);
      setError(null);
      const fetchMovies = async () => {
        try {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal }
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
          if (e.name !== "AbortError") {
            setError("Oops something went wrong. Please try again.");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchMovies();
      return () => {
        controller.abort();
      };
    }, [query]);

    return { movies, setMovies, loading, error };
  }
