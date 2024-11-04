import React, { useState } from "react";
import Home from "./components/Home";
import MovieList from "./components/MovieList";
import Watchlist from "./components/Watchlist";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
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
