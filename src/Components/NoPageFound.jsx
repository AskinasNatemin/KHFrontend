import React from 'react';
import '../Styles/NoPageFound.css';
import {useNavigate} from 'react-router-dom'

const NoPageFound = () => {
  const navigate=useNavigate()
    return (
        <div className="noPageContainer">
            <div className="contentWrapper">
                <h1 className="errorCode">404</h1>
                <h2 className="errorMessage">Oops! Page Not Found</h2>
                <p className="errorDescription">The page you're looking for doesn't exist or has been moved.</p>
                <button className="goBackButton" onClick={() =>navigate('/',{replace:true})}>G0 BACK</button>
            </div>
        </div>
    );
};

export default NoPageFound;
