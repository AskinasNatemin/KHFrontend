import React, { useContext, useEffect, useState } from "react";
import "../../Styles/Student/StudentLogin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loggData } from "../Context/AppContext";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

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
      .then((res) => {
        if (res) {
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 500);
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
    <div className="studentlogcontainer">
      <div className="studentlogGoBackContainer p-3  w-100 ">
        <FaHome
          onClick={handleGoBack}
          className="studentlogGoBackIcon float-end"
        />
      </div>
      <div className="studentlogborder">
        <span className="">
        <div className="studentloghead">
              <h3> STUDENT LOGIN</h3>
            </div>
          {errorMsg && (
            <div className="errorContainer alert ">{errorMsg}</div>
          )}
          {successMsg && (
            <div className="successContainer alert alert-success">
              {successMsg}
            </div>
          )}
          <div className="studentloginput">
            <div className="position-relative mb-3">
              <MdEmail className="position-absolute top-50 start-0 translate-middle-y ms-2  studentlogincustom-icon" />
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Email"
                name="email"
                onChange={handleInputs}
                value={data.email}
                onKeyDown={handleOnKeyDown}
              />
            </div>
            <div className="position-relative mb-3">
              <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-2  studentlogincustom-icon " />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleInputs}
                value={data.password}
                className="form-control pe-5"
                onKeyDown={handleOnKeyDown}
              />
              {data.password && (
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="position-absolute top-50  translate-middle-y pe-3"
                  style={{ cursor: "pointer", color: "#6c757d", left: "325px" }}
                >
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </span>
              )}
            </div>
            <div className="d-flex justify-content-end studentloglink">
              <Link to={"/StudentForgetPassword"}>forgot password</Link>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto studentlogbutton">
              <button
                className="btn btn-primary studentlogcustom-btn"
                type="button"
                onClick={handleLogin}
              >
                LOGIN
              </button>
            </div>
            <div className="studentloglink">
              Create new account <Link to="/StudentRegistration">Sign up</Link>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
}

export default StudentLogin;
