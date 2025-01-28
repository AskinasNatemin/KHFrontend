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
import ViewBooks from "./Components/ViewBooks";
import { AdminAddingBooks } from "./Components/Admin/AdminAddingBooks";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NoPageFound/>}/>
          <Route path="/Navbar" element={<Navbar/>}/>
          <Route path="/" element={<HomePage/>}/>
          <Route path='StaffReg' element={<StaffRegistration/>}/>
          <Route path='StaffLogin' element={<StaffLogin/>}/>
          <Route path='AdminLogin' element={<AdminLogin/>}/>
          <Route path="studentlogin" element={<StudentLogin/>}/>
          <Route path="ViewBooks" element={<ViewBooks/>}/>
          <Route path="AdminAddingBooks" element={<AdminAddingBooks/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
