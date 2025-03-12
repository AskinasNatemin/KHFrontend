import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/Staff/StaffReg.css";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import StaffCodePage from "./StaffCodePage";
import { FaHome, FaUser, FaLock } from "react-icons/fa";
import { MdEmail, MdContactPage } from "react-icons/md";
import { FiAlertTriangle } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import RegImg from "../../Assets/images/RegistrationImage/RegistrationImg.png";
function StaffRegistration() {
  const [showPassword, setShowPassword] = useState(false);
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
    setError("");
    setStaffRegister((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addUserToServer = async () => {
    axios
      .post("http://localhost:5001/staffRegistration", staffRegister)
      .then((res) => {
        setError("");
        setSuccessMessage(res.data.message);
        localStorage.setItem("userId", res.data.data._id);
        localStorage.setItem("user", res.data.data.user);
        setTimeout(() => navigate("/", { replace: true }), 1000);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addUserToServer();
    }
  };

  useEffect(() => {
    if (staffAccess) {
      setCodeBox(false);
    }
  }, [staffAccess]);

  return (
    <div className=" staffRegContainer">
      {codeBox && <StaffCodePage setStaffAccess={setStaffAccess} />}
      {staffAccess && (
        <>
          {/* Go Back Button */}

          <div className="staffRegGoBackContainer">
            <FaHome
              onClick={() => navigate("/")}
              className="staffRegGoBackIcon"
            />
          </div>
          {/* Right Side - Image */}
          <div className="staffRegImageContainer">
            <img src={RegImg} alt="Staff" className="staffRegImage img-fluid" />
          </div>
          <div className="staffRegBorder  ">
            <div className="staffReginput">
              <div className="staffRegHead">
                <h3>STAFF SIGNUP</h3>
              </div>

              {error && (
                <div className="staffRegerrorContainer alert">
                  <div className="staffRegerroricon">
                  <FiAlertTriangle className=" me-2" /></div> {error}
                </div>
              )}
              {successMessage && (
                <div className="staffRegsuccessContainer alert">
                  <div className="staffRegsuccessicon">
                  <TiTick className="me-2" /> </div>{successMessage}
                </div>
              )}

              <div className="mb-3 position-relative">
                <FaUser className="staffRegIcon" />
                <input
                  type="text"
                  className="form-control "
                  placeholder="Username"
                  name="Name"
                  value={staffRegister.Name}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <div className="mb-3 position-relative">
                <MdEmail className="staffRegIcon" />
                <input
                  type="email"
                  className="form-control "
                  placeholder="Email"
                  name="Email"
                  value={staffRegister.Email}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <div className="mb-3 position-relative">
                <MdContactPage className="staffRegIcon" />
                <input
                  type="number"
                  className="form-control "
                  placeholder="Contact"
                  name="Contact"
                  value={staffRegister.Contact}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <div className="mb-3 position-relative">
                <FaLock className="staffRegIcon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control "
                  placeholder="Password"
                  name="Password"
                  value={staffRegister.Password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                {staffRegister.Password && (
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="position-absolute top-50 end-0 translate-middle-y pe-3"
                  >
                    {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </span>
                )}
              </div>

              <div className="d-grid gap-2 col-12 mx-auto staffRegButton">
                <button className=" btn btn-danger" onClick={addUserToServer}>
                  CREATE ACCOUNT
                </button>
              </div>

              <div className="staffRegLink">
                Already have an account? <Link to="/StaffLogin">Sign in</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default StaffRegistration;
