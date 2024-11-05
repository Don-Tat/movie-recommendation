# Movie Recommendation System by Don Ngo
**GitHub Repository**: [https://github.com/Don-Tat/movie-recommendation](https://github.com/Don-Tat/movie-recommendation)

## Contents of the ZIP File
- `app.py`: Flask backend code handling API requests and recommendations
- `recommendations.py`: Recommendation engine code using content-based filtering
- `MovieList.js`: React frontend component to display the movie list
- `Database Schema.sql`: Schema for SQLite database setup
- `README.md`: Project documentation
- `requirements.txt`: List of Python dependencies

## Project Overview
This project is a **Movie Recommendation System** that allows users to view movies, add them to a watchlist, and get recommendations based on movie overviews and keywords. Movie data, such as titles, keywords, and details, are fetched from the **TMDb API**.

This project showcases backend and frontend integration, content-based recommendation algorithms, and API interaction.

## Features
- **Watchlist**: Users can add movies to a watchlist with "watched" and rating features.
- **Recommendations**: Based on movies in the watchlist, users receive top recommendations (updated automatically when new movies are added).
- **View Movie Details**: Users can see detailed information for each recommended movie.
- **Persistent Storage**: Stores movie data locally in SQLite for faster access and efficient data management.

## Tech Stack
- **Backend**: Flask (Python)
- **Frontend**: React (JavaScript, HTML, CSS)
- **Database**: SQLite
- **External API**: [TMDb API](https://www.themoviedb.org/documentation/api)
- **Recommendation Engine**: Content-based filtering using `sklearn` in Python
- **Version Control**: Git/GitHub

## Installation and Setup

### Prerequisites
- **Python 3.x**
- **Node.js** (for React)
- **SQLite**

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/movierecommendation.git
   cd movierecommendation
   pip install -r requirements.txt
   TMDB_API_KEY = "your_tmdb_api_key"
   ```
   Frontend Setup
   ```bash
   sqlite3 movie_database.db < Database\ Schema.sql
   cd frontend
   npm install
   npm start
   ```
   Running the Project (Main Directory)
   ```bash
   python app.py
   ```
