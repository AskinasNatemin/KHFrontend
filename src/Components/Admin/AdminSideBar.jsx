import React, { useState } from 'react'
import "../../Styles/Admin/AdminSideBar.css"
import img1 from "../../Assets/images/AdminImage/adimin-sidebar-logo.jpg"

import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { FiMenu } from "react-icons/fi";  // Mobile Menu Icon
import { IoClose } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import { Link } from 'react-router-dom';

function AdminSideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IoClose /> : <FiMenu />}
      </button>

      <div className={`admin-sidebar-background col-2  ${isOpen ? "open" : ""}`}>
        <img className='image-fluid admin-sidebar-logo' src={img1} alt="Admin Sidebar Logo" />
        <h3 className='admin-sidebar-h3'>Admin</h3>

        <ul className="admin-sidebar-ul">
          <li className="admin-sidebar-ul-li">
            <div className='admin-sidebar-icon-and-content-div'>
              <a href="ViewStaffs"> <FaChalkboardTeacher className='sidebar-icon' /></a>
              <a className="admin-sidebar-ul-li-a" href="ViewStaffs">
                VIEW STAFF
              </a>
            </div>
          </li>
          <li className="admin-sidebar-ul-li">
            <div className='admin-sidebar-icon-and-content-div'>
              <a href='ViewStudents'><PiStudentFill className='sidebar-icon' /></a>
              <a className="admin-sidebar-ul-li-a" href="ViewStudents">
                VIEW STUDENTS
              </a>
            </div>
          </li>

          <li className="admin-sidebar-ul-li">
            <div className='admin-sidebar-icon-and-content-div'>
              <a href='ViewBooks'><SiBookstack className='sidebar-icon' /></a>
              <a className="admin-sidebar-ul-li-a" href="ViewBooks">
                VIEW BOOKS
              </a>
            </div>
          </li>
          <li className="admin-sidebar-ul-li">
            <div className='admin-sidebar-icon-and-content-div'>
              <a href='AddingBooks'><ImBooks className='sidebar-icon' /></a>
              <a className="admin-sidebar-ul-li-a" href="AddingBooks">
                ADD BOOKS
              </a>
            </div>
          </li>
        </ul>
        <Link to="/">
          <div className='admin-logout-btn-div'>
            <button class="admin-logout-btn">
              <div class="admin-logout-sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
              <div><div class="admin-logout-text"></div></div>
            </button>
          </div>
        </Link>
      </div>
    </>
  );
}

export default AdminSideBar