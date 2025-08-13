import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNOC } from '../../context/NOCContext';
import RequestList from './RequestList';
import NewRequestForm from './NewRequestForm';

const StudentDashboard = () => {
  const { currentUser, logout } = useAuth();
  const { getStudentRequests } = useNOC();
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('requests');
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.userType !== 'student') {
      navigate('/login');
      return;
    }

    // Load student's requests
    const studentRequests = getStudentRequests(currentUser.id);
    setRequests(studentRequests);
  }, [currentUser, navigate, getStudentRequests]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const refreshRequests = () => {
    const studentRequests = getStudentRequests(currentUser.id);
    setRequests(studentRequests);
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-8">
          <h2>Student Dashboard</h2>
          <p>Welcome, {currentUser?.name}</p>
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
                className={`nav-link ${activeTab === 'requests' ? 'active' : ''}`}
                onClick={() => handleTabChange('requests')}
              >
                My Requests
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'new' ? 'active' : ''}`}
                onClick={() => handleTabChange('new')}
              >
                New Request
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {activeTab === 'requests' ? (
            <RequestList 
              requests={requests} 
              refreshRequests={refreshRequests}
            />
          ) : (
            <NewRequestForm onRequestCreated={refreshRequests} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;