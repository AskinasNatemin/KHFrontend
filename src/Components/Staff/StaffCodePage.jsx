import React, { useState } from "react";
import "../../Styles/Staff/StaffCodePage.css"; // Import the CSS file for styles
import { FiAlertTriangle } from "react-icons/fi";

const StaffCodePage = ({ setStaffAccess }) => {
  const [staffCode, setStaffCode] = useState("");
  const [error, setError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (staffCode >= 100 && staffCode <= 110) {
      setStaffAccess(true);
    } else if (!staffCode) {
      setError("Enter your code");
    } else {
      setError("invalid code");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <>
      <div className="popup-box">
        <h3 className="popup-title">ENTER STAFF CODE</h3>
        {error && (
          <div className="staffCodeerrorContainer alert ">
            <div className="staffCodeerroricon">
              <FiAlertTriangle className="icon-class" />
            </div>
            {error}
          </div>
        )}
        <div className="input-group">
          <input
            autoFocus
            type="text"
            id="staffCode"
            value={staffCode}
            onChange={(e) => {
              setStaffCode(e.target.value);
              setError("");
            }}
            required
            placeholder="Enter Staff Code"
            className="input-field mb-3"
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </div>
        <div className="d-grid gap-2 col-6 mx-auto staffcodebutton">
          <button className="btn btn-danger" onClick={handleSubmit}>
            ENTER
          </button>
        </div>
      </div>
    </>
  );
};

export default StaffCodePage;
