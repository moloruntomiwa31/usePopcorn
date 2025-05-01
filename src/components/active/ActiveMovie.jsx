import { useState, useEffect } from "react";
import StarRating from "../StarRating";
import ActiveMovieSummary from "./ActiveMovieSummary";
import Error from "../Error";
import ActiveMovieDetails from "./ActiveMovieDetails";
import Loader from "../Loader";
const KEY = "9b8d44a4";
import { useMovieContext } from "../MovieContext";

export default function ActiveMovie() {
  const {
    activeMovie: movie,
    movieRating,
    handleRating,
    setActiveMovie,
    updateWatchListStatus,
    setMovies,
  } = useMovieContext();
  //states
  const [currentMovie, setCurrentMovie] = useState(movie);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //dispatch rating to parent component
  const handleSetRating = (newRating) => {
    handleRating(newRating);
  };

  //fetch movie details when active movie changes
  useEffect(() => {
    setLoading(true);
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&t=${movie.Title}`
        );
        const data = await res.json();
        if (data && data.Response === "True") {
          const updatedMovie = {
            ...data,
            id: movie.id,
            watched: movie.watched,
          };
          setCurrentMovie(updatedMovie);
          setMovies((prevMovies) =>
            prevMovies.map((m) => (m.id === movie.id ? updatedMovie : m))
          );
        } else {
          setError("Movie not found or invalid response");
        }
      } catch (e) {
        setError("An error occurred while fetching movie details");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [movie.Title]);

  //set document title when movie changes
  useEffect(() => {
    if (!currentMovie) return;
    document.title = `usePopcorn | ${currentMovie.Title}`;
    return () => {
      document.title = "usePopcorn";
    };
  }, [currentMovie]);

  return (
    <div className="grid gap-2">
      <div className="relative flex items-center gap-4 shadow rounded-lg px-8 py-10 bg-gray-800">
        <button
          className="w-8 h-8 grid place-content-center absolute top-0 left-4 bg-gray-700 px-4 py-2 rounded-full shadow-md hover:bg-gray-600 transition duration-300 hover:scale-105 hover:shadow-lg hover:cursor-pointer"
          onClick={() => setActiveMovie(null)}
        >
          ⬅️
        </button>
        {error ? (
          <Error message={error} />
        ) : loading ? (
          <Loader />
        ) : (
          <ActiveMovieDetails movie={currentMovie} />
        )}
      </div>

      <div className="w-full shadow-lg rounded-lg p-4 mx-auto bg-gray-800">
        <div className="flex flex-col items-center gap-1">
          <p className="text-center mb-2">Your Rating</p>
          <StarRating
            key={movie}
            maxRating={10}
            rating={movieRating}
            onSetMovieRating={handleSetRating}
          />
          <button
            className={`text-white px-4 py-2 rounded-full mt-4 mx-auto block transition duration-300 hover:scale-105 hover:shadow-lg hover:cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed ${
              movie.watched
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={
              movie.watched
                ? () => updateWatchListStatus(movie.id, false)
                : () => updateWatchListStatus(movie.id, true)
            }
            disabled={movieRating === 0}
          >
            {movie.watched ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        </div>
      </div>
      {error ? (
        <Error message={error} />
      ) : (
        <ActiveMovieSummary movie={currentMovie} />
      )}
    </div>
  );
}
