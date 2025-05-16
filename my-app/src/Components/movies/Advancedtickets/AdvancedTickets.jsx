import React from "react";
import './AdvancedTickets.css'
import logo_light from '../../../Assets/Vector.png'
import logo_dark from '../../../Assets/Vectorr.png'
import MovieNav from "./MovieNav";
import MovieCards from "./MovieCards";

const AdvancedTickets = () => {
    return (
        <div className="advanced-tickets">

            <div className="nowshowtext">
                <img src={logo_light} alt='' className='logo' />
                <h1>ADVANCED TICKETS</h1>
                <img src={logo_dark} alt='' className='logo' />
            </div>
            <MovieNav />
            <MovieCards />
        </div>
    )
}

export default AdvancedTickets;