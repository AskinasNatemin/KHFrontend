import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/favouriteStyles.css";
import { LuTrash2 } from "react-icons/lu";
import { IoArrowBackCircle } from "react-icons/io5";

const UserFavourite = () => {
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("user");
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const navigate = useNavigate();

  const getAllUserFavouriteBooks = () => {
    axios
      .post("http://localhost:5001/getAllUserFavouriteBooks", {
        userId,
        userType,
      })
      .then((res) => {
        setFavouriteBooks(res.data.favouriteBooks || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFavouriteBook = (bookId) => {
    axios
      .post("http://localhost:5001/removeFavouriteBook", {
        userId,
        bookId,
        userType,
      })
      .then(() => {
        getAllUserFavouriteBooks();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllUserFavouriteBooks();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <div className="favouriteHeader border container">
        <div className=" flex-fill">
          <h2 className="favouriteTitle">FAVOURITE BOOKS</h2>
        </div>
        <div className="favouriteGoBackContainer">
          <IoArrowBackCircle
            onClick={() => navigate("/Books")}
            className="favouritbackicon"
          />
        </div>
      </div>
      <div className="favouriteContainer container" style={{ height: "85%" }}>
        {favouriteBooks.length ? (
          <div className="favouriteGrid">
            {favouriteBooks.map((book, index) => (
              <div className="favouriteCard" key={index}>
                <div className="delFavouriteContainer">
                  <LuTrash2
                    className="delFavouriteIcon"
                    onClick={() => {
                      removeFavouriteBook(book._id);
                    }}
                  />
                </div>
                <div className="favouriteBookDetails">
                  <div className="favouriteBookItem">
                    <img
                      src={
                        `http://localhost:5001/${book.imagePath}` ||
                        "https://via.placeholder.com/64"
                      }
                      alt="Book Cover"
                      className="favouriteBookImage"
                    />
                    <div className="favouriteBookBody">
                      <h5 className="favouriteBookName">{book.bookName}</h5>
                      <p className="favouriteBookAuthor">
                        Author: <b>{book.authorName}</b>
                      </p>
                      <div className="viewFavouriteDetails">
                        <button
                          className="ViewFavBookBtn"
                          type="button"
                          onClick={() => {
                            navigate(`/Book/${book._id}`);
                          }}
                        >
                          ViewDetails
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="backToBooksContainer ">
            <div
              className="backToBooksBox"
              style={{ maxWidth: "400px" }}
            >
              <h2 className="backToBooksTitle">No Favorites Yet!</h2>
              <p className="backToBooksMessage"> 
                Start adding your favorite books to see them here.
              </p>

              <button
                className="backToBooksButton"
                onClick={() => navigate("/Books")}
              >
                Back to Books
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFavourite;
