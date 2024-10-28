import React, { useState } from 'react';
import Home from './components/Home';
import MovieList from './components/MovieList';
import Watchlist from './components/Watchlist';
import Navbar from './components/Navbar';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'movies':
        return <MovieList />;
      case 'watchlist':
        return <Watchlist />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <Navbar setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

export default App;
