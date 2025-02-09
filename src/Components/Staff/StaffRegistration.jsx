import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/StaffReg.css";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";

function StaffRegistration() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [staffRegister, setStaffRegister] = useState({
    Name: "",
    Email: "",
    Contact: "",
    Password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setStaffRegister((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const { Name, Email, Contact, Password } = staffRegister;
    if (!Name || !Email || !Contact || !Password) {
      setError("All fields are required.");
      setSuccessMessage("");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(Email)) {
      setError("Please enter a valid email address.");
      setSuccessMessage("");
      return false;
    }
    if (Password.length < 6) {
      setError("Password must be at least 6 characters.");
      setSuccessMessage("");
      return false;
    }
    setError(""); // Clear errors if validation passes
    return true;
  };

  const addUserToServer = async () => {
    if (!validateForm()) return;
    try {
      const response = await axios.post(
        "http://localhost:5001/staffRegistration",
        staffRegister
      );
      setSuccessMessage("Registration successful!");
      setStaffRegister({ Name: "", Email: "", Password: "", Contact: "" }); // Clear form
      navigate("/", { replace: true });
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
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addUserToServer();
    }
  };
  return (
    <div className="staffContaine">
      <div className="staffborder">
        <span className="">
          <div className="staffinput">
            <div className="staffhead">
              <h2>Registeration Form</h2>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}

            <div className="input-group flex-nowrap ">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                id="staffRegName"
                name="Name"
                value={staffRegister.Name}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Email"
                name="Email"
                value={staffRegister.Email}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="Contact"
                name="Contact"
                value={staffRegister.Contact}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control pe-5"
                id="exampleFormControlInput3"
                placeholder="Password"
                name="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password && (
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="position-absolute top-50 end-0 translate-middle-y pe-3"
                  style={{ cursor: "pointer", color: "#6c757d" }}
                >
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </span>
              )}
            </div>
            <div className="d-grid gap-2 col-6 mx-auto staffbutton">
              <button className="btn btn-primary" onClick={addUserToServer}>
                CREATE ACCOUNT
              </button>
            </div>
            <div className="stafflink">
              Already have an account? <Link to="/StaffLogin">Sign in</Link>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
}

export default StaffRegistration;
