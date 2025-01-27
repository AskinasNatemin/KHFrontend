import React from "react";
import "../../Styles/StudentLogin.css";
import { Link } from "react-router-dom";

function StudentLogin() {
  return (
    <div className="student-login">
    <div className="student-frame">
      <form action="">
        <h1>LOGIN</h1>
        <div className="student-box">
          <input type="text"  placeholder="E-Mail" />
        </div>
        <div className="student-box">
          <input type="password" placeholder="Password" />
        </div>
        <div className="student-forgot">
          <Link to={'/StudentForgotPassword'}>forgot password</Link>
        </div>
        <div className="student-but">
          <button type="submit">Login</button>
        </div>
        <div className="student-reg">
          <p>
            Don't have a account? <Link to={'/StudentRegistration'}>Sign up</Link>
          </p>
        </div>
      </form>
    </div>
    </div>
  );
}
export default StudentLogin;
