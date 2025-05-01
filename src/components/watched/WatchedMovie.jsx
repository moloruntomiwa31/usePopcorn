export default function WatchedMovie({ movie, onRemoveFromWatchlist }) {
  return (
<div className="relative flex flex-col sm:flex-row items-center gap-4 shadow rounded-lg px-4 py-4 sm:px-6 bg-gray-800 mb-4">
  <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-4">
    <img
      src={movie.Poster}
      alt={movie.Title}
      className="w-[80px] sm:w-[100px] h-auto rounded-lg flex-shrink-0 object-cover"
    />
    <div className="text-center sm:text-left w-full">
      <h2 className="text-lg font-bold">{movie.Title}</h2>
      <p className="text-sm text-gray-500">
        {movie.Year || "N/A"} <span className="mx-1">|</span> {movie.Runtime || "N/A"} <span className="mx-1">|</span> {movie.Genre || "N/A"}
      </p>
      <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1">
        <p className="text-sm">
          IMDB:{" "}
          {movie.imdbRating ? `⭐ ${movie.imdbRating}` : "N/A"}
        </p>
        <p className="text-sm">
          Your Rating:{" "}
          {movie.userRating ? `🌟 ${movie.userRating}` : "N/A"}
        </p>
      </div>
    </div>
  </div>

  <button
    className="absolute top-3 right-3 w-7 h-7 grid place-content-center bg-red-700 cursor-pointer text-white rounded-full shadow hover:bg-red-600 transition duration-300 hover:scale-105"
    onClick={() => onRemoveFromWatchlist(movie.id)}
    aria-label={`Remove ${movie.Title} from watchlist`} 
  >
    <span className="text-xs font-bold">X</span> 
  </button>
</div>
  );
}
