import React, { useState } from "react";
import "../../Styles/Admin/AdminLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [state, setState] = useState({
    email: "", // Change to lowercase
    password: "", // Change to lowercase
  });

  const navigate = useNavigate();

  const change = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const response = await axios.post("http://localhost:5001/AdminLogin", {
        email: state.email,
        password: state.password,
      });
      // On successful login, handle the response (you can store token, admin info, etc.)
      alert(response.data.message); // You can show success messages or redirect

      // You could store the admin info in localStorage or context, if needed
      // localStorage.setItem("adminEmail", response.data.adminEmail);

      navigate("/AdminDashboard");
    } catch (error) {
      // Handle errors (incorrect login)
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div className="adminborder">
          <span className="">
            <div className="admininput">
              <div className="adminhead">
                <h2>Admin Login</h2>
              </div>

              <div className="mb-3">
                <input
                  autoFocus
                  onChange={change}
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Email"
                  name="email" // Change to lowercase
                  required
                  value={state.email} // Change to lowercase
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={change}
                  type="password"
                  className="form-control"
                  id="exampleFormControlInput3"
                  placeholder="Password"
                  name="password" // Change to lowercase
                  required
                  value={state.password} // Change to lowercase
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
