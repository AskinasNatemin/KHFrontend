import React, { useState } from "react";
import "../../Styles/Staff/StaffLogin.css";
import { Link } from "react-router-dom";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const StaffLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [state, setState] = useState({
    Email: "",
    Password: "",
  });

  return (
    <div>
      <div className="stafflogborder">
        <span className="">
          <div className="staffloginput">
            <div className="staffloghead">
              <h2> LOGIN</h2>
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Email"
                name="Email"
              />
            </div>
            <div className="mb-3 position-relative">
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

            <div className="d-flex justify-content-end">
              <Link to={"/StaffForgetPassword"}>forgot password</Link>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto stafflogbutton">
              <button
                className="btn btn-primary"
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
