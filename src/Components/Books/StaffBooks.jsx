import axios from "axios";
import { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import "../../Styles/Books/StaffBook.css";
import { useNavigate } from "react-router-dom";

const StaffBooks = () => {
  const [data, setData] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState({});
  const navigate = useNavigate();

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

  console.log(favoriteBooks);

  return (
    <div className="staffBooksSection ps-2">
      <h2>STAFF BOOKS</h2>
      <div className="staffBooksList">
        {data.map((book) => (
          <>
            {book?.category === "Staff" && (
              <div
                className="staffBookCard border d-flex flex-column"
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
                <h3 className="staffBookName">{book.bookName}</h3>
                <div className="staffCardBody d-flex align-items-center justify-content-between">
                  <button
                    className="staffViewBookBtn"
                    onClick={() => navigate(`/Book/${book._id}`)}
                  >
                    View Details
                  </button>
                  <span
                    className={`staffFavIconBtn ${
                      favoriteBooks[book._id] ? "active" : ""
                    }`}
                    onClick={() => toggleFavorite(book._id)}
                  >
                    <MdFavorite className="staffFavIcon" />
                  </span>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default StaffBooks;
