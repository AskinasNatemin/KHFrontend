import React, { useEffect, useState } from "react";
import "../../Styles/LentedBook/LentedBook.css";
import axios from "axios";
import FlipBook from "./FlipBook";
import NoBookFallBack from "./NoBookFallBack";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Ratings from "../Ratings";
import { IoClose } from "react-icons/io5";

const LentedBook = () => {
  const [lentedBook, setLentedBook] = useState();
  const [isFlipMode, setIsFlipMode] = useState(false);
  const [showRating, setShowRating] = useState(false); 
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .post(`http://localhost:5001/lentedBook/${userId}`)
      .then((res) => {
        getLentedBook(res.data.book[0].bookId);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const getLentedBook = (id) => {
    axios
      .post(`http://localhost:5001/getBook/${id}`)
      .then((res) => {
        setLentedBook(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFlipMode = () => {
    setIsFlipMode(!isFlipMode);
  };

  const handleReturnClick = () => {
    setShowRating(true);
  };

  const handleRate = (rating) => {
    setShowRating(false); 
    axios
      .post("http://localhost:5001/returnBook", { userId, bookId: lentedBook?._id, rating })
      .then((res) => {
        toast.warn(res.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        return axios.post("http://localhost:5001/bookRating", {
          bookId: lentedBook?._id,
          rating,
        });
      })
      .then(()=>navigate('/Books',{replace:true}))
      .catch((err) => {
        console.log(err);
        toast.error("Failed to return book. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      });
  };

  return (
    <>
      {lentedBook && !isFlipMode && (
        <div className="LentedBookContainer">
          <div className="LentedBookGoBack">
            <button
              className="LentedBookCloseBtn "
              onClick={() => navigate(-1)}
            >
              <IoClose />
            </button>
          </div>
          <img
            src={`http://localhost:5001/${lentedBook?.imagePath}`}
            alt={lentedBook?.bookName}
            className="LentedBookImage"
          />
          <div className="LentedBookDetails">
            <h2 className="LentedBookTitle">{lentedBook?.bookName}</h2>
            <p className="LentedBookAuthor">
              <b>Author</b>: {lentedBook?.authorName}
            </p>
            <p className="LentedBookDescription">{lentedBook?.description}</p>

            <div className="LentedButtonContainer">
              <button className="LentedBookReadMoreButton" onClick={handleFlipMode}>
                Read Book
              </button>

              <button
                className="LentedBookReturnButton px-3 py-2 rounded rounded-3 ms-5"
                onClick={handleReturnClick} // Show Ratings first
              >
                Return
              </button>
            </div>
          </div>
        </div>
      )}

      {isFlipMode && (
        <FlipBook
          handleFlipMode={handleFlipMode}
          pdfUrl={`http://localhost:5001/${lentedBook?.filePath}`}
        />
      )}

      {!lentedBook && <NoBookFallBack />}

      {showRating && (
        <Ratings
          initialRating={0}
          onRate={handleRate} // Call returnBook API after rating
          onClose={() => setShowRating(false)}
        />
      )}
    </>
  );
};

export default LentedBook;
