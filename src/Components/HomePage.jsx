import React, { useState } from "react";
import Navbar from "./Navbar";
import "../Styles/HomePage.css";

const HomePage = () => {
  const [openUserSelectionModel, setOpenUserSelectionModel] = useState(false);
  const [logOrSignUp,setLogOrSignUp]=useState();
  

  const handleRegistration = (type) => {  
      setLogOrSignUp(type)
      setOpenUserSelectionModel(true)
      
    };
    
    console.log(logOrSignUp);
  return (
    <div
      className="container-fluid d-flex flex-column homeContainer"
      style={{ height: "100vh" }}
    >
      <Navbar
        handleRegistration={handleRegistration}
      />

      <div className="container  row mx-auto flex-fill">
        <div className="col-sm-12 col-md-6 border my-2 rounded ">
          <h1>welcome</h1>
        </div>

        <div className="col-sm-12 col-md-6"></div>
      </div>

      {openUserSelectionModel && <div className="selectUserContainer">
              <div className="selectUser border">
                  <span></span>
                  <span onClick={()=>{setOpenUserSelectionModel(false)
                    setLogOrSignUp('')
                  }}>❌</span>
              </div>
      </div>}
        
    </div>
  );
};

export default HomePage;
