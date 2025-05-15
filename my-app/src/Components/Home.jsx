import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import "./Home.css";
import MovieCarousel from "./MovieCarousel";
import { useNavigate } from "react-router-dom";

const API_KEY = "9966a963c6f1fc2755816b7795357a8e";

const Home = () => {
  const [nowShowing, setNowShowing] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [nowRes, topRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`),
        ]);

        const nowData = await nowRes.json();
        const topData = await topRes.json();

        const baseImg = "https://image.tmdb.org/t/p/w500";

        const formatMovie = (movie) => ({
          id: movie.id,
          title: movie.title,
          posterUrl: movie.poster_path ? baseImg + movie.poster_path : "",
        });

        setNowShowing(nowData.results.slice(0, 2).map(formatMovie));
        setTopMovies(topData.results.slice(1, 3).map(formatMovie));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleBuyTicket = (title) => {
    alert(`Buying ticket for: ${title}`);
  };

  return (
    <div className="home">
      {/* Hero Banner */}
      <div className="hero relative">
        <MovieCarousel />
      </div>

      {/* Now Showing */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Now Showing | Coming Soon</h2>
          <button className="view-all">View All</button>
        </div>
        <div className="movie-grid">
          {nowShowing.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => navigate(`/movie/${movie.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="movie-poster">
                {movie.posterUrl ? (
                  <img src={movie.posterUrl} alt={movie.title} />
                ) : (
                  <div className="no-poster">No Image</div>
                )}
                <div className="new-badge">NEW</div>
              </div>
              <p className="movie-title">{movie.title}</p>
              <button
                className="buy-button-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuyTicket(movie.title);
                }}
              >
                Buy Ticket
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Top 10 Movies */}
      <section className="section1">
        <div className="section-header">
          <h2 className="section-title">Top 10 Movies</h2>
          <button className="view-all">View All</button>
        </div>
        <div className="movie-grid">
          {topMovies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => navigate(`/movie/${movie.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="movie-poster">
                {movie.posterUrl ? (
                  <img src={movie.posterUrl} alt={movie.title} />
                ) : (
                  <div className="no-poster">No Image</div>
                )}
              </div>
              <p className="movie-title">{movie.title}</p>
              <button
                className="buy-button-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuyTicket(movie.title);
                }}
              >
                Buy Ticket
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Find Nearest Cinema */}
      <section className="section2">
        <div className="section-header">
          <h2 className="section-title">Find The Nearest Cinema</h2>
          <button className="view-all">View All</button>
        </div>
        <div className="cinema-box">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15579.799090083318!2d121.61316020854307!3d13.940199375270328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd9cb576947a6d%3A0x8799166ef3c6c84e!2sSM%20City%20Lucena!5e0!3m2!1sen!2sph!4v1686039874345!5m2!1sen!2sph"
            className="cinema-map"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          <div className="cinema-info">
            <p className="cinema-location">
              <MapPin className="icon-sm" /> SM Lucena - Lucena City
            </p>
            <p className="cinema-location">
              <MapPin className="icon-sm" /> SM San Pablo - San Pablo City
            </p>
          </div>
        </div>
      </section>

      <footer className="image-footer"></footer>
    </div>
  );
};

export default Home;
