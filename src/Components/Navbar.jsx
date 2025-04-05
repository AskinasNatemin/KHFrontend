import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../Assets/icon/logo.png";
import { CgProfile } from "react-icons/cg";
import { GoHeartFill } from "react-icons/go";
import "../Styles/Navbar.css";
import "../Styles/Profile.css";
import { Logged } from "./Context/AppContext";
import UserProfile from "./UserProfile";
import backPackIcon from '../Assets/icon/backpack.png'

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

            {isLogged ? (
              <NavLink className="nav-link" to="/Books">
                Books
              </NavLink>
            ) : (
              <Link className="nav-link" to="/AccessDenied">
                Books
              </Link>
            )}

            <NavLink className="nav-link" to="/ContactUs">
              Contact Us
            </NavLink>
          </div>

          <div className="buttons me-4 gap-3 d-flex px-2 py-1 px-4 d-flex align-items-center">
            {isLogged ? (
              <>
                <div className="favIconContainer">
                  <GoHeartFill
                    className="favIcon"
                    onClick={() => navigate("/UserFavouriteBooks")}
                  />
                </div>
                <div className="lentedBookIconContainer border rounded rounded-circle p-2" onClick={()=>navigate('/LentedBook')}>
                  <img src={backPackIcon} alt="bagIcon" className="backPackIcon"/>
                </div>

                <CgProfile
                  className="cgProfile"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileShower(!profileShower);
                  }}
                />
              </>
            ) : (
              <>
                <button class="animated-button" onClick={()=>handleRegistration()}>
                  <svg
                    viewBox="0 0 24 24"
                    class="arr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                  </svg>
                  <span class="text" > LOGIN </span>
                  <span class="circle"></span>
                  <svg
                    viewBox="0 0 24 24"
                    class="arr-1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                  </svg>
                </button>
                <br />
                <br />
              </>
            )}
          </div>
        </div>
      </nav>

      {profileShower && (
        <div className="profile-container">
          <UserProfile />
        </div>
      )}
    </>
  );
};

export default Navbar;
