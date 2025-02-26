import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsSun, BsMoon } from "react-icons/bs";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <nav className="navbar navbar-expand-lg" style={{ background: darkMode ? "#121212" : "#0A1931" }}>
      <div className="container">
        <a className="navbar-brand text-white fw-bold fs-4" href="#">
          FOREX METER
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link text-white fw-semibold" href="#">Home</a></li>
            <li className="nav-item"><a className="nav-link text-white fw-semibold" href="#">Charts</a></li>
            <li className="nav-item"><a className="nav-link text-white fw-semibold" href="#">News</a></li>
            <li className="nav-item"><a className="nav-link text-white fw-semibold" href="#">About</a></li>
          </ul>
          <button onClick={() => setDarkMode(!darkMode)} className="btn btn-outline-light ms-3">
            {darkMode ? <BsSun /> : <BsMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
