import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../Assets/icon/logo.png";
import { CgProfile } from "react-icons/cg";
import "../Styles/Navbar.css";
import "../Styles/Profile.css";
import { Logged } from "./Context/AppContext";
import Profile from "./Profile";

const Navbar = ({ handleRegistration }) => {
  const { isLogged, setIsLogged } = useContext(Logged);
  const [profileShower, setProfileShower] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
      setProfileShower(false);
    }
  }, [userId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".cgProfile") &&
        !event.target.closest(".profile-container")
      ) {
        setProfileShower(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
            <NavLink className="nav-link" to="/Books">
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
                onClick={(e) => {
                  e.stopPropagation();
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

      {profileShower && (
        <div className="profile-container">
          <Profile />
        </div>
      )}
    </>
  );
};

export default Navbar;
