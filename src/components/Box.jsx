import { useState } from "react";

export default function Box({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section className="md:w-1/2 max-w-[500px] min-h-[100px] max-h-[450px] overflow-y-auto relative bg-gray-900 text-white p-4 m-4 rounded-lg shadow-md">
      <button
        className="w-8 h-8 grid place-content-center absolute top-4 right-4 bg-gray-700 text-white px-4 py-2 z-50 rounded-full shadow-md hover:bg-gray-600 transition duration-300 hover:scale-105 hover:shadow-lg hover:cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "➕" : "➖"}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          collapsed ? "max-h-0" : "min-h-full"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
