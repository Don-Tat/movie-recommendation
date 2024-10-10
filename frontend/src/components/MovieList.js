import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get('/movies');
      setMovies(response.data);
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Movie List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Rating</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.rating}</td>
              <td>{movie.release_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MovieList;
