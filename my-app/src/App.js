import React from "react";
import {Routes, Route, Link} from "react-router-dom"
import SignUp from "./Components/SignUp";
import Reserved from "./Components/Reserved";
import LogIn from "./Components/LogIn";
import Home from "./Components/Home";
import ContactUs from "./Components/ContactUs";
import About from "./Components/About";
import { NavLink } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link> |{""}
        <Link to="/about">About</Link> |{""}
        <Link to="/contact">ContactUs</Link> |{""}
        <Link to="/login">LogIn</Link> |{""}
        <Link to="/reserved">Reserved</Link> |{""}
        <Link to="/signup">SignUp</Link> |{""}
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/reserved" element={<Reserved/>}/> 
        <Route path="/signup" element={<SignUp/>}/> 
      </Routes>
      <NavLink to="/" style={({isActive})}></NavLink>
    </div>
  );
}

export default App;
