import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNOC } from '../../context/NOCContext';
import PendingRequests from './PendingRequests';
import ProcessedRequests from './ProcessedRequests';

const FacultyDashboard = () => {
  const { currentUser, logout } = useAuth();
  const { getFacultyRequests, requests } = useNOC();
  const [pendingRequests, setPendingRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.userType !== 'faculty') {
      navigate('/login');
      return;
    }

    // Load faculty's pending requests
    const facultyPendingRequests = getFacultyRequests(currentUser.department);
    setPendingRequests(facultyPendingRequests);
  }, [currentUser, navigate, getFacultyRequests, requests]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const refreshRequests = () => {
    const facultyPendingRequests = getFacultyRequests(currentUser.department);
    setPendingRequests(facultyPendingRequests);
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-8">
          <h2>Faculty Dashboard</h2>
          <p>Welcome, {currentUser?.name} | {currentUser?.department}</p>
        </div>
        <div className="col-md-4 text-end">
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => handleTabChange('pending')}
              >
                Pending Requests
                {pendingRequests.length > 0 && (
                  <span className="badge bg-danger ms-2">{pendingRequests.length}</span>
                )}
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'processed' ? 'active' : ''}`}
                onClick={() => handleTabChange('processed')}
              >
                Processed Requests
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {activeTab === 'pending' ? (
            <PendingRequests 
              requests={pendingRequests} 
              refreshRequests={refreshRequests}
            />
          ) : (
            <ProcessedRequests department={currentUser?.department} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;