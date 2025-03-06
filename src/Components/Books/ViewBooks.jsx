import "../../Styles/ViewBooks.css";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar.jsx";
import axios from "axios";
import StudentBooks from "./StudentBooks.jsx";
import StaffBooks from "./StaffBooks.jsx";



const ViewBooks = () => {
  const[data,setData]=useState([])

  useEffect(() => {
    axios.get('http://localhost:5001/Books')
    .then((res)=>{
      setData(res.data.data)
    })
    .catch((err)=>{
      console.log(err); 
    })
  }, []);

  const [activeTab, setActiveTab] = useState("studentBooks");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs-container container">
      <Navbar />
      <div className="tabs">
        <div
          className={`tab ${activeTab === "studentBooks" ? "active" : ""}`}
          onClick={() => handleTabClick("studentBooks")}
        >
          Student Books
        </div>
        <div
          className={`tab ${activeTab === "staffBooks" ? "active" : ""}`}
          onClick={() => handleTabClick("staffBooks")}
        >
          Staff Books
        </div>
      </div>

      {/* Content Section */}
      <div className="tab-content">
        {activeTab === "studentBooks" ? (
          <StudentBooks/>
        ) : (
          <StaffBooks/>
        )}
      </div>
      <>
  {data.map((el, index) => {
    console.log(el);
    return (
      <img 
        key={index}
        src={el.bookImage} 
        className="border border-5 p-5"
        alt="Book"
        onError={(e) => console.error("Image Load Error:", e.target.src)}
      />
    );
  })}
</>


    </div>
  );
};

export default ViewBooks;
