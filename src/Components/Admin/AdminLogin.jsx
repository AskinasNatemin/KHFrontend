import React, { useContext, useState } from "react";
import "../../Styles/Admin/AdminLogin.css";
import { useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { FaHome, FaLock } from "react-icons/fa";
import adminLoginImage from "../../Assets/images/AdminImage/adminLoginImg.png";
import { FiAlertTriangle } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import { Logged } from "../Context/AppContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { setIsLogged } = useContext(Logged);


  const email = "admin@gmail.com";
  const password = "123456";
  const adminId = 1234554321;

  const [login, setLogin] = useState({
    adminEmail: "",
    adminPassword: "",
  });

  const change = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    if (login.adminEmail !== email) {
      setSuccessMsg("");
      setErrorMsg("Email Not Found");
    } else if (login.adminPassword !== password) {
      setErrorMsg("Incorrect Password");
      setSuccessMsg("");
    } else {
      setErrorMsg("");
      setSuccessMsg("Login Successful");
      localStorage.setItem("adminId",adminId)
      setIsLogged(true)
      setTimeout(() => {
        navigate("/AdminMainDash");
      }, 1000);
    }
  };

  return (
    <div className="adminlogcontainer">
      <div className="adminlogGoBackContainer">
        <FaHome onClick={() => navigate("/")} className="adminLogGoBackIcon" />
      </div>
      <div className="adminImageContainer">
        <img
          src={adminLoginImage}
          alt="welcome"
          className="img-fluid adminLoginImage"
        />
      </div>
      <form onSubmit={submit} className="w-100 d-flex justify-content-center">
        <div className="adminborder">
          <div className="admininput">
            <div className="adminhead">
              <h3>ADMIN LOGIN</h3>
            </div>

            {errorMsg && (
              <div className="adminLogerrorContainer alert">
                <div className="adminLogerroricon">
                  <FiAlertTriangle className="me-2" />
                </div>
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="adminLogsuccessContainer alert">
                <div className="adminLogsuccessicon">
                  <TiTick className="me-2" />
                </div>
                {successMsg}
              </div>
            )}

            <div className="position-relative mb-3">
              <MdEmail className="position-absolute top-50 start-0 translate-middle-y ms-2" />
              <input
                autoFocus
                onChange={change}
                type="email"
                className="form-control"
                placeholder="Email"
                name="adminEmail"
                required
                value={login.adminEmail}
              />
            </div>

            <div className="position-relative mb-3">
              <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-2" />
              <input
                onChange={change}
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                name="adminPassword"
                required
                value={login.adminPassword}
              />
              {login.adminPassword.length > 0 && (
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="position-absolute top-50 end-0 translate-middle-y pe-3"
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </span>
              )}
            </div>

            <div className="d-grid gap-2 col-12 mx-auto adminlogbutton">
              <button className="btn btn-danger" type="submit">
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
