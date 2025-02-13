import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/Staff/StaffReg.css";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
import StaffCodePage from "./StaffCodePage";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdContactPage } from "react-icons/md";
import { FaLock } from "react-icons/fa";

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
  const [codeBox, setCodeBox] = useState(true);
  const [staffAccess, setStaffAccess] = useState(false);

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
  const handleGoBack = () => {
    navigate("/");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addUserToServer();
    }
  };

  useEffect(() => {
    // staffAccess?setCodeBox(false)
    if (staffAccess) {
      setCodeBox(false);
    }
  }, [staffAccess]);

  return (
    <div className="staffContaine">
      {codeBox && (
        <StaffCodePage
          className="StaffCodeContainer"
          setStaffAccess={setStaffAccess}
        />
      )}
      {staffAccess && (
        <>
          <div className="staffRegGoBackContainer p-3  w-100 ">
            <FaHome 
              onClick={handleGoBack}
              className="staffRegGoBackIcon float-end"
            />
          </div>

          <div className="staffborder">
            <span className="">
              <div className="staffinput">
                <div className="staffhead">
                  <h3>STAFF SIGNUP</h3>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && (
                  <div className="alert alert-success">{successMessage}</div>
                )}

                <div className="position-relative mb-3">
                  <FaUser className="position-absolute top-50 start-0 translate-middle-y ms-2  custom-icon " />
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Username"
                    aria-label="Username"
                    id="staffRegName"
                    name="Name"
                    value={staffRegister.Name}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                </div>

                <div className="position-relative mb-3">
                  <MdEmail className="position-absolute top-50 start-0 translate-middle-y ms-2  custom-icon" />
                  <input
                    type="email"
                    className="form-control " // Adds padding to prevent text overlap with the icon
                    id="exampleFormControlInput1"
                    placeholder="Email"
                    name="Email"
                    value={staffRegister.Email}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="position-relative mb-3">
                <MdContactPage className="position-absolute top-50 start-0 translate-middle-y ms-2 custom-icon" />            
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
                  <FaLock  className="position-absolute top-50 start-0 translate-middle-y ms-2  custom-icon "/>
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
                      className="position-absolute top-50 end-0 translate-middle-y pe-3 "
                      style={{ cursor: "pointer", color: "#6c757d" }}
                    >
                      {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                    </span>
                  )}
                </div>
                <div className="d-grid gap-2 col-6 mx-auto staffbutton">
                  <button
                    className="btn btn-primary custom-btn"
                    onClick={addUserToServer}
                  >
                    CREATE ACCOUNT
                  </button>
                </div>
                <div className="stafflink">
                  Already have an account? <Link to="/StaffLogin">Sign in</Link>
                </div>
              </div>
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default StaffRegistration;
