import React, { useEffect, useState } from "react";
import "../../Styles/Admin/ViewStudents.css";
import { motion } from "framer-motion"
import axios from "axios";

function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategories, setSelectedCategories] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [favoritesData, setFavoritesData] = useState(null);
  const [messageData, setMessageData] = useState(null);
  const [selectedCategoryForModal, setSelectedCategoryForModal] = useState("");
  const [lendBookData, setLendBookData] = useState(null);

  const selectCategory = (category, studentId) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [studentId]: category,
    }));
  };


  useEffect(() => {
    axios
      .get(`http://localhost:5001/getAllStudents`)
      .then((res) => {
        console.log(res);
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err, "error occured");
      });
  }, []);

  const handleDetailsClick = async (student) => {
    let userId = student._id;
    const category = selectedCategories[student._id];
    if (!category) {
      alert("Please select a category first");
      return;
    }

    setSelectedStudent(student);
    setSelectedCategoryForModal(category);
    setShowModal(true);

    if (category === "favorites") {
      try {
        const res = await axios.post(
          "http://localhost:5001/studentFavouriteBooks",
          {
            userId: student._id,
          }
        );
        setFavoritesData(res.data.favouriteBooks);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      }
    }

    if (category === "message") {
      try {
        const res = await axios.get(`http://localhost:5001/getStudentMessage/${student._id}`);
        setMessageData(res.data); // reuse same state for message info
        console.log("Fetched message:", res.data);
      } catch (err) {
        console.error("Failed to fetch message:", err);
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
          return
        }
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCategoryForModal("");
    setSelectedStudent(null);
    setFavoritesData(null);
    setMessageData(null);
    setLendBookData(null);
    setSelectedCategories((prev) => {
      const updated = { ...prev };
      if (selectedStudent?._id) {
        delete updated[selectedStudent._id];
      }
      return updated;
    });
  };

  const filteredBooks = students.filter(
    (student) =>
      student.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(student.contact)?.includes(searchQuery) ||
      student.email?.toLowerCase().includes(searchQuery.toLowerCase())

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
    <div>
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-topbar">
          <div className="admin-viewStudent-h4-search-div">
            <h4 className="admin-viewStudent-topbar-h4">VIEW STUDENTS</h4>
            <form class="admin-viewStudent-form">
              <input
                class="form-control me-2 admin-viewStudent-search"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>

      <motion.div className=' admin-viewStudent-table-container mt-4'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <table class="table table-light table-striped  admin-viewStudent-table-main">
          <thead className="admin-viewStudent-thead">
            <tr>
              <th className="admin-viewStudent-th" scope="col">
                S.NO
              </th>
              <th scope="col">NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">PHONE NUMBER</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody className='admin-viewStudent-tbody'>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((student, i) => (
                <motion.tr
                  className="admin-viewStudent-tr"
                  key={student._id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  <th scope="row">{i + 1}</th>
                  <td className="admin-viewStudent-td">{student.studentName}</td>
                  <td>{student.email}</td>
                  <td>{student.contact}</td>
                  <td>
                    <div className="admin-viewStudent-category-and-btn-div">
                      <select
                        onChange={(e) => selectCategory(e.target.value, student._id)}
                        value={selectedCategories[student._id] || ""}
                        className="mr-2 admin-viewStudent-select"
                      >
                        <option value="" disabled>Select Field</option>
                        <option value="favorites">Favorites</option>
                        <option value="lend-details">Lend Details</option>
                        <option value="message">Message</option>
                      </select>
                      <button
                        onClick={() => handleDetailsClick(student)}
                        className="admin-viewStudent-details-btn"
                      >
                        DETAILS
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>

      </motion.div>
      {showModal && selectedStudent && (
        <div className="admin-viewStudents-modal-overlay">
          <div className="admin-viewStudents-modal-content">
            <div className="admin-viewStudents-modal-header">
              <h3 className="text-center">
                {selectedCategories[selectedStudent._id].toUpperCase()} FOR{" "}
                {selectedStudent?.studentName.toUpperCase()}
              </h3>
              <button
                onClick={closeModal}
                className="admin-viewStudents-modal-close-btn"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
            <div className="admin-viewStudents-modal-body">
              {selectedCategoryForModal === "favorites" && (
                <div className="admin-viewStudents-favorites-container">
                  {favoritesData && favoritesData.length > 0 ? (
                    favoritesData.map((book) => (
                      <motion.div key={book._id} className="admin-viewStudents-favorite-book-card"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: .8, ease: "easeOut" }}
                      >
                        <img
                          src={`http://localhost:5001/${book.imagePath}`}
                          alt={book.bookName}
                          className="admin-viewStudents-book-image"
                        />
                        <div className="admin-viewStudents-book-info">
                          <p className="admin-viewStudents-card-p1">
                            <strong className="admin-viewStudents-card-strong">
                              <span className="admin-viewStaff-span">
                                BOOK NAME :{" "}
                              </span>{" "}
                              {book.bookName}
                            </strong>
                          </p>
                          <p className="admin-viewStudents-card-p2">
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
              
              {selectedCategoryForModal === "lend-details" && (
                lendBookData ? (
                  <p>Show lend details here...</p>
                ) : (
                  <p>No lend details found.</p>
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
                ) : (
                  <p>No messages found</p>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewStudents;
