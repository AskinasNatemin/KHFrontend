import React, { useContext, useEffect, useState } from "react";
import "../../Styles/Student/StudentLogin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loggData } from "../Context/AppContext";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { FaLock, FaHome } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import studentLoginImage from '../../Assets/images/LoginImage/studentLoginIMG.png';

function StudentLogin() {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { setLoggedData } = useContext(loggData);
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMsg("");
    setSuccessMsg("");
  }, []);

  const handleInputs = (e) => {
    setErrorMsg("");
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:5001/studentLogin", data)
      .then((res) => {
        localStorage.setItem("userId", res.data.data._id);
        localStorage.setItem("user", res.data.data.user);
        setErrorMsg("");
        setSuccessMsg(res.data.message);
        setLoggedData(res.data.data);
        setTimeout(() => navigate("/", { replace: true }), 500);
      })
      .catch((err) => {
        setErrorMsg(err.response?.data?.message);
      });
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="studentLogContainer">
      <div className="studentLogGoBackContainer py-4">
        <FaHome onClick={() => navigate("/")} className="studentLogGoBackIcon" />
      </div>
      <div className="studentContents">
        <div className="studentImageContainer">
          <img src={studentLoginImage} alt="welcome" />
        </div>
        <div className="studentLoginInputContainer">
          <div className="studentLogBorder">
            <h3 className="studentLogHead">STUDENT LOGIN</h3>
            {errorMsg && (
              <div className="studentLogErrorContainer">
                <FiAlertTriangle className="studentLogIconClass" /> {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="studentLogSuccessContainer">
                <TiTick className="studentLogIconClass" /> {successMsg}
              </div>
            )}
            <div className="studentLogInput">
              <div className="studentLogInputGroup">
                <MdEmail className="studentLogInputIcon" />
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  onChange={handleInputs}
                  onKeyDown={handleOnKeyDown}
                  value={data.email}
                  autoFocus
                />
              </div>
              <div className="studentLogInputGroup">
                <FaLock className="studentLogInputIcon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                   className="form-control" 
                  name="password"
                  onChange={handleInputs}
                  onKeyDown={handleOnKeyDown}
                  value={data.password}
                />
                {data.password && (
                  <span onClick={() => setShowPassword(!showPassword)} className="studentLogPasswordToggle">
                    {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </span>
                )}
              </div>
              <div className="studentLogLink">
                <Link to="/StudentForgetPassword">Forgot password?</Link>
              </div>
              <div className="d-grid gap-2 col-12 mx-auto studentLogButton">
              <button className="btn btn-danger " onClick={handleLogin}>LOGIN</button>
              </div>
              <div className="studentLogLink">
                Create new account <Link to="/StudentRegistration">Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
