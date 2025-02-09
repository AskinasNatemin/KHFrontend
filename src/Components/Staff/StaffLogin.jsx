import React, { useState } from "react";
import "../../Styles/StaffLogin.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const StaffLogin = () => {
  const navigate = useNavigate();
  const[state,setState]=useState({
    Email:"",
    Password:'',
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
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="exampleFormControlInput3"
                placeholder="Password"
                name="Password"
              />
            </div>
            <div className="d-flex justify-content-end">
              <Link to={"/StaffForgotPassword"}>forgot password</Link>
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
