'use client';

import React, { useState, useEffect } from 'react';
import './WelcomePopup.css';

const WelcomePopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const hasSeenPopup = sessionStorage.getItem('dairyDelightWelcomeShown');
    
    if (!hasSeenPopup) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem('dairyDelightWelcomeShown', 'true');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="welcome-popup-overlay" onClick={handleClose}>
      <div className="welcome-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="welcome-popup-close" onClick={handleClose}>×</button>
        <div className="welcome-popup-icon">🧀</div>
        <h1 className="welcome-popup-title">Welcome to</h1>
        <h2 className="welcome-popup-brand">Dairy Delight Cheese</h2>
        <p className="welcome-popup-message">
          Fresh, Premium Quality Shredded Cheese
        </p>
        <p className="welcome-popup-submessage">
          Half KG • 1KG • 2KG Packages
        </p>
        <button className="welcome-popup-button" onClick={handleClose}>
          Start Shopping
        </button>
      </div>
    </div>
  );
};

export default WelcomePopup;



