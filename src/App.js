import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NoPageFound from "./components/NoPageFound";
import Navbar from "./components/Navbar";
import StudentLogin from "./components/Student/StudentLogin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NoPageFound/>}/>
          <Route path="/" element={<Navbar/>}/>
          <Route path="studentlogin" element={<StudentLogin/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
