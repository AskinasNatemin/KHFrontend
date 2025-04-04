
import React, { useEffect, useState } from 'react'
import "../../Styles/Admin/ViewStaffs.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';



function ViewStaffs() {

  const [staffs, setStaffs] = useState([])

  useEffect(()=>{
     axios.get(`http://localhost:5001/staffRegistration`)
    .then((res) => {
      console.log(res);
      setStaffs(res.data)
    })
    .catch((err) => {
      console.log(err,"error occured");
    })
  },[])

 
  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-topbar">
        <div className="admin-view-book-h4-search-div">
          <h4 className="admin-view-book-topbar-h4">VIEW BOOKS</h4>
        </div>
      </div>

      <div className=' admin-viewstaff-table-container mt-4'>
        <table class="table table-light table-striped  admin-viewstaff-table-main">
          <thead>
            <tr>
              <th scope="col">S.NO</th>
              <th scope="col">NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">PHONE NUMBER</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
          {staffs.map((staff,i) => {
            
              <tr key={staff._id}>
                <th scope="row">{i+1}</th>
                <td>{staff.staffname}</td>
                <td>{staff.email}</td>
                <td>{staff.contact}</td>
                <td>
                  <button className="edit-btn">DETAILS</button>
                </td>
              </tr>
            
          })}
          </tbody>
        </table>

      </div>
    </div>

  )
}

export default ViewStaffs