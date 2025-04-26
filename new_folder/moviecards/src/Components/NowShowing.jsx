import React from "react";
import './NowShowing.css'
import logo_light from '../Assets/Vector.png'
import logo_dark from '../Assets/Vectorr.png'

const NowShowing = () => {
    return (
        <div className="nowshowing">

            <div className="nowshowtext">
                <img src={logo_light} alt='' className='logo' />
                <h1>NOW SHOWING</h1>
                <img src={logo_dark} alt='' className='logo' />
            </div>
        </div>
    )
}

export default NowShowing;