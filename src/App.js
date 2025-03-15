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
import AdminAddingBooks from "./Components/Admin/AdminAddingBooks";
import StudentRegistration from "./Components/Student/StudentRegistration";
import StaffForgetPassword from "./Components/Staff/StaffForgetPassword";
import StudentForgetPassword from "./Components/Student/StudentForgetPassword";
import StaffCodePage from "./Components/Staff/StaffCodePage";
import UsersData from "./Components/Users/UsersData";
import Book from "./Components/Books/Book";
import UserFavourite from "./Components/UserFavourite";
import LoginFirst from "./Components/LoginFirst";
import AdminSideBar from "./Components/Admin/AdminSideBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NoPageFound />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/" element={<HomePage />} />
          <Route path="StaffRegistration" element={<StaffRegistration />} />
          <Route path="AdminLogin" element={<AdminLogin />} />
          <Route path="StudentRegistration" element={<StudentRegistration />} />
          <Route path="StaffLogin" element={<StaffLogin />} />
          <Route path="StudentLogin" element={<StudentLogin />} />
          <Route path="Books" element={<ViewBooks />}/>
          <Route path="AdminAddingBooks" element={<AdminAddingBooks />} />
          <Route path="StaffForgetPassword" element={<StaffForgetPassword />} />
          <Route path="StudentForgetPassword" element={<StudentForgetPassword />}/>
          <Route path="StaffCodepage" element={<StaffCodePage />} />
          <Route path="UsersData" element={<UsersData />} />
          <Route path="AdminDashSidebar" element={<AdminSideBar />} />
          <Route path="Book/:id" element={<Book/>}/>
          <Route path="UserFavouriteBooks" element={<UserFavourite/>}/>
          <Route path="AccessDenied" element={<LoginFirst/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
