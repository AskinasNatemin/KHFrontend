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
import { FiAlertTriangle } from "react-icons/fi";
import { TiTick } from "react-icons/ti";

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

        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err.response.data);
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

  const handleGoBack = () => {
    navigate("/");
  };

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
                {error && (
                  <div className="staffRegerrorContainer alert ">
                    <div className="staffRegerroricon">
                      <FiAlertTriangle className="icon-class" />
                    </div>
                    {error}
                  </div>
                )}
                {successMessage && (
                  <div className="staffRegsuccessContainer alert">
                    <div className="staffRegsuccessicon">
                      <TiTick className="icon-class" />
                    </div>
                    {successMessage}
                  </div>
                )}

                <div className="position-relative mb-3">
                  <FaUser className="position-absolute top-50 start-0 translate-middle-y ms-2   " />
                  <input
                    autoFocus
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
                  <MdEmail className="position-absolute top-50 start-0 translate-middle-y ms-2  " />
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
                  <MdContactPage className="position-absolute top-50 start-0 translate-middle-y ms-2 " />
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
                  <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-2   " />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control pe-5"
                    id="exampleFormControlInput3"
                    placeholder="Password"
                    name="Password"
                    value={staffRegister.Password}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                  {staffRegister.Password && (
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
                    className="btn btn-danger custom-btn"
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
