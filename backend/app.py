from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import requests
from flask_cors import CORS  # Import the CORS package


app = Flask(__name__)

#Enable CORS
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///movies.db'
db = SQLAlchemy(app)

# Define the Movies table
class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    overview = db.Column(db.String(500), nullable=False)
    release_date = db.Column(db.String(20), nullable=False)
    keywords = db.Column(db.String(500), nullable=False)  # Store keywords as a comma-separated string

# Define the Watchlist table
class Watchlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'), nullable=False)


# Initialize the database
with app.app_context():
    db.create_all()

# TMDB API Config
TMDB_API_KEY = '2d3766aac57697c71fddb3012862f6e3'
TMDB_API_URL = 'https://api.themoviedb.org/3/movie/'

# Function to fetch keywords for a movie
def fetch_keywords(movie_id):
    keywords_url = f'{TMDB_API_URL}{movie_id}/keywords?api_key={TMDB_API_KEY}'
    keywords_response = requests.get(keywords_url)
    if keywords_response.status_code == 200:
        keywords_data = keywords_response.json()['keywords']
        return ', '.join([keyword['name'] for keyword in keywords_data])
    return ""

# Route to fetch popular movies and insert them into SQLite
@app.route('/add_movies', methods=['GET'])
def add_movies():
    page = 1
    total_pages = 10  # You can adjust this to fetch more pages if needed
    added_movies = 0

    while page <= total_pages:
        popular_movies_url = f'{TMDB_API_URL}popular?api_key={TMDB_API_KEY}&page={page}'
        response = requests.get(popular_movies_url)

        if response.status_code == 200:
            movies_data = response.json()['results']
            for movie in movies_data:
                keywords = fetch_keywords(movie['id'])

                # Check if movie is already in the database
                existing_movie = Movie.query.filter_by(title=movie['title']).first()
                if not existing_movie:
                    new_movie = Movie(
                        title=movie['title'],
                        overview=movie['overview'],
                        release_date=movie['release_date'],
                        keywords=keywords
                    )
                    db.session.add(new_movie)
                    added_movies += 1

            db.session.commit()
            page += 1
        else:
            return jsonify({"error": "Failed to fetch movies from TMDB API"}), 500

    return jsonify({"message": f"{added_movies} movies added successfully!"}), 201

# Route to fetch all movies from the database
@app.route('/movies', methods=['GET'])
def get_movies():
    movies = Movie.query.all()
    movies_list = [{"title": movie.title, "overview": movie.overview, "release_date": movie.release_date, "keywords": movie.keywords} for movie in movies]
    return jsonify(movies_list)

# Route to add a movie to the watchlist
@app.route('/watchlist/add', methods=['POST'])
def add_to_watchlist():
    movie_id = requests.json.get('movie_id')
    if not movie_id:
        return jsonify({"error": "Movie ID is required"}), 400

    # Check if the movie is already in the watchlist
    existing_entry = Watchlist.query.filter_by(movie_id=movie_id).first()
    if existing_entry:
        return jsonify({"message": "Movie already in watchlist"}), 200

    new_watchlist_item = Watchlist(movie_id=movie_id)
    db.session.add(new_watchlist_item)
    db.session.commit()

    return jsonify({"message": "Movie added to watchlist"}), 201

# Route to remove a movie from the watchlist
@app.route('/watchlist/remove', methods=['DELETE'])
def remove_from_watchlist():
    movie_id = requests.json.get('movie_id')
    if not movie_id:
        return jsonify({"error": "Movie ID is required"}), 400

    watchlist_item = Watchlist.query.filter_by(movie_id=movie_id).first()
    if watchlist_item:
        db.session.delete(watchlist_item)
        db.session.commit()
        return jsonify({"message": "Movie removed from watchlist"}), 200

    return jsonify({"error": "Movie not found in watchlist"}), 404

# Route to fetch all movies in the watchlist
@app.route('/watchlist', methods=['GET'])
def get_watchlist():
    watchlist = Watchlist.query.all()
    watchlist_movies = []
    for item in watchlist:
        movie = Movie.query.get(item.movie_id)
        if movie:
            watchlist_movies.append({
                "id": movie.id,
                "title": movie.title,
                "overview": movie.overview,
                "release_date": movie.release_date,
                "keywords": movie.keywords
            })
    return jsonify(watchlist_movies)

if __name__ == '__main__':
    app.run(debug=True)
