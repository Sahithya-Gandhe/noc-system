import React from 'react';
import logo from '../logo.png'; // Correctly reference logo.png from src folder
import './Header.css'; // For styling the header

const Header = () => {
  return (
    <header className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
    </header>
  );
};

export default Header;