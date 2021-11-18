import './App.css';
import {useState} from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, NavLink, withRouter, useNavigate } from "react-router-dom";

//Import components
import Home from './Components/Home/HomeIndex';
import Careers from './Components/ListCareers/Careers';
import Aboutus from './Components/AboutUs/Aboutus';

function App() {
  return (
    <div className="App">
      <Router>
        <div className = "par1">

          <div className="title mt-3">
            <h2 className="text-white text-center">Coba App</h2>
          </div>

          <div className="navigation">
            <ul className="navbar-nav d-flex flex-row m-auto w-75 justify-content-between">
              <NavLink to="/" className="nav-link">
                <li><p className="fs-5 text-white p-1" href="#">Home</p></li>
              </NavLink>

              <NavLink to="/Careers" className="nav-link">
                <li><p className="fs-5 text-white p-1" href="#">Careers</p></li>
              </NavLink>

              <NavLink to="/About-Us" className="nav-link">
                <li><p className="fs-5 text-white p-1" href="#">About Us</p></li>
              </NavLink>

              <NavLink to="/Services" className="nav-link">
                <li><p className="fs-5 text-white p-1" href="#">Services</p></li>
              </NavLink>

              <NavLink to="/Account" className="nav-link">
                <li><p className="fs-5 text-white p-1" href="#">Account</p></li>
              </NavLink>
            </ul>
          </div>
        </div>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Careers" element={<Careers />} />
          <Route path="/About-us" element={<Aboutus/>} />
          <Route path="/Services" />
          <Route path="/Account" />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
