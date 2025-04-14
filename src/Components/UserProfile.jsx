import React, { useContext, useEffect, useState } from "react";
import "../Styles/Profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Logged } from "./Context/AppContext";

const UserProfile = () => {
  const [userData, setUserData] = useState();
  const [id, setId] = useState(localStorage.getItem("userId"));
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const { setIsLogged } = useContext(Logged);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    localStorage.removeItem("isLogged");
    setIsLogged(false);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (user === "student") {
      axios
        .post("http://localhost:5001/student", { _id: id })
        .then((response) => {
          setUserData(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (user === "staff") {
      axios
        .post("http://localhost:5001/staff", { _id: id })
        .then((response) => {
          setUserData(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const ProfileModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
      <div className="profilePopupContainer">
        <div className="profile-modal-card">
          <div className="profile-header text-center">
            <img
              src="https://via.placeholder.com/120"
              alt="Profile"
              className="profile-img"
            />
          </div>
          <div className="profile-body">
            <h5>
              {" "}
              {user === "staff"
                ? userData?.staffname
                : user === "student"
                ? userData?.studentName
                : ""}
            </h5>
            <div className="info-row">
              <span className="info-label">Contact :</span>
              <div className="UserData"> {userData?.contact}</div>
            </div>
            <div className="info-row">
              <span className="info-label">Email ID :</span>{" "}
              <div className="UserData">{userData?.email}</div>
            </div>
            <div className="info-row">
              <span className="info-label">Type :</span>{" "}
              <div className="UserData">
              {user?.toUpperCase()}</div>
            </div>
            <div className=" UserProgfileButton">
              <button className="edit-btn"onClick={() => navigate("/UserEditProfile")}>Edit</button>
              <button className="ProfileLogoutButton" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <ProfileModal show={show} onClose={() => setShow(false)} />
    </>
  );
};

export default UserProfile;
