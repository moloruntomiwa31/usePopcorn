import { useState } from "react";

export default function Navbar({ result, onSearchQuery }) {
  const [search, setSearch] = useState("");

  function handleChange(e) {
    setSearch(e.target.value);
    onSearchQuery(e.target.value);
  }

  return (
    <nav className="bg-purple-600 text-white flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center py-4 px-12 mx-auto my-4 rounded-lg shadow-md lg:max-w-[968px]">
      <div className="flex items-center ">
        <span role="img" className="text-xl">
          🍿
        </span>
        <p className="text-xl font-bold">usePopcorn</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search movies..."
          className="shadow bg-gray-700 px-6 py-2 rounded-lg placeholder:text-gray-100 border-none outline-none min-w-80"
          value={search}
          onChange={handleChange}
        />
      </div>
      <div>
        <p>Found {result} results</p>
      </div>
    </nav>
  );
}
