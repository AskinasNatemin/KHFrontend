import { Link, useNavigate } from "react-router-dom";
import "../../Styles/Student/StudentReg.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdContactPage } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { TiTick } from "react-icons/ti";

function StudentRegistration() {
  const [showPassword, setShowPassword] = useState(false);

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
    setError("");

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
    if (isNaN(password)) {
      setError("Password must be a number");
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
      localStorage.setItem("userId", response.data.data._id);
      localStorage.setItem("user", response.data.data.user);

      setSuccessMessage("Registration successful!");
      setStudentRegister({
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
      });
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 500);
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
    setError("");
    setSuccessMessage("");
  }, []);

  return (
    <div className="StudentContainer">
      <div className="StudentRegGoBackContainer p-3  w-100">
        <FaHome
          onClick={handleGoBack}
          className="StudentRegGoBackIcon float-end"
        />
      </div>
      <div className="StudentRegborder">
        <div className="StudentReginput">
          <div className="StudentReghead">
            <h3>STUDENT SIGNUP</h3>
          </div>

          {error && (
            <div className="studentRegerrorContainer alert ">
              <div className="studentRegerroricon">
                <FiAlertTriangle className="icon-class" />
              </div>
              {error}
            </div>
          )}
          {successMessage && (
            <div className="studentRegsuccessContainer alert">
              <div className="studentRegsuccessicon">
                <TiTick className="icon-class" />
              </div>
              {successMessage}
            </div>
          )}

          <div className="position-relative mb-3">
            <FaUser className="position-absolute top-50 start-0 translate-middle-y ms-2  studentregcustom-icon " />
            <input
              autoFocus
              type="text"
              className="form-control"
              placeholder="Username"
              name="userName"
              value={studentRegister.userName}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="position-relative mb-3">
            <MdEmail className="position-absolute top-50 start-0 translate-middle-y ms-2  studentregcustom-icon" />

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
          <div className="position-relative mb-3">
            <MdContactPage className="position-absolute top-50 start-0 translate-middle-y ms-2 studentregcustom-icon" />

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
          <div className="mb-3 position-relative">
            <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-2  studentregcustom-icon " />
            <input
              type={showPassword ? "text" : "password"}
              className="form-control pe-5"
              id="exampleFormControlInput3"
              placeholder="Password"
              name="password"
              value={studentRegister.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            {studentRegister.password && (
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="position-absolute top-50 end-0 translate-middle-y pe-3"
                style={{ cursor: "pointer", color: "#6c757d" }}
              >
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </span>
            )}
          </div>
          <div className="d-grid gap-2 col-6 mx-auto StudentRegbutton">
            <button
              className="btn btn-danger custom-btn "
              onClick={addUserToServer}
            >
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
