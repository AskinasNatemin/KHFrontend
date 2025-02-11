import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../Styles/StaffForgetPassword.css";

function StaffForgetPassword() {
  const [Email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);

  // const handleEmailSubmit = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:5001/", {Email });

  //     if (response.data.valid) {
  //       setIsEmailValid(true);
  //       setShowPasswordField(true);
  //     } else {
  //       alert("Email not found. Please enter a registered email.");
  //     }
  //   } catch (error) {
  //     alert("Error validating email. Please try again.");
  //   }
  // };

  // const handlePasswordSubmit = async () => {
  //   try {
  //     if (!newPassword) {
  //       alert("Please enter a new password.");
  //       return;
  //     }
  //     await axios.post("http://localhost:5001/resetPassword", { email: Email, newPassword });
  //     alert("Password changed successfully. You can now log in.");
  //   } catch (error) {
  //     alert("Error resetting password. Please try again.");
  //   }
  // };

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
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={Email}
              />
            </div>

            {!showPasswordField && (
              <div className="d-grid gap-2 col-6 mx-auto staffForgetbutton">
                <button className="btn btn-primary">
                  Enter
                </button>
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
                  <button className="btn btn-primary">
                    Confirm
                  </button>
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
