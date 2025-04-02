import React, { useEffect, useState } from "react";
import "../../Styles/LentedBook/LentedBook.css";
import axios from "axios";
import FlipBook from "./FlipBook";
import NoBookFallBack from "./NoBookFallBack";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LentedBook = () => {
  const [lentedBook, setLentedBook] = useState();
  const [isFlipMode, setIsFlipMode] = useState(false);
  const navigate = useNavigate();

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

  const handleFlipMode = () => {
    setIsFlipMode(!isFlipMode);
  };

  const returnBook = (bookId) => {
    const ratings = '';
    if (ratings) return; 
    axios
      .post("http://localhost:5001/returnBook", { userId, bookId })
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

        navigate("/Books");
      })
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
          <img
            src={`http://localhost:5001/${lentedBook?.imagePath}`}
            alt={lentedBook?.bookName}
            className="LentedBookImage "
          />
          <div className="LentedBookDetails">
            <h2 className="LentedBookTitle">{lentedBook?.bookName}</h2>
            <p className="LentedBookAuthor">Author: {lentedBook?.authorName}</p>
            <p className="LentedBookDescription">{lentedBook?.description}</p>

            <div className="LentedButtonContainer ">
              <button
                className="LentedBookReadMoreButton"
                onClick={handleFlipMode}
              >
                Read Book
              </button>

              <button
                className=" LentedBookReturnButton px-3 py-2 rounded rounded-3 ms-5"
                onClick={() => {
                  returnBook(lentedBook?._id);
                }}
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
      {!lentedBook && (
        <>
          <NoBookFallBack />
        </>
      )}
    </>
  );
};

export default LentedBook;
