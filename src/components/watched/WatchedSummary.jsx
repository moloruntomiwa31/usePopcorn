export default function WatchedSummary({ watchedMovies }) {
  const totalMovies = watchedMovies.length;
  console.log(watchedMovies);
  return (
    <div className="grid gap-1 bg-gray-800 p-4 rounded-lg mb-4">
      <h2 className="font-bold uppercase">Movies you watched</h2>
      <div className="flex items-center gap-4">
        <p>
          🎥{totalMovies} {totalMovies > 1 ? "movies" : "movie"}
        </p>
        <p>
          🌟
          {watchedMovies.reduce(
            (total, movie) => total + Number(movie.userRating),
            0
          ) / totalMovies || "N/A"}{" "}
        </p>
        <p>
          ⌛
          {watchedMovies.reduce(
            (total, movie) => total + Number(movie.Runtime.split(" ")[0]),
            0
          )}{" "}
          mins
        </p>
      </div>
    </div>
  );
}
