import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../Styles/Books/BookDetails.css";
import { AiFillStar, AiOutlineClose } from "react-icons/ai";

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`http://localhost:5001/getBook/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setBook(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleOnClose = () => {
    navigate("/Books", { replace: true });
  };

  const lentBook=()=>{
    alert('Are you sure you need to lent book')
  }

  if (!book) return <p>Loading...</p>;

  return (
    <div className="singleModalOverlay">
      <div className="singleModalContainer">
        <button className="singleCloseBtn p-2" onClick={handleOnClose}>
          <AiOutlineClose />
        </button>

        <div className="singleModalContent">
          <img
            src={`http://localhost:5001/${book.imagePath}`}
            alt={book.bookName}
            className="singleBookImage"
          />
           
          <div className="singleBookDetails">
            <h2>{book.bookName}</h2>
            <h6><b>Author : </b>{book.authorName}</h6>
            <p className="singleBookDescription"><b>Description : </b>{book.description}</p>

            <div className="singleBookRatings">
              {[...Array(5)].map((_, i) => (
                <AiFillStar
                  key={i}
                  className={i < book.rating ? "singleActive" : ""}
                />
              ))}
            </div>

            <Link
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="singleViewBookBtn"
              onClick={lentBook}
            >
              Lent Book
            </Link >
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
