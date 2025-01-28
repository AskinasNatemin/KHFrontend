import React, { useState } from "react";
import "../../Styles/AdminLogin.css";
export const AdminLogin = () => {
  const [state, setState] = useState({
    Email: "",
    Password: "",
  });

  const change = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    // console.log(state);
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Form Data:", state);
  };

   
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="adminborder">
          <span className="">
            <div className="admininput">
              <div className="adminhead">
                <h2>Admin Login</h2>
              </div>

              <div className="mb-3">
                <input
                  onChange={change}
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Email"
                  name="Email"
                  required
                  value={state.Email}
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={change}
                  type="password"
                  className="form-control"
                  id="exampleFormControlInput3"
                  placeholder="Password"
                  name="Password"
                  value={state.Password}
                />
              </div>
              <div className="d-grid gap-2 col-6 mx-auto adminbutton">
                <button className="btn btn-primary" type="Submit">
                  Login
                </button>
              </div>
            </div>
          </span>
        </div>
      </form>
    </div>
  );
};
export default AdminLogin;
