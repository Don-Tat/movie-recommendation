import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to TMDB Movie App</h1>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link> | <Link to="/movies">Movie List</Link>
      </nav>
    </div>
  );
}

export default Home;
