import { useMovieContext } from "./MovieContext";

export default function Error() {
  const { error } = useMovieContext();
  return (
    <div>
      <p className="text-center text-red-500">{error}</p>
    </div>
  );
}
