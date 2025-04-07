import Navbar from "./components/Navbar";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedBox from "./components/watched/WatchedBox";
import { useState, useEffect } from "react";
import ActiveMovie from "./components/active/ActiveMovie";
import Loader from "./components/Loader";
import Error from "./components/Error";
const KEY = "9b8d44a4";

export default function App() {
  // State variables
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [watchedMovies, setWatchedMovies] = useState(() => {
    const storedMovies = localStorage.getItem("watchedMovies");
    return storedMovies ? JSON.parse(storedMovies) : [];
  });
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

  useEffect(() => {
    localStorage.setItem("watchedMovies", JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  //fetch movies on render
  useEffect(() => {
    setLoading(true);
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        const data = await res.json();
        if (data.Search) {
          const updatedMovies = data.Search.map((movie) => ({
            ...movie,
            id: Math.random() * 1000, // Generate unique ID
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
