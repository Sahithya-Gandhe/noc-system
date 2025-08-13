import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NOCProvider } from './context/NOCContext';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import StudentDashboard from './components/student/StudentDashboard';
import RequestDetail from './components/student/RequestDetail';
import GenerateNOC from './components/student/GenerateNOC';
import FacultyDashboard from './components/faculty/FacultyDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children, requiredUserType }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="d-flex justify-content-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (requiredUserType && currentUser.userType !== requiredUserType) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <NOCProvider>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Student Routes */}
                <Route 
                  path="/student/dashboard" 
                  element={
                    <ProtectedRoute requiredUserType="student">
                      <StudentDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/student/request/:requestId" 
                  element={
                    <ProtectedRoute requiredUserType="student">
                      <RequestDetail />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/student/generate-noc/:requestId" 
                  element={
                    <ProtectedRoute requiredUserType="student">
                      <GenerateNOC />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Faculty Routes */}
                <Route 
                  path="/faculty/dashboard" 
                  element={
                    <ProtectedRoute requiredUserType="faculty">
                      <FacultyDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </NOCProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
