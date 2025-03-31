import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../Styles/Books/BookDetails.css";
import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import { LentedBook } from "../Context/AppContext";

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const bookLocation = useLocation();
  const { lentedBook, setLentedBook } = useContext(LentedBook);

  useEffect(() => {
    axios
      .post(`http://localhost:5001/getBook/${id}`)
      .then((res) => {
        setBook(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleOnClose = () => {
    if (bookLocation.state == "admin book") {
      return navigate("/ViewBooks");
    }
    navigate("/Books", { replace: true });
  };

  const lentBook = (bookId) => {
    const userType=localStorage.getItem('user')
    const userId=localStorage.getItem('userId')
    axios.post('http://localhost:5001/lentedBook',{bookId,userId,userType})
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);   
    })
  };

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
            <h6>
              <b>Author : </b>
              {book.authorName}
            </h6>
            <p className="singleBookDescription">
              <b>Description : </b>
              {book.description}
            </p>

            <div className="singleBookRatings">
              {[...Array(5)].map((_, i) => (
                <AiFillStar
                  key={i}
                  className={i < book.rating ? "singleActive" : ""}
                />
              ))}
            </div>

            <Link
              rel="noopener noreferrer"
              
              className="singleViewBookBtn text-decoration-none"
              onClick={() => lentBook(book._id)}
            >
              Lent Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
