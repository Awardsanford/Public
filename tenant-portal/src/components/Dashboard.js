import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, Navigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

function Dashboard() {
  const nav = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Logged out successfully');
      nav('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!auth.currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-header">Welcome to the dashboard! This is protected content.</div>
            <div className="card-body">              
              <Link to="/dashboard/tenant-application" className="btn btn-primary">
                Tenant Application
              </Link>
            </div>
            <div className="card-footer">
              <button onClick={handleLogout} className="btn btn-danger">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
