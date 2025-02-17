import React from "react";
import "../../Styles/Admin/AdminDashboard.css";
import { Link } from "react-router-dom";
import { RiHomeOfficeLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAddToPhotos } from "react-icons/md";
import logo from'../../Assets/icon/logo.png'
import { FaSignOutAlt } from "react-icons/fa";

function AdminDashboard() {
  return (
    <div className="AdminDashboard">
      {/* Sidebar */}
      <div className="AdminDashboardsidebar">
        <h3 className="Admindashboardname">
          <RiHomeOfficeLine /> Dashboard
        </h3>
        <ul>
          <Link style={{ textDecoration: "none" }}>
            <li>
              <CgProfile />
              Profile
            </li>
          </Link>
          <Link to={"/AdminAddingBooks"} style={{ textDecoration: "none" }}>
            <li style={{ wordSpacing: "5px" }}>
              <MdOutlineAddToPhotos />
              Addbooks
            </li>
          </Link>
        </ul>
      </div>

      {/* Main Content */}
      <div className="AdminDashboardMainContent">
        {/* Navbar */}
        <div className="AdminDashboardnavbar">
          <h2 className="Knowledgename"><img className="knowledgehublogo" src={logo} alt="" />Knowledge Hub</h2>
          
          <button className="lbut">
          <FaSignOutAlt className="logouticon" />
          </button>
        </div>

        {/* Piechart Rows */}
        <div className="row">
          <div className="piechartcolumn">
            <h4 className="columnheading">Users</h4>
            <div class="scroll-container">
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
                <li>Item 4</li>
                <li>Item 5</li>
                <li>Item 6</li> 
                <li>Item 7</li>
                <li>Item 8</li>
                <li>Item 9</li>
                <li>Item 10</li>
                <li>Item 11</li>
                <li>Item 12</li>
                <li>Item 13</li>
                <li>Item 14</li>
                <li>Item 15</li>
              </ul>
            </div>
          </div>
          <div className="piechartcolumn">
            <h4 className="columnheading">Lented Books</h4>
            <div class="scroll-container">
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
                <li>Item 4</li>
                <li>Item 5</li>
                <li>Item 6</li>
                <li>Item 7</li>
                <li>Item 8</li>
                <li>Item 9</li>
                <li>Item 10</li>
                <li>Item 11</li>
                <li>Item 12</li>
                <li>Item 13</li>
                <li>Item 14</li>
                <li>Item 15</li>
              </ul>
            </div>
          </div>
          <div className="piechartcolumn">
            <h4 className="columnheading">Added Books</h4>
            <div class="scroll-container">
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
                <li>Item 4</li>
                <li>Item 5</li>
                <li>Item 6</li>
                <li>Item 7</li>
                <li>Item 8</li>
                <li>Item 9</li>
                <li>Item 10</li>
                <li>Item 11</li>
                <li>Item 12</li>
                <li>Item 13</li>
                <li>Item 14</li>
                <li>Item 15</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
