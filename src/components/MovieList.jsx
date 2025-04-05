import MovieDetails from "./MovieDetails";

export default function Movie({ movies, onMakeActiveMovie, activeMovie }) {
  return (
    <>
      {movies.map((movie) => (
        <div
          key={movie.id}
          role="button"
          onClick={() => onMakeActiveMovie(movie)}
          className={`shadow-lg rounded-lg p-4 mx-auto mt-4 cursor-pointer h-40 hover:bg-gray-800 transition duration-300 hover:scale-105 ${
            activeMovie?.id === movie.id ? "bg-gray-800 scale-105" : ""
          }`}
        >
          <MovieDetails movie={movie} />
        </div>
      ))}
    </>
  );
}
