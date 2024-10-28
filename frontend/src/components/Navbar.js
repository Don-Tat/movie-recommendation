import React from 'react';

const Navbar = ({ setCurrentPage }) => {
  return (
    <nav>
      <ul>
        <li>
          <button onClick={() => setCurrentPage('home')}>Home</button>
        </li>
        <li>
          <button onClick={() => setCurrentPage('movies')}>Movie List</button>
        </li>
        <li>
          <button onClick={() => setCurrentPage('watchlist')}>Watchlist</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
