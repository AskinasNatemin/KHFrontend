import React, { useEffect, useState } from "react";
import "../Styles/Profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [userData, setUserData] = useState();
  const [id, setId] = useState(localStorage.getItem("userId"));
  const [user, setUser] = useState(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    navigate("/",{replace:true});
};

  useEffect(() => {
    if (user === "student") {
      axios
        .post("http://localhost:5001/student",{ _id: id })
        .then((response) => {
          console.log(response.data.data);
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
  },[]);

  return (
    <div className="profilePopupContainer p-4 ">
      <div className="profilePopupHeader">
        <p>{user.toUpperCase()}</p>
        <p> <span className="profileUserName">UserName :</span>
          {user === "staff"
            ? userData?.staffname
            : user === "student"
            ? userData?.studentName
            : ""}
        </p>
        <p>{userData?.email}</p>
      </div>
      <button onClick={handleLogout} type="button" className="logoutBtn">
        LOG OUT
      </button>
    </div>
  );
};

export default UserProfile;
