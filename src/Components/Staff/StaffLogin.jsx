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
import stafflogImg from "../../Assets/images/LoginImage/studentLoginIMG.png"
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
    <div className="stafflogcontainer">
      <div className="stafflogGoBackContainer p-3  w-100 ">
        <FaHome
          onClick={handleGoBack}
          className="stafflogGoBackIcon float-end"
        />
      </div>
      <div class="container">
  <div class="row">
    <div class="col-9">.col-9</div>
    <div className="col-4"><img src={stafflogImg}/></div>
    <div class="col-6"><div className="stafflogborder">
        <span className="">
          <div className="staffloghead">
            <h3> STAFF LOGIN</h3>
          </div>

          {errorMsg && (
            <div className="stafflogerrorContainer alert ">
              <div className="stafflogerroricon">
                <FiAlertTriangle className="icon-class" />
              </div>
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="stafflogsuccessContainer alert alert-success">
              <div className="stafflogsuccessicon">
                <TiTick className="icon-class" />
              </div>
              {successMsg}
            </div>
          )}

          <div className="staffloginput">
            <div className="position-relative mb-3">
              <MdEmail className="position-absolute top-50 start-0 translate-middle-y ms-2  stafflogincustom-icon" />
              <input
                autoFocus
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Email"
                name="Email"
                onChange={handleInputs}
                value={data.Email}
                onKeyDown={handleOnKeyDown}
              />
            </div>
            <div className="position-relative mb-3">
              <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-2  stafflogincustom-icon " />
              <input
                type={showPassword ? "text" : "password"}
                className="form-control pe-5"
                id="exampleFormControlInput3"
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
                  style={{ cursor: "pointer", color: "#6c757d" }}
                >
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </span>
              )}
            </div>

            <div className="d-flex justify-content-end staffloglink">
              <Link to={"/StaffForgetPassword"}>forgot password</Link>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto stafflogbutton">
              <button
                className="btn btn-danger stafflogcustom-btn"
                type="Submit"
                onClick={handleLogin}
              >
                LOGIN
              </button>
            </div>
            <div className="staffloglink">
              Create new account <Link to="/StaffRegistration">Sign up</Link>
            </div>
          </div>
        </span>
      </div><br/>Subsequent columns continue along the new line.</div>
  </div>
</div>
      
    </div>
  );
};

export default StaffLogin;