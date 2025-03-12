import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import "../../Styles/Books/StudentBook.css";
import { useNavigate } from "react-router-dom";
import { favouriteBooksList } from "../Context/AppContext";

const StudentBooks = () => {
  const [bookData, setBookData] = useState([]);
  const { favouriteBooks, setFavouriteBooks } = useContext(favouriteBooksList);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("user");

  // Fetch all books
  const handleFetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5001/getAllBooks");
      setBookData(res.data.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  // Fetch all favorite books of the user
  const getAllUserFavouriteBooks = async () => {
    try {
      const res = await axios.post("http://localhost:5001/getAllUserFavouriteBooks", {
        userId,
        userType,
      });
  
      // Extract only book IDs
      const favBookIds = res.data.favouriteBooks.map(book => book._id) || [];
      
      console.log("Fetched Favourite Book IDs:", favBookIds);
      
      setFavouriteBooks(favBookIds); // Store only book IDs
      setLoading(false);
    } catch (err) {
      console.error("Error fetching favourite books:", err);
      setLoading(false);
    }
  };
  
  // Handle Favorite Toggle
  const toggleFavorite = async (bookId) => {
    try {
      const isFavourite = favouriteBooks.includes(bookId);

      const res = await axios.post("http://localhost:5001/addUserFavouriteBooks", {
        userId,
        bookId,
        userType,
        action: isFavourite ? "remove" : "add",
      });

      if (res.status === 200) {
        setFavouriteBooks((prev) => {
          const updatedFavourites = isFavourite
            ? prev.filter((id) => id !== bookId)
            : [...prev, bookId];

          console.log("Updated Favourite Books:", updatedFavourites);
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

  useEffect(() => {
    console.log("Updated favouriteBooks state:", favouriteBooks);
  }, [favouriteBooks]);

  return (
    <div className="studentBooksSection ps-2">
      <h2>Student Books</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="studentBooksList">
          {bookData.map((book) =>
            book?.category === "Student" && (
              <div
                className="studentBookCard border d-flex flex-column"
                key={book._id}
                style={{ transition: "transform 0.3s ease", cursor: "pointer" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")}>
                
                <img src={`http://localhost:5001/${book.imagePath}`} alt={book.category} />
                <h3 className="studentBookName">{book.bookName}</h3>
                <div className="studentCardBody d-flex align-items-center justify-content-between">
                  <button
                    className="studentViewBookBtn"
                    onClick={() => navigate(`/Book/${book._id}`)}
                  >
                    View Details
                  </button>
                  <span className="studentFavIconBtn" onClick={() => toggleFavorite(book._id)}>
                    <MdFavorite
                      className={`studentFavIcon ${
                        favouriteBooks.includes(book._id) ? "active" : ""
                      }`}
                    />
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default StudentBooks;
