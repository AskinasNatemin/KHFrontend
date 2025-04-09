import React, { useEffect, useState } from 'react';
import "../../Styles/Admin/ViewStudents.css";
import axios from 'axios'

function ViewStudents() {

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [favoritesData, setFavoritesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectCategory = (category, i) => {
    setSelectedCategory((prev) => {
      return [...prev, { [i]: category  }]
    })
  }

  const handleDetails = (i) => {
    console.log(i);
    

  }

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

  useEffect(() => {
    if (showModal && selectedCategory === "favorites" && selectedStudent) {
      setLoading(true);
      setError(null);
      setFavoritesData(null);

      axios.post(`http://localhost:5001/getAllUserFavouriteBooks`, {
        userId: selectedStudent._id,
      })
        .then((res) => {
          setFavoritesData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching favorite books:", err);
          setError("Failed to load favorite books.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [showModal, selectedCategory, selectedStudent]);

  return (
    <div>
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-topbar">
          <h4 className="admin-dashboard-topbar-h4">ALL STUDENTS LIST</h4>
        </div>
      </div>

      <div className=' admin-viewStudent-table-container mt-4'>
        <table class="table table-light table-striped  admin-viewStudent-table-main">
          <thead className='admin-viewStudent-thead'>
            <tr>
              <th className='admin-viewStudent-th' scope="col">S.NO</th>
              <th scope="col">NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">PHONE NUMBER</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody className='admin-viewStudent-tbody'>
            {students.map((student, i) => (
              <tr className='admin-viewStudent-tr' key={student._id}>
                <th scope="row">{i + 1}</th>
                <td className='admin-viewStudent-td'>{student.studentName}</td>
                <td>{student.email}</td>
                <td>{student.contact}</td>
                <td>
                  <div className='admin-viewStudent-category-and-btn-div'>
                    <select id="infoType" name="infoType" className="mr-2  admin-viewStudent-select"
                      onChange={(e) => selectCategory(e.target.value, i)}
                      defaultValue=""
                      required>
                      <option value="" disabled selected>Select Field</option>
                      <option value="favorites">Favorites</option>
                      <option value="lend-details">Lend Details</option>
                      <option value="message">Message</option>
                    </select>
                    <button
                      onClick={
                        () => handleDetails(i)
                      }
                      className="admin-viewStudent-details-btn">DETAILS</button>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      {showModal && selectedStudent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{selectedCategory.toUpperCase()} for {selectedStudent.studentName.toUpperCase()}</h3>
            <div className="modal-body">
              {selectedCategory === "favorites" && (
                <div>
                  {loading && <p>Loading...</p>}
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  {!loading && !error && favoritesData && favoritesData.length > 0 && (
                    <ul>
                      {favoritesData.map((book, index) => (
                        <li key={index}>{book.title}</li>
                      ))}
                    </ul>
                  )}
                  {!loading && !error && favoritesData && favoritesData.length === 0 && (
                    <p>No favorite books found.</p>
                  )}
                </div>
              )}
              {selectedCategory === "lend-details" && (
                <p>Show lend details here...</p>
              )}
              {selectedCategory === "message" && (
                <p>Show message info here...</p>
              )}
            </div>

            <button onClick={() => {
              setShowModal(false)
              setSelectedCategory('')
            }} type="button" class="btn btn-danger">CLOSE</button>
          </div>
        </div>
      )}
    </div>

  )
}

export default ViewStudents