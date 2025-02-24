import "../../Styles/ViewBooks.css";
import React, { useState } from "react";
import Navbar from "../Navbar.jsx";

const booksData = {
  studentBooks: [
    {
      id: 1,
      title: "Student Book Title 1",
      description: "Book description or details about the book.",
      image: "student-book1.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Student Book Title 2",
      description: "Book description or details about the book.",
      image: "student-book2.jpg",
      link: "#",
    },
  ],
  staffBooks: [
    {
      id: 1,
      title: "Staff Book Title 1",
      description: "Book description or details about the book.",
      image: "staff-book1.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Staff Book Title 2",
      description: "Book description or details about the book.",
      image: "staff-book2.jpg",
      link: "#",
    },
  ],
};

const ViewBooks = () => {
  const [activeTab, setActiveTab] = useState("studentBooks");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs-container container">
      <Navbar />
      <div className="tabs">
        <div
          className={`tab ${activeTab === "studentBooks" ? "active" : ""}`}
          onClick={() => handleTabClick("studentBooks")}
        >
          Student Books
        </div>
        <div
          className={`tab ${activeTab === "staffBooks" ? "active" : ""}`}
          onClick={() => handleTabClick("staffBooks")}
        >
          Staff Books
        </div>
      </div>

      {/* Content Section */}
      <div className="tab-content">
        {activeTab === "studentBooks" ? (
          <div className="books-section">
            <h2>Student Books</h2>
            <div className="books-list">
              {booksData.studentBooks.map((book) => (
                <div className="book-card" key={book.id}>
                  <img src={book.image} alt={book.title} />
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                  <a href={book.link} className="book-link">
                    View Book
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="books-section">
            <h2>Staff Books</h2>
            <div className="books-list">
              {booksData.staffBooks.map((book) => (
                <div className="book-card" key={book.id}>
                  <img src={book.image} alt={book.title} />
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                  <a href={book.link} className="book-link">
                    View Book
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBooks;
