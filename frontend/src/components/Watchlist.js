import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/watchlist')
      .then(response => setWatchlist(response.data))
      .catch(error => console.error('Error fetching watchlist:', error));
  }, []);

  const removeFromWatchlist = (movieId) => {
    axios.delete(
      'http://127.0.0.1:5000/watchlist/remove',
      { data: { movie_id: movieId } },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then(response => {
      alert(response.data.message);
      setWatchlist(watchlist.filter(movie => movie.id !== movieId));
    })
    .catch(error => {
      console.error('Error removing from watchlist:', error);
      alert('Failed to remove movie from watchlist.');
    });
  };

  return (
    <div>
      <h1>Watchlist</h1>
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
          {watchlist.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.overview}</td>
              <td>{movie.release_date}</td>
              <td>{movie.keywords}</td>
              <td>
                <button onClick={() => removeFromWatchlist(movie.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Watchlist;
