import React from 'react';
import Home from './components/Home'
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Watchlist from './components/Watchlist';
import Recommendations from './components/Recommendations';
import MovieList from './components/MovieList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Other imports

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/movie-list" element={<MovieList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
