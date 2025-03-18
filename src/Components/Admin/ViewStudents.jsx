import React from 'react'

function ViewStudents() {
  return (
    <div>
       <div className="admin-dashboard-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '10px' }}>
        <div className="admin-dashboard-topbar">
          <h4 className="admin-dashboard-topbar-h4">ALL STUDENTS LIST</h4>
        </div>
      </div>
    </div>
  )
}

export default ViewStudents