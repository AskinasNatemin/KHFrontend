import React, { useState } from "react";
import "../../Styles/Admin/AdminSideBar.css";
import img1 from "../../Assets/images/AdminImage/adimin-sidebar-logo.jpg";

import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { ImBooks } from "react-icons/im";
import { useNavigate, Link } from "react-router-dom";

function AdminSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/", { replace: true });
  };

  return (
    <div className="admin-sidebar-background col-2">
      <img
        className="image-fluid admin-sidebar-logo"
        src={img1}
        alt="Admin Sidebar Logo"
      />
      <h3 className="admin-sidebar-h3">Admin</h3>

      <ul className="admin-sidebar-ul">
        <li className="admin-sidebar-ul-li">
          <div className="admin-sidebar-icon-and-content-div">
            <Link to="/ViewStaffs">
              <FaChalkboardTeacher className="sidebar-icon" />
            </Link>
            <Link className="admin-sidebar-ul-li-a" to="/ViewStaffs">
              VIEW STAFF
            </Link>
          </div>
        </li>

        <li className="admin-sidebar-ul-li">
          <div className="admin-sidebar-icon-and-content-div">
            <Link to="/ViewStudents">
              <PiStudentFill className="sidebar-icon" />
            </Link>
            <Link className="admin-sidebar-ul-li-a" to="/ViewStudents">
              VIEW STUDENTS
            </Link>
          </div>
        </li>

        <li className="admin-sidebar-ul-li">
          <div className="admin-sidebar-icon-and-content-div">
            <Link to="/ViewBooks">
              <SiBookstack className="sidebar-icon" />
            </Link>
            <Link className="admin-sidebar-ul-li-a" to="/ViewBooks">
              VIEW BOOKS
            </Link>
          </div>
        </li>

        <li className="admin-sidebar-ul-li">
          <div className="admin-sidebar-icon-and-content-div">
            <Link to="/AddingBooks">
              <ImBooks className="sidebar-icon" />
            </Link>
            <Link className="admin-sidebar-ul-li-a" to="/AddingBooks">
              ADD BOOKS
            </Link>
          </div>
        </li>
      </ul>

      {/* Logout Button */}
      <div onClick={handleLogout}>
        <div className="admin-logout-btn-div">
          <button className="admin-logout-btn">
            <div className="admin-logout-sign">
              <svg viewBox="0 0 512 512">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
              </svg>
            </div>
            <div>
              <div className="admin-logout-text"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminSideBar;
