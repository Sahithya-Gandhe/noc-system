import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaFileAlt, FaUserGraduate, FaUserTie, FaClipboardCheck } from 'react-icons/fa';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="text-center mb-5">

            <div className="card text-center mb-5" style={{ backgroundColor: '#f0f0f0', padding: '2rem' }}>
              <h1 className="display-4 mb-3" style={{ fontWeight: 'bold', fontSize: '3.5rem', color: '#8B0000' }}>No Objection Certificate System</h1>
              <p className="lead" style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#8B0000' }}>
                A streamlined platform for students to request and track No Objection Certificates
                and for faculty to manage approval processes.
              </p>
            </div>
            
            {currentUser ? (
              <Link 
                to={currentUser.userType === 'student' ? '/student/dashboard' : '/faculty/dashboard'}
                className="btn btn-primary btn-lg mt-3"
              >
                Go to Dashboard
              </Link>
            ) : (
              <div className="mt-4">
                <Link to="/login" className="btn btn-primary btn-lg me-3">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-lg">
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="row mt-5">
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <FaUserGraduate className="text-primary mb-3" size={50} />
                  <h3>For Students</h3>
                  <ul className="list-unstyled text-start mt-3">
                    <li className="mb-2">✓ Submit NOC requests to multiple departments</li>
                    <li className="mb-2">✓ Track approval status in real-time</li>
                    <li className="mb-2">✓ View feedback from faculty</li>
                    <li className="mb-2">✓ Generate and download approved certificates</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <FaUserTie className="text-primary mb-3" size={50} />
                  <h3>For Faculty</h3>
                  <ul className="list-unstyled text-start mt-3">
                    <li className="mb-2">✓ Review student NOC requests</li>
                    <li className="mb-2">✓ Approve or reject with comments</li>
                    <li className="mb-2">✓ Track department-specific requests</li>
                    <li className="mb-2">✓ Manage approval workflow efficiently</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <FaFileAlt className="text-primary mb-3" size={40} />
                  <h4>Digital Requests</h4>
                  <p className="mt-3">Submit and process NOC requests digitally, eliminating paperwork and reducing processing time.</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <FaClipboardCheck className="text-primary mb-3" size={40} />
                  <h4>Real-time Tracking</h4>
                  <p className="mt-3">Monitor the status of your requests in real-time with detailed approval information.</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <FaFileAlt className="text-primary mb-3" size={40} />
                  <h4>Digital Certificates</h4>
                  <p className="mt-3">Generate and download your approved NOC certificates instantly after approval.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;