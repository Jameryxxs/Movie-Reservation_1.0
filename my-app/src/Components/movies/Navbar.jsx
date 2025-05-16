import React, { useState } from 'react';
import './Navbar.css';
import logo_light from '../Assets/language-kotlin.png'
import { FiMenu, FiSearch, FiX } from 'react-icons/fi'; // Added FiX for close icon
import { FaRegCircle } from 'react-icons/fa';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className='navbar'>
            {/* Left - Hamburger + Right Icons together */}
            <div className="navbar-left">
                {menuOpen ? (
                    <FiX className="icon" onClick={toggleMenu} />
                ) : (
                    <FiMenu className="icon" onClick={toggleMenu} />
                )}
            </div>

            <div className="navbar-center">
                <img src={logo_light} alt='Logo' className='logo' />
                <h1>Movie Watch</h1>
            </div>

            <div className="navbar-right"> {/* <== THIS NEEDS TO EXIST */}
                <div className="navbar-icons">
                    <FiSearch className="icon" />
                    <FaRegCircle className="icon" />
                </div>
            </div>


            {/* No more navbar-right */}
            {menuOpen && (
                <div className="mobile-menu">
                    <ul>
                        <li>Home</li>
                        <li>Movies</li>
                        <li>Tickets</li>
                        <li>Log in</li>
                    </ul>
                </div>
            )}
        </div>

    );
}

export default Navbar;
