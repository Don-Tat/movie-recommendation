import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Fetch user's watchlist from backend
    const fetchWatchlist = async () => {
      const response = await axios.get(`/user-watchlist?user_id=1`);
      setWatchlist(response.data);
    };
    fetchWatchlist();
  }, []);

  return (
    <div>
      <h2>Your Watchlist</h2>
      <ul>
        {watchlist.map((movie) => (
          <li key={movie.id}>
            {movie.title} - {movie.watched ? 'Watched' : 'To Watch'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Watchlist;
