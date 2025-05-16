import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle, FaSearch } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // ✅ Required to navigate

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinkClass =
    "block py-2 px-2 transition-colors duration-200 hover:text-blue-400 active:text-blue-300";

  return (
    <>
      <nav
        className="text-white p-4 flex items-center relative"
        style={{ background: "#02122E" }}
      >
        {/* Logo */}
        <div className="text-xl font-serif italic">🍿SeatNema</div>

        {/* Right menu */}
        <div className="flex items-center ml-auto gap-4">
          {/* Nav links */}
          <div
            className={`md:flex items-center gap-6 ${
              isOpen ? "block" : "hidden"
            } absolute md:static w-full md:w-auto right-0 top-16 md:top-0 p-4 md:p-0 z-50`}
            style={{ background: "#02122E" }}
          >
            <NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass} onClick={() => setIsOpen(false)}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass} onClick={() => setIsOpen(false)}>Contact</NavLink>
            <NavLink to="/reserved" className={navLinkClass} onClick={() => setIsOpen(false)}>Reserved</NavLink>

            {/* Mobile-only Login/Signup */}
            <div className="md:hidden mt-2 border-t border-blue-700 pt-2">
              <NavLink to="/login" className={navLinkClass} onClick={() => setIsOpen(false)}>Log In</NavLink>
              <NavLink to="/signup" className={navLinkClass} onClick={() => setIsOpen(false)}>Sign Up</NavLink>
            </div>
          </div>

          {/* Desktop icons */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => navigate("/search")} className="text-white">
              <FaSearch size={20} />
            </button>
            <NavLink to="/login">
              <FaUserCircle size={28} />
            </NavLink>
          </div>

          {/* Mobile icons */}
          <div className="flex md:hidden items-center gap-4">
            <button onClick={() => navigate("/search")} className="text-white">
              <FaSearch size={20} />
            </button>
            <button onClick={toggleMenu} className="text-white">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
