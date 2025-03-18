import React from 'react'

function ViewBooks() {
  return (
    <>
        <div className="admin-dashboard-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '10px' }}>
        <div className="admin-dashboard-topbar">
          <h4 className="admin-dashboard-topbar-h4">VIEW BOOKS</h4>
        </div>
      </div>
    </>                                               
    


  )
}

export default ViewBooks