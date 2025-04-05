import WatchedMovie from "./WatchedMovie";
import WatchedSummary from "./WatchedSummary";

export default function WatchedBox({ watchedMovies, onRemoveFromWatchlist }) {
  return (
    <>
      {watchedMovies.length > 0 ? (
        <>
          <WatchedSummary watchedMovies={watchedMovies} />
          {watchedMovies.map((movie) => (
            <WatchedMovie
              key={movie.id}
              movie={movie}
              onRemoveFromWatchlist={onRemoveFromWatchlist}
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
