import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

//Import components
import Home from './Components/Home/HomeIndex';
import Jobs from './Components/Jobs/Jobs';
import Aboutus from './Components/AboutUs/Aboutus';
import Login from './Components/Account/Login';

//Components error
import Error from './Components/Error/Error';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navigation">
          <ul className="navbar-nav d-flex flex-row m-auto w-75 justify-content-between">
            <NavLink to="/" className="nav-link">
              <li className="fs-5 text-white p-1">Home</li>
            </NavLink>

            <NavLink to="/Jobs" className="nav-link">
              <li className="fs-5 text-white p-1">Jobs</li>
            </NavLink>

            <NavLink to="/About-Us" className="nav-link">
              <li className="fs-5 text-white p-1">About Us</li>
            </NavLink>

            <NavLink to="/Services" className="nav-link">
              <li className="fs-5 text-white p-1">Services</li>
            </NavLink>

            <NavLink to="/Login">
              <div className="float-end">
                <svg xmlns="http://www.w3.org/2000/svg" className="pe-2 account bi bi-person-square" fill="currentColor" viewBox="0 0 16 16" width="40" height="60">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                </svg>
                <span className="badge badge-secondary notif">1</span>
              </div>
            </NavLink>
          </ul>
        </div>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Jobs/*" element={<Jobs />} />
          <Route path="/About-us" element={<Aboutus/>} />
          <Route path="/Services" element={<Aboutus/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="*" element={<Error />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
