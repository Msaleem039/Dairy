'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Confetti from 'react-confetti';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const OrderSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const orderId = searchParams.get('orderId');

  // 🔹 Confetti resize logic
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🔥 Auto redirect to home after order success
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000); // ⏱️ 5 seconds (change to 3000 if needed)

    return () => clearTimeout(timer);
  }, [router]);

};

const OrderSuccess = () => {
  return (
    <Suspense fallback={
      <div style={{
        // minHeight: '100vh',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ color: 'white', fontSize: '20px' }}>Loading...</div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
};

export default OrderSuccess;

