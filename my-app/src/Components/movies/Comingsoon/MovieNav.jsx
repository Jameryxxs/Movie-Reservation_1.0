import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./MovieNav.css";

const MovieNav = () => {
    const location = useLocation();

    return (
        <div className="movie-nav">
            <ul>
                <li className={location.pathname === "/" ? "active" : ""}>
                    <Link to="/">NOW SHOWING</Link>
                </li>
                <li className={location.pathname === "/coming-soon" ? "active" : ""}>
                    <Link to="/coming-soon">COMING SOON</Link>
                </li>
                <li className={location.pathname === "/advanced-tickets" ? "active" : ""}>
                    <Link to="/advanced-tickets">ADVANCED TICKETS</Link>
                </li>
            </ul>
        </div>
    );
};

export default MovieNav;

