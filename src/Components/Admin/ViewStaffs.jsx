
import React, { useEffect, useState } from 'react'
import "../../Styles/Admin/ViewStaffs.css"
import axios from 'axios';



function ViewStaffs() {

  const [staffs, setStaffs] = useState([])
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedCategoryForModal, setSelectedCategoryForModal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [favoritesData, setFavoritesData] = useState(null);
  const [lendBookData,setLendBookData]=useState(null)


  useEffect(() => {
    axios.get(`http://localhost:5001/getAllUsers`)
      .then((res) => {
        setStaffs(res.data)
      })
      .catch((err) => {
        console.log(err, "error occured");
      })
  }, [])


  const handleDetailsClick = async (staff) => {
    let userId=staff._id

    const category = selectedCategories[staff._id];
    if (!category) {
      alert("Please select a category first");
      return;
    }

    setSelectedStaff(staff);
    setSelectedCategoryForModal(category);
    setShowModal(true);

    if (category === "favorites") {
      try {
        const res = await axios.post("http://localhost:5001/staffFavouriteBooks", {
          userId: staff._id,
        });
        setFavoritesData(res.data.favouriteBooks);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      }
    }

    if (category === "lend-details") {
      try {
        const res = await axios.post(
          `http://localhost:5001/lentedBook/${userId}`
        );
        let id = res?.data.book[0].bookId;
        if (id) {
          const bookRes = await axios.post(
            `http://localhost:5001/getBook/${id}`
          );
          setLendBookData(bookRes.data.data);
        }else{

        }
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCategoryForModal("");
    setSelectedStaff(null);
    setFavoritesData(null);
    setLendBookData(null)
    setSelectedCategories((prev) => {
      const updated = { ...prev };
      if (selectedStaff?._id) {
        delete updated[selectedStaff._id];
      }
      return updated;
    });
  };

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
                    <select
                      value={selectedCategories[staff._id] || ""}
                      onChange={(e) =>
                        setSelectedCategories((prev) => ({
                          ...prev,
                          [staff._id]: e.target.value,
                        }))
                      }
                      required
                      className="mr-2 admin-viewstaff-select"
                    >
                      <option value="" disabled>Select Field</option>
                      <option value="favorites">Favorites</option>
                      <option value="lend-details">Lend Details</option>
                      <option value="message">Message</option>
                    </select>
                    <button
                      onClick={() => handleDetailsClick(staff)}
                      className="admin-viewstaff-details-btn">DETAILS</button>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      {showModal && selectedStaff && (
        <div className="admin-viewStaff-modal-overlay">
          <div className="admin-viewStaff-modal-content">
            <div className="admin-viewStaff-modal-header">
              <h3 className='text-center'>
                {selectedCategories[selectedStaff._id].toUpperCase()} FOR {selectedStaff?.staffname.toUpperCase()}
              </h3>
              <button
                onClick={closeModal}
                className="admin-viewStaff-modal-close-btn"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>            
            <div className="admin-viewStaff-modal-body">
              {selectedCategoryForModal === "favorites" && (
                <div className="admin-viewStaff-favorites-container">
                  {favoritesData && favoritesData.length > 0 ? (
                    favoritesData.map((book) => (
                      <div key={book._id} className="admin-viewStaff-favorite-book-card">
                        <img
                          src={`http://localhost:5001/${book.imagePath}`}
                          alt={book.bookName}
                          className="admin-viewStaff-book-image"
                        />
                        <div className="admin-viewStaff-book-info">
                          <p className="admin-viewStaff-card-p1">
                            <strong className="admin-viewStaff-card-strong"><span className='admin-viewStaff-span'>BOOK NAME : </span> {book.bookName}</strong>
                          </p>
                          <p className="admin-viewStaff-card-p2"><span className='admin-viewStaff-span'>AUTHOR NAME : </span>{book.authorName}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No favorite books found.</p>
                  )}
                </div>
              )}
              {selectedCategories === "lend-details" && lendBookData ? (
                <p>Show lend details here...</p>
              ):<p>no book found</p>}
              {selectedCategories === "message" && (
                <p>Show message info here...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>

  )
}

export default ViewStaffs