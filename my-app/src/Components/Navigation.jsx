import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle, FaSearch } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setShowSearch(!showSearch);

  const navLinkClass =
    "block py-2 px-2 transition-colors duration-200 hover:text-blue-400 active:text-blue-300";

  return (
    <>
      <nav
        className="text-white p-4 flex items-center relative"
        style={{ background: "#02122E" }}
      >
        {/* Logo on the Left */}
        <div className="text-xl font-serif italic">🎬 Movie Watch</div>

        {/* Navigation and Icons on the Right */}
        <div className="flex items-center ml-auto gap-4">
          {/* Nav Links (desktop and mobile menu) */}
          <div
            className={`md:flex items-center gap-6 ${
              isOpen ? "block" : "hidden"
            } absolute md:static w-full md:w-auto right-0 top-16 md:top-0 p-4 md:p-0 z-50`}
            style={{ background: "#02122E" }}
          >
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>
            <NavLink
              to="/reserved"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Reserved
            </NavLink>

            {/* Mobile-only: Login and Signup */}
            <div className="md:hidden mt-2 border-t border-blue-700 pt-2">
              <NavLink
                to="/login"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Log In
              </NavLink>
              <NavLink
                to="/signup"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </NavLink>
            </div>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={toggleSearch} className="text-white">
              <FaSearch size={20} />
            </button>
            <NavLink to="/login">
              <FaUserCircle size={28} />
            </NavLink>
          </div>

          {/* Mobile Icons (hamburger + search) */}
          <div className="flex md:hidden items-center gap-4">
            <button onClick={toggleSearch} className="text-white">
              <FaSearch size={20} />
            </button>
            <button onClick={toggleMenu} className="text-white">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Input - Appears below navbar */}
      {showSearch && (
        <div className="px-4 py-3" style={{ background: "#02122E" }}>
          <form className="max-w-2xl mx-auto flex border rounded overflow-hidden bg-white">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow px-3 py-2 outline-none text-black"
            />
            <button type="submit" className="bg-blue-700 px-4 text-white">
              Go
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Navbar;
