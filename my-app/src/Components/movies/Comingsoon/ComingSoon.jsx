import React from "react";
import './ComingSoon.css'
import logo_light from '../../../Assets/Vector.png'
import logo_dark from '../../../Assets/Vectorr.png'
import MovieNav from "./MovieNav";
import MovieCards from "./MovieCards";

const ComingSoon = () => {
    return (
        <div className="comming-soon">

            <div className="nowshowtext">
                <img src={logo_light} alt='' className='logo' />
                <h1>COMING SOON</h1>
                <img src={logo_dark} alt='' className='logo' />
            </div>
            <MovieNav />
            <MovieCards />
        </div>
    )
}

export default ComingSoon;