import React from "react";
import "../../Styles/AdminLogin.css";
export const AdminLogin = () => {
  return ( <div >
    <form >
    <div className="adminborder">
      <span className="">
        <div className="admininput">
          <div className="adminhead">
            <h2>Admin Login</h2>
          </div>

        
          <div className="mb-3">
            <input
              
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Email"
              name="Email"
              
              required
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
}
;export default AdminLogin;
