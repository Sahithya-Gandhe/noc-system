import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from './context/AuthContext';
import Home from './Home';
import LoggedIn from './pages/LoggedIn';
import SendRequests from './pages/SendRequests';
import Header from './components/Header'; // Import the new Header component


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Protected route component
function App() {
  return (
    <Router>
      <div className="app-container">
        <Header /> {/* Render the Header component here */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loggedin" element={<LoggedIn />} />
            <Route path="/send-requests" element={<SendRequests />} />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
