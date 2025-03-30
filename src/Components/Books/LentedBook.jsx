import React, { useEffect, useState } from "react";
import "../../Styles/LentedBook/LentedBook.css";
import axios from "axios";
import FlipBook from "./FlipBook";
import NoBookFallBack from "./NoBookFallBack";

const LentedBook = () => {
  const [lentedBook, setLentedBook] = useState();
  const [isFlipMode, setIsFlipMode] = useState(false);

  const getLentedBook = (id) => {
    axios
      .post(`http://localhost:5001/getBook/${id}`)
      .then((res) => {
        setLentedBook(res.data.data);
        console.log(res.data.data);
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

  const returnBook=()=>{
    
  }

  return (
    <>
      {lentedBook && !isFlipMode && (
        <div className="LentedBookContainer">
          <img
            src={`http://localhost:5001/${lentedBook?.imagePath}`}
            alt={lentedBook?.bookName}
            className="LentedBookImage"
          />
          <div className="LentedBookDetails">
            <h2 className="LentedBookTitle">{lentedBook?.bookName}</h2>
            <p className="LentedBookAuthor">Author: {lentedBook?.authorName}</p>
            <p className="LentedBookDescription">{lentedBook?.description}</p>

            <div className="LentedButtonContainer border">
              <button
                className="LentedBookReadMoreButton"
                onClick={handleFlipMode}
              >
                Read Book
              </button>

              <button
                className="px-3 py-2 rounded rounded-3 ms-5" /* onClick={()=>{returnBook()}} */
              >
                Return
              </button>
            </div>
          </div>

          {isFlipMode && <FlipBook handleFlipMode={handleFlipMode} pdfUrl="/path-to-your-book.pdf" />}
        </div>
      )}
      {!lentedBook && <>
      <NoBookFallBack/>
      </>}
    </>
  );
};

export default LentedBook;
