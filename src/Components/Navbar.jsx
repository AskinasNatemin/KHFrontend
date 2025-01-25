import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../Assets/icon/logo.png";
import "../Styles/Navbar.css";

const Navbar = ({handleRegistration}) => {


  return (
    <>
      <nav className="navbar navbar-expand-md NAVBAR container" style={{height:'15vh'}}>

          <div className="ms-4 khLogo">
            <img className="navbar-brand w-100 h-100" src={logo} alt="logo" />
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse ms-3" id="navbarNavAltMarkup">

            <div className="navbar-nav flex-fill  d-flex justify-content-center">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/Books">
                Books
              </NavLink>

              <NavLink className="nav-link" to="/Contact">
                Contact Us
              </NavLink>
            </div>
           
           <div className="buttons me-4 gap-3 d-flex">

            <button type="button" className="btn btn-outline-primary" onClick={()=>(handleRegistration('login'))}>Login</button>
            <button type="button" className="btn btn-outline-secondary" onClick={()=>(handleRegistration('signUp'))}>SignUp</button>
           </div>
          </div>

        

      </nav>
    </>
  );
};

export default Navbar;


