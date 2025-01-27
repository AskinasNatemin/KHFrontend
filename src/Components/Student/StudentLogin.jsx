import React from "react";
import "../../Styles/StudentLogin.css";

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
          <a href="">Forgot Password</a>
        </div>
        <div className="student-but">
          <button type="submit">Login</button>
        </div>
        <div className="student-reg">
          <p>
            Don't have a account? <a href="">Register</a>
          </p>
        </div>
      </form>
    </div>
    </div>
  );
}
export default StudentLogin;
