import axios from "axios";
import "../../Styles/Student/StudentForgetPassword.css";
import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  newPassword: "",
  isEmailValid: false,
  showPasswordField: false,
  error: "",
  readOnlyEmail:false
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
    case 'SET_READ_ONLY_EMAIL':
      return{...state,readOnlyEmail:action.payload}
    default:
      return state;
  }
}

function StudentForgetPassword() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleEmailChange = (e) => {
    dispatch({type:"SET_ERROR",payload:''})
    dispatch({ type: "SET_EMAIL", payload: e.target.value });
  };

  const handleNewPasswordChange = (e) => {
    dispatch({type:"SET_ERROR",payload:''})
    dispatch({ type: "SET_NEW_PASSWORD", payload: e.target.value });
  };

  const handleEmailSubmit = () => {
    const { email } = state;
    axios
      .post("http://localhost:5001/studentCheckMail", { email })
      .then((response) => {
        return response.data.data;
      })
      .then((data) => {
        if (data) {
          dispatch({ type: "SET_EMAIL_VALID", payload: true });
          dispatch({ type: "SET_SHOW_PASSWORD_FIELD", payload: true });
          dispatch({type:"SET_ERROR",payload:''})
          dispatch({type:"SET_READ_ONLY_EMAIL",payload:true})
        } 
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({type:"SET_ERROR",payload:err.response.data.message})
      });
  };


  const handleResetPassword = () => {
    const { email,newPassword:password} = state;
    axios
      .post("http://localhost:5001/changePassword", { email ,password })
      .then((res)=>{
        console.log(res);  
      })
      .catch((err)=>{
        console.log(err.response.data);
        dispatch({type:"SET_ERROR",payload:err.response.data.message})
      })
  };

  return (
    <div className="studentForgetborder">
      <div className="studentForgetinput">
        <div className="studentForgethead">
          <h2>Forget Password</h2>
        </div>

        {
          state.error && <span className="alert alert-danger mb-2 d-block">{state.error}</span>
        }

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            value={state.email}
            onChange={handleEmailChange}
            readOnly={state.readOnlyEmail} 
          />
        </div>

        {!state.showPasswordField && (
          <div className="d-grid gap-2 col-6 mx-auto studentForgetbutton">
            <button className="btn btn-primary" onClick={handleEmailSubmit}>
              Enter
            </button>
          </div>
        )}

        {state.showPasswordField && (
          <>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                value={state.newPassword}
                onChange={handleNewPasswordChange}
              />
            </div>

            <div className="d-grid gap-2 col-6 mx-auto studentForgetbutton">
              <button
                className="btn btn-primary"
                onClick={handleResetPassword}
              >
                Confirm
              </button>
            </div>
          </>
        )}

        <div className="studentForgetlink">
          Create a new account <Link to="/StudentRegistration">Sign up</Link>
        </div>
      </div>
    </div>
  );
}


export default StudentForgetPassword;
