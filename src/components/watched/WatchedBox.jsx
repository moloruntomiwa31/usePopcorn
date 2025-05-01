import WatchedMovie from "./WatchedMovie";
import WatchedSummary from "./WatchedSummary";
import { useMovieContext } from "../MovieContext";

export default function WatchedBox() {
  const { watchedMovies, updateWatchlistStatus } = useMovieContext();
  return (
    <>
      {watchedMovies.length > 0 ? (
        <>
          <WatchedSummary watchedMovies={watchedMovies} />
          {watchedMovies.map((movie) => (
            <WatchedMovie
              key={movie.id}
              movie={movie}
              onRemoveFromWatchlist={() =>
                updateWatchlistStatus(movie.id, false)
              }
            />
          ))}
        </>
      ) : (
        <h2 className="text-center text-2xl font-bold">
          No movies watched yet
        </h2>
      )}
    </>
  );
}
