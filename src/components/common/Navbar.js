import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
      <div className="container">

        
        <div className="navbar-collapse justify-content-center text-center" id="navbarNav">
          <Link className="navbar-brand d-none d-lg-block mx-auto" to="/">
            <img src="/logo.png" alt="NOC System Logo" style={{ height: '70px' }} />
          </Link>
          <ul className="navbar-nav">
            {/* Logo for mobile/small screens, hidden on large screens */}
            <li className="nav-item d-lg-none mx-auto">
              <Link className="nav-link" to="/">
                <img src="/logo.png" alt="NOC System Logo" style={{ height: '70px' }} />
              </Link>
            </li>
            {currentUser ? (
              <>
                <li className="nav-item ms-auto">
                  <Link 
                    className="nav-link" 
                    to={currentUser.userType === 'student' ? '/student/dashboard' : '/faculty/dashboard'}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link" 
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>

              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;