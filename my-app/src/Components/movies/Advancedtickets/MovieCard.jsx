import React from "react";
import "./MovieCards.css";

const MovieCard = ({ image, price, time, date }) => {
    return (
        <div className="movie-card">
            <img src={image} alt="Movie Poster" className="movie-img" />
            <div className="movie-info">
                <div className="movie-details">
                    <p className="price">{price}</p>
                    <p className="time">{time}</p>
                </div>
                <p className="date">{date}</p>
            </div>
            <button className="buy-btn">BUY TICKETS</button>
        </div>
    );
};

export default MovieCard;
