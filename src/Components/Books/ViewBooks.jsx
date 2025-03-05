import "../../Styles/ViewBooks.css";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar.jsx";
import axios from "axios";

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
  const[data,setData]=useState([])

  useEffect(() => {
    axios.get('http://localhost:5001/Books')
    .then((res)=>{
      // console.log(res.data.data);
      
      setData(res.data.data)
    })
    .catch((err)=>{
      console.log(err); 
    })
  }, []);
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
      <>
  {data.map((el, index) => {
    console.log(el);
    return (
      <img 
        key={index}
        src={el.bookImage} 
        className="border border-5 p-5"
        alt="Book"
        onError={(e) => console.error("Image Load Error:", e.target.src)}
      />
    );
  })}
</>


    </div>
  );
};

export default ViewBooks;
