import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../Assets/icon/logo.png";
import { CgProfile } from "react-icons/cg";
import "../Styles/Navbar.css";
import '../Styles/Profile.css'
import { Logged } from "./Context/AppContext";
import Profile from "./Profile";

const Navbar = ({ handleRegistration }) => {
  const { isLogged, setIsLogged } = useContext(Logged);
  const [profileShower, setProfileShower] = useState(false);
  const user=localStorage.getItem('user')

  useEffect(()=>{
    if(user){
      setIsLogged(true)
    }else{
      setIsLogged(false)
      setProfileShower(false)
    }
  },[user])

  return (
    <>
      <nav className="navbar navbar-expand-md NAVBAR container khNavbar">
        <div className="ms-4 khLogo">
          <img className="navbar-brand w-100 h-100" src={logo} alt="logo" />
        </div>

        <button
          className="navbar-toggler me-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse mx-3 p-1"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav flex-fill d-flex justify-content-center">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/ViewBooks">
              Books
            </NavLink>

            <NavLink className="nav-link" to="/Contact">
              Contact Us
            </NavLink>
          </div>

          <div className="buttons me-4 gap-3 d-flex">
            {isLogged ? (
              <CgProfile
              className="cgProfile"
                onClick={() => {
                  setProfileShower(!profileShower);
                }}
              />
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => handleRegistration("login")}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => handleRegistration("signUp")}
                >
                  SignUp
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      {
        profileShower &&
        <Profile/>
      }
    </>
  );
};

export default Navbar;
