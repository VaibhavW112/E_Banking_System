import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import brandLogo from "./../image/bank_logo.png";
export default function HeaderComponent(props) {
  let { title } = props;
  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        {/* <img src="" width="40" height="40" id="logoID" alt="" /> */}
      </a>
      <div className="container">
        <a class="navbar-brand" href="">
          <img src={brandLogo} alt="" width="70" height="40" />
        </a>
        {/* <div className="navbar-header">
          <NavLink className="navbar-brand" to="">
            {title}
          </NavLink>
        </div> */}
        <ul className="navbar-nav me-right mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link active" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">
              Contact Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/adminlogin">
              Admin Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
