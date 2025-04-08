import React, { useContext, useEffect } from "react";
import AdminSideBar from "./AdminSideBar";
import ViewStaffs from "./ViewStaffs";
import ViewStudents from "./ViewStudents";
import ViewBooks from "./ViewBooks";
import AdminAddingBooks from "./AdminAddingBooks";
// import AdminDashboardTopbar from "./AdminDashboardTopbar";
import { Logged } from "../Context/AppContext";

function AdminMaindash({ data }) {
  const userId = localStorage.getItem("adminId");
  const { setIsLogged } = useContext(Logged);

  useEffect(() => {
    if (userId) {
      setIsLogged(true);
    }
  }, [userId]);

  const renderContent = () => {
    switch (data) {
      case "ViewStaffs":
        return <ViewStaffs />;
      case "ViewStudents":
        return <ViewStudents />;
      case "ViewBooks":
        return <ViewBooks />;
      case "AddingBooks":
        return <AdminAddingBooks />;
      default:
        return <p className="p-4">Please select a section from the sidebar.</p>;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-2 p-3 bg-light" style={{ minHeight: "100vh" }}>
          <AdminSideBar />
        </div>

        {/* Main Content */}
        <div className="col-10" style={{ height: "100vh", overflowY: "auto" }}>
          {/* <AdminDashboardTopbar /> */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminMaindash;
