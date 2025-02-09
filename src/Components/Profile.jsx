import React, { useContext } from "react";
import '../Styles/Profile.css'
import { loggData } from "./Context/AppContext";

const Profile = ({setIsLogged,setProfileShower}) => {
    const{loggedData,setLoggedData}=useContext(loggData)
   
    
  return (
    <div className="profilePopupContainer">
      <div className="profilePopupHeader">
        <p>{loggedData.studentName}</p>
        <p>{loggedData.email}</p>
      </div>
      <button type="button" className="logoutBtn" onClick={()=>{setLoggedData('')
        setIsLogged(false)
        setProfileShower(false)
      }}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
