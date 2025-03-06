import React from "react";
import "../../Styles/Users/UsersData.css";
function UsersData() {
  return (
    <div className="UsersData-container">
      <div className="UsersData-box">
        <h3 className="UsersData-boxheading">Knowledge Hub Users</h3>
        <div className="search-container">
        <div className="search-container">
      <input type="text" placeholder="Search Users..." className="search-bar" />
    </div>
    <table className="user-table">
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Username</th>
          <th>Phone Number</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>2</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        {/* Add more rows as needed */}
      </tbody>
    </table>
  </div>
      </div>
      </div>
    
  );
}

export default UsersData;
