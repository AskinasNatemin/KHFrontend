import React, { useState } from "react";
import Navbar from "./Navbar";
import "../Styles/HomePage.css";
import "../Styles/SelectUserModel.css";
import reader from "../Assets/images/homePageImages/cartoonBookReader.jpg";
import readingMan from "../Assets/images/homePageImages/readingMan.png";

const HomePage = () => {
  const [openUserSelectionModel, setOpenUserSelectionModel] = useState(false);
  const [logOrSignUp, setLogOrSignUp] = useState();

  const handleRegistration = (type) => {
    setLogOrSignUp(type);
    setOpenUserSelectionModel(true);
  };

  console.log(logOrSignUp);
  return (
    <div
      className="container-fluid d-flex flex-column homeContainer"
      style={{ minHeight: "100vh" }}
    >
      <Navbar handleRegistration={handleRegistration} />

      <div className="container row mx-auto flex-fill homeContent d-flex flex-column-reverse flex-md-row">
        <div className="col-sm-12 col-md-6 d-flex flex-column justify-content-center my-2 rounded homeContent">
          <h3 className="ms-3 mb-4">KNOWLEDGE HUB</h3>
          <p className="w-75 ms-3">
            Welcome to <b>KNOWLEDGE HUB</b>, your gateway to a world of
            knowledge and discovery. Our mission is to provide a welcoming space
            where the community can access a rich collection of books, digital
            resources, and educational programs. 
          </p>
        </div>

        <div className="col-sm-12 col-md-6 m-auto">
          <div className="quote ms-3 text-wrap w-75">
            The only thing that you absolutely have to know is the location of
            the library.
          </div>
          <p className="authorName fw-bold">-Albert Einstein</p>
          <img
            src={readingMan}
            alt="readerImg"
            className="mx-auto d-block  img-fluid w-75"
          />
        </div>
      </div>

      {openUserSelectionModel && (
        <div className="selectUserContainer">
          <div className="selectUser border">
            <div className="d-flex border">
              <span
                className="ms-auto border"
                onClick={() => {
                  setOpenUserSelectionModel(false);
                  setLogOrSignUp("");
                }}
              >
                ❌
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
