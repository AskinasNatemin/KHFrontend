import React, { useEffect, useState } from "react";
import "../Styles/Profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [student, setStudent] = useState();
  const [studentId, setStudentId] = useState(localStorage.getItem("user"));
  const navigate=useNavigate()
  
  const handleLogout=()=>{
    localStorage.removeItem("user")
    navigate('/')
  }

  useEffect(() => {
    axios
      .post("http://localhost:5001/student", { _id: studentId })
      .then((response) => { 
        console.log(response.data.data);  
        setStudent(response.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="profilePopupContainer p-4">
      <div className="profilePopupHeader ">
        <p>{student?.studentName }</p>
        <p>{student?.email}</p>
      </div>
      <button onClick={handleLogout} type="button" className="logoutBtn">
        Log Out
      </button>
    </div>
  );
};

export default Profile;
