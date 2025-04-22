import React, { useEffect, useState } from "react";
import "../../Styles/Admin/ViewStaffs.css";
import { motion } from "framer-motion";
import axios from "axios";

function ViewStaffs() {
  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState({});

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategoryForModal, setSelectedCategoryForModal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [messageData, setMessageData] = useState(null);
  const [favoritesData, setFavoritesData] = useState(null);
  const [lendBookData, setLendBookData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/getAllUsers`)
      .then((res) => {
        setStaffs(res.data);
      })
      .catch((err) => {
        console.log(err, "error occured");
      });
  }, []);

  const handleDetailsClick = async (staff) => {
    let userId = staff._id;

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
        const res = await axios.post(
          "http://localhost:5001/staffFavouriteBooks",
          {
            userId: staff._id,
          }
        );
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
        } else {
        }
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      }
    }

    if (category === "message") {
      try {
        const res = await axios.get(
          `http://localhost:5001/getStaffMessage/${staff._id}`
        );
        setMessageData(res.data); // reuse same state for message info
        console.log("Fetched message:", res.data);
      } catch (err) {
        console.error("Failed to fetch message:", err);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCategoryForModal("");
    setSelectedStaff(null);
    setFavoritesData(null);
    setLendBookData(null);
    setMessageData(null);
    setSelectedCategories((prev) => {
      const updated = { ...prev };
      if (selectedStaff?._id) {
        delete updated[selectedStaff._id];
      }
      return updated;
    });
  };

  const filteredBooks = staffs.filter(
    (staff) =>
      staff.staffname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(staff.contact)?.includes(searchQuery) ||
      staff.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const rowVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-topbar">
        <div className="admin-viewstaff-h4-search-div">
          <h4 className="admin-viewstaff-topbar-h4">VIEW STAFFS</h4>
          <form class="admin-viewstaff-form">
            <input
              class="form-control me-2 admin-viewstaff-search"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </div>

      <motion.div
        className=" admin-viewstaff-table-container mt-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <table class="table table-light table-striped  admin-viewstaff-table-main">
          <thead className="admin-viewstaff-thead">
            <tr>
              <th className="admin-viewstaff-th" scope="col">
                S.NO
              </th>
              <th scope="col">NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">PHONE NUMBER</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="admin-viewstaff-tbody">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((staff, i) => (
                <motion.tr
                  className="admin-viewStudent-tr"
                  key={staff._id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  <th scope="row">{i + 1}</th>
                  <td className="admin-viewstaff-td">{staff.staffname}</td>
                  <td>{staff.email}</td>
                  <td>{staff.contact}</td>
                  <td>
                    <div className="admin-viewstaff-category-and-btn-div">
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
                        <option value="" disabled>
                          Select Field
                        </option>
                        <option value="favorites">Favorites</option>
                        <option value="lend-details">Lend Details</option>
                        <option value="message">Message</option>
                      </select>
                      <button
                        onClick={() => handleDetailsClick(staff)}
                        className="admin-viewstaff-details-btn"
                      >
                        DETAILS
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
      {showModal && selectedStaff && (
        <div className="admin-viewStaff-modal-overlay">
          <div className="admin-viewStaff-modal-content">
            <div className="admin-viewStaff-modal-header">
              <h3 className="text-center">
                {selectedCategories[selectedStaff._id].toUpperCase()} FOR{" "}
                {selectedStaff?.staffname.toUpperCase()}
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
                      <motion.div
                        key={book._id}
                        className="admin-viewStaff-favorite-book-card"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        <img
                          src={`http://localhost:5001/${book.imagePath}`}
                          alt={book.bookName}
                          className="admin-viewStaff-book-image"
                        />
                        <div className="admin-viewStaff-book-info">
                          <p className="admin-viewStaff-card-p1">
                            <strong className="admin-viewStaff-card-strong">
                              <span className="admin-viewStaff-span">
                                BOOK NAME :{" "}
                              </span>{" "}
                              {book.bookName}
                            </strong>
                          </p>
                          <p className="admin-viewStaff-card-p2">
                            <span className="admin-viewStaff-span">
                              AUTHOR NAME :{" "}
                            </span>
                            {book.authorName}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p>No favorite books found.</p>
                  )}
                </div>
              )}
              {selectedCategoryForModal === "lend-details" && lendBookData ? (
                <div className="container mt-4">
                  <div className="card shadow-sm">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={`http://localhost:5001/${lendBookData.imagePath}`}
                          alt={lendBookData.bookName}
                          className="img-fluid rounded-start h-100 object-fit-cover"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title fw-bold">
                            {lendBookData.bookName}
                          </h5>
                          <p className="card-text text-muted mb-1">
                            <strong>Author:</strong> {lendBookData.authorName}
                          </p>
                          <p className="card-text text-muted mb-1">
                            <strong>Category:</strong> {lendBookData.category}
                          </p>
                          <p className="card-text">
                            <strong>Description:</strong>{" "}
                            {lendBookData.description}
                          </p>
                          <p className="card-text text-warning">
                            <strong>Ratings:</strong> {lendBookData.ratings} ⭐
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                selectedCategoryForModal === "lend-details" &&
                !lendBookData && (
                  <p className="text-center text-danger fw-semibold mt-3">
                    No book found
                  </p>
                )
              )}
              {selectedCategoryForModal === "message" &&
                (messageData && messageData.length > 0 ? (
                  messageData.map((msg, index) => (
                    <div
                      key={msg._id || index}
                      className="admin-viewStudents-message-card"
                    >
                      <div className="admin-viewStudents-msg-card-content">
                        <p className="admin-viewStudents-msg-p">
                          <strong className="admin-viewStudents-msg-strong">
                            Name:
                          </strong>{" "}
                          {msg.userName}
                        </p>
                        <p className="admin-viewStudents-msg-p">
                          <strong className="admin-viewStudents-msg-strong">
                            Email:
                          </strong>{" "}
                          {msg.userEmail}
                        </p>
                        <p className="admin-viewStudents-msg-p">
                          <strong className="admin-viewStudents-msg-strong">
                            Subject:
                          </strong>{" "}
                          {msg.userSubject}
                        </p>
                        <p className="admin-viewStudents-msg-p">
                          <strong className="admin-viewStudents-msg-strong">
                            Message:
                          </strong>{" "}
                          {msg.userMessage}
                        </p>
                      </div>
                      <hr className="admin-viewStudents-msg-hr" />
                    </div>
                  ))
                ) : selectedCategoryForModal === "message" &&  (
                  <p>No messages found</p>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewStaffs;
