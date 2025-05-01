import { useState, useEffect, createContext, useContext } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";
import useMovies from "../hooks/useMovies";

const MoviesContext = createContext();

export default function MovieContext({ children }) {
  // State variables
  const [query, setQuery] = useState("");
  //fetch movies on render
  const { movies, setMovies, loading, error } = useMovies(query);

  // Local storage state for watched movies
  // Use custom hook to manage local storage state for watched movies
  const [watchedMovies, setWatchedMovies] = useLocalStorageState(
    [],
    "watchedMovies"
  );
  const [activeMovie, setActiveMovie] = useState(null);
  const [movieRating, setMovieRating] = useState(activeMovie?.userRating || 0);
  // Reset movieRating when activeMovie changes
  useEffect(() => {
    setMovieRating(activeMovie?.userRating || 0);
  }, [activeMovie]);

  // Function to handle setting the active movie
  const handleActiveMovie = (movie) => {
    setActiveMovie(movie);
  };

  // Function to handle rating changes
  const handleRating = (newRating) => {
    setMovieRating(newRating);
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === activeMovie.id
          ? { ...movie, userRating: newRating }
          : movie
      )
    );
    setActiveMovie({ ...activeMovie, userRating: newRating });
  };

  // Function to update the watched status of a movie
  const updateWatchlistStatus = (id, watchedStatus) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, watched: watchedStatus } : movie
      )
    );
    if (watchedStatus) {
      const movieToWatched = movies.find((movie) => movie.id === id);
      setWatchedMovies((prevWatched) => [...prevWatched, movieToWatched]);
    } else {
      setWatchedMovies((prevWatched) =>
        prevWatched.filter((movie) => movie.id !== id)
      );
    }
    setActiveMovie(null);
  };

  return (
    <MoviesContext.Provider
      value={{
        movies,
        setQuery,
        loading,
        error,
        activeMovie,
        handleActiveMovie,
        watchedMovies,
        updateWatchlistStatus,
        handleRating,
        movieRating,
        setActiveMovie,
        setMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export const useMovieContext = () => useContext(MoviesContext);
