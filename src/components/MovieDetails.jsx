export default function MovieDetails({ movie }) {
  return (
    <div className="flex items-start gap-4 w-full">
      {" "}
      <img
        src={movie.Poster}
        alt={movie.Title}
        className={`w-[80px] h-auto rounded-lg flex-shrink-0 object-cover`}
      />
      <div className="flex flex-col gap-1 flex-grow">
        {" "}
        <h2 className="text-lg font-bold text-gray-100"> {movie.Title}</h2>
        <div className="text-sm text-gray-400">
          {" "}
          <p className="flex items-center gap-1">
            <span>📅</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
