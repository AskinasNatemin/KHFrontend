import React, { useContext, useEffect, useState } from "react";
import "../../Styles/Student/StudentLogin.css";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import axios from "axios";
import { loggData } from "../Context/AppContext";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

function StudentLogin() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { loggedData, setLoggedData } = useContext(loggData);
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMsg("");
    setSuccessMsg("");
  }, []);

  const handleInputs = (e) => {
    setErrorMsg("");
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:5001/studentLogin", data)
      .then((res) => {
        localStorage.setItem("user", res.data.data._id);
        setErrorMsg("");
        setSuccessMsg(res.data.message);
        setLoggedData(res.data.data);
        return res;
      })
      .then((res)=>{
        if(res){
          setTimeout(()=>{
        navigate("/", { replace: true });
          },500)
        }
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

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="student-login">
      <div className="login-image"></div>
      <div className="student-frame">
        <div className="w-100 studentLoginGoBackContainer p-2 d-flex align-items-center">
          <IoArrowBackCircleOutline
            className="studentLoginGoBackIcon float-start"
            onClick={handleGoBack}
          />
        </div>
        <form>
          <h1>LOGIN</h1>
          {errorMsg && (
            <div className="errorContainer alert alert-danger">{errorMsg}</div>
          )}
          {successMsg && (
            <div className="successContainer alert alert-success">
              {successMsg}
            </div>
          )}
          <div className="student-box">
            <input
              type="text"
              name="email"
              placeholder="E-Mail"
              onChange={handleInputs}
              value={data.email}
              onKeyDown={handleOnKeyDown}
            />
          </div>
          <div className="student-box position-relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={handleInputs}
              value={data.password}
              className="pe-5"
              onKeyDown={handleOnKeyDown}
            />
            {data.password && (
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="position-absolute top-50  translate-middle-y pe-3"
                style={{ cursor: "pointer", color: "#6c757d", right: "50px" }}
              >
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </span>
            )}
          </div>
          <div className="student-forgot">
            <Link to={"/StudentForgetPassword"}>forgot password</Link>
          </div>
          <div className="student-but">
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </div>
          <div className="student-reg">
            <span>
              Don't have an account?
              <Link to="/StudentRegistration" className="ms-1">
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;
