import React from "react";
import { useNavigate } from "react-router-dom";
import '../../Styles/Books/NoBookFallBack.css'

const NoBookFallBack = () => {
const navigate = useNavigate();
  
  return (
    <div className="NoBookContainer">
      <div className="NoBookMessageBox">
        <p className="NoBookMessage">📚 Oops! Your backpack is empty.</p>
        <p className="NoBookSubMessage">
          Add some books to explore and enjoy reading!
        </p>
        <div className="OopsGoBack d-grid gap-2 col-5 mx-auto ">
        <button  onClick={() => navigate("/Books")}>ADD BOOK</button>
        </div>
      </div>
    </div>
  );
};

export default NoBookFallBack;
