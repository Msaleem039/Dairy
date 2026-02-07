'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Confetti from 'react-confetti';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import './order-success.css';

const OrderSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showContent, setShowContent] = useState(false);
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

  // 🔹 Show content with animation delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="order-success-container">
      {/* 🎉 Confetti Animation */}
      {windowSize.width > 0 && windowSize.height > 0 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      {/* ✅ Content */}
      <div className={`order-success-content ${showContent ? 'show' : ''}`}>
        <div className="success-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>

        <h1 className="success-title">🎉 Order Placed Successfully!</h1>
        
        <p className="success-message">
          Thank you for your order! Your order has been confirmed and will be delivered soon.
        </p>

        {/* {orderId && (
          <div className="order-id-container">
            <p className="order-id-label">Order ID:</p>
            <p className="order-id-value">{orderId}</p>
          </div>
        )} */}

        <div className="payment-info">
          <div className="payment-icon">💵</div>
          <p className="payment-text">
            <strong>Payment Method:</strong> Cash on Delivery
          </p>
        </div>

        <div className="success-actions">
          <button
            className="btn-primary"
            onClick={() => router.push('/')}
          >
            Go to Home
          </button>
          {/* <button
            className="btn-secondary"
            onClick={() => router.push('/myorders')}
          >
            View My Orders
          </button> */}
        </div>
      </div>
    </div>
  );
};

const OrderSuccess = () => {
  return (
    <Suspense fallback={
      <div className="order-success-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
};

export default OrderSuccess;
