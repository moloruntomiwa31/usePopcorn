import Navbar from "./components/Navbar";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedBox from "./components/watched/WatchedBox";
import { useState, useEffect } from "react";
import ActiveMovie from "./components/active/ActiveMovie";
import Loader from "./components/Loader";
import Error from "./components/Error";
import useMovies from "./hooks/useMovies";
import useLocalStorageState from "./hooks/useLocalStorageState";

export default function App() {
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
    <div className="bg-gray-950">
      <Navbar
        result={movies.length}
        onSearchQuery={(query) => setQuery(query)}
      />
      <main className="flex flex-col md:flex-row h-screen text-white lg:max-w-[968px] mx-auto">
        <Box>
          {loading && <Loader />}
          {!loading && !error && (
            <MovieList
              movies={movies}
              onMakeActiveMovie={handleActiveMovie}
              activeMovie={activeMovie}
            />
          )}
          {error && <Error message={error} />}
        </Box>
        <Box>
          {activeMovie ? (
            <ActiveMovie
              movie={activeMovie}
              onSetRating={handleRating}
              movieRating={movieRating}
              onNoActiveMovie={() => setActiveMovie(null)}
              onAddToWatchlist={(id) => updateWatchlistStatus(id, true)}
              onRemoveFromWatchlist={(id) => updateWatchlistStatus(id, false)}
              onReplaceMovie={(newMovie) => {
                setMovies((prevMovies) =>
                  prevMovies.map((movie) =>
                    movie.id === activeMovie.id ? newMovie : movie
                  )
                );
              }}
            />
          ) : (
            <WatchedBox
              watchedMovies={watchedMovies}
              onRemoveFromWatchlist={(id) => updateWatchlistStatus(id, false)}
            />
          )}
        </Box>
      </main>
    </div>
  );
}
