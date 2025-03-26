import React, { useState } from "react";
import Navbar from "./Navbar";
import "../Styles/HomePage.css";
import "../Styles/SelectUserModel.css";
import readingMan from "../Assets/images/homePageImages/readingMan.png";
import { TbXboxX } from "react-icons/tb";
import student from "../Assets/icon/SelectIcons/student.png";
import staff from "../Assets/icon/SelectIcons/staff.png";
import admin from "../Assets/icon/SelectIcons/admin.png";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [openUserSelectionModel, setOpenUserSelectionModel] = useState(false);
  const [selectionData] = useState([
    { userType: "Student", image: student },
    { userType: "Staff", image: staff },
    { userType: "Admin",image: admin },
  ]);

  const navigate = useNavigate();  
  const handleRegistration = (type) => {
    setOpenUserSelectionModel(true);
  };

  return (
    <div
      className="container-fluid d-flex flex-column homeContainer"
      style={{ minHeight: "100vh" }}
    >
      <Navbar handleRegistration={handleRegistration} />

      <div className="container row mx-auto flex-fill homeContent d-flex flex-column-reverse flex-md-row">
        <div className="col-sm-12 col-md-6 d-flex flex-column justify-content-center my-2 rounded homeContent ">
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
        <div className="selectUserContainer ">
          <div className="selectUser">
            <div className="d-flex">
              <span
                className="ms-auto goBackIcon"
                onClick={() => {
                  setOpenUserSelectionModel(false);
                }}
              >
                <TbXboxX className="goBackIcon" />
              </span>
            </div>

            <div className="row  d-flex justify-content-center m-5">
              {selectionData.map((user, i) => {
                    return (
                      <div className="col-md-6 col-sm-12 col-lg-4 d-flex justify-content-center">
                        <div className="card userCard m-2" key={i}>
                          <img
                            src={user.image}
                            className="card-img-top rounded-circle"
                            alt={user.userType}
                          />
                          <div className="card-body d-flex justify-content-center">
                            <button
                              type="button"
                              className="btn btn-outline-success"
                              onClick={
                                user.userType === "Admin"
                                  ? () => {
                                      navigate("/AdminLogin");
                                    }
                                  : user.userType === "Staff"
                                  ? () => {
                                      navigate("/StaffLogin");
                                    }
                                  : user.userType === "Student"
                                  ? () => {
                                      navigate("/StudentLogin");
                                    }
                                  : ""
                              }
                            >
                              {user.userType}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
