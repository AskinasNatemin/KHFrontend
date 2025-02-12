import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/Staff/StaffReg.css";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
import StaffCodePage from "./StaffCodePage";

function StaffRegistration() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [staffRegister, setStaffRegister] = useState({
    Name: "",
    Email: "",
    Contact: "",
    Password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [codeBox,setCodeBox]=useState(true);
  const [staffAccess,setStaffAccess]=useState(false)

  const handleChange = (e) => {
    setError('')
    setStaffRegister((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const addUserToServer = async () => {
    axios.post('http://localhost:5001/staffRegistration',staffRegister)
    .then((res)=>{
      console.log(res);  
    })
    .catch((err)=>{
      console.log(err.response.data);
      // setError(err.response.data.message)
    })
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addUserToServer();
    }
  };

  useEffect(()=>{
    if(staffAccess){
      setCodeBox(false)
    }
  },[staffAccess])



  return (
    <div className="staffContaine">
      {codeBox && 
        <StaffCodePage className='StaffCodeContainer' setStaffAccess={setStaffAccess}/>
      }
      {staffAccess && <div className="staffborder">
        <span className="">
          <div className="staffinput">
            <div className="staffhead">
              <h2>Registeration Form</h2>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}

            <div className="input-group flex-nowrap ">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                id="staffRegName"
                name="Name"
                value={staffRegister.Name}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Email"
                name="Email"
                value={staffRegister.Email}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="Contact"
                name="Contact"
                value={staffRegister.Contact}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control pe-5"
                id="exampleFormControlInput3"
                placeholder="Password"
                name="Password"
                value={staffRegister.Password}
                onChange={handleChange}
              />
              {staffRegister.Password && (
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="position-absolute top-50 end-0 translate-middle-y pe-3"
                  style={{ cursor: "pointer", color: "#6c757d" }}
                >
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </span>
              )}
            </div>
            <div className="d-grid gap-2 col-6 mx-auto staffbutton">
              <button className="btn btn-primary" onClick={addUserToServer}>
                CREATE ACCOUNT
              </button>
            </div>
            <div className="stafflink">
              Already have an account? <Link to="/StaffLogin">Sign in</Link>
            </div>
          </div>
        </span>
      </div>}
    </div>
  );
}

export default StaffRegistration;