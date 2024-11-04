import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Watchlist = ({ searchTerm }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/watchlist")
      .then((response) => {
        setWatchlist(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching watchlist:", error);
        setLoading(false);
      });
  }, []);

  const removeFromWatchlist = (movieId) => {
    axios
      .delete(
        "http://127.0.0.1:5000/watchlist/remove",
        { data: { movie_id: movieId } },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        alert(response.data.message);
        setWatchlist(watchlist.filter((movie) => movie.id !== movieId));
      })
      .catch((error) => {
        console.error("Error removing from watchlist:", error);
        alert("Failed to remove movie from watchlist.");
      });
  };

  const filteredWatchlist = watchlist.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading watchlist...</p>;
  }

  return (
    <div className="container mt-4">
      <h1>Watchlist</h1>
      {filteredWatchlist.length === 0 ? (
        <p>No movies found in watchlist.</p>
      ) : (
        <table className="table table-hover">
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
            {filteredWatchlist.map((movie) => (
              <tr key={movie.id}>
                <td>
                  {movie.poster_url ? (
                    <img
                      src={movie.poster_url}
                      alt={movie.title}
                      style={{ width: "100px" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{movie.title}</td>
                <td>{movie.overview}</td>
                <td>{movie.release_date}</td>
                <td>{movie.keywords}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromWatchlist(movie.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Watchlist;
