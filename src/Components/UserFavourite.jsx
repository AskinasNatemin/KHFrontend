import axios from "axios";
import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import "../Styles/favouriteStyles.css";
import { MdDeleteForever } from "react-icons/md";

const UserFavourite = () => {
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("user");
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const navigate=useNavigate();

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

  const removeFavouriteBook=(bookId)=>{
    console.log(userId,bookId);
    
  }

  useEffect(() => {
    getAllUserFavouriteBooks();
  }, []);

  return (
    <div className="favouriteContainer container" style={{ height: "100vh" }}>
      <h2 className="favouriteTitle">FAVOURITE BOOKS</h2>
      {favouriteBooks.length ? (
        <div className="favouriteGrid">
          {favouriteBooks.map((book, index) => (
            <div className="favouriteCard" key={index}>
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
                  <div className="border">
                    <h5 className="favouriteBookName">{book.bookName}</h5>
                    <p className="favouriteBookAuthor">
                      Author: <b>{book.authorName}</b>
                    </p>
                    <button className="UserFavBookBtn" type="button" onClick={()=>{navigate(`/Book/${book._id}`)}}>ViewDetails</button>
                    <MdDeleteForever className="delFavourite text-danger ms-auto" onClick={()=>{removeFavouriteBook(book)}}/>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="container d-flex justify-content-center align-items-center h-75"  
        >
          <div
            className="border rounded p-4 text-center bg-light shadow-lg"
            style={{ maxWidth: "400px" }}
          >
            <p className="text-danger fw-bold fs-5 mb-2">No Favorites Yet!</p>
            <p className="text-secondary">
              Start adding your favorite books to see them here.
            </p>
            
            <button className="btn btn-primary mt-3" onClick={()=>navigate('/Books')}>
              Back to Books
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFavourite;
