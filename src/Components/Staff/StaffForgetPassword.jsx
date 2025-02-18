import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../Styles/Staff/StaffForgetPassword.css";

const initialState={
  email: "",
  newPassword: "",
  isEmailValid: false,
  showPasswordField: false,
  error: 'hi',
  readOnlyEmail: false,
  success: "bye",
}

function reducer(state,action){
  switch(action.type){
    // case 
  }
} 

function StaffForgetPassword() {

  const [Email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);
  const[state,dispatch]=useReducer(reducer,initialState)


  return (
    <>
      <div className="staffForgetborder">
        <span>
          <div className="staffForgetinput">
            <div className="staffForgethead">
              <h2>Forget Password</h2>
            </div>

            <div className="mb-3">
              <input
                autoFocus
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={Email}
              />
            </div>

            {!showPasswordField && (
              <div className="d-grid gap-2 col-6 mx-auto staffForgetbutton">
                <button className="btn btn-primary">Enter</button>
              </div>
            )}

            {showPasswordField && (
              <>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    value={newPassword}
                  />
                </div>

                <div className="d-grid gap-2 col-6 mx-auto staffForgetbutton">
                  <button className="btn btn-primary">Confirm</button>
                </div>
              </>
            )}

            <div className="staffForgetlink">
              Create a new account <Link to="/StaffRegistration">Sign up</Link>
            </div>
          </div>
        </span>
      </div>
    </>
  );
}

export default StaffForgetPassword;
