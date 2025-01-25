import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NoPageFound from "./Components/NoPageFound";

import HomePage from "./Components/HomePage";
import Navbar from "./Components/Navbar";
import StaffRegistration from "./Components/Staff/StaffRegistration";

function App() {
  return (
    <div className="App">
      {/* //hai */}
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NoPageFound/>}/>
          <Route path="/Navbar" element={<Navbar/>}/>
          <Route path="/" element={<HomePage/>}/>
          <Route path='StaffReg' element={<StaffRegistration/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
