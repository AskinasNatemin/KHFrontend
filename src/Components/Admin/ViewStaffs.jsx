
import React, { useEffect, useState } from 'react'
import "../../Styles/Admin/ViewStaffs.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';



function ViewStaffs() {

  const [staffs, setStaffs] = useState([])
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5001/getAllUsers`)
      .then((res) => {
        console.log(res);
        setStaffs(res.data)
      })
      .catch((err) => {
        console.log(err, "error occured");
      })
  }, [])

  

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-topbar">
        <div className="admin-view-book-h4-search-div">
          <h4 className="admin-view-book-topbar-h4">VIEW STAFFS</h4>
        </div>
      </div>

      <div className=' admin-viewstaff-table-container mt-4'>
        <table class="table table-light table-striped  admin-viewstaff-table-main">
          <thead className='admin-viewstaff-thead'>
            <tr>
              <th className='admin-viewstaff-th' scope="col">S.NO</th>
              <th scope="col">NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">PHONE NUMBER</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody className='admin-viewstaff-tbody'>
            {staffs.map((staff, i) => (
              <tr className='admin-viewstaff-tr' key={staff._id}>
                <th scope="row">{i + 1}</th>
                <td className='admin-viewstaff-td'>{staff.staffname}</td>
                <td>{staff.email}</td>
                <td>{staff.contact}</td>
                <td>
                  <div className='admin-viewstaff-category-and-btn-div'>
                    <select id="infoType" name="infoType" className="mr-2  admin-viewstaff-select"
                     onChange={(e) => setSelectedCategory(e.target.value)}
                      defaultValue=""
                    required>
                      <option value="" disabled selected>Select Field</option>
                      <option value="favorites">Favorites</option>
                      <option value="lend-details">Lend Details</option>
                      <option value="message">Message</option>
                    </select>
                    <button 
                     onClick={() => {
                      if (selectedCategory !== "") {
                        setSelectedStaff(staff);
                        setShowModal(true);
                      } else {
                        alert("Please select a category first");
                      }
                    }}
                    className="admin-viewstaff-details-btn">DETAILS</button>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      {showModal && selectedStaff && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>{selectedCategory.toUpperCase()} for {selectedStaff.staffname}</h3>
      <div className="modal-body">
        {selectedCategory === "favorites" && (
          <p>Show favorites info here...</p>
        )}
        {selectedCategory === "lend-details" && (
          <p>Show lend details here...</p>
        )}
        {selectedCategory === "message" && (
          <p>Show message info here...</p>
        )}
      </div>
      <button onClick={() => setShowModal(false)} type="button" class="btn btn-danger">CLOSE</button>
      </div>
  </div>
)}
    </div>

  )
}

export default ViewStaffs