import React from "react";
import "../../Styles/Admin/AdminDashboard.css";
import { Link } from "react-router-dom";
import { RiHomeOfficeLine } from "react-icons/ri";
import { MdOutlineAddToPhotos } from "react-icons/md"; 
import { FaUsers } from "react-icons/fa6";
import { GiBookshelf } from "react-icons/gi";
import { SiBookstack } from "react-icons/si";
import { IoMdHome } from "react-icons/io";

function AdminDashboard() {
  return (
    <div className="AdminDashboard">
      {/* Sidebar */}
      <div className="AdminDashboardsidebar">
        <h3 className="Admindashboardname">
          <RiHomeOfficeLine /> Dashboard
        </h3>
        <ul>
          <Link to={"/"} style={{ textDecoration:"none" }}>
            <li>
            <IoMdHome className="sidebaricon" />
              Home
            </li>
          </Link>
          <Link to={"/AdminAddingBooks"} style={{ textDecoration: "none" }}>
            <li style={{ wordSpacing: "5px" }}>
              <MdOutlineAddToPhotos className="sidebaricon"/>
              Addbooks
            </li>
          </Link>
         

        </ul>
         {/* Logout Button */}
         <div className="logout-btn-container">
          <Link to="/logout" style={{ textDecoration: "none" }}>
            <button className="logout-btn">Logout</button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="AdminDashboardMainContent">
        {/* Navbar */}
       
        <div className="dashrow">
          <div className="dashcard">
            <div className="dashcard-body">
              <FaUsers className="cardusericon" />
              <div>
                <Link to={"/UsersData"}>
                  <button className="dashcarduserbut">Users</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="dashcard">
            <div className="dashcard-body">
              <GiBookshelf className="dashcardlendedbooksicon"/>
              <div>
                <button className="dashcardlentbookbut">Lended</button>
              </div>
            </div>
          </div>
          <div className="dashcard">
            <div className="dashcard-body">
              <SiBookstack className="dashcardaddbooksicon" />
              <div>
                <button className="dashcardaddbookbut">added</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
