import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Reserved from "./Components/Reserved";
import LogIn from "./Components/LogIn";
import Home from "./Components/Home";
import ContactUs from "./Components/ContactUs";
import About from "./Components/About";
import Search from "./Components/SearchBar";

function App() {
  return (
    <div className="App bg-gradient-to-b from-[#142645] to-[#02122E] min-h-screen text-white font-poppins">
      {/* Styled Navigation Bar */}
      <nav className="bg-[#02122E] p-4 shadow-md flex justify-center space-x-4 text-sm">
        <Link to="/" className="hover:text-[#EF8B00] transition">Home</Link>
        <Link to="/about" className="hover:text-[#EF8B00] transition">About</Link>
        <Link to="/contact" className="hover:text-[#EF8B00] transition">Contact Us</Link>
        <Link to="/login" className="hover:text-[#EF8B00] transition">Log In</Link>
        <Link to="/reserved" className="hover:text-[#EF8B00] transition">Reserved</Link>
        <Link to="/signup" className="hover:text-[#EF8B00] transition">Sign Up</Link>
        <Link to="/search" className="hover:text-[#EF8B00] transition">Search</Link>
      </nav>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/reserved" element={<Reserved />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
