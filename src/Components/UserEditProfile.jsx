import React from 'react';
import '../Styles/UserEditProfile.css';
import { useNavigate } from "react-router-dom";


const UserEditProfile = () => {
    const navigate = useNavigate();
  
  return (
    <div className="edit-profile-container d-flex justify-content-center align-items-center">
      <div className="edit-profile-card p-4 rounded shadow">
        <div className="text-center mb-4">
          <img
            src="https://via.placeholder.com/100"
            className="rounded-circle profile-pic"
            alt="Profile"
          />
          <h5 className="mt-2 text-danger">Ahila K</h5>
        </div>

        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" placeholder="Enter name" />
          </div>

          <div className="mb-3">
            <label className="form-label">E-Mail</label>
            <input type="email" className="form-control" placeholder="Enter email" />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-control" placeholder="Enter phone number" />
          </div>

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-outline-danger" onClick={() => navigate("/",{replace:true})} >Cancel</button>
            <button type="submit" className="btn btn-danger">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditProfile;
