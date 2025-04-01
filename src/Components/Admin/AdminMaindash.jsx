import React from 'react'
import AdminLogin from './AdminLogin'
import AdminSideBar from './AdminSideBar'
import ViewStaffs from './ViewStaffs'
import ViewStudents from './ViewStudents'
import ViewBooks from './ViewBooks'
import AdminAddingBooks from './AdminAddingBooks'
import AdminDashboardTopbar from './AdminDashboardTopbar'

function AdminMaindash({data}) {
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className=" col-2 p-3 bg-light" style={{ minHeight: "100vh" }}>
          <AdminSideBar />
        </div>

        <div className="col-10 " style={{"height":"100vh"}}>
          {/* <AdminDashboardTopbar/> */}
          {data === "ViewStaffs" ? <ViewStaffs /> :
           data === "ViewStudents" ? <ViewStudents /> :
           data === "ViewBooks" ? <ViewBooks /> :
           data === "AddingBooks" ? <AdminAddingBooks /> :
           ""}
        </div>
      </div>
    </div>
  )
}

export default AdminMaindash