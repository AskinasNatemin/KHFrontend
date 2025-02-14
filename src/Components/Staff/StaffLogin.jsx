import React, { useState } from "react";
import "../../Styles/Staff/StaffLogin.css";
import { Link } from "react-router-dom";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

const StaffLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [state, setState] = useState({
    Email: "",
    Password: "",
  });
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
      <div className="stafflogborder">
        <span className="">
          <div className="staffloginput">
            <div className="staffloghead">
              <h3> STAFF LOGIN</h3>
            </div>
            <div className="position-relative mb-3">
              <MdEmail className="position-absolute top-50 start-0 translate-middle-y ms-2  stafflogincustom-icon" />
              <input
                autoFocus
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Email"
                name="Email"
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

            <div className="d-flex justify-content-end staffloglink">
              <Link to={"/StaffForgetPassword"}>forgot password</Link>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto stafflogbutton">
              <button
                className="btn btn-primary stafflogcustom-btn"
                type="Submit"
                onClick={() => navigate("/", { replace: true })}
              >
                LOGIN
              </button>
            </div>
            <div className="staffloglink">
              Create new account <Link to="/StaffRegistration">Sign up</Link>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};

export default StaffLogin;
