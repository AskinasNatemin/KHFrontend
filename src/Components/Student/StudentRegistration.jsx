import { Link, useNavigate } from "react-router-dom";
import "../../Styles/StudentReg.css";
import { useState } from "react";
import axios from "axios";

function StudentRegistration() {

  const navigate=useNavigate()
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
      setSuccessMessage('')
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      setSuccessMessage('')
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setSuccessMessage('')
      return false;
    }
    setError(""); // Clear errors if validation passes
    return true;
  };

  const addUserToServer = async () => {
    if (!validateForm()) return;
    try {
      const response = await axios.post(
        "http://localhost:5001/studentRegistration",
        studentRegister
      );
      setSuccessMessage("Registration successful!");
      setStudentRegister({ userName: "", email: "", phoneNumber: "", password: "" }); // Clear form
      navigate('/',{replace:true})
    } catch (err) {
      console.log('err',err.message);
      setError("Registration failed. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addUserToServer();
    }
  };

  return (
    <div>
      <div className="StudentRegborder">
        <div className="StudentReginput">
          <div className="StudentReghead">
            <h2>Registration Form</h2>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

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
