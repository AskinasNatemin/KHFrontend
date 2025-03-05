import React from 'react';
import "../../Styles/Admin/AdminDashBackground.css";
import { AdminDashSidebar } from './AdminDashSidebar';
import { AdminMiddleContent } from './AdminMiddleContent';

function AdminDashBackground() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar - Fixed size on large screens, full width on smaller screens */}
        <div className="col-lg-3 col-12">
          <AdminDashSidebar />
        </div>

        {/* Main Content - Takes full width on small screens, flexes on larger screens */}
        <div className="col-lg-9 col-12">
          <div className="admin-main-content">
            <AdminMiddleContent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashBackground;
