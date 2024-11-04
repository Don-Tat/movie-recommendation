import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ setCurrentPage, setSearchTerm }) => {
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    if (isSearching) {
      // Clear search: reset search term and toggle search bar visibility
      setSearch('');
      setSearchTerm('');
      setIsSearching(false); // Show the search bar again
    } else {
      // Perform search: hide search bar and toggle to "Clear Search"
      setSearchTerm(search);
      setIsSearching(true); // Hide the search bar
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Make MovieApp clickable to navigate to the home page */}
        <a className="navbar-brand" href="#" onClick={() => setCurrentPage('home')}>
          MovieApp
        </a>
        <div className="navbar-nav">
          {/* Removed the Home button */}
          <button className="nav-link btn btn-dark" onClick={() => setCurrentPage('movies')}>
            Movie List
          </button>
          <button className="nav-link btn btn-dark" onClick={() => setCurrentPage('watchlist')}>
            Watchlist
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
