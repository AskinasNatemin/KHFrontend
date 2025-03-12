import React, { useContext, useState } from "react";
import "../../Styles/Staff/StaffLogin.css";
import { Link } from "react-router-dom";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import staffLoginImage from "../../Assets/images/LoginImage/studentLoginIMG.png";
import axios from "axios";
import { loggData } from "../Context/AppContext";

const StaffLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [data, setData] = useState({
    Email: "",
    Password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { loggedData, setLoggedData } = useContext(loggData);

  const handleInputs = (e) => {
    setErrorMsg("");
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:5001/staffLogin", data)
      .then((res) => {
        localStorage.setItem("userId", res.data.data._id);
        localStorage.setItem("user", res.data.data.user);
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
        console.log(err);

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
    <div className="staffLogContainer">
      <div className="staffLogGoBackContainer">
        <FaHome onClick={() => navigate("/")} className="staffLogGoBackIcon" />
      </div>
      <div className="staffLogImageContainer">
        <img
          src={staffLoginImage}
          alt="Staff"
          className="staffLogImage img-fluid"
        />
      </div>
      <div className="staffLogBorder">
        <div className="staffLoginput">
          <div className="staffLogHead">
            <h3>STAFF LOGIN</h3>
          </div>

          {errorMsg && (
            <div className="staffLogerrorContainer alert">
              <div className="staffLogerroricon">
                <FiAlertTriangle className="me-2" />
              </div>
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="staffLogsuccessContainer alert">
              <div className="staffLogsuccessicon">
                <TiTick className="me-2" />
              </div>
              {successMsg}
            </div>
          )}

          <div className="mb-3 position-relative">
            <MdEmail className="staffLogIcon" />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="Email"
              value={data.Email}
              onChange={handleInputs}
              onKeyDown={handleOnKeyDown}
              autoFocus
            />
          </div>

          <div className="mb-3 position-relative">
            <FaLock className="staffLogIcon" />
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              name="Password"
              value={data.Password}
              onChange={handleInputs}
              onKeyDown={handleOnKeyDown}
            />
            {data.Password && (
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="position-absolute top-50 end-0 translate-middle-y pe-3"
              >
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </span>
            )}
          </div>

          <div className="staffLogForgetLink">
            <Link to="/staffForgetPassword">Forgot password?</Link>
          </div>

          <div className="d-grid gap-2 col-12 mx-auto staffLogButton">
            <button className="btn btn-danger" onClick={handleLogin}>
              LOGIN
            </button>
          </div>

          <div className="staffLogLink">
            Create new account <Link to="/staffRegistration">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;
