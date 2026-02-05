'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../src/components/Navbar/Navbar';
import Footer from '../src/components/Footer/Footer';
import LoginPopup from '../src/components/LoginPopup/LoginPopup';
import WhatsAppFloat from '../src/components/WhatsAppFloat/WhatsAppFloat';
import WelcomePopup from '../src/components/WelcomePopup/WelcomePopup';

export default function ClientWrapper({ children }) {
  const [showLogin, setShowLogin] = useState(false);
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  // Don't show website navbar/footer on admin routes
  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <WelcomePopup />
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

