export default function MovieDetails({ movie }) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className={`w-[80px] h-auto rounded-lg`}
      />
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-gray-100">{movie.Title}</h2>
        <div className="text-sm text-gray-300">
          <p className="flex items-center gap-1">
            <span>📅</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
