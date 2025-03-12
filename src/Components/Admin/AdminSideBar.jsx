import React, { useState } from 'react'
import "../../Styles/Admin/AdminSideBar.css"
import img1 from "../../Assets/images/AdminImage/adimin-sidebar-logo.jpg"

import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { FiMenu } from "react-icons/fi";  // Mobile Menu Icon
import { IoClose } from "react-icons/io5";
import { ImBooks } from "react-icons/im";

function AdminSideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IoClose /> : <FiMenu />}
      </button>

      <div className={`admin-sidebar-background ${isOpen ? "open" : ""}`}>
        <img className='image-fluid admin-sidebar-logo' src={img1} alt="Admin Sidebar Logo" />
        <h3 className='admin-sidebar-h3'>Admin</h3>

        <ul className="admin-sidebar-ul">
          <li className="admin-sidebar-ul-li">
            <a className="admin-sidebar-ul-li-a" href="#">
              <PiStudentFill className='sidebar-icon' /> VIEW STUDENTS
            </a>
          </li>
          <li className="admin-sidebar-ul-li">
            <a className="admin-sidebar-ul-li-a" href="#">
              <FaChalkboardTeacher className='sidebar-icon' /> VIEW STAFF
            </a>
          </li>
          <li className="admin-sidebar-ul-li">
            <a className="admin-sidebar-ul-li-a" href="#">
              <SiBookstack className='sidebar-icon' /> VIEW BOOKS
            </a>
          </li>
          <li className="admin-sidebar-ul-li">
            <a className="admin-sidebar-ul-li-a" href="#">
              <ImBooks className='sidebar-icon' /> ADD BOOKS
            </a>
          </li>
        </ul>

        <div className='admin-logout-btn-div'>
          <button className="admin-logout-btn">
            <div className="admin-logout-sign">
              <svg viewBox="0 0 512 512"><path d="..."></path></svg>
            </div>
            <div className="logout-text">Logout</div>
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminSideBar