// App.js
import React, { useState } from "react";
import Home from "./components/Home";
import MovieList from "./components/MovieList";
import Watchlist from "./components/Watchlist";
import Recommendations from "./components/Recommendations"; // Import Recommendations component
import Navbar from "./components/Navbar";
import "bootswatch/dist/lux/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "movies":
        return <MovieList searchTerm={searchTerm} />;
      case "watchlist":
        return <Watchlist searchTerm={searchTerm} />;
      case "recommendations":
        return <Recommendations />; // Render Recommendations page
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Navbar setCurrentPage={setCurrentPage} setSearchTerm={setSearchTerm} />
      {renderPage()}
    </div>
  );
};

export default App;
