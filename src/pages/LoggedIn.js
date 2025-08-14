import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseconfig';

const LoggedIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { displayName } = location.state || {};
  const userEmail = auth.currentUser?.email;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error.message);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <button 
        className="btn btn-danger"
        onClick={handleLogout}
        style={{ position: 'absolute', top: '20px', right: '20px' }}
      >
        Logout
      </button>
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
        <h2 className="text-center">Welcome, {displayName}!</h2>
        <p className="text-center">You have successfully signed in with Google.</p>
        <div className="d-flex flex-column mt-4">
          <button className="btn btn-primary mb-2" onClick={() => navigate('/send-requests', { state: { displayName, email: userEmail } })}>Send Requests</button>
          <button className="btn btn-secondary" onClick={() => navigate('/my-requests')}>My Requests</button>
        </div>
      </div>
    </div>
  );
};

export default LoggedIn;