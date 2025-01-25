import axios from "axios"
import React, { useEffect, useState } from "react";
import "../../Styles/StaffReg.css";
import { useNavigate } from "react-router-dom";
function StaffRegistration() {
  const navigate = useNavigate();
  const[state,setState]=useState({
  Name:"",
  Email:"",
  Contact:'',
  Password:'',
  });

  const change=(e)=>{
    setState({...state,[e.target.name]:e.target.value});
    console.log(state);
    
    
  };
  const addData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5001/staffRegistration",
        state
      );
      console.log("Response:", res.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Form Data:", state);
    addData();
  };

  return (
    <div >
      <form onSubmit={handleSubmit}>
      <div className="staffborder">
        <span className="">
          <div className="staffinput">
            <div className="staffhead">
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
                value={state.Name}
                required
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
                value={state.Email}
                required
              />
            </div>
            <div className="mb-3">
              <input
                onChange={change}
                type="number"
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="Contact"
                name="Contact"
                value={state.Contact}
                required
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
                value={state.Password}
              />
            </div>
            <div className="d-grid gap-2 col-6 mx-auto staffbutton">
              <button className="btn btn-primary" type="Submit" onClick={()=>navigate('/',{replace:true})}>
                CREATE ACCOUNT
              </button>
            </div>
            <div className="stafflink" >
              Already have an account? <a href="">Sign in</a>
            </div>
          </div>
        </span>
      </div>
      </form>
    </div>
  );
}

export default StaffRegistration;
