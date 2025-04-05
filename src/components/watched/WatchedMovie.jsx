export default function WatchedMovie({ movie, onRemoveFromWatchlist }) {
  return (
    <div className="relative flex items-center gap-4 shadow rounded-lg px-8 py-10 bg-gray-800 mb-4">
      <div className="flex items-start gap-4">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-[100px] h-auto rounded-lg mb-4"
        />
        <div>
          <h2 className="text-lg font-bold">{movie.Title}</h2>
          <p className="text-sm text-gray-500">📅 {movie.Year || "N/A"}</p>
          <p className="text-sm text-gray-500">⏱️ {movie.Runtime || "N/A"}</p>
          <p className="text-sm text-gray-500">🎭 {movie.Genre || "N/A"}</p>
          <p className="mt-1 text-sm">
            IMDB Rating:{" "}
            {movie.imdbRating ? `⭐${movie.imdbRating}` : "not available"}
          </p>
          <p className="mt-1 text-sm">
            Your Rating:{" "}
            {movie.userRating ? `🌟${movie.userRating}` : "not available"}
          </p>
        </div>
      </div>
      <button
        className="w-8 h-8 grid place-content-center absolute top-20 right-4 bg-gray-700 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-600 transition duration-300 hover:scale-105 hover:shadow-lg hover:cursor-pointer"
        onClick={() => onRemoveFromWatchlist(movie.id)}
      >
        ❌
      </button>
    </div>
  );
}
