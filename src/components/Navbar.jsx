import { useState, useRef, useEffect } from "react";
import { useMovieContext } from "./MovieContext";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  const { movies, setQuery } = useMovieContext();

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  function handleChange(e) {
    setSearch(e.target.value);
    setQuery(e.target.value);
  }

  return (
    <nav className="bg-purple-600 text-white flex flex-col gap-4 md:gap-4 md:flex-row justify-between items-center py-4 px-4 sm:px-6 md:px-8 lg:px-12 mx-auto mt-4 rounded-lg shadow-md lg:max-w-4xl">
      {" "}
      <div className="flex items-center flex-shrink-0">
        <span role="img" aria-label="Popcorn emoji" className="text-2xl mr-2">
          🍿
        </span>
        <p className="text-xl font-bold whitespace-nowrap">usePopcorn</p>
      </div>
      <div className="w-full md:w-auto flex justify-center">
        <input
          ref={searchRef}
          placeholder="Search movies..."
          className="shadow bg-purple-500 px-4 py-2 rounded-lg placeholder:text-purple-200 border-none outline-none w-full max-w-sm md:w-72 lg:w-80 focus:ring-2 focus:ring-purple-300 transition-colors duration-200" // Added focus ring, adjusted colors, max-width
          value={search}
          onChange={handleChange}
        />
      </div>
      <div className="text-center md:text-right min-w-[100px] flex-shrink-0">
        <p className="text-sm">Found {movies.length} results</p>
      </div>
    </nav>
  );
}
