import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MovieDetail.css";

const API_KEY = "9966a963c6f1fc2755816b7795357a8e";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleBuyTicket = () => {
    alert(`Buying ticket for: ${movie.title}`);
  };

  if (loading) {
    return <div className="movie-detail-loading">Loading movie details...</div>;
  }

  if (!movie) {
    return <div className="movie-detail-error">Movie not found.</div>;
  }

  return (
    <div className="movie-detail-container">
      <button className="back-button" onClick={handleBack}>
        &larr; Back
      </button>

      <div className="movie-detail-card">
        <div className="detail-top">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="poster-image"
          />
          <div className="movie-info">
            <h1 className="detail-movie-title">{movie.title}</h1>
            <div className="meta-info">
              <p>Director: {movie.director || "N/A"}</p>
              <p>Writer: {movie.writer || "N/A"}</p>
              <p>Genre: {movie.genres?.map(g => g.name).join(', ')}</p>
              <p>Studio: {movie.production_companies?.[0]?.name || "N/A"}</p>
            </div>
            <div className="movie-stats">
              <div className="stat-box">
                <p className="stat-label">⭐</p>
                <p className="stat-value">{movie.vote_average}/10</p>
              </div>
              <div className="stat-box">
                <p className="stat-label">⏱</p>
                <p className="stat-value">{movie.runtime} Min</p>
              </div>
              <div className="stat-box">
                <p className="stat-label">PG</p>
                <p className="stat-value">{movie.adult ? "18+" : "13+"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="synopsis-section">
          <h2>Synopsis</h2>
          <p>{movie.overview}</p>
        </div>

        <button className="buy-ticket-button" onClick={handleBuyTicket}>
           Buy Ticket
        </button>
      </div>
    </div>
  );
}
