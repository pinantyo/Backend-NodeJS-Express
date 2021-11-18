import './App.css';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//Import components
import Home from './App/Home/HomeIndex';
import List from './App/ListJobs/List';
import Aboutus from './App/ListJobs/Aboutus';

function App() {
  return (
    <div className="App">
      <div className = "par1">
        <div className="title mt-3">
          <h2 className="text-white text-center">Coba App</h2>
        </div>

        <Router>
          <div className="navigation">
            <ul className="navbar-nav d-flex flex-row m-auto w-75 justify-content-between">
              <Link to="/" className="nav-link">
                <li><p className="fs-5 text-white p-1" href="#">Home</p></li>
              </Link>

              <Link to="/About-Us" className="nav-link">
                <li><p className="fs-5 text-white p-1" href="#">About Us</p></li>
              </Link>

              <Link to="/List-job" className="nav-link">
                <li><p className="fs-5 text-white p-1" href="#">List Jobs</p></li>
              </Link>

              <Link to="/Services" className="nav-link">
                <li><p className="fs-5 text-white p-1" href="#">Services</p></li>
              </Link>

              <Link to="/Account" className="nav-link">
                <li><p className="fs-5 text-white p-1" href="#">Account</p></li>
              </Link>
            </ul>
          </div>
        </Router>
      </div>

      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/About-us" element={<Aboutus/>} />
          <Route exact path="/List-job" element={<List/>} />
          <Route exact path="/Services" />
          <Route exact path="/Account" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
