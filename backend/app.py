from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

TMDB_API_KEY = '2d3766aac57697c71fddb3012862f6e3'  # Replace with your actual TMDB API key
TMDB_BASE_URL = 'https://api.themoviedb.org/3'

@app.route('/api/movies', methods=['GET'])
def get_movies():
    # Example: Fetch popular movies from TMDB
    endpoint = f"{TMDB_BASE_URL}/movie/popular?api_key={TMDB_API_KEY}&language=en-US&page=1"

    try:
        response = requests.get(endpoint)
        response.raise_for_status()  # Raise an error for bad responses
        movies = response.json()['results']  # Get the list of movies from the response
        return jsonify(movies)  # Return the movies in JSON format
    except requests.exceptions.HTTPError as err:
        return jsonify({"error": str(err)}), 500

if __name__ == '__main__':
    app.run(debug=True)
