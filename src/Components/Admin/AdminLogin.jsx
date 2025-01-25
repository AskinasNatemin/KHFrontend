import React from "react";
import "../../Styles/AdminLogin.css";
export const AdminLogin = () => {
  return (
  <div className='loginbackground'>
      <form>
        <div className='loginpage'>
          <h2 className='adminlogin'>Admin Login</h2>
          <div className='adminusername'>
           <input type="text"  placeholder='Username'/>
          </div>
          <div className='adminemail'>
            <input type="email" placeholder='Email'   />
          </div>
          <div className='adminpassword'>
            <input type="password" placeholder='Password'   />
          </div>
          <div className='adminbut'>
            <button type='button' className="btn btn-primary" >Login</button>
          </div>
          



        </div>
      </form>
    </div>)
};export default AdminLogin;
