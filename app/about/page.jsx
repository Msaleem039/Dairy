'use client';

import AppDownload from '../../src/components/AppDownload/AppDownload';

export default function AboutPage() {
  return (
    <div style={{ marginTop: '100px', padding: '20px', maxWidth: '1200px', margin: '100px auto 0', lineHeight: '1.8' }}>
      <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '30px', textAlign: 'center', color: '#667eea' }}>
        About Dairy Delight
      </h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
          Our Story
        </h2>
        <p style={{ fontSize: '16px', color: '#555', marginBottom: '20px' }}>
          Dairy Delight is your trusted source for premium quality shredded cheese in Lahore. 
          We specialize in providing fresh, high-quality cheese products that meet the highest standards of taste and freshness.
        </p>
        <p style={{ fontSize: '16px', color: '#555', marginBottom: '20px' }}>
          Located in Mugalpura, Lahore, we are committed to delivering the finest cheese products 
          directly to your doorstep. Our products are carefully selected and packaged to ensure 
          maximum freshness and quality.
        </p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
          Our Products
        </h2>
        <p style={{ fontSize: '16px', color: '#555', marginBottom: '15px' }}>
          We offer premium shredded cheese in convenient package sizes:
        </p>
        <ul style={{ fontSize: '16px', color: '#555', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '10px' }}>Half KG Package - Perfect for small families</li>
          <li style={{ marginBottom: '10px' }}>1 KG Package - Ideal for regular use</li>
          <li style={{ marginBottom: '10px' }}>2 KG Package - Great value for larger families</li>
        </ul>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
          Why Choose Us?
        </h2>
        <ul style={{ fontSize: '16px', color: '#555', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '10px' }}>100% Pure Cheese Goodness</li>
          <li style={{ marginBottom: '10px' }}>Fresh Quality Guaranteed</li>
          <li style={{ marginBottom: '10px' }}>Fast Delivery in Lahore</li>
          <li style={{ marginBottom: '10px' }}>Competitive Prices</li>
          <li style={{ marginBottom: '10px' }}>Excellent Customer Service</li>
        </ul>
      </div>

      <AppDownload />
    </div>
  );
}



