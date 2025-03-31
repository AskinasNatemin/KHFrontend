import React from "react";
import '../../Styles/Books/NoBookFallBack.css'

const NoBookFallBack = () => {
  return (
    <div className="NoBookContainer">
      <div className="NoBookMessageBox">
        <p className="NoBookMessage">📚 Oops! Your backpack is empty.</p>
        <p className="NoBookSubMessage">
          Add some books to explore and enjoy reading!
        </p>
      </div>
    </div>
  );
};

export default NoBookFallBack;
