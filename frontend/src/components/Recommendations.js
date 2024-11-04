// Recommendations.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recommendations initially
  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = () => {
    setLoading(true);
    setRecommendations([]); // Reset recommendations before fetching
    axios
      .get("http://127.0.0.1:5000/recommendations")
      .then((response) => {
        setRecommendations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
        alert("Failed to fetch recommendations.");
        setLoading(false);
      });
};

  const addToWatchlist = (movieId) => {
    axios
      .post("http://127.0.0.1:5000/watchlist/add", { movie_id: movieId })
      .then((response) => {
        alert(response.data.message);
        // Update recommendations with the new list from the response
        setRecommendations(response.data.recommendations);
      })
      .catch((error) => {
        console.error("Error adding to watchlist:", error);
        alert("Failed to add movie to watchlist.");
      });
  };

  if (loading) {
    return <p>Loading recommendations...</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Recommendations</h1>
      {recommendations.length === 0 ? (
        <p className="text-center">No recommendations available.</p>
      ) : (
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Overview</th>
              <th>Release Date</th>
              <th>Keywords</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((movie) => (
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
                    className="btn btn-primary"
                    onClick={() => addToWatchlist(movie.id)}
                  >
                    Add to Watchlist
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

export default Recommendations;
