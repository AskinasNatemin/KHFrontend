import React, { useEffect, useState } from "react";
import "../Styles/Profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState();
  const [id, setId] = useState(localStorage.getItem("userId"));
  const [user, setUser] = useState(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    navigate("/");
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

  return (
    <div className="profilePopupContainer p-4 ">
      <div className="profilePopupHeader">
        <p>{user}</p>
        <p>
          {user === "staff"
            ? userData?.staffname
            : user === "student"
            ? userData?.studentName
            : ""}
        </p>
        <p>{userData?.email}</p>
      </div>
      <button onClick={handleLogout} type="button" className="logoutBtn">
        Log Out
      </button>
    </div>
  );
};

export default Profile;
