import { Link } from "react-router-dom";
import"../../Styles/Admin/AdminMiddleContent.css"
import React from 'react'
import { FaUsers } from "react-icons/fa6";
import { GiBookshelf } from "react-icons/gi";
import { SiBookstack } from "react-icons/si";
export { default as AdminMiddleContent } from './AdminMiddleContent';
function AdminMiddleContent() {
  return (
    <div>      {/* Main Content */}
    <div className="AdminDashboardMainContent">
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

export default AdminMiddleContent