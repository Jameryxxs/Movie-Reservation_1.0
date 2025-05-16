import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Reserved from "./Components/Reserved";
import LogIn from "./Components/LogIn";
import Home from "./Components/Home";
import ContactUs from "./Components/ContactUs";
import About from "./Components/About";
import Search from "./Components/SearchBar";
import Navbar from "./Components/Navigation";
import MovieDetail from "./Components/MovieDetail";

function App() {
  return (
    <div className="App">
      <nav>
        <Navbar />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/reserved" element={<Reserved />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        {/* new */}
      </Routes>
    </div>
  );
}

export default App;
