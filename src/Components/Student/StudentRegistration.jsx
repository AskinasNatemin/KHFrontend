import { Link, useNavigate } from "react-router-dom";
import "../../Styles/Student/StudentReg.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoArrowBackCircleOutline } from "react-icons/io5";

function StudentRegistration() {
  const navigate = useNavigate();
  const [studentRegister, setStudentRegister] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setStudentRegister((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const { userName, email, phoneNumber, password } = studentRegister;
    if (!userName || !email || !phoneNumber || !password) {
      setError("All fields are required.");
      setSuccessMessage("");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      setSuccessMessage("");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setSuccessMessage("");
      return false;
    }
    setError(""); 
    return true;
  };

  const addUserToServer = async () => {
    if (!validateForm()) return;
    try {
      const response = await axios.post(
        "http://localhost:5001/studentRegistration",
        studentRegister
      );
      localStorage.setItem("user",response.data.data._id);
      
      setSuccessMessage("Registration successful!");
      setStudentRegister({
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
      }); 
      setTimeout(()=>{
        navigate("/", { replace: true });
      },500)
    } catch (err) {
      console.log("err", err.response?.data?.message || err.message);
      if (
        err.response &&
        err.response.data.message === "Email is already registered."
      ) {
        setError("This email is already registered.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addUserToServer();
    }
  };

  useEffect(()=>{
    setError('')
    setSuccessMessage('')
  },[])

  return (
    <div className="StudentContainer">
      <div className="StudentRegborder">
        <div className="studentRegGoBackContainer p-3" >
        <IoArrowBackCircleOutline onClick={handleGoBack} className="staffRegGoBackIcon"/>

        </div>
        <div className="StudentReginput">
          <div className="StudentReghead">
            <h2>Registration Form</h2>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          <div className="input-group flex-nowrap">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="userName"
              value={studentRegister.userName}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={studentRegister.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Contact"
              name="phoneNumber"
              value={studentRegister.phoneNumber}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={studentRegister.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="d-grid gap-2 col-6 mx-auto StudentRegbutton">
            <button className="btn btn-primary" onClick={addUserToServer}>
              CREATE ACCOUNT
            </button>
          </div>
          <div className="StudentReglink">
            Already have an account? <Link to="/StudentLogin">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentRegistration;
