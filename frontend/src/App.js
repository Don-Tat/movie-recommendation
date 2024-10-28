import React from 'react';
import './App.css';
import MovieList from './components/MovieList';
import Watchlist from './components/Watchlist';

function App() {
  return (
    <div className="App">
      <MovieList />
      <Watchlist />
    </div>
  );
}

export default App;
