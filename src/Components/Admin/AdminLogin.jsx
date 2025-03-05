import React, { useState } from "react";
import "../../Styles/Admin/AdminLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import adminLoginImage from"../../Assets/images/AdminImage/adminLoginImg.png";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const change = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/AdminLogin", {
        email: state.email,
        password: state.password,
      });

      alert(response.data.message);
      navigate("/AdminDashboard");
    } catch (error) {
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="adminlogcontainer">
      <div className="adminlogGoBackContainer">
        <FaHome onClick={handleGoBack} className="adminlogGoBackIcon" />
      </div>
      <div className="adminImageContainer">
  <img src={adminLoginImage} alt="welcome" className="img-fluid adminLoginImage" />
</div>


      <form onSubmit={handleLogin} className="w-100 d-flex justify-content-center">
        <div className="adminborder">
          <div className="admininput">
            <div className="adminhead">
              <h3>ADMIN LOGIN</h3>
            </div>

            <div className="position-relative mb-3">
              <MdEmail className="position-absolute top-50 start-0 translate-middle-y ms-2" />
              <input
                autoFocus
                onChange={change}
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                required
                value={state.email}
              />
            </div>

            <div className="position-relative mb-3">
              <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-2" />
              <input
                onChange={change}
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                name="password"
                required
                value={state.password}
              />
              {state.password && (
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="position-absolute top-50 end-0 translate-middle-y pe-3"
                  style={{ cursor: "pointer", color: "#6c757d" }}
                >
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </span>
              )}
            </div>

            <div className="d-grid gap-2 col-12 mx-auto adminlogbutton">
              <button className="btn btn-danger" type="submit">
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
