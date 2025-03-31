import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NoPageFound from "./Components/NoPageFound";
import HomePage from "./Components/HomePage";
import Navbar from "./Components/Navbar";
import StaffRegistration from "./Components/Staff/StaffRegistration";
import AdminLogin from "./Components/Admin/AdminLogin";
import StaffLogin from "./Components/Staff/StaffLogin";
import StudentLogin from "./Components/Student/StudentLogin";
import ViewBooks from "./Components/Books/ViewBooks";
import StudentRegistration from "./Components/Student/StudentRegistration";
import StaffForgetPassword from "./Components/Staff/StaffForgetPassword";
import StudentForgetPassword from "./Components/Student/StudentForgetPassword";
import StaffCodePage from "./Components/Staff/StaffCodePage";
import Book from "./Components/Books/Book";
import AdminDashboardTopbar from "./Components/Admin/AdminDashboardTopbar";
import AdminMaindash from "./Components/Admin/AdminMaindash";
import UserFavourite from "./Components/UserFavourite";
import LoginFirst from "./Components/LoginFirst"
import LentedBook from "../src/Components/Books/LentedBook";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NoPageFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="AdminDashboardTopbar" element={<AdminDashboardTopbar />} />
          <Route path="/AdminMainDash" element={<AdminMaindash/>} />
          <Route path="/ViewStaffs" element={<AdminMaindash data={"ViewStaffs"}/>} />
          <Route path="/ViewStudents" element={<AdminMaindash data={"ViewStudents"}/>} />
          <Route path="/ViewBooks" element={<AdminMaindash data={"ViewBooks"}/>} />
          <Route path="/AddingBooks" element={<AdminMaindash data={"AddingBooks"}/>} />
          <Route path="AdminLogin" element={<AdminLogin />} />
          <Route path="StaffRegistration" element={<StaffRegistration />} />
          <Route path="StudentRegistration" element={<StudentRegistration />} />
          <Route path="StaffLogin" element={<StaffLogin />} />
          <Route path="StudentLogin" element={<StudentLogin />} />
          <Route path="Books" element={<ViewBooks />}/>
          <Route path="StaffForgetPassword" element={<StaffForgetPassword />} />
          <Route path="StudentForgetPassword" element={<StudentForgetPassword />}/>
          <Route path="StaffCodepage" element={<StaffCodePage />} />
          <Route path="Book/:id" element={<Book/>}/>
          <Route path="UserFavouriteBooks" element={<UserFavourite/>}/>
          <Route path="LentedBook" element={<LentedBook/>}/>
          <Route path="AccessDenied" element={<LoginFirst/>}/>
        </Routes>
      </BrowserRouter>

    </div>

    
  );
}

export default App;
