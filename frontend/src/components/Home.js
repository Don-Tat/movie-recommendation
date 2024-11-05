import React, { useState } from "react";
import axios from "axios";
import "bootswatch/dist/lux/bootstrap.min.css";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [customMovie, setCustomMovie] = useState({
    title: '',
    overview: '',
    release_date: '',
    keywords: '',
    poster: null,
  });

  const fetchMoreMovies = () => {
    setLoading(true);
    setMessage(""); // Clear previous messages

    axios.get("http://127.0.0.1:5000/add_movies")
      .then((response) => {
        setMessage(response.data.message);
        setLoading(false);
      })
      .catch((error) => {
        setMessage("Failed to fetch more movies.");
        console.error("Error fetching more movies:", error);
        setLoading(false);
      });
  };

  const handleMovieChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "poster") {
      setCustomMovie({ ...customMovie, poster: files[0] });
    } else {
      setCustomMovie({ ...customMovie, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', customMovie.title);
    formData.append('overview', customMovie.overview);
    formData.append('release_date', customMovie.release_date);
    formData.append('keywords', customMovie.keywords);
    formData.append('poster', customMovie.poster);

    axios.post('http://127.0.0.1:5000/add_custom_movie', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      setMessage(response.data.message);
      setShowForm(false);
    })
    .catch((error) => {
      console.error("Error adding movie:", error);
      setMessage("Failed to add movie.");
    });
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Welcome to the Movie Recommendation App</h1>
      <p className="lead">Explore the latest movies and manage your watchlist!</p>

      <button className="btn btn-primary mt-4" onClick={fetchMoreMovies} disabled={loading}>
        {loading ? "Fetching Movies..." : "Fetch Top Movies"}
      </button>

      <button className="btn btn-secondary mt-4" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Add Custom Movie"}
      </button>

      {showForm && (
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Title</label>
            <input type="text" className="form-control" name="title" value={customMovie.title} onChange={handleMovieChange} required />
          </div>
          <div className="mb-3">
            <label>Overview</label>
            <textarea className="form-control" name="overview" value={customMovie.overview} onChange={handleMovieChange} required></textarea>
          </div>
          <div className="mb-3">
            <label>Release Date</label>
            <input type="date" className="form-control" name="release_date" value={customMovie.release_date} onChange={handleMovieChange} required />
          </div>
          <div className="mb-3">
            <label>Keywords (comma-separated)</label>
            <input type="text" className="form-control" name="keywords" value={customMovie.keywords} onChange={handleMovieChange} />
          </div>
          <div className="mb-3">
            <label>Poster</label>
            <input type="file" className="form-control" name="poster" onChange={handleMovieChange} />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      )}

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Home;
