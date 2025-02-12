import React, { useState } from 'react';
import '../../Styles/Staff/StaffCodePage.css';  // Import the CSS file for styles

const StaffCodePage = ({setStaffAccess}) => {
  const [staffCode, setStaffCode] = useState('');
  const[error,setError]=useState()

  const handleSubmit = (e) => {
    e.preventDefault();
    if(staffCode>=100 && staffCode<=110){
      setStaffAccess(true)
    }else{
      setError('invalid code')
    }
  };

  return (
    <>
      <div className="popup-box">
         {error && <div className="alert alert-danger">{error}</div>}
        <h2 className="popup-title">Enter Staff Code</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="staffCode">Staff Code</label>
            <input
              type="text"
              id="staffCode"
              value={staffCode}
              onChange={(e) => {setStaffCode(e.target.value)
                setError('')
              }}
              required
              placeholder="Enter Staff Code"
              className="input-field mb-3"
            />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </>
  );
};

export default StaffCodePage;
