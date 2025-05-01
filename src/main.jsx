import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import MovieContext from "./components/MovieContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MovieContext>
      <App />
    </MovieContext>
  </StrictMode>
);
