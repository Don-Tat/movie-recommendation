from flask import Flask, request, jsonify
import sqlite3
import requests

app = Flask(__name__)

# Initialize Database
def init_db():
    conn = sqlite3.connect('movies.db')
    c = conn.cursor()

    # Create Movies table
    c.execute('''
        CREATE TABLE IF NOT EXISTS movies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            movie_id INTEGER UNIQUE,
            title TEXT,
            rating REAL,
            release_date TEXT,
            overview TEXT,
            genre TEXT
            watched BOOLEAN DEFAULT 0
        )
    ''')

    # Create User watchlist table
    c.execute('''
        CREATE TABLE IF NOT EXISTS watchlist (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            movie_id INTEGER,
            watched BOOLEAN DEFAULT 0
        )
    ''')
    # Create a User recommendation table
    c.execute('''
        CREATE TABLE IF NOT EXISTS recommendations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            movie_id INTEGER,
            watched BOOLEAN DEFAULT 0
        )
    ''')
    # Create a User table
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT,
            email TEXT UNIQUE,
            password TEXT
        )
    ''')
    # Commit and close the connection

    conn.commit()
    conn.close()

# Call this function to initialize the DB
init_db()

# TMDB API Configurations
TMDB_API_KEY = '2d3766aac57697c71fddb3012862f6e3'  # Replace with your TMDB API key
TMDB_BASE_URL = 'https://api.themoviedb.org/3'

# Fetch movies from TMDB
@app.route('/fetch-movies', methods=['GET'])
def fetch_movies():
    movie_title = request.args.get('title')  # Movie title can be passed as a query param
    url = f'{TMDB_BASE_URL}/search/movie?api_key={TMDB_API_KEY}&query={movie_title}'

    response = requests.get(url)
    data = response.json()

    if 'results' in data:
        # Insert movies into SQLite database
        for movie in data['results']:
            store_movie_in_db(movie)
        return jsonify({"message": "Movies fetched and stored successfully!"})
    else:
        return jsonify({"error": "No movies found!"}), 404

# Helper function to store movies in DB
def store_movie_in_db(movie):
    conn = sqlite3.connect('movies.db')
    c = conn.cursor()

    try:
        c.execute('''
            INSERT INTO movies (movie_id, title, rating, release_date, overview, genre)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            movie['id'],
            movie['title'],
            movie.get('vote_average', 0),
            movie.get('release_date', 'N/A'),
            movie.get('overview', ''),
            ', '.join([genre['name'] for genre in movie.get('genre_ids', [])])  # Simplified genre storage
        ))
        conn.commit()
    except sqlite3.IntegrityError:
        print(f"Movie {movie['title']} already exists in the database.")

    conn.close()

# Create a new user and store in the database
@app.route('/create-user', methods=['POST'])
def create_user():
    data = request.json
    conn = sqlite3.connect('movies.db')
    c = conn.cursor()

    try:
        c.execute('''
            INSERT INTO users (user, email, password)
            VALUES (?, ?, ?)
        ''', (data['user'], data['email'], data['password']))
        conn.commit()
        conn.close()
        return jsonify({"message": "User created successfully!"})
    except sqlite3.IntegrityError:
        return jsonify({"error": "User already exists!"}), 400

# Login user
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    conn = sqlite3.connect('movies.db')
    c = conn.cursor()

    c.execute('''
        SELECT id, user, email
        FROM users
        WHERE email = ? AND password = ?
    ''', (data['email'], data['password']))

    user = c.fetchone()
    conn.close()

    if user:
        return jsonify({"message": "Login successful!", "user": user})
    else:
        return jsonify({"error": "Invalid credentials!"}), 401

# Fetch user’s watchlist
@app.route('/user-watchlist', methods=['GET'])
def user_watchlist():
    user_id = request.args.get('user_id')
    conn = sqlite3.connect('movies.db')
    c = conn.cursor()

    c.execute('''
        SELECT movies.title, movies.rating, watchlist.watched
        FROM watchlist
        JOIN movies ON watchlist.movie_id = movies.movie_id
        WHERE watchlist.user_id = ?
    ''', (user_id,))

    watchlist = c.fetchall()
    conn.close()

    return jsonify(watchlist)

# Add movie to user’s watchlist
@app.route('/add-to-watchlist', methods=['POST'])
def add_to_watchlist():
    data = request.json
    conn = sqlite3.connect('movies.db')
    c = conn.cursor()

    try:
        c.execute('''
            INSERT INTO watchlist (user_id, movie_id)
            VALUES (?, ?)
        ''', (data['user_id'], data['movie_id']))
        conn.commit()
        conn.close()
        return jsonify({"message": "Movie added to watchlist successfully!"})
    except sqlite3.IntegrityError:
        return jsonify({"error": "Movie already exists in watchlist!"}), 400

# Fetch user’s recommendations
@app.route('/user-recommendations', methods=['GET'])
def user_recommendations():
    user_id = request.args.get('user_id')
    conn = sqlite3.connect('movies.db')
    c = conn.cursor()

    c.execute('''
        SELECT movies.title, movies.rating, recommendations.watched
        FROM recommendations
        JOIN movies ON recommendations.movie_id = movies.movie_id
        WHERE recommendations.user_id = ?
    ''', (user_id,))

    recommendations = c.fetchall()
    conn.close()

    return jsonify(recommendations)

# Add movie to user’s recommendations
@app.route('/add-to-recommendations', methods=['POST'])
def add_to_recommendations():
    data = request.json
    conn = sqlite3.connect('movies.db')
    c = conn.cursor()

    try:
        c.execute('''
            INSERT INTO recommendations (user_id, movie_id)
            VALUES (?, ?)
        ''', (data['user_id'], data['movie_id']))
        conn.commit()
        conn.close()
        return jsonify({"message": "Movie added to recommendations successfully!"})
    except sqlite3.IntegrityError:
        return jsonify({"error": "Movie already exists in recommendations!"}), 400

# Run the Flask app displaying the logs
if __name__ == '__main__':
    app.run(debug=True)
