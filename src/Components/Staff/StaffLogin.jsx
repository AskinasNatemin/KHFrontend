import React, { useContext, useState } from "react";
import "../../Styles/Staff/StaffLogin.css";
import { Link } from "react-router-dom";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import staffLoginImage from "../../Assets/images/LoginImage/studentLoginImage.png";
import axios from "axios";
import { loggData } from "../Context/AppContext";

const StaffLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [data, setData] = useState({
    Email: "",
    Password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { loggedData, setLoggedData } = useContext(loggData);

  const handleInputs = (e) => {
    setErrorMsg("");
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:5001/staffLogin", data)
      .then((res) => {
        localStorage.setItem("userId", res.data.data._id);
        localStorage.setItem("user", res.data.data.user);
        setErrorMsg("");
        setSuccessMsg(res.data.message);
        setLoggedData(res.data.data);
        return res;
      })
      .then((res) => {
        if (res) {
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);

        setErrorMsg(err.response?.data?.message);
      });
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="staffLogContainer">
         <div className="staffLogGoBackContainer py-4">
           <FaHome onClick={() => navigate("/")} className="staffLogGoBackIcon" />
         </div>
         <div className="staffContents">
           <div className="staffImageContainer">
             <img src={staffLoginImage} alt="welcome" />
           </div>
           <div className="staffLoginInputContainer">
             <div className="staffLogBorder">
               <h3 className="staffLogHead">Staff LOGIN</h3>
               {errorMsg && (
                 <div className="staffLogErrorContainer">
                   <FiAlertTriangle className="staffLogIconClass" /> {errorMsg}
                 </div>
               )}
               {successMsg && (
                 <div className="staffLogSuccessContainer">
                   <TiTick className="staffLogIconClass" /> {successMsg}
                 </div>
               )}
               <div className="staffLogInput">
                 <div className="staffLogInputGroup">
                   <MdEmail className="staffLogInputIcon" />
                   <input
                     type="email"
                     className="form-control"
                     placeholder="Email"
                     name="Email"
                     onChange={handleInputs}
                     onKeyDown={handleOnKeyDown}
                     value={data.Email}
                     autoFocus
                   />
                 </div>
                 <div className="staffLogInputGroup">
                   <FaLock className="staffLogInputIcon" />
                   <input
                     type={showPassword ? "text" : "password"}
                     placeholder="Password"
                     className="form-control"
                     name="Password"
                     onChange={handleInputs}
                     onKeyDown={handleOnKeyDown}
                     value={data.Password}
                   />
                   {data.Password && (
                     <span onClick={() => setShowPassword(!showPassword)} className="staffLogPasswordToggle">
                       {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                     </span>
                   )}
                 </div>
                 <div className="staffLogLink">
                   <Link to="/staffForgetPassword">Forgot password?</Link>
                 </div>
                 <div className="d-grid gap-2 col-12 mx-auto staffLogButton">
                 <button className="btn btn-danger " onClick={handleLogin}>LOGIN</button>
                 </div>
                 <div className="staffLogLink">
                   Create new account <Link to="/staffRegistration">Sign up</Link>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
  );
};

export default StaffLogin;
