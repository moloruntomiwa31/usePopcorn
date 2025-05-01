import Navbar from "./components/Navbar";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedBox from "./components/watched/WatchedBox";
import ActiveMovie from "./components/active/ActiveMovie";
import Loader from "./components/Loader";
import Error from "./components/Error";
import { useMovieContext } from "./components/MovieContext";

export default function App() {
  const { loading, error, activeMovie } = useMovieContext();
  return (
    <div className="bg-gray-950">
      <Navbar />
      <main className="flex flex-col md:flex-row h-screen text-white lg:max-w-[968px] mx-auto">
        <Box>
          {loading && <Loader />}
          {!loading && !error && <MovieList />}
          {error && <Error />}
        </Box>
        <Box>{activeMovie ? <ActiveMovie /> : <WatchedBox />}</Box>
      </main>
    </div>
  );
}
