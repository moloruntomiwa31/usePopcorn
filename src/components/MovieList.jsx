import MovieDetails from "./MovieDetails";

export default function MovieList({ movies, onMakeActiveMovie, activeMovie }) {
  return (
    <>
      {movies.map((movie) => (
        <div
          key={movie.id}
          onClick={() => onMakeActiveMovie(movie)}
          className={`shadow-lg rounded-lg p-4 mx-auto mt-4 cursor-pointer min-h-[100px] flex overflow-hidden hover:bg-gray-800 transition duration-300 hover:scale-105 ${
            activeMovie?.id === movie.id
              ? "bg-gray-700 scale-105"
              : "bg-gray-800"
          }`}
        >
          <MovieDetails movie={movie} />
        </div>
      ))}
    </>
  );
}
