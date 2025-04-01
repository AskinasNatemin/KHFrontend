import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../Styles/Admin/ViewBooks.css";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AdminEditBook from "./AdminEditBook";

function ViewBooks() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const booksview = () => {
    axios
      .get("http://localhost:5001/getAllBooks")
      .then((res) => {
        setBooks(res.data.data);
      })
      .catch((err) => {
        console.log("error updating books ", err);
      });
  };

  const deleteBook = (id) => {
    const confirm =window.confirm("Are you sure that you need to delete this book");
    console.log(confirm);
    
    if (confirm) {
      axios
        .delete(`http://localhost:5001/deleteBook/${id}`)
        .then((res) => {
          console.log("Book deleted successfully:", res.data);
          booksview();
        })
        .catch((err) => {
          console.error("Error deleting book:", err);
        });
    }
  };

  useEffect(() => {
    booksview();
  }, [books]);

  useEffect(() => {
    console.log("Selected Book Updated:", selectedBook);
  }, [selectedBook]);

  const handleEdit = (book) => {
    setSelectedBook(book);
  };

  const handleUpdate = (updatedBook) => {
    console.log("Updating book:", updatedBook);
    booksview(); // Refresh book list after update
    setSelectedBook(null); // Close modal after update
  };

  return (
    <>
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-topbar">
          <div className="admin-view-book-h4-search-div">
            <h4 className="admin-view-book-topbar-h4">VIEW BOOKS</h4>
            <form class="admin-view-book-form">
              <input
                class="form-control me-2 admin-view-book-search"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
        </div>

        <div className="row viewBooks-card-row">
          {books.map((book) => {
            return (
              <div className="admin-viewbooks-card-box">
                <div className="column-1 col-12 col-sm-12 col-lg-4 col-md-4">
                  <div>
                    <img
                      className="image-fluid admin-viewbook-img"
                      src={`http://localhost:5001/${book.imagePath}`}
                      alt="#"
                    />
                  </div>
                  <div className="admin-viewbook-author-book-div">
                    <p>
                      <strong className="admin-viewbook-strong">
                        AUTHOR :
                      </strong>{" "}
                      {book.authorName}
                    </p>
                    <p>
                      {" "}
                      <strong className="admin-viewbook-strong">
                        {" "}
                        BOOK :
                      </strong>{" "}
                      {book.bookName}{" "}
                    </p>
                    <button
                      className="admin-viewbook-button"
                      onClick={() =>
                        navigate(`/Book/${book._id}`, { state: "admin book" })
                      }
                    >
                      READ BOOK
                    </button>
                  </div>
                </div>
                <div className="column-2 col-12 col-sm-12 col-lg-8 col-md-8">
                  <div className="admin-viewbook-p3-div">
                    <p>
                      {" "}
                      <strong className="admin-viewbook-strong">
                        DESCRIPTION :
                      </strong>{" "}
                      {book.description}
                    </p>
                  </div>
                  <div className="admin-viewbook-edit-delete-div">
                    <button
                      className="admin-viewbook-edit-btn"
                      onClick={() => handleEdit(book)}
                    >
                      <CiEdit />
                    </button>
                    <button
                      className="admin-viewbook-delete-btn"
                      onClick={() => {
                        deleteBook(book._id);
                      }}
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedBook && (
        <AdminEditBook
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}

export default ViewBooks;
