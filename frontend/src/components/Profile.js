import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [watchlist, setWatchlist] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch user data (user_id can be stored in localStorage)
    const fetchWatchlist = async () => {
      const response = await axios.get(`/user-watchlist?user_id=1`);
      setWatchlist(response.data);
    };
    fetchWatchlist();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      <h3>Watchlist</h3>
      <ul>
        {watchlist.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
      <h3>Recommendations</h3>
      <ul>
        {recommendations.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
