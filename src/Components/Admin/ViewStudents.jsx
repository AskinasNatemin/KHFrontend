import React, { useEffect, useState } from 'react'
import "../../Styles/Admin/ViewStudents.css"
import axios from 'axios'

function ViewStudents() {

  const [students, setStudents] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:5001/getAllStudents`)
      .then((res) => {
        console.log(res);
        setStudents(res.data)
      })
      .catch((err) => {
        console.log(err, "error occured");
      })
  }, [])

  return (
    <div>
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-topbar">
          <h4 className="admin-dashboard-topbar-h4">ALL STUDENTS LIST</h4>
        </div>
      </div>
      <div className='admin-viewStudents-table-div mt-4 '>
        <table class="table table-bordered admin-viewStudents-table">
          <thead>
            <tr>
              <th scope="col">S.NO</th>
              <th scope="col">NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">CONTACT</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) => (
              <tr key={student._id}>
                <th className='admin-viewStudents-td' scope="row">{i + 1}</th>
                <td className='admin-viewStudents-td'>{student.studentName}</td>
                <td className='admin-viewStudents-td'>{student.email}</td>
                <td className='admin-viewStudents-td'>{student.contact}</td>
                <td><button type="button" class="btn btn-primary btn-sm admin-viewStudents-detail-btn">Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  )
}

export default ViewStudents