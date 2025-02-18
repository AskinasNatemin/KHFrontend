import React from "react";
import "../../Styles/Admin/AdminDashboard.css";
import { Link } from "react-router-dom";
import { RiHomeOfficeLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAddToPhotos } from "react-icons/md";
import logo from "../../Assets/icon/logo.png";
import { FaSignOutAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { GiBookshelf } from "react-icons/gi";
import { SiBookstack } from "react-icons/si";

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
          <h2 className="Knowledgename">
            <img className="knowledgehublogo" src={logo} alt="" />
            Knowledge Hub
          </h2>

          <button className="lbut">
            Logout
            <FaSignOutAlt className="logouticon" />
          </button>
        </div>
        <div className="dashrow">
          <div className="dashcard">
            <div className="dashcard-body">
              <FaUsers className="cardusericon" />
              <div>
                <button className="dashcarduserbut">Users</button>
              </div>
            </div>
          </div>
          <div className="dashcard">
            <div className="dashcard-body">
              <GiBookshelf className="dashcardlendedbooksicon" />
              <div>
                <button className="dashcardlentbookbut">Lended Books</button>
              </div>
            </div>
          </div>
          <div className="dashcard">
            <div className="dashcard-body">
              <SiBookstack className="dashcardaddbooksicon" />
              <div>
                <button className="dashcardaddbookbut">added Books</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
