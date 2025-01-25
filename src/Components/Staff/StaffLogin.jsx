import React from "react";
import "../../Styles/StaffLogin.css";
const StaffLogin = () => {
  return (
    
      <div>
        <div className="stafflogborder">
          <span className="">
            <div className="staffloginput">
              <div className="staffloghead">
                <h2>Registeration Form</h2>
              </div>

              <div className="input-group flex-nowrap ">
                <input
                  onChange={change}
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                  id="Benin"
                  name="Name"
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={change}
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Email"
                  name="Email"
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
                />
              </div>
              <div className="d-grid gap-2 col-6 mx-auto stafflogbutton">
                <button className="btn btn-primary" type="Submit">
                  LOGIN
                </button>
              </div>
              <div className="staffloglink">
                Create new account <a href="">Sign up</a>
              </div>
            </div>
          </span>
        </div>
      </div>
  );
};

export default StaffLogin;
