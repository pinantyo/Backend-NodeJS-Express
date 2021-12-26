import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink, withRouter, useNavigate } from "react-router-dom";

//Import components
import Home from './Components/Home/HomeIndex';
import Jobs from './Components/Jobs/Jobs';
import Aboutus from './Components/AboutUs/Aboutus';

//Components error
import Maintenance from './Components/Error/Maintenance';

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

              <NavLink to="/Jobs" className="nav-link">
                <li><p className="fs-5 text-white p-1" href="#">Jobs</p></li>
              </NavLink>

              <NavLink to="/About-Us" className="nav-link">
                <li><p className="fs-5 text-white p-1" href="#">About Us</p></li>
              </NavLink>

              <NavLink to="/Services" className="nav-link">
                <li><p className="fs-5 text-white p-1" href="#">Services</p></li>
              </NavLink>
            </ul>
          </div>
        </div>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Jobs" element={<Jobs />} />
          <Route path="/About-us" element={<Aboutus/>} />
          <Route path="/Services" element={<Maintenance />}/>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
