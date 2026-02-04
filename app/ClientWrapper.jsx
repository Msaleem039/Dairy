'use client';

import { useState } from 'react';
import Navbar from '../src/components/Navbar/Navbar';
import Footer from '../src/components/Footer/Footer';
import LoginPopup from '../src/components/LoginPopup/LoginPopup';
import WhatsAppFloat from '../src/components/WhatsAppFloat/WhatsAppFloat';

export default function ClientWrapper({ children }) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        {children}
      </div>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

