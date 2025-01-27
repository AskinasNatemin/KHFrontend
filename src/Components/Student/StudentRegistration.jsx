import { Link } from "react-router-dom";
import "../../Styles/StudentReg.css";
function StudentRegistration() {
  return (
    <div>
      <div className="StudentRegborder">
        <span className="">
          <div className="StudentReginput">
            <div className="StudentReghead">
              <h2>Registration From</h2>
            </div>

            <div className="input-group flex-nowrap ">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                id="StudentRegName"
                name="Name"
              />
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
                type="number"
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="Contact"
                name="Contact"
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
            <div className="d-grid gap-2 col-6 mx-auto StudentRegbutton">
              <button className="btn btn-primary">CREATE ACCOUNT</button>
            </div>
            <div className="StudentReglink">
              Already have an account? <Link to="/StudentLogin">Sign in</Link>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
}

export default StudentRegistration;
