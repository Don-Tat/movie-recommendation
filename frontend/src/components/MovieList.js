import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootswatch/dist/lux/bootstrap.min.css";

const MovieList = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMovie, setEditMovie] = useState(null);  // Movie to be edited
  const [editedFields, setEditedFields] = useState({});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/movies")
      .then((response) => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, []);

  const addToWatchlist = (movieId) => {
    axios.post("http://127.0.0.1:5000/watchlist/add", { movie_id: movieId })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error adding to watchlist:", error);
      });
  };

  const deleteMovie = (movieId) => {
    axios.delete(`http://127.0.0.1:5000/movies/${movieId}`)
      .then((response) => {
        setMovies(movies.filter(movie => movie.id !== movieId));
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
      });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedFields({ ...editedFields, [name]: value });
  };

  const saveEdit = (movieId) => {
    axios.put(`http://127.0.0.1:5000/movies/${movieId}`, editedFields)
      .then((response) => {
        setMovies(movies.map(movie => movie.id === movieId ? { ...movie, ...editedFields } : movie));
        setEditMovie(null);
      })
      .catch((error) => {
        console.error("Error editing movie:", error);
      });
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading movies...</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Movie List</h1>
      {filteredMovies.length === 0 ? (
        <p className="text-center">No movies found.</p>
      ) : (
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Poster</th>
              <th scope="col">Title</th>
              <th scope="col">Overview</th>
              <th scope="col">Release Date</th>
              <th scope="col">Keywords</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie) => (
              <tr key={movie.id}>
                <td>
                  {movie.poster_url ? (
                    <img src={movie.poster_url} alt={movie.title} style={{ width: '100px' }} />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                  {editMovie === movie.id ? (
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      defaultValue={movie.title}
                      onChange={handleEditChange}
                    />
                  ) : (
                    movie.title
                  )}
                </td>
                <td>
                  {editMovie === movie.id ? (
                    <textarea
                      name="overview"
                      className="form-control"
                      defaultValue={movie.overview}
                      onChange={handleEditChange}
                    />
                  ) : (
                    movie.overview
                  )}
                </td>
                <td>
                  {editMovie === movie.id ? (
                    <input
                      type="date"
                      name="release_date"
                      className="form-control"
                      defaultValue={movie.release_date}
                      onChange={handleEditChange}
                    />
                  ) : (
                    movie.release_date
                  )}
                </td>
                <td>
                  {editMovie === movie.id ? (
                    <input
                      type="text"
                      name="keywords"
                      className="form-control"
                      defaultValue={movie.keywords}
                      onChange={handleEditChange}
                    />
                  ) : (
                    movie.keywords
                  )}
                </td>
                <td>
                  <div className="btn-group-vertical">
                    {editMovie === movie.id ? (
                      <>
                        <button
                          className="btn btn-success btn-block"
                          onClick={() => saveEdit(movie.id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-block"
                          onClick={() => setEditMovie(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-warning btn-block"
                          onClick={() => setEditMovie(movie.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-block"
                          onClick={() => deleteMovie(movie.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-primary btn-block"
                          onClick={() => addToWatchlist(movie.id)}
                        >
                          Add to Watchlist
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MovieList;
