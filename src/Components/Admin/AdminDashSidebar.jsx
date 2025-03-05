import "../../Styles/Admin/AdminDashSidebar.css";
import { Link } from "react-router-dom";
import { RiHomeOfficeLine } from "react-icons/ri";
import { MdOutlineAddToPhotos } from "react-icons/md"; 
import { IoMdHome } from "react-icons/io";
export { default as AdminDashSidebar } from './AdminDashSidebar';
function AdminDashSidebar() {
  return (
    <div className={"AdminDashboardsidebar-container"}>
      <div className="AdminDashboardsidebar">
        <h3 className="Admindashboardname">
          <RiHomeOfficeLine /> Dashboard
        </h3>
        <ul>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <li>
              <IoMdHome className="sidebaricon" />
              Home
            </li>
          </Link>
          <Link to={"/AdminAddingBooks"} style={{ textDecoration: "none" }}>
            <li style={{ wordSpacing: "5px" }}>
              <MdOutlineAddToPhotos className="sidebaricon" />
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
    </div>
  );
}

export default AdminDashSidebar;
