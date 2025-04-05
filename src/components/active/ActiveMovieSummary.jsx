export default function ActiveMovieSummary({ movie }) {
  return (
    <>
      {movie && (
        <div className="shadow-lg rounded-lg mx-auto px-6 py-3  bg-gray-800">
          <h2 className="text-lg font-bold">Summary</h2>
          <p>{movie.Plot || "No summary available."}</p>
          <h2 className="text-lg font-bold mt-4">Director</h2>
          <p>{movie.Director || "Unknown"}</p>
          <h2 className="text-lg font-bold mt-4">Actors</h2>
          <ul>{movie.Actors || "Unknown"}</ul>
        </div>
      )}
    </>
  );
}
