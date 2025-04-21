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
import LoginFirst from "./Components/LoginFirst";
import LentedBook from "../src/Components/Books/LentedBook";
import { ToastContainer } from "react-toastify";
import Ratings from "./Components/Ratings";
import AdminEditBook from "./Components/Admin/AdminEditBook";
import FlipBook from "./Components/Books/FlipBook";
import ContactUs from "./Components/ContactUs";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import UserEditProfile from "./Components/UserEditProfile.jsx";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NoPageFound />} />
          <Route path="/" element={<HomePage />} />

          {/* 🔓 Public routes */}
          <Route path="Navbar" element={<Navbar />} />
          <Route path="AdminLogin" element={<AdminLogin />} />
          <Route path="StaffRegistration" element={<StaffRegistration />} />
          <Route path="StudentRegistration" element={<StudentRegistration />} />
          <Route path="StaffLogin" element={<StaffLogin />} />
          <Route path="StudentLogin" element={<StudentLogin />} />
          <Route path="StaffForgetPassword" element={<StaffForgetPassword />} />
          <Route
            path="StudentForgetPassword"
            element={<StudentForgetPassword />}
          />
          <Route path="StaffCodepage" element={<StaffCodePage />} />
          <Route path="AccessDenied" element={<LoginFirst />} />

          {/* 🔒 Protected routes */}
          <Route
            path="ContactUs"
            element={
              <ProtectedRoute>
                <ContactUs />
              </ProtectedRoute>
            }
          />
          <Route
            path="AdminMainDash"
            element={
              <ProtectedRoute>
                <AdminMaindash />
              </ProtectedRoute>
            }
          />
          <Route
            path="ViewStaffs"
            element={
              <ProtectedRoute>
                <AdminMaindash data={"ViewStaffs"} />
              </ProtectedRoute>
            }
          />
          <Route
            path="ViewStudents"
            element={
              <ProtectedRoute>
                <AdminMaindash data={"ViewStudents"} />
              </ProtectedRoute>
            }
          />
          <Route
            path="ViewBooks"
            element={
              <ProtectedRoute>
                <AdminMaindash data={"ViewBooks"} />
              </ProtectedRoute>
            }
          />
          <Route
            path="AddingBooks"
            element={
              <ProtectedRoute>
                <AdminMaindash data={"AddingBooks"} />
              </ProtectedRoute>
            }
          />
          <Route
            path="AdminEditBook"
            element={
              <ProtectedRoute>
                <AdminEditBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="UserEditProfile"
            element={
              <ProtectedRoute>
                <UserEditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="Books"
            element={
              <ProtectedRoute>
                <ViewBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="Book/:id"
            element={
              <ProtectedRoute>
                <Book />
              </ProtectedRoute>
            }
          />
          <Route
            path="UserFavouriteBooks"
            element={
              <ProtectedRoute>
                <UserFavourite />
              </ProtectedRoute>
            }
          />
          <Route
            path="LentedBook"
            element={
              <ProtectedRoute>
                <LentedBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="Rating"
            element={
              <ProtectedRoute>
                <Ratings />
              </ProtectedRoute>
            }
          />
          <Route
            path="FlipBook"
            element={
              <ProtectedRoute>
                <FlipBook />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
