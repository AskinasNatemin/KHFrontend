import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "../../Styles/Books/BookDetails.css";
import { AiFillStar } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { CgDanger } from "react-icons/cg";

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [ratedUsers, setRatedUsers] = useState();
  const navigate = useNavigate();
  const bookLocation = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookRes = await axios.post(`http://localhost:5001/getBook/${id}`);
        setBook(bookRes.data.data);
        console.log("bbb", id);

        const ratedRes = await axios.post(
          `http://localhost:5001/ratedUsers/${id}`
        );
        setRatedUsers([ratedRes.data.data[0].totalUsers] || "");
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const handleOnClose = () => {
    if (bookLocation.state === "admin book") {
      return navigate("/ViewBooks");
    }
    navigate(-1, { replace: true });
  };

  const lentBook = (bookId) => {
    const userType = localStorage.getItem("user");
    const userId = localStorage.getItem("userId");
    axios
      .post("http://localhost:5001/lentedBook", { bookId, userId, userType })
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 1000,
          theme: "colored",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message || "Error lending book", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      });
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="singleModalOverlay">
      <div className="singleModalContainer">
        <div className="singleModalGoBack">
          <button className="singleCloseBtn" onClick={handleOnClose}>
            <IoClose />
          </button>
        </div>

        <div className="singleModalContent">
          <img
            src={`http://localhost:5001/${book.imagePath}`}
            alt={book.bookName}
            className="singleBookImage"
          />

          <div className="singleBookDetails">
            <h2>{book.bookName}</h2>
            <h6>
              <b>Author :</b>
              <span className="singleBookAuthorName"> {book.authorName}</span>
            </h6>
            <p className="singleBookDescription">
              <b>Description : </b>
              {book.description}
            </p>

            <div className="singleBookRatings">
              {[...Array(5)].map((_, i) => (
                <AiFillStar
                  key={i}
                  style={{
                    color: i < Number(book.ratings) ? "gold" : "#ccc",
                    fontSize: "1.6rem",
                    marginRight: "4px",
                  }}
                />
              ))}
              {ratedUsers && ` /  ${ ratedUsers}`}
            </div>

            {book.borrowed === "true" || book.borrowed === true ? (
              <button className="singleModalUnavailable">
                <CgDanger /> The book is already lented
              </button>
            ) : (
              <Link
                rel="noopener noreferrer"
                className="singleViewBookBtn text-decoration-none"
                onClick={() => lentBook(book._id)}
              >
                Lent Book
              </Link>
            )}

            {/* Display number of ratings */}
            {ratedUsers && (
              <p className="text-muted mt-2">Rated by {ratedUsers} user(s)</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
