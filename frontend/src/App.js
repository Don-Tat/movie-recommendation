import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/movies')
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the movies!', error);
            });
    }, []);

    return (
        <div>
            <h1>Movie Recommendations</h1>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        {movie.title} ({movie.release_date ? movie.release_date.split('-')[0] : 'N/A'})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
