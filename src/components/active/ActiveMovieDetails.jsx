export default function ActiveMovieDetails({ movie }) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className={`w-[150px] h-auto rounded-lg`}
      />
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-gray-100">{movie.Title}</h2>
        <div className="text-sm text-gray-300">
          <p className="flex items-center gap-1">
            <span>📅</span>
            <span>{movie.Year}</span>
          </p>
          <>
            {movie.Actors && (
              <div className="text-xs">
                <p className="flex items-center gap-1">
                  <span>⏱️</span>
                  <span>{movie.Runtime || "N/A"}</span>
                </p>
                <p className="flex items-center gap-1">
                  <span>🎭</span>
                  <span>{movie.Genre || "N/A"}</span>
                </p>
                <p className="flex items-center gap-1">
                  <span>🎬</span>
                  <span>{movie.Director || "N/A"}</span>
                </p>
                <p className="flex items-center gap-1">
                  <span>⭐</span>
                  <span>{`${movie.imdbRating} IMDB rating` || "N/A"}</span>
                </p>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
}
