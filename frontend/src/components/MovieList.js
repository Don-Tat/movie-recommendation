import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const addToWatchlist = (movieId) => {
    axios.post('http://127.0.0.1:5000/watchlist/add', { movie_id: movieId })
      .then(response => alert(response.data.message))
      .catch(error => console.error('Error adding to watchlist:', error));
  };

  return (
    <div>
      <h1>Movie List</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Overview</th>
            <th>Release Date</th>
            <th>Keywords</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.overview}</td>
              <td>{movie.release_date}</td>
              <td>{movie.keywords}</td>
              <td>
                <button onClick={() => addToWatchlist(movie.id)}>Add to Watchlist</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;
