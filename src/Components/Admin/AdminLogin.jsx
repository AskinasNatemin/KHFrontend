import React, { useState } from "react";
import "../../Styles/Admin/AdminLogin.css";
import { useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import adminLoginImage from "../../Assets/images/AdminImage/AdminLoginImg.png";

const AdminLogin = () => {

  const navigate=useNavigate();

  let email="admin@gmail.com";
  let password="123456";
  
  const [login, setLogin] = useState({
    adminEmail: "",
    adminPassword: "",
  });
  
  const change=(data)=>{    
    setLogin({...login,[data.target.name]:data.target.value});
  }
  
  const submit=(e)=>{
    e.preventDefault();

    if(login.adminEmail !== email){
      alert("Email Not Found")
    }
    else if(login.adminPassword !== password){
      alert("Incorrect Password")
    }
    else{
      alert("Login Successful")
      navigate("/AdminMainDash",{replace:true})
    }
  }

  return (
    <div className="adminlogcontainer">
      <div className="adminlogGoBackContainer">
      </div>
      <div className="adminImageContainer">
        <img
          src={adminLoginImage}
          alt="welcome"
          className="img-fluid adminLoginImage"
        />
      </div>

      <form
        onSubmit={submit}
        className="w-100 d-flex justify-content-center"
      >
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
                name="adminEmail"
                required
                value={login.adminEmail}
              />
            </div>

            <div className="position-relative mb-3">
              <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-2" />
              <input
                onChange={change}
                type="passowrd"
                className="form-control"
                placeholder="Password"
                name="adminPassword"
                required
                value={login.adminPassword}
              />
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
