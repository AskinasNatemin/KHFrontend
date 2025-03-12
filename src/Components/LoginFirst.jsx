import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/LoginFirst.css'

const LoginFirst = () => {
  return (
    <div className="loginFirstContainer">
    <div className="loginFirstBox">
      <h2 className="loginFirstTitle">Access Denied</h2>
      <p className="loginFirstMessage">You need to log in to access this page.</p>
      <Link to="/" className="goToHome">Go to Home</Link>
    </div>
  </div>  )
}

export default LoginFirst