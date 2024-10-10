import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const response = await axios.get(`/recommendations?user_id=1`);
      setRecommendations(response.data);
    };
    fetchRecommendations();
  }, []);

  return (
    <div>
      <h2>Recommended Movies</h2>
      <ul>
        {recommendations.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;
