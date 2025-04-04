import axios from "axios";
import "../../Styles/Student/StudentForgetPassword.css";
import React, { useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { HiRefresh } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FaLock } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import studentForgetImage from "../../Assets/images/ForgetPasswordImages/passwordImg.png";

const initialState = {
  email: "",
  newPassword: "",
  isEmailValid: false,
  showPasswordField: false,
  error: "",
  readOnlyEmail: false,
  success: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_NEW_PASSWORD":
      return { ...state, newPassword: action.payload };
    case "SET_SHOW_PASSWORD_FIELD":
      return { ...state, showPasswordField: action.payload };
    case "SET_EMAIL_VALID":
      return { ...state, isEmailValid: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_SUCCESS":
      return { ...state, success: action.payload };
    case "SET_READ_ONLY_EMAIL":
      return { ...state, readOnlyEmail: action.payload };
    default:
      return state;
  }
}

function StudentForgetPassword() {
  const [seePassword, setSeePassword] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    dispatch({ type: "SET_ERROR", payload: "" });
    dispatch({ type: "SET_EMAIL", payload: e.target.value });
  };

  const handleNewPasswordChange = (e) => {
    dispatch({ type: "SET_ERROR", payload: "" });
    dispatch({ type: "SET_NEW_PASSWORD", payload: e.target.value });
  };

  const handleEmailSubmit = () => {
    const { email } = state;
    axios
      .post("http://localhost:5001/studentCheckMail", { email })
      .then((response) => response.data.data)
      .then((data) => {
        if (data) {
          dispatch({ type: "SET_EMAIL_VALID", payload: true });
          dispatch({ type: "SET_SHOW_PASSWORD_FIELD", payload: true });
          dispatch({ type: "SET_ERROR", payload: "" });
          dispatch({ type: "SET_READ_ONLY_EMAIL", payload: true });
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({ type: "SET_ERROR", payload: err.response.data.message });
      });
  };

  const handleResetPassword = () => {
    const { email, newPassword: password } = state;
    axios
      .post("http://localhost:5001/studentChangePassword", { email, password })
      .then((res) => {
        dispatch({ type: "SET_SUCCESS", payload: res.data.message });
        return res;
      })
      .then((res) => {
        if (res) {
          setTimeout(() => {
            navigate("/StudentLogin", { replace: true });
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({ type: "SET_ERROR", payload: err.response.data.message });
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.name === "forgetMail") {
        handleEmailSubmit();
      } else if (e.target.name === "setPassword") {
        handleResetPassword();
      }
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };
  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <div className="studentForgetContainer">
      <div className="studentForgetGoBackContainer  ">
        <FaHome onClick={handleGoBack} className="studentForgetGoBackIcon " />
      </div>
      <div className="studentForgetImageContainer">
        <img
          src={studentForgetImage}
          alt="Student"
          className="studentForgetImage img-fluid"
        />
      </div>
      <div className="studentForgetborder ">
        <div className="studentForgetHead d-flex align-items-center justify-content-center">
          <h3 className="">Forget Password</h3>
          <HiRefresh
            onClick={handleRefresh}
            title="refresh"
            className="studentRefresh  float-end"
          />
        </div>
        <div className="studentForgetinput">
          {state.error && (
            <div className="studentForgeterrorContainer alert ">
              <div className="studentForgeterroricon">
                <FiAlertTriangle className="me-2" />
              </div>
              {state.error}
            </div>
          )}
          {state.success && (
            <div className="studentForgetsuccessContainer alert">
              <div className="studentForgetsuccessicon">
                <TiTick className="icon-class" />
              </div>
              {state.success}
            </div>
          )}

          <div className="position-relative mb-3">
            <MdEmail className="position-absolute top-50 start-0 translate-middle-y ms-2" />
            <input
              autoFocus
              type="email"
              className="form-control"
              placeholder="Enter Email"
              name="forgetMail"
              value={state.email}
              onChange={handleEmailChange}
              readOnly={state.readOnlyEmail}
              onKeyDown={handleKeyDown}
            />
          </div>

          {!state.showPasswordField && (
            <div className="studentForgetButton d-grid gap-2 col-12 mx-auto">
              <button
                className="btn btn-danger "
                onClick={handleEmailSubmit}
              >
                ENTER
              </button>
            </div>
          )}

          {state.showPasswordField && (
            <>
              <div className="position-relative mb-3">
                <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-2  studentlogincustom-icon " />

                <input
                  type={seePassword ? "text" : "password"}
                  name="setPassword"
                  className="form-control"
                  placeholder="New Password"
                  value={state.newPassword}
                  onChange={handleNewPasswordChange}
                  onKeyDown={handleKeyDown}
                />
                {state.newPassword && (
                  <span
                    onClick={() => setSeePassword(!seePassword)}
                    className="position-absolute top-50 end-0 translate-middle-y pe-3"
                  >
                    {seePassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </span>
                )}
              </div>

              <div className="d-grid gap-2 col-12 mx-auto studentForgetButton">
                <button
                  className="btn btn-danger"
                  onClick={handleResetPassword}
                >
                  CONFIRM
                </button>
              </div>
            </>
          )}

          <div className="studentForgetLink">
            Create a new account <Link to="/StudentRegistration">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentForgetPassword;
