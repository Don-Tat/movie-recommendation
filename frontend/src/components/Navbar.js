// Navbar.js
import React, { useState } from "react";
import "bootswatch/dist/lux/bootstrap.min.css";

const Navbar = ({ setCurrentPage, setSearchTerm }) => {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    if (isSearching) {
      setSearch("");
      setSearchTerm("");
      setIsSearching(false);
    } else {
      setSearchTerm(search);
      setIsSearching(true);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#"
          onClick={() => setCurrentPage("home")}
        >
          MovieApp
        </a>
        <div className="navbar-nav">
          <button
            className="nav-link btn btn-dark"
            onClick={() => setCurrentPage("movies")}
          >
            Movie List
          </button>
          <button
            className="nav-link btn btn-dark"
            onClick={() => setCurrentPage("watchlist")}
          >
            Watchlist
          </button>
          <button
            className="nav-link btn btn-dark"
            onClick={() => setCurrentPage("recommendations")}
          >
            Recommendations
          </button>
        </div>
        <div className="d-flex ms-auto">
          {isSearching ? (
            <button className="btn btn-outline-danger" onClick={handleSearch}>
              Clear Search
            </button>
          ) : (
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
