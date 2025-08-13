import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password, userType) => {
    // In a real app, you would validate against a backend
    // For demo, we'll create a mock user
    const user = {
      id: Date.now().toString(),
      email,
      userType,
      name: email.split('@')[0], // Mock name from email
      department: userType === 'faculty' ? 'Computer Science' : null,
      studentId: userType === 'student' ? 'STU' + Math.floor(Math.random() * 10000) : null
    };
    
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  };

  // Register function
  const register = (userData) => {
    // In a real app, you would send this to your backend
    // For demo, we'll just store the user data
    const user = {
      id: Date.now().toString(),
      ...userData
    };
    
    // We don't log in the user immediately after registration
    // They need to login with their credentials
    localStorage.setItem('registeredUser', JSON.stringify(user));
    return user;
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};