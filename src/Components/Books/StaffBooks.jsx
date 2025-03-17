import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "../../Styles/Books/StaffBook.css";
import { useNavigate } from "react-router-dom";
import { favouriteBooksList } from "../Context/AppContext";
import { GoHeartFill } from "react-icons/go";
import { CiHeart } from "react-icons/ci";

const StaffBooks = () => {
  const [data, setData] = useState([]);
  const { favouriteBooks, setFavouriteBooks } = useContext(favouriteBooksList);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("user");

  const handleFetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5001/getAllBooks");
      setData(res.data.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const getAllUserFavouriteBooks = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5001/getAllUserFavouriteBooks",
        {
          userId,
          userType,
        }
      );

      // Extract only book IDs
      const favBookIds = res.data.favouriteBooks.map((book) => book._id) || [];
      setFavouriteBooks(favBookIds); // Store only book IDs
    } catch (err) {
      console.error("Error fetching favourite books:", err);
    }
  };

  const toggleFavorite = async (bookId) => {
    try {
      const isFavourite = favouriteBooks.includes(bookId);

      const res = await axios.post(
        "http://localhost:5001/addUserFavouriteBooks",
        {
          userId,
          bookId,
          userType,
          action: isFavourite ? "remove" : "add",
        }
      );

      if (res.status === 200) {
        setFavouriteBooks((prev) => {
          const updatedFavourites = isFavourite
            ? prev.filter((id) => id !== bookId)
            : [...prev, bookId];
          return [...updatedFavourites];
        });
      }
    } catch (err) {
      console.error("Error updating favorite books:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleFetchBooks();
      await getAllUserFavouriteBooks();
    };

    fetchData();
  }, []);

  return (
    <div className="staffBooksSection ps-2">
      <h2>Staff Books</h2>
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
                    className="staffFavIconBtn"
                    onClick={() => toggleFavorite(book._id)}
                  >
                    {!favouriteBooks.includes(book._id) && (
                      <CiHeart
                        className={`staffFavIcon ${
                          favouriteBooks.includes(book._id) ? "active" : ""
                        }`}
                      />
                    )}
                    {favouriteBooks.includes(book._id) && (
                      <GoHeartFill
                        className={`staffFavIcon ${
                          favouriteBooks.includes(book._id) ? "active" : ""
                        }`}
                      />
                    )}
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
