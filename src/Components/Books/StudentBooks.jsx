import axios from "axios";
import { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import '../../Styles/Books/StudentBook.css';
import { useNavigate } from "react-router-dom";

const StudentBooks = () => {
  const [data, setData] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState({});
  const navigate=useNavigate()

  const handleFetchBooks = () => {
    axios
      .get("http://localhost:5001/getAllBooks")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleFetchBooks();
  }, []);

  const toggleFavorite = (bookId) => {
    setFavoriteBooks((prevState) => ({
      ...prevState,
      [bookId]: !prevState[bookId], 
    }));
  };

  return (
    <div className="books-section ps-2">
      <h2>Student Books</h2>
      <div className="books-list">
        {data.map((book) => (
          <>
            {book?.category === "Student" && (
              <div
                className="book-card border d-flex flex-column"
                key={book._id}
                style={{ transition: "transform 0.3s ease", cursor: "pointer" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={`http://localhost:5001/${book.imagePath}`}
                  alt={book.category}
                />
                <h3 className="bookName">{book.bookName}</h3>
                <div className="card-body d-flex align-items-center justify-content-between">
                  <button className="view-book-btn" onClick={()=>navigate(`/Book/${book._id}`)}>View Details</button>
                  <button
                    className={`fav-icon-btn ${
                      favoriteBooks[book._id] ? "active" : ""
                    }`}
                    onClick={() => toggleFavorite(book._id)}
                  >
                    <MdFavorite className="fav-icon" />
                  </button>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default StudentBooks;
