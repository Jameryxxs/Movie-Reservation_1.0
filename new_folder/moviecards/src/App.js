import React from "react";
import Navbar from "./Components/Navbar";
import NowShowing from "./Components/NowShowing";
import MovieCards from "./Components/MovieCards";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <div className="app-content">
        <Navbar />
        <NowShowing />
        <MovieCards />
      </div>
      <Footer />
    </div>
  );
}

export default App;
